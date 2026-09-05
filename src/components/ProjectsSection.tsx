import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Plus, Eye } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative z-20 bg-[var(--bg-main,#06070e)] py-24 sm:py-36 md:py-48 px-5 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
              <span className="text-[var(--primary-accent,#9333ea)] font-bold">02</span>
              <span>— SELECTED WORK</span>
            </div>
            <h2 className="font-display text-6xl sm:text-7xl md:text-9xl font-bold tracking-tight uppercase text-[#f4f0ea]">
              SELECTED <br />
              <span className="hover:text-[var(--primary-accent,#9333ea)] transition-colors">WORK</span>
            </h2>
          </div>

          <p className="mt-6 md:mt-0 font-mono text-xs text-neutral-400 max-w-xs leading-relaxed uppercase tracking-wider">
            A curated index of digital systems, interaction architecture, and editorial interfaces built with intent.
          </p>
        </div>

        {/* Vertical Editorial Projects Showcase */}
        <div className="space-y-32 sm:space-y-44 md:space-y-56">
          {PROJECTS_DATA.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Top Project Metadata Strip */}
              <div className="grid grid-cols-12 gap-4 items-baseline font-mono text-xs tracking-widest uppercase text-neutral-400 border-b border-white/10 pb-4 mb-8">
                <div className="col-span-2 sm:col-span-1 font-display text-4xl sm:text-5xl font-bold text-neutral-600 group-hover:text-[var(--primary-accent,#9333ea)] transition-colors">
                  {project.number}
                </div>
                <div className="col-span-10 sm:col-span-5 text-sm sm:text-base font-semibold text-[#f4f0ea]">
                  {project.title}
                </div>
                <div className="col-span-8 sm:col-span-4 text-neutral-400 hidden sm:block">
                  {project.category}
                </div>
                <div className="col-span-4 sm:col-span-2 text-right text-[var(--primary-accent,#9333ea)] font-bold">
                  {project.year}
                </div>
              </div>

              {/* Massive Editorial Project Image Viewport */}
              <div
                onClick={() => setSelectedProject(project)}
                data-cursor="VIEW"
                className="relative rounded-lg overflow-hidden bg-neutral-900 cursor-pointer border border-white/10 group-hover:border-[var(--primary-accent,#9333ea)]/50 transition-all duration-500 shadow-2xl"
              >
                {/* Visual Artwork container with scaling hover animation */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/8] overflow-hidden">
                  <motion.img
                    src={project.heroImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.95] group-hover:scale-[1.03] group-hover:contrast-[1.12] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Ambient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main,#06070e)] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[var(--primary-accent,#9333ea)]/0 group-hover:bg-[var(--primary-accent,#9333ea)]/10 transition-colors duration-500 mix-blend-color-dodge" />
                </div>

                {/* Floating Action Badge */}
                <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 bg-[#06070e]/90 backdrop-blur-md px-4 py-2 rounded border border-white/15 text-xs font-mono text-white group-hover:border-[var(--primary-accent,#9333ea)] group-hover:text-[var(--primary-accent,#9333ea)] transition-all">
                  <span>INSPECT CASE STUDY</span>
                  <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom Editorial Description & Disciplines */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mt-8 items-start">
                <div className="md:col-span-8">
                  <p className="font-body text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col justify-between h-full space-y-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 space-y-1">
                    <div className="text-white font-medium">DISCIPLINES</div>
                    <div>{project.role.join(' • ')}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--primary-accent,#9333ea)] hover:text-white transition-colors self-start"
                  >
                    <span>Read Full Breakdown</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Case Study Modal Detail */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
