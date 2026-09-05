import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'PROCESS', href: '#process' },
    { label: 'PLAYGROUND', href: '#playground' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--bg-main,#06070e)]/85 backdrop-blur-md border-b border-white/[0.06] py-3.5'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand / Name */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="group flex items-center gap-3 text-xs tracking-widest text-[#f4f0ea] uppercase font-mono font-medium transition-colors"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded border border-white/20 text-[#f4f0ea] group-hover:border-[var(--primary-accent,#9333ea)] group-hover:bg-[var(--primary-accent,#9333ea)]/10 group-hover:text-[var(--primary-accent,#9333ea)] transition-all">
              K
            </span>
            <span className="sm:inline opacity-70 group-hover:opacity-100 transition-opacity">
              Kishan Chauhan
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative font-mono text-[11px] uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--primary-accent,#9333ea)] font-semibold'
                      : 'text-neutral-400 hover:text-[#f4f0ea]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[var(--primary-accent,#9333ea)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Direct Email quick-link */}
            <a
              href="mailto:kishanrc777@gmail.com"
              data-cursor="SAY HI"
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-[var(--primary-accent,#9333ea)] px-3 py-1.5 rounded border border-white/10 hover:border-[var(--primary-accent,#9333ea)] transition-all duration-200"
            >
              <span>TALK</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded border border-white/15 text-neutral-300 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[var(--bg-main,#06070e)]/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="font-mono text-sm tracking-widest text-neutral-300 hover:text-[#0055ff] py-2 border-b border-white/5 uppercase"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>kishanrc777@gmail.com</span>
                <span className="text-[#0055ff]">INDIA • IST</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
