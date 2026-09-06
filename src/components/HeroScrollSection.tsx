import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Compass } from 'lucide-react';
import { HeroLiquidText } from './HeroLiquidText';

export const HeroScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress across this 280vh sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring physics for silky 60fps interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. Initial Hero Phrase Transforms
  // Phase 1 (0 to 0.45): "I DESIGN WHAT IDEAS BECOME" zooms in massively
  const phraseScale = useTransform(smoothProgress, [0, 0.35, 0.5], [1, 5.5, 14]);
  const phraseOpacity = useTransform(smoothProgress, [0, 0.25, 0.42], [1, 0.85, 0]);
  const phraseZIndex = useTransform(smoothProgress, (v) => (v > 0.4 ? 10 : 30));
  const phraseTracking = useTransform(smoothProgress, [0, 0.35], ['-0.02em', '0.15em']);
  const phrasePointerEvents = useTransform(phraseOpacity, (v) => (v > 0.08 ? 'auto' : 'none'));

  // 2. Name Reveal Phase (0.35 to 0.85): "KISHAN CHAUHAN" expands across the viewport
  const nameScale = useTransform(smoothProgress, [0.35, 0.65, 0.9], [0.65, 1.1, 3.8]);
  const nameOpacity = useTransform(smoothProgress, [0.35, 0.5, 0.75, 0.92], [0, 1, 0.95, 0]);
  const nameY = useTransform(smoothProgress, [0.35, 0.65, 0.9], ['40px', '0px', '-40px']);
  const namePointerEvents = useTransform(nameOpacity, (v) => (v > 0.08 ? 'auto' : 'none'));

  // Meta elements fade out early
  const metaOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const metaY = useTransform(smoothProgress, [0, 0.15], [0, -30]);

  // Ambient electric blue lighting pulse
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.4, 1.8]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [0.4, 0.7, 0.3]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[260vh] md:h-[280vh] w-full bg-[var(--bg-main,#06070e)] select-none"
    >

      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Grain & Deep Vignette */}
        <div className="absolute inset-0 pointer-events-none grain-overlay z-40 opacity-30" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-main,#06070e)_85%)] z-20" />

        {/* 01. Initial Zooming Typography Sequence */}
        <motion.div
          style={{
            scale: phraseScale,
            opacity: phraseOpacity,
            zIndex: phraseZIndex,
            letterSpacing: phraseTracking,
            pointerEvents: phrasePointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <HeroLiquidText
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[6.5vw] tracking-tighter uppercase text-[#f4f0ea] flex flex-col gap-1 sm:gap-2 leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            lines={[
              { text: 'I TURN' },
              { text: 'COMPLEX IDEAS', className: 'text-neutral-300' },
              { text: 'INTO DIGITAL', className: 'text-[var(--primary-accent,#9333ea)]' },
              { text: 'EXPERIENCES.', className: 'text-[var(--primary-accent,#9333ea)]' },
            ]}
          />
        </motion.div>

        {/* 02. Secondary Reveal Phase: Monumental "KISHAN CHAUHAN" Name */}
        <motion.div
          style={{
            scale: nameScale,
            opacity: nameOpacity,
            y: nameY,
            pointerEvents: namePointerEvents,
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4"
        >
          <HeroLiquidText
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10vw] tracking-tighter uppercase text-[#f4f0ea] flex flex-col gap-1 sm:gap-2 leading-none"
            lines={[
              { text: 'KISHAN', className: 'text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]' },
              { text: 'CHAUHAN', className: 'text-[var(--primary-accent,#9333ea)]' },
            ]}
          />
          <div className="mt-5 md:mt-8 font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-neutral-400 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-xl">
            <span>UI/UX DESIGNER</span>
            <span className="text-[var(--primary-accent,#9333ea)]">•</span>
            <span>PRODUCT DESIGNER</span>
            <span className="text-[var(--primary-accent,#9333ea)]">•</span>
            <span>CREATIVE DEVELOPER</span>
          </div>
        </motion.div>

        {/* 04. Top/Bottom Static Meta Labels (Visible on First Screen) */}
        <motion.div
          style={{ opacity: metaOpacity, y: metaY }}
          className="absolute top-24 left-6 sm:left-12 z-30 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 max-w-[240px] leading-relaxed hidden sm:block"
        >
          <div className="flex items-center gap-2 text-white font-semibold mb-1">
            <Compass className="w-3.5 h-3.5 text-[var(--primary-accent,#9333ea)]" />
            <span>KISHAN CHAUHAN</span>
          </div>
          <p className="text-neutral-400">
            Digital Craft, Editorial Interfaces & Product Design
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: metaOpacity, y: metaY }}
          className="absolute top-24 right-6 sm:right-12 z-30 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 text-right hidden sm:block"
        >
          <div className="text-neutral-300">2026 PORTFOLIO</div>
          <div className="text-[var(--primary-accent,#9333ea)] font-semibold">VOLUME 04 / ARCHIVE</div>
        </motion.div>

        {/* Bottom Hero Indicators: Sub-roles & Scroll Prompt */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute bottom-8 sm:bottom-12 inset-x-6 sm:inset-x-12 z-30 flex items-end justify-between pointer-events-none"
        >
          <div className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-400 uppercase space-y-1">
            <div className="text-neutral-200">DIGITAL PRODUCT DESIGN</div>
            <div className="text-neutral-500">INTERACTION & SPATIAL SYSTEMS</div>
          </div>

          <div className="flex flex-col items-center gap-2 font-mono text-[10px] sm:text-xs tracking-widest uppercase text-neutral-400">
            <span className="text-[var(--primary-accent,#9333ea)] animate-pulse">SCROLL TO EXPLORE</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1.5 rounded-full bg-[var(--primary-accent,#9333ea)]"
              />
            </div>
          </div>

          <div className="hidden sm:block font-mono text-[10px] sm:text-xs tracking-widest text-neutral-400 text-right uppercase">
            <div>28°36' N, 77°12' E</div>
            <div className="text-neutral-500">NEW DELHI, IN</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
