import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CAPABILITIES_DATA } from '../data/portfolioData';

export const ExpertiseSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(CAPABILITIES_DATA[0].id);

  return (
    <section
      id="capabilities"
      className="relative z-20 bg-[var(--bg-main,#080808)] py-24 sm:py-36 md:py-48 px-5 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
              <span className="text-[var(--primary-accent,#0055ff)] font-bold">03</span>
              <span>— EXPERTISE</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight uppercase text-[#f4f0ea]">
              WHAT I DO
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-widest text-neutral-400">
            DISCIPLINES & PRACTICES
          </div>
        </div>

        {/* Editorial Accordion / List */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {CAPABILITIES_DATA.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(item.id)}
                onClick={() => setActiveItem(isActive ? null : item.id)}
                className={`group py-8 sm:py-10 transition-all duration-300 cursor-pointer ${
                  isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  {/* Left Column: Number + Title */}
                  <div className="flex items-baseline gap-6 sm:gap-12">
                    <span className="font-mono text-sm sm:text-base text-neutral-500 group-hover:text-[var(--primary-accent,#0055ff)] transition-colors">
                      {item.number}
                    </span>
                    <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#f4f0ea] group-hover:text-white group-hover:translate-x-2 transition-all">
                      {item.title}
                    </h3>
                  </div>

                  {/* Right Subtitle */}
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 md:text-right">
                    {item.subtitle}
                  </div>
                </div>

                {/* Expanded Editorial Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12 pt-8 sm:pt-10 pl-8 sm:pl-16">
                        <div className="md:col-span-7">
                          <p className="font-body text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-6">
                            {item.deliverables.map((del, i) => (
                              <span
                                key={i}
                                className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded"
                              >
                                {del}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="md:col-span-5 font-mono text-xs space-y-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                          <div className="text-white font-semibold uppercase tracking-widest text-[11px]">
                            PRIMARY TOOLKIT
                          </div>
                          <div className="text-neutral-400 uppercase tracking-wider leading-relaxed">
                            {item.tools.join(' • ')}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
