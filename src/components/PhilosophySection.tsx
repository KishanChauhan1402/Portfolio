import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative z-20 bg-[var(--bg-main,#080808)] py-28 sm:py-40 md:py-52 overflow-hidden border-t border-white/[0.06] select-none"
    >

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Marker */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-12 sm:mb-20 text-center flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-white/20" />
          <span>DESIGN PHILOSOPHY</span>
          <span className="w-8 h-[1px] bg-white/20" />
        </div>

        {/* Big Typographic Kinetic Statement */}
        <motion.div
          style={{ opacity }}
          className="flex flex-col items-center justify-center text-center font-display font-black tracking-tight leading-[0.88] uppercase"
        >
          <motion.div
            style={{ x: xLeft }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] text-[#f4f0ea]"
          >
            GOOD DESIGN
          </motion.div>

          <motion.div
            style={{ x: xRight }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] text-neutral-400 hover:text-[var(--primary-accent,#0055ff)] transition-colors py-2"
          >
            MAKES COMPLEXITY
          </motion.div>

          <motion.div
            style={{ x: xLeft }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] text-[var(--primary-accent,#0055ff)]"
          >
            FEEL SIMPLE.
          </motion.div>
        </motion.div>

        {/* Minimal Sub-commentary */}
        <div className="mt-16 sm:mt-24 max-w-xl mx-auto text-center font-body text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
          Simplicity is never the absence of clutter; it is the presence of rigorous intention. We distill interface architecture until every pixel justifies its existence.
        </div>
      </div>
    </section>
  );
};
