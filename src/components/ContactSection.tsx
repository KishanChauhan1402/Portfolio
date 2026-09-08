import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, ArrowUpRight, Send, Mail } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emailAddress = 'kishanrc777@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setFormSent(true);
    // Construct mailto link
    const mailto = `mailto:${emailAddress}?subject=Project%20Inquiry%20from%20${encodeURIComponent(
      name || 'Collaborator'
    )}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      className="relative z-20 bg-[var(--bg-main,#080808)] py-24 sm:py-36 md:py-52 px-5 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Minimal Label */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-12 sm:mb-16">
          <span className="text-[var(--primary-accent,#0055ff)] font-bold">07</span>
          <span>— LET'S MAKE SOMETHING</span>
        </div>

        {/* Huge Dramatic Typography */}
        <div className="space-y-2 mb-16 sm:mb-24">
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-bold uppercase tracking-tight text-white leading-[0.88]">
            HAVE AN IDEA?
          </h2>
          <div className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-bold uppercase tracking-tight text-[var(--primary-accent,#0055ff)] leading-[0.88]">
            LET'S TALK.
          </div>
        </div>

        {/* Editorial Contact Details + Quick Inquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/10 pt-12 sm:pt-16">
          {/* Left Column: Direct Links & Email Copy */}
          <div className="lg:col-span-6 space-y-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                DIRECT INQUIRY
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${emailAddress}`}
                  data-cursor="SAY HI"
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white hover:text-[var(--primary-accent,#0055ff)] transition-colors"
                >
                  {emailAddress}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-[var(--primary-accent,#0055ff)]/20 px-3 py-1.5 rounded border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social & Professional Archives */}
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                NETWORK & CHANNELS
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-sm uppercase tracking-wider text-neutral-300">
                {[
                  { name: 'LINKEDIN', url: 'https://linkedin.com/in/kishanchauhan' },
                  { name: 'BEHANCE', url: 'https://behance.net/kishanchauhan' },
                  { name: 'GITHUB', url: 'https://github.com' },
                  { name: 'TWITTER / X', url: 'https://twitter.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 hover:text-[var(--primary-accent,#0055ff)] transition-colors"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="font-body text-sm text-neutral-400 font-light leading-relaxed max-w-md">
              Available for full-time senior product design roles, design system consultancies, and bespoke digital commission work worldwide.
            </div>
          </div>

          {/* Right Column: Quick Project Brief Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-lg bg-white/[0.02] border border-white/10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
              <span>SEND A DIRECT DISPATCH</span>
            </h3>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded bg-[var(--primary-accent,#0055ff)]/10 border border-[var(--primary-accent,#0055ff)]/30 text-center space-y-2"
              >
                <div className="font-display text-2xl uppercase text-white font-bold">
                  MESSAGE READY TO DISPATCH
                </div>
                <p className="font-mono text-xs text-neutral-300">
                  Your mail client has been opened. Thank you for connecting!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-[var(--bg-main,#080808)] border border-white/10 rounded px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--primary-accent,#0055ff)] transition-colors font-body"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-[var(--bg-main,#080808)] border border-white/10 rounded px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--primary-accent,#0055ff)] transition-colors font-body"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    PROJECT SCOPE & TIMELINE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about what you're building, target milestones, and design goals..."
                    className="w-full bg-[var(--bg-main,#080808)] border border-white/10 rounded px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--primary-accent,#0055ff)] transition-colors font-body resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-white bg-[var(--primary-accent,#0055ff)] hover:brightness-110 py-3 rounded transition-all"
                >
                  <span>TRANSMIT INQUIRY</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
