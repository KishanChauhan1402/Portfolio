import React from 'react';
import { motion } from 'motion/react';
import { PORTRAIT_IMAGE } from '../data/portfolioData';
import { Compass, Sparkles, Award, Globe2, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-20 bg-[var(--bg-main,#080808)] py-24 sm:py-36 md:py-48 px-5 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-16 sm:mb-20 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="text-[var(--primary-accent,#0055ff)] font-bold">06</span>
            <span>— PROFILE & ETHOS</span>
          </div>
          <span>KISHAN CHAUHAN</span>
        </div>

        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait Crop Detail + Quick Facts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={PORTRAIT_IMAGE}
                  alt="Kishan Chauhan Oil Portrait Detail"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.12] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Edge Gradient and label */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main,#080808)] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent,#0055ff)]" />
                  <span>KISHAN CHAUHAN</span>
                </span>
                <span className="text-neutral-400">STUDIO ARCHIVE</span>
              </div>
            </div>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs border border-white/10 p-5 rounded-lg bg-white/[0.02]">
              <div>
                <div className="text-neutral-500 uppercase text-[10px] mb-1">LOCATION</div>
                <div className="text-white font-medium">INDIA • REMOTE</div>
              </div>
              <div>
                <div className="text-neutral-500 uppercase text-[10px] mb-1">EXPERIENCE</div>
                <div className="text-white font-medium">5+ YEARS CRAFT</div>
              </div>
              <div className="pt-2 border-t border-white/5">
                <div className="text-neutral-500 uppercase text-[10px] mb-1">PRIMARY FOCUS</div>
                <div className="text-neutral-300">PRODUCT & UI/UX</div>
              </div>
              <div className="pt-2 border-t border-white/5">
                <div className="text-neutral-500 uppercase text-[10px] mb-1">CODE FLUENCY</div>
                <div className="text-neutral-300">REACT / TS / MOTION</div>
              </div>
            </div>
          </div>

          {/* Right Column: Statement, Story & Principles */}
          <div className="lg:col-span-7 space-y-10">
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight text-[#f4f0ea] leading-[0.9]">
              A DESIGNER <br />
              <span className="hover:text-[var(--primary-accent,#0055ff)] transition-colors">WHO LIKES TO</span> <br />
              <span className="text-[var(--primary-accent,#0055ff)]">MAKE THINGS.</span>
            </h2>

            <div className="space-y-6 font-body text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              <p>
                I work across interface design, visual design and creative technology, exploring how ideas can become useful, expressive and memorable digital experiences.
              </p>
              <p className="text-neutral-400 text-sm sm:text-base">
                My approach synthesizes analytical product architecture with visual depth. Having spent years at the intersection of Figma design files and production codebases, I design with total empathy for system feasibility and typography precision.
              </p>
            </div>

            {/* 3 Core Designer Tenets */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--primary-accent,#0055ff)]">
                CORE WORKING PRINCIPLES
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Typography Is The Architecture',
                    desc: 'Every interface is primarily typography. When hierarchy and rhythm are disciplined, visual noise disappears.'
                  },
                  {
                    title: 'Tactile Motion & Weight',
                    desc: 'Digital objects should possess physical inertia, smooth deceleration, and immediate responsive tactile feedback.'
                  },
                  {
                    title: 'Zero Artificial Friction',
                    desc: 'High design craft must serve the human using it. If an interaction hinders cognitive clarity, it gets rewritten.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="font-mono text-xs text-[var(--primary-accent,#0055ff)] font-bold mt-1">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-headline font-bold text-white text-base">
                        {item.title}
                      </h4>
                      <p className="font-body text-sm text-neutral-400 font-light mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
