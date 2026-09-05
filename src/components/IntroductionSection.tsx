import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

export const IntroductionSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="introduction"
      className="relative z-20 bg-[var(--bg-main,#06070e)] py-24 sm:py-32 md:py-44 px-5 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-12 sm:mb-16 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[var(--primary-accent,#9333ea)] font-bold">01</span>
            <span className="text-white/80">— INTRODUCTION</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hidden sm:inline">NEW DELHI, INDIA</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentTime || '06:15 PM IST'}</span>
            </span>
          </div>
        </div>

        {/* Monumental Editorial Statement */}
        <div className="space-y-10 sm:space-y-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.12] tracking-tight text-[#f4f0ea] max-w-5xl"
          >
            I turn ideas into <span className="text-white underline decoration-[var(--primary-accent,#9333ea)] decoration-2 underline-offset-8">clear</span>, <span className="text-white">useful</span> and <span className="text-[var(--primary-accent,#9333ea)]">visually expressive</span> digital experiences.
          </motion.h2>

          {/* Editorial Grid: Paragraph + Designer Core Traits */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-6 sm:pt-8 border-t border-white/[0.06]">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-400 space-y-3">
              <div className="text-white font-medium flex items-center gap-2">
                <ArrowDownRight className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
                <span>DESIGN PARADIGM</span>
              </div>
              <p className="text-neutral-400 normal-case leading-relaxed font-sans text-sm">
                Bridging rigorous product thinking with high-craft aesthetic expression. No templates, no generic SaaS defaults.
              </p>
            </div>

            <div className="md:col-span-8 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-body text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-light"
              >
                I'm <strong className="text-white font-medium">Kishan Chauhan</strong>, a designer focused on digital products, interfaces and visual experiences. I combine product thinking, interaction design and visual craft to transform complex ideas into simple experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap gap-2.5 pt-2"
              >
                {['THINKER', 'CREATOR', 'BUILDER', 'SYSTEMS ARCHITECT'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 border border-white/10 px-3 py-1 rounded bg-white/[0.02]"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
