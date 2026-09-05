import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroScrollSection } from './components/HeroScrollSection';
import { IntroductionSection } from './components/IntroductionSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ProcessSection } from './components/ProcessSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { AboutSection } from './components/AboutSection';
import { MarqueeSection } from './components/MarqueeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-main,#06070e)] text-[var(--text-main,#f4f0ea)] selection:bg-[var(--primary-accent,#9333ea)] selection:text-white">
      {/* Custom Interactive Follower Cursor for Desktop */}
      <CustomCursor />

      {/* Minimal Fixed Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        {/* 01. Signature Hero with Oil Painting Portrait & Typography Scroll-Zoom */}
        <HeroScrollSection />

        {/* 02. Minimalist Introduction */}
        <IntroductionSection />

        {/* 03. Selected Work (Vertical Editorial Showcase) */}
        <ProjectsSection />

        {/* 04. Design Philosophy Kinetic Typography */}
        <PhilosophySection />

        {/* 05. Expertise & Capabilities */}
        <ExpertiseSection />

        {/* 06. Process & Methodology */}
        <ProcessSection />

        {/* 07. Experimental Playground */}
        <PlaygroundSection />

        {/* 08. About Profile & Principles */}
        <AboutSection />

        {/* 09. Low-contrast Kinetic Marquee */}
        <MarqueeSection />

        {/* 10. Dramatic Contact Section */}
        <ContactSection />
      </main>

      {/* 11. Minimal Footer */}
      <Footer />
    </div>
  );
}
