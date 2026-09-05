import React from 'react';

export const MarqueeSection: React.FC = () => {
  const words = [
    'DESIGN',
    'PRODUCT',
    'INTERACTION',
    'VISUAL',
    'TECHNOLOGY',
    'IDEAS',
    'SYSTEMS',
    'CRAFT',
    'TYPOGRAPHY',
    'KINETIC',
  ];

  return (
    <section className="relative z-20 py-10 sm:py-14 bg-[var(--bg-main,#080808)] border-y border-white/[0.06] overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First track */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-neutral-600 opacity-60 hover:opacity-100 transition-opacity">
          {words.map((word, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-[var(--primary-accent,#0055ff)] transition-colors">{word}</span>
              <span className="text-[var(--primary-accent,#0055ff)] text-2xl sm:text-4xl">•</span>
            </React.Fragment>
          ))}
        </div>

        {/* Second track for seamless infinite scroll */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-neutral-600 opacity-60 hover:opacity-100 transition-opacity pl-8 sm:pl-12">
          {words.map((word, idx) => (
            <React.Fragment key={`dup-${idx}`}>
              <span className="hover:text-[var(--primary-accent,#0055ff)] transition-colors">{word}</span>
              <span className="text-[var(--primary-accent,#0055ff)] text-2xl sm:text-4xl">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
