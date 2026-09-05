import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[var(--bg-main,#080808)] border-t border-white/[0.08] py-12 sm:py-16 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 text-center md:text-left">
          <div className="text-white font-medium">© 2026 KISHAN CHAUHAN</div>
          <div className="text-[10px] text-neutral-400 mt-1">ALL RIGHTS RESERVED</div>
        </div>

        {/* Center: Rotating Badge + Design statement */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* SVG Circular Text Path */}
            <svg
              className="w-full h-full animate-spin-slow text-[7px] font-mono uppercase tracking-[0.2em] fill-neutral-400"
              viewBox="0 0 100 100"
            >
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text>
                <textPath href="#textPath" startOffset="0%">
                  DESIGN • CREATE • EXPLORE • REPEAT •
                </textPath>
              </text>
            </svg>
            <span className="absolute w-2 h-2 rounded-full bg-[var(--primary-accent,#0055ff)]" />
          </div>

          <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-300">
            DESIGNED + BUILT BY KISHAN
          </div>
        </div>

        {/* Right: Location & Back to Top */}
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
          <div>INDIA • UTC+5:30</div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[var(--primary-accent,#0055ff)] hover:text-white transition-colors"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
