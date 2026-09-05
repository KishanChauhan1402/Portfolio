import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative z-20 bg-[var(--bg-main,#080808)] py-24 sm:py-36 md:py-48 px-5 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
              <span className="text-[var(--primary-accent,#0055ff)] font-bold">04</span>
              <span>— METHODOLOGY</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight uppercase text-[#f4f0ea]">
              HOW I WORK
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-widest text-neutral-400">
            A LINEAR ITERATIVE CYCLE
          </div>
        </div>

        {/* Process Step Navigation / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 sm:p-5 rounded border transition-all duration-300 ${
                  isSelected
                    ? 'border-[var(--primary-accent,#0055ff)] bg-white/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/25 hover:text-[#f4f0ea]'
                }`}
              >
                <div className="font-mono text-xs text-neutral-500 mb-2">
                  {step.step}
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight">
                  {step.name}
                </div>
                <div className="mt-2 w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                  {isSelected && (
                    <motion.div
                      layoutId="stepActiveLine"
                      className="w-full h-full bg-[var(--primary-accent,#0055ff)]"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Display */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-12 rounded-lg bg-white/[0.02] border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14"
        >
          <div className="md:col-span-4 font-mono space-y-4">
            <div className="text-4xl sm:text-6xl font-display font-black text-[var(--primary-accent,#0055ff)]">
              STAGE {PROCESS_STEPS[activeStep].step}
            </div>
            <div className="text-sm font-semibold uppercase tracking-widest text-white">
              {PROCESS_STEPS[activeStep].summary}
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="font-body text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {PROCESS_STEPS[activeStep].description}
            </p>

            <div className="pt-4 border-t border-white/10">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                KEY ACTIVITIES & ARTIFACTS:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROCESS_STEPS[activeStep].activities.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-mono text-neutral-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent,#0055ff)]" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
