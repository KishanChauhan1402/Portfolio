import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ArrowRight, Layers, CheckCircle2, Cpu } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex justify-end">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 cursor-pointer"
        />

        {/* Slide-over Drawer / Modal Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="relative z-10 w-full max-w-3xl min-h-screen bg-[var(--bg-surface,#121214)] border-l border-white/10 p-6 sm:p-10 md:p-14 text-[#f4f0ea] shadow-2xl flex flex-col justify-between"
        >
          {/* Header Controls */}
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 tracking-widest uppercase">
                <span className="text-[var(--primary-accent,#0055ff)] font-bold">CASE STUDY</span>
                <span>/</span>
                <span>PROJECT {project.number}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[var(--primary-accent,#0055ff)] hover:bg-[var(--primary-accent,#0055ff)]/10 transition-colors"
                aria-label="Close case study drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Project Title & Category */}
            <div className="space-y-4 mb-8">
              <div className="font-mono text-xs text-[var(--primary-accent,#0055ff)] tracking-widest uppercase">
                {project.category} • {project.year}
              </div>
              <h2 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-white uppercase leading-[0.9]">
                {project.title}
              </h2>
              <p className="text-lg text-neutral-300 font-light font-body">
                {project.subtitle}
              </p>
            </div>

            {/* Large Hero Artwork in Modal */}
            <div className="relative rounded-lg overflow-hidden border border-white/10 mb-10 group">
              <img
                src={project.heroImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
                <span>EDITORIAL PREVIEW</span>
                <span className="text-[var(--primary-accent,#0055ff)]">HIGH-FIDELITY BUILD</span>
              </div>
            </div>

            {/* Key Metrics / Highlights */}
            {project.stats && (
              <div className="grid grid-cols-3 gap-4 p-5 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-10">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--primary-accent,#0055ff)]">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Case Study Copy */}
            <div className="space-y-8 font-body">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--primary-accent,#0055ff)] mb-2 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>OVERVIEW & VISION</span>
                </h3>
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base font-light">
                  {project.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    THE CHALLENGE
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    THE SOLUTION
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables & Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
                    <span>KEY DELIVERABLES</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs font-mono text-neutral-300">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--primary-accent,#0055ff)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
                    <span>TOOLING & STACK</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] uppercase text-neutral-300 bg-white/[0.05] border border-white/10 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer / Action Links */}
          <div className="pt-10 mt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-xs text-neutral-400">
              ROLE: {project.role.join(' • ')}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-white px-4 py-2"
              >
                Back to projects
              </button>
              <a
                href="mailto:kishanrc777@gmail.com?subject=Project%20Inquiry%20regarding%20"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-[var(--primary-accent,#0055ff)] hover:brightness-110 text-white px-5 py-2.5 rounded transition-all"
              >
                <span>DISCUSS PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
