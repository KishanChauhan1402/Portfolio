import React, { useEffect, useRef } from 'react';

export type LiquidTextLine = {
  text: string;
  className?: string;
};

export interface HeroLiquidTextProps {
  className: string;
  lines: LiquidTextLine[];
  filterId: string;
  dispMapId: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const HeroLiquidText: React.FC<HeroLiquidTextProps> = ({
  className,
  lines,
  filterId,
  dispMapId,
}) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const clickPulseRef = useRef<number>(0);

  // Interaction & Physics state stored in ref for zero-re-render 60/120fps loop
  const stateRef = useRef({
    isNear: false,
    targetX: 0,
    targetY: 0,
    currX: 0,
    currY: 0,
    prevX: 0,
    prevY: 0,
    trailX: 0,
    trailY: 0,
    currRadius: 0,
    targetRadius: 0,
    smoothSpeed: 0,
    shiftX: 0,
    shiftY: 0,
    dispScale: 0,
    stretch: 0,
    angle: 0,
    isActive: false,
    waveTime: 0,
    impulseRadius: 0,
    impulseOpacity: 0,
  });

  const renderLines = () => (
    <>
      {lines.map((line) => (
        <div key={line.text} className={line.className}>
          <span className="hero-liquid-line-text inline-block">{line.text}</span>
        </div>
      ))}
    </>
  );

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    let dispMapEl: SVGFEDisplacementMapElement | null = null;

    const startLoop = () => {
      if (rafRef.current !== null) return;

      const animate = () => {
        const state = stateRef.current;
        const currentField = fieldRef.current;
        if (!currentField) return;

        if (!dispMapEl) {
          dispMapEl = document.getElementById(dispMapId) as unknown as SVGFEDisplacementMapElement | null;
        }

        const baseRadius = Math.min(Math.max(currentField.offsetWidth * 0.22, 110), 190);

        // Fluid Viscosity Lerp (Calibrated for a smooth, organic feel)
        const LERP = 0.14;
        state.currX += (state.targetX - state.currX) * LERP;
        state.currY += (state.targetY - state.currY) * LERP;

        // Viscous trailing droplet wake
        const TRAIL_LERP = 0.08;
        state.trailX += (state.currX - state.trailX) * TRAIL_LERP;
        state.trailY += (state.currY - state.trailY) * TRAIL_LERP;

        // Instantaneous frame velocity & smoothed speed
        const dx = state.currX - state.prevX;
        const dy = state.currY - state.prevY;
        state.prevX = state.currX;
        state.prevY = state.currY;

        const instantSpeed = Math.sqrt(dx * dx + dy * dy);
        state.smoothSpeed += (instantSpeed - state.smoothSpeed) * 0.16;

        // Dynamic surface wake on swift movements
        if (instantSpeed > 18 && state.impulseOpacity < 0.15 && state.isNear) {
          state.impulseRadius = 20;
          state.impulseOpacity = 0.55;
        }

        // Angle of motion for droplet stretch
        if (instantSpeed > 0.4) {
          state.angle = Math.atan2(dy, dx);
        }
        state.stretch = Math.min(state.smoothSpeed * 0.02, 0.4);

        // Radius spring physics (smooth expansion and contraction)
        state.targetRadius = state.isNear ? baseRadius : 0;
        const rFactor = state.isNear ? 0.12 : 0.09;
        state.currRadius += (state.targetRadius - state.currRadius) * rFactor;

        // Refractive parallax shift (spring damped)
        const targetShiftX = clamp(dx * -1.6, -18, 18);
        const targetShiftY = clamp(dy * -1.6, -18, 18);
        state.shiftX += (targetShiftX - state.shiftX) * 0.15;
        state.shiftY += (targetShiftY - state.shiftY) * 0.15;

        // Harmonic liquid surface undulation (feels like touching fluid surface)
        state.waveTime += 0.038;
        const waveHarmonic = state.isNear ? Math.sin(state.waveTime * 3.2) * 3.2 : 0;

        // Click / touch wave pulse decay
        clickPulseRef.current *= 0.88;
        if (clickPulseRef.current < 0.1) clickPulseRef.current = 0;

        // Interactive touch impulse shockwave expansion & decay
        if (state.impulseOpacity > 0.01) {
          state.impulseRadius += 5.5;
          state.impulseOpacity *= 0.935;
          currentField.style.setProperty('--liquid-impulse-r', `${state.impulseRadius.toFixed(1)}px`);
          currentField.style.setProperty('--liquid-impulse-opacity', state.impulseOpacity.toFixed(3));
        } else if (state.impulseOpacity !== 0) {
          state.impulseOpacity = 0;
          currentField.style.setProperty('--liquid-impulse-opacity', '0');
        }

        // Modulate displacement map scale with velocity + harmonic liquid waves
        if (dispMapEl) {
          const targetDisp = state.isNear
            ? 7.5 + waveHarmonic + Math.min(state.smoothSpeed * 0.85 + clickPulseRef.current, 24)
            : 0;
          state.dispScale += (targetDisp - state.dispScale) * 0.14;
          dispMapEl.setAttribute('scale', state.dispScale.toFixed(1));
        }

        // Apply updated properties directly to CSS custom properties (no CSS transition conflict)
        const activeOpacity = clamp(state.currRadius / (baseRadius * 0.6), 0, 1);
        const chromaShift = Math.min(state.smoothSpeed * 0.12, 3.2);

        currentField.style.setProperty('--liquid-x', `${state.currX.toFixed(2)}px`);
        currentField.style.setProperty('--liquid-y', `${state.currY.toFixed(2)}px`);
        currentField.style.setProperty('--liquid-trail-x', `${state.trailX.toFixed(2)}px`);
        currentField.style.setProperty('--liquid-trail-y', `${state.trailY.toFixed(2)}px`);
        currentField.style.setProperty('--liquid-r', `${state.currRadius.toFixed(2)}px`);
        currentField.style.setProperty('--liquid-shift-x', `${state.shiftX.toFixed(2)}px`);
        currentField.style.setProperty('--liquid-shift-y', `${state.shiftY.toFixed(2)}px`);
        currentField.style.setProperty('--liquid-stretch', state.stretch.toFixed(3));
        currentField.style.setProperty('--liquid-angle', `${state.angle.toFixed(3)}rad`);
        currentField.style.setProperty('--liquid-opacity', activeOpacity.toFixed(3));
        currentField.style.setProperty('--liquid-chroma', `${chromaShift.toFixed(2)}px`);

        if (state.currRadius > 1.5 && !state.isActive) {
          state.isActive = true;
          currentField.classList.add('is-liquid-active');
        } else if (state.currRadius <= 1.5 && state.isActive && !state.isNear && state.impulseOpacity <= 0.02) {
          state.isActive = false;
          currentField.classList.remove('is-liquid-active');
          // Idle loop to preserve CPU when settled outside
          rafRef.current = null;
          return;
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const currentField = fieldRef.current;
      if (!currentField) return;

      const bounds = currentField.getBoundingClientRect();
      // Ensure element is currently visible on screen
      if (bounds.width === 0 || bounds.height === 0 || bounds.bottom < 0 || bounds.top > window.innerHeight) {
        if (stateRef.current.isNear) {
          stateRef.current.isNear = false;
        }
        return;
      }

      // Generous proximity padding so cursor doesn't abruptly drop out near edges or between lines
      const PROXIMITY = 60;
      const isInside = (
        e.clientX >= bounds.left - PROXIMITY &&
        e.clientX <= bounds.right + PROXIMITY &&
        e.clientY >= bounds.top - PROXIMITY &&
        e.clientY <= bounds.bottom + PROXIMITY
      );

      // Normalization for CSS transforms / hero scroll scale zoom
      const scaleX = bounds.width ? currentField.offsetWidth / bounds.width : 1;
      const scaleY = bounds.height ? currentField.offsetHeight / bounds.height : 1;
      const localX = (e.clientX - bounds.left) * scaleX;
      const localY = (e.clientY - bounds.top) * scaleY;

      stateRef.current.targetX = clamp(localX, -30, currentField.offsetWidth + 30);
      stateRef.current.targetY = clamp(localY, -30, currentField.offsetHeight + 30);

      if (isInside) {
        if (!stateRef.current.isNear && stateRef.current.currRadius < 2) {
          // Initialize position on initial entry to prevent dragging in from (0,0)
          stateRef.current.currX = stateRef.current.targetX;
          stateRef.current.currY = stateRef.current.targetY;
          stateRef.current.prevX = stateRef.current.targetX;
          stateRef.current.prevY = stateRef.current.targetY;
          stateRef.current.trailX = stateRef.current.targetX;
          stateRef.current.trailY = stateRef.current.targetY;
        }
        stateRef.current.isNear = true;
        startLoop();
      } else {
        if (stateRef.current.isNear) {
          stateRef.current.isNear = false;
        }
      }
    };

    const handlePointerLeave = () => {
      stateRef.current.isNear = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [dispMapId]);

  const handlePointerDown = () => {
    stateRef.current.impulseRadius = 16;
    stateRef.current.impulseOpacity = 0.85;
    clickPulseRef.current = 24;
  };

  return (
    <div
      ref={fieldRef}
      className="hero-liquid-field"
      onPointerDown={handlePointerDown}
      onClick={handlePointerDown}
    >
      {/* Base crisp typography */}
      <div className={`hero-liquid-copy hero-liquid-copy--base ${className}`}>
        {renderLines()}
      </div>

      {/* Viscous trailing secondary liquid droplet wake */}
      <span className="hero-liquid-trail" aria-hidden="true" />

      {/* Concentric liquid surface touch wave rings */}
      <span className="hero-liquid-wave hero-liquid-wave--inner" aria-hidden="true" />
      <span className="hero-liquid-wave hero-liquid-wave--mid" aria-hidden="true" />
      <span className="hero-liquid-wave hero-liquid-wave--outer" aria-hidden="true" />

      {/* Interactive touch impulse shockwave */}
      <span className="hero-liquid-impulse-wave" aria-hidden="true" />

      {/* Main liquid refraction droplet cursor with meniscus caustics */}
      <span className="hero-liquid-cursor" aria-hidden="true">
        <span className="hero-liquid-specular" aria-hidden="true" />
      </span>

      {/* Distorted liquid refraction layer with chromatic aberration & smooth feathered mask */}
      <div
        className={`hero-liquid-copy hero-liquid-copy--distorted ${className}`}
        style={{ filter: `url(#${filterId})` }}
        aria-hidden="true"
      >
        {renderLines()}
      </div>
    </div>
  );
};
