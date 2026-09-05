import React, { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type LiquidTextLine = {
  text: string;
  className?: string;
};

export interface HeroLiquidTextProps {
  lines: LiquidTextLine[];
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Fluid simulation grid resolution (GPU-side). 256 is fast and smooth. */
const SIM_RES = 256;

// ─────────────────────────────────────────────────────────────────────────────
// GLSL Shaders
// ─────────────────────────────────────────────────────────────────────────────

/** Shared vertex shader — outputs a full-screen quad UV. */
const VERT_SRC = /* glsl */ `
  attribute vec2 a_pos;
  varying   vec2 v_uv;
  void main(){
    v_uv        = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

/**
 * Simulation fragment shader.
 * Reads previous velocity field, back-advects (semi-Lagrangian), applies
 * viscous decay, then optionally injects a Gaussian "splat" at the cursor.
 */
const SIM_FRAG_SRC = /* glsl */ `
  precision highp float;
  varying vec2 v_uv;

  uniform sampler2D u_vel;
  uniform vec2      u_px;        /* 1 / SIM_RES */
  uniform float     u_decay;
  uniform vec2      u_splatPos;
  uniform float     u_splatR;
  uniform vec2      u_splatV;
  uniform float     u_splat;     /* 1 = inject splat, 0 = skip */

  void main(){
    /* Back-trace along current velocity (semi-Lagrangian advection) */
    vec2 vel  = texture2D(u_vel, v_uv).xy;
    vec2 prev = clamp(v_uv - vel * u_px * 16.0, u_px, 1.0 - u_px);
    vel        = texture2D(u_vel, prev).xy;

    /* Natural viscous decay */
    vel *= u_decay;

    /* Cursor-driven velocity splat */
    if(u_splat > 0.5){
      vec2  d = v_uv - u_splatPos;
      float s = exp(-dot(d, d) / (u_splatR * u_splatR));
      vel    += u_splatV * s;
    }

    vel = clamp(vel, -0.5, 0.5);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

/**
 * Display fragment shader.
 * Samples the text canvas texture at UV coordinates displaced by the
 * current velocity field — making letters appear to swim in liquid.
 */
const DISP_FRAG_SRC = /* glsl */ `
  precision highp float;
  varying vec2 v_uv;

  uniform sampler2D u_text;
  uniform sampler2D u_vel;
  uniform float     u_strength;  /* controls how far pixels are displaced */

  void main(){
    vec2 vel = texture2D(u_vel, v_uv).xy;
    vec2 uv  = clamp(v_uv + vel * u_strength, 0.001, 0.999);
    /* Canvas 2D Y=0 is top; WebGL UV Y=0 is bottom — flip to correct. */
    gl_FragColor = texture2D(u_text, vec2(uv.x, 1.0 - uv.y));
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// WebGL helpers
// ─────────────────────────────────────────────────────────────────────────────

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

function createProgram(
  gl: WebGLRenderingContext,
  vSrc: string,
  fSrc: string,
): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, vSrc));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, fSrc));
  gl.linkProgram(p);
  return p;
}

interface FBOPair {
  read:  { tex: WebGLTexture; fbo: WebGLFramebuffer };
  write: { tex: WebGLTexture; fbo: WebGLFramebuffer };
}

function createDoubleBuffer(
  gl: WebGLRenderingContext,
  w: number,
  h: number,
): FBOPair {
  const make = () => {
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { tex, fbo };
  };
  return { read: make(), write: make() };
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const HeroLiquidText: React.FC<HeroLiquidTextProps> = ({
  lines,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textDivRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const lineRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Respect user's motion preference — show static text only
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas    = canvasRef.current;
    const textDiv   = textDivRef.current;
    const container = containerRef.current;
    if (!canvas || !textDiv || !container) return;

    // ── WebGL context ─────────────────────────────────────────────────────────
    const gl = canvas.getContext('webgl', {
      alpha:              true,
      premultipliedAlpha: false,
      antialias:          false,
      preserveDrawingBuffer: false,
    }) as WebGLRenderingContext | null;

    // No WebGL support → stay with DOM text
    if (!gl) return;

    gl.clearColor(0, 0, 0, 0);

    // ── Programs ──────────────────────────────────────────────────────────────
    const simProg  = createProgram(gl, VERT_SRC, SIM_FRAG_SRC);
    const dispProg = createProgram(gl, VERT_SRC, DISP_FRAG_SRC);

    // Cache uniform locations (avoids per-frame lookups)
    const simU = {
      vel:      gl.getUniformLocation(simProg,  'u_vel'),
      px:       gl.getUniformLocation(simProg,  'u_px'),
      decay:    gl.getUniformLocation(simProg,  'u_decay'),
      splat:    gl.getUniformLocation(simProg,  'u_splat'),
      splatPos: gl.getUniformLocation(simProg,  'u_splatPos'),
      splatR:   gl.getUniformLocation(simProg,  'u_splatR'),
      splatV:   gl.getUniformLocation(simProg,  'u_splatV'),
    };
    const dispU = {
      text:     gl.getUniformLocation(dispProg, 'u_text'),
      vel:      gl.getUniformLocation(dispProg, 'u_vel'),
      strength: gl.getUniformLocation(dispProg, 'u_strength'),
    };

    // ── Fullscreen quad geometry ──────────────────────────────────────────────
    const quadBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const simALoc  = gl.getAttribLocation(simProg,  'a_pos');
    const dispALoc = gl.getAttribLocation(dispProg, 'a_pos');

    const drawQuad = (aLoc: number) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      gl.enableVertexAttribArray(aLoc);
      gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // ── Ping-pong velocity field ──────────────────────────────────────────────
    let db = createDoubleBuffer(gl, SIM_RES, SIM_RES);

    // ── Text texture ──────────────────────────────────────────────────────────
    let textTex: WebGLTexture | null = null;
    let texW = 1;
    let texH = 1;

    const buildTexture = () => {
      const cRect = container.getBoundingClientRect();
      if (cRect.width === 0 || cRect.height === 0) return;

      // Use intrinsic (layout) dimensions for the canvas pixel buffer so that
      // ancestor CSS scale transforms don't create a huge texture.
      texW = Math.max(1, container.offsetWidth);
      texH = Math.max(1, container.offsetHeight);
      canvas.width  = texW;
      canvas.height = texH;

      // Scale factor: intrinsic → rendered (inverse of ancestor transform)
      const sx = cRect.width  > 0 ? texW / cRect.width  : 1;
      const sy = cRect.height > 0 ? texH / cRect.height : 1;

      // Draw text onto a transparent offscreen 2D canvas using computed styles
      const off = document.createElement('canvas');
      off.width  = texW;
      off.height = texH;
      const ctx  = off.getContext('2d')!;
      ctx.clearRect(0, 0, texW, texH);

      lineRefs.current.forEach((lineEl, i) => {
        if (!lineEl) return;
        const span = lineEl.querySelector('span') as HTMLElement | null;
        if (!span) return;

        const style    = window.getComputedStyle(span);
        const spanRect = span.getBoundingClientRect();

        // Map rendered position → intrinsic canvas position
        const x = (spanRect.left - cRect.left) * sx;
        const y = (spanRect.top  - cRect.top)  * sy;

        ctx.save();
        ctx.font         = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        ctx.fillStyle    = style.color;
        ctx.textBaseline = 'top';

        // Letter-spacing: supported in Chrome ≥99, Firefox ≥116, Safari ≥17
        if ('letterSpacing' in ctx) {
          (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
            style.letterSpacing;
        }

        ctx.fillText(lines[i].text, x, y);
        ctx.restore();
      });

      // Upload to WebGL
      if (!textTex) textTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textTex);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    // Build immediately then again after fonts confirm loaded
    buildTexture();
    document.fonts.ready.then(() => buildTexture());

    // ── RAF & state ───────────────────────────────────────────────────────────
    let raf: number | null = null;
    let isNear  = false;

    // Mouse state in UV (0-1) coordinates
    const mouse = {
      x: 0.5, y: 0.5,   // current
      px: 0.5, py: 0.5, // previous
      vx: 0, vy: 0,      // velocity in UV / frame
      moved: false,
    };

    // Crossfade timers
    let crossfadeTimer: ReturnType<typeof setTimeout> | null = null;
    let stopTimer:      ReturnType<typeof setTimeout> | null = null;

    const clearTimers = () => {
      if (crossfadeTimer !== null) { clearTimeout(crossfadeTimer); crossfadeTimer = null; }
      if (stopTimer      !== null) { clearTimeout(stopTimer);      stopTimer      = null; }
    };

    // ── Main loop ─────────────────────────────────────────────────────────────
    const startLoop = () => {
      if (raf !== null) return;

      const tick = () => {
        // ── Simulation pass (renders to ping-pong FBO at SIM_RES) ──
        gl.useProgram(simProg);
        gl.viewport(0, 0, SIM_RES, SIM_RES);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, db.read.tex);
        gl.uniform1i(simU.vel,      0);
        gl.uniform2f(simU.px,       1 / SIM_RES, 1 / SIM_RES);
        gl.uniform1f(simU.decay,    0.978);
        gl.uniform1f(simU.splat,    isNear && mouse.moved ? 1 : 0);
        // Flip Y: canvas Y goes down, GL UV goes up
        gl.uniform2f(simU.splatPos, mouse.x, 1.0 - mouse.y);
        gl.uniform1f(simU.splatR,   0.068);
        gl.uniform2f(simU.splatV,   mouse.vx, -mouse.vy);

        gl.bindFramebuffer(gl.FRAMEBUFFER, db.write.fbo);
        drawQuad(simALoc);

        // Swap read/write
        const tmp = db.read; db.read = db.write; db.write = tmp;
        mouse.moved = false;

        // ── Display pass (renders to canvas at texW × texH) ──
        gl.viewport(0, 0, texW, texH);
        gl.useProgram(dispProg);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textTex);
        gl.uniform1i(dispU.text,     0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, db.read.tex);
        gl.uniform1i(dispU.vel,      1);
        gl.uniform1f(dispU.strength, 0.09);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.clear(gl.COLOR_BUFFER_BIT);
        drawQuad(dispALoc);

        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    };

    // ── Cursor enter ──────────────────────────────────────────────────────────
    const onEnter = () => {
      if (isNear) return;
      isNear = true;
      clearTimers();

      // Instantly show canvas; smoothly hide DOM text
      canvas.style.transition  = 'opacity 0.18s ease';
      canvas.style.opacity     = '1';
      textDiv.style.transition = 'opacity 0.18s ease';
      textDiv.style.opacity    = '0';

      startLoop();
    };

    // ── Cursor leave ──────────────────────────────────────────────────────────
    const onLeave = () => {
      if (!isNear) return;
      isNear = false;
      clearTimers();

      // Let the field decay, then crossfade canvas out / DOM text in together.
      // Both transition at the same time so opacity_canvas + opacity_dom ≈ 1
      // at all points → clean, continuous-brightness cross-dissolve.
      crossfadeTimer = setTimeout(() => {
        canvas.style.transition  = 'opacity 0.45s ease';
        canvas.style.opacity     = '0';
        textDiv.style.transition = 'opacity 0.45s ease';
        textDiv.style.opacity    = '1';
      }, 1100);

      stopTimer = setTimeout(() => {
        stopLoop();
      }, 1800);
    };

    // ── Mouse / pointer tracking ──────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top)  / rect.height;

      // Raw delta in UV space
      const rawVx = nx - mouse.px;
      const rawVy = ny - mouse.py;
      mouse.px = nx;
      mouse.py = ny;

      // Scale velocity so slow moves still create a gentle ripple and fast
      // moves create a strong one (clamped to avoid too-wild displacement).
      const mag = Math.sqrt(rawVx * rawVx + rawVy * rawVy);
      if (mag > 0.0001) {
        const scaled = Math.min(Math.max(mag * 5, 0.03), 0.38) / mag;
        mouse.vx = rawVx * scaled;
        mouse.vy = rawVy * scaled;
      } else {
        mouse.vx = 0;
        mouse.vy = 0;
      }

      mouse.x     = nx;
      mouse.y     = ny;

      // Small proximity margin (5% of canvas) so the effect activates just
      // before the cursor visually reaches the text block edge.
      const PROX  = 0.05;
      const inside =
        nx >= -PROX && nx <= 1 + PROX &&
        ny >= -PROX && ny <= 1 + PROX;

      mouse.moved = inside;

      if (inside) {
        onEnter();
      } else {
        onLeave();
      }
    };

    const onDocLeave = () => onLeave();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onDocLeave);

    // ── ResizeObserver — rebuild texture on layout changes ────────────────────
    let roDebounce: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (roDebounce) clearTimeout(roDebounce);
      roDebounce = setTimeout(() => {
        buildTexture();
      }, 150);
    });
    ro.observe(container);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onDocLeave);
      clearTimers();
      stopLoop();
      ro.disconnect();
      if (roDebounce) clearTimeout(roDebounce);

      // Free all GPU resources
      gl.deleteProgram(simProg);
      gl.deleteProgram(dispProg);
      gl.deleteBuffer(quadBuf);
      gl.deleteTexture(db.read.tex);
      gl.deleteFramebuffer(db.read.fbo);
      gl.deleteTexture(db.write.tex);
      gl.deleteFramebuffer(db.write.fbo);
      if (textTex) gl.deleteTexture(textTex);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/*
        Accessible DOM text — always present for SEO and screen-readers.
        Visible at rest; fades to opacity 0 while canvas is active.
      */}
      <div ref={textDivRef} className={className}>
        {lines.map((line, i) => (
          <div
            key={i}
            // eslint-disable-next-line no-return-assign
            ref={el => { lineRefs.current[i] = el; }}
            className={line.className}
          >
            <span className="inline-block">{line.text}</span>
          </div>
        ))}
      </div>

      {/*
        WebGL canvas — overlays the text block, transparent (opacity 0) at
        rest. Activated on cursor enter via JS; renders the fluid-distorted
        text at full opacity while interaction is live.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          opacity:       0,
        }}
      />
    </div>
  );
};
