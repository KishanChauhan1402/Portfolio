import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Type,
  Copy,
  Check,
  RotateCcw,
  Layers,
  Code2,
  Zap,
  Box,
  SlidersVertical,
  CheckCircle2,
  Grid,
  Radio,
  Sparkles,
  AlignVerticalJustifyCenter
} from 'lucide-react';

interface DesignSystemState {
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  displayFont: string;
  bodyFont: string;
  letterSpacing: string;
  lineHeight: string;
  textTransform: 'uppercase' | 'none';
  borderRadius: number;
  borderOpacity: number;
  enableGrain: boolean;
  enableGrid: boolean;
  enableScanlines: boolean;
  applyGlobally: boolean;
}

const PRESET_THEMES = [
  {
    name: 'Cyber Violet',
    subtitle: 'Signature Spatial Edition',
    accentColor: '#9333ea',
    bgColor: '#06070e',
    surfaceColor: '#11111f',
    displayFont: "'Syne', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    letterSpacing: '0.02em',
    lineHeight: '1.06',
    textTransform: 'uppercase' as const,
    borderRadius: 12,
    borderOpacity: 16,
  },
  {
    name: 'Acid Emerald',
    subtitle: 'Algorithmic Technical',
    accentColor: '#10b981',
    bgColor: '#040a06',
    surfaceColor: '#0c1710',
    displayFont: "'JetBrains Mono', monospace",
    bodyFont: "'JetBrains Mono', monospace",
    letterSpacing: '-0.02em',
    lineHeight: '1.08',
    textTransform: 'uppercase' as const,
    borderRadius: 2,
    borderOpacity: 22,
  },
  {
    name: 'Solar Flare',
    subtitle: 'Warm Industrial Minimal',
    accentColor: '#ff5500',
    bgColor: '#0c0705',
    surfaceColor: '#1a100d',
    displayFont: "'Anton', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    letterSpacing: '0.01em',
    lineHeight: '1.02',
    textTransform: 'uppercase' as const,
    borderRadius: 6,
    borderOpacity: 14,
  },
  {
    name: 'Monochrome Noir',
    subtitle: 'Brutalist Swiss Matrix',
    accentColor: '#f4f0ea',
    bgColor: '#000000',
    surfaceColor: '#121212',
    displayFont: "'Archivo Narrow', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    letterSpacing: '0.04em',
    lineHeight: '1.05',
    textTransform: 'uppercase' as const,
    borderRadius: 0,
    borderOpacity: 20,
  },
  {
    name: 'Modern Fuchsia',
    subtitle: 'Editorial Typography',
    accentColor: '#ec4899',
    bgColor: '#090408',
    surfaceColor: '#180c16',
    displayFont: "'Syne', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    letterSpacing: '-0.02em',
    lineHeight: '1.06',
    textTransform: 'none' as const,
    borderRadius: 14,
    borderOpacity: 16,
  },
];

const DISPLAY_FONTS = [
  {
    label: 'Syne (Futuristic Geometric)',
    value: "'Syne', sans-serif",
    defaultSpacing: '0.02em',
    defaultLineHeight: '1.06',
  },
  {
    label: 'Bebas Neue (Monumental Display)',
    value: "'Bebas Neue', 'Anton', sans-serif",
    defaultSpacing: '-0.02em',
    defaultLineHeight: '1.02',
  },
  {
    label: 'Anton (Heavy Impact)',
    value: "'Anton', sans-serif",
    defaultSpacing: '0.01em',
    defaultLineHeight: '1.02',
  },
  {
    label: 'Archivo Narrow (Editorial Swiss)',
    value: "'Archivo Narrow', sans-serif",
    defaultSpacing: '0.03em',
    defaultLineHeight: '1.05',
  },
  {
    label: 'JetBrains Mono (Technical Spec)',
    value: "'JetBrains Mono', monospace",
    defaultSpacing: '-0.02em',
    defaultLineHeight: '1.08',
  },
  {
    label: 'Manrope (Clean Grotesk)',
    value: "'Manrope', sans-serif",
    defaultSpacing: '-0.02em',
    defaultLineHeight: '1.08',
  },
];

const BODY_FONTS = [
  { label: 'Manrope (Modern Humanist Sans)', value: "'Manrope', sans-serif" },
  { label: 'JetBrains Mono (Technical Monospace)', value: "'JetBrains Mono', monospace" },
  { label: 'System UI Sans', value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
];

const ACCENT_SWATCHES = [
  '#9333ea', // Electric Violet
  '#a855f7', // Vivid Purple
  '#3b82f6', // Bright Sky
  '#0055ff', // Cobalt
  '#10b981', // Emerald
  '#a3e635', // Acid Lime
  '#ff5500', // Solar Orange
  '#ec4899', // Hyper Pink
  '#f59e0b', // Amber Gold
  '#f4f0ea', // Minimal White
];

const BG_SWATCHES = [
  { label: 'Deep Midnight', value: '#06070e', surface: '#11111f' },
  { label: 'Void Black', value: '#000000', surface: '#0f0f11' },
  { label: 'Obsidian Deep', value: '#080808', surface: '#121214' },
  { label: 'Studio Slate', value: '#0c0f17', surface: '#141a29' },
  { label: 'Dark Charcoal', value: '#121214', surface: '#1c1c21' },
];

export const PlaygroundSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'palette' | 'type' | 'surfaces' | 'export'>('palette');
  const [copied, setCopied] = useState(false);
  const [activeDemoState, setActiveDemoState] = useState<'default' | 'active' | 'success'>('default');
  const [toggleState, setToggleState] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState('Overview');

  const defaultState: DesignSystemState = {
    accentColor: '#9333ea',
    bgColor: '#06070e',
    surfaceColor: '#11111f',
    displayFont: "'Syne', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    letterSpacing: '0.02em',
    lineHeight: '1.06',
    textTransform: 'uppercase',
    borderRadius: 12,
    borderOpacity: 16,
    enableGrain: true,
    enableGrid: false,
    enableScanlines: false,
    applyGlobally: true,
  };

  const [system, setSystem] = useState<DesignSystemState>(defaultState);

  // Helper to convert hex to rgb triplet
  const hexToRgb = (hex: string): string => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16);
      const g = parseInt(cleanHex[1] + cleanHex[1], 16);
      const b = parseInt(cleanHex[2] + cleanHex[2], 16);
      return `${r}, ${g}, ${b}`;
    }
    if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    return '0, 85, 255';
  };

  // Synchronize CSS custom properties directly to document root and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (system.applyGlobally) {
      root.style.setProperty('--primary-accent', system.accentColor);
      root.style.setProperty('--primary-accent-rgb', hexToRgb(system.accentColor));
      root.style.setProperty('--bg-main', system.bgColor);
      root.style.setProperty('--bg-surface', system.surfaceColor);
      root.style.setProperty('--font-display', system.displayFont);
      root.style.setProperty('--font-headline', system.displayFont.includes('Syne') ? "'Syne', sans-serif" : system.displayFont);
      root.style.setProperty('--font-body', system.bodyFont);
      root.style.setProperty('--heading-letter-spacing', system.letterSpacing);
      root.style.setProperty('--heading-line-height', system.lineHeight);
      root.style.setProperty('--heading-transform', system.textTransform);
      root.style.setProperty('--radius-ui', `${system.borderRadius}px`);
      root.style.setProperty('--border-color', `rgba(255, 255, 255, ${system.borderOpacity / 100})`);

      body.style.backgroundColor = system.bgColor;
      body.style.fontFamily = system.bodyFont;

      if (system.enableGrid) {
        body.classList.add('grid-overlay');
      } else {
        body.classList.remove('grid-overlay');
      }

      if (system.enableScanlines) {
        body.classList.add('scanline-overlay');
      } else {
        body.classList.remove('scanline-overlay');
      }
    } else {
      // Revert globals
      root.style.setProperty('--primary-accent', defaultState.accentColor);
      root.style.setProperty('--primary-accent-rgb', hexToRgb(defaultState.accentColor));
      root.style.setProperty('--bg-main', defaultState.bgColor);
      root.style.setProperty('--bg-surface', defaultState.surfaceColor);
      root.style.setProperty('--font-display', defaultState.displayFont);
      root.style.setProperty('--font-headline', "'Syne', sans-serif");
      root.style.setProperty('--font-body', defaultState.bodyFont);
      root.style.setProperty('--heading-letter-spacing', defaultState.letterSpacing);
      root.style.setProperty('--heading-line-height', defaultState.lineHeight);
      root.style.setProperty('--heading-transform', defaultState.textTransform);
      root.style.setProperty('--radius-ui', `${defaultState.borderRadius}px`);
      root.style.setProperty('--border-color', `rgba(255, 255, 255, ${defaultState.borderOpacity / 100})`);

      body.style.backgroundColor = defaultState.bgColor;
      body.style.fontFamily = defaultState.bodyFont;
      body.classList.remove('grid-overlay');
      body.classList.remove('scanline-overlay');
    }
  }, [system]);

  const handleApplyPreset = (preset: typeof PRESET_THEMES[0]) => {
    setSystem((prev) => ({
      ...prev,
      accentColor: preset.accentColor,
      bgColor: preset.bgColor,
      surfaceColor: preset.surfaceColor,
      displayFont: preset.displayFont,
      bodyFont: preset.bodyFont,
      letterSpacing: preset.letterSpacing,
      lineHeight: preset.lineHeight,
      textTransform: preset.textTransform,
      borderRadius: preset.borderRadius,
      borderOpacity: preset.borderOpacity,
    }));
  };

  const handleSelectFont = (font: typeof DISPLAY_FONTS[0]) => {
    setSystem((prev) => ({
      ...prev,
      displayFont: font.value,
      letterSpacing: font.defaultSpacing,
      lineHeight: font.defaultLineHeight,
    }));
  };

  const handleReset = () => {
    setSystem(defaultState);
  };

  const generateTokensCSS = () => {
    return `:root {
  --primary-accent: ${system.accentColor};
  --primary-accent-rgb: ${hexToRgb(system.accentColor)};
  --bg-main: ${system.bgColor};
  --bg-surface: ${system.surfaceColor};
  --font-display: ${system.displayFont};
  --font-body: ${system.bodyFont};
  --heading-letter-spacing: ${system.letterSpacing};
  --heading-line-height: ${system.lineHeight};
  --heading-transform: ${system.textTransform};
  --radius-ui: ${system.borderRadius}px;
  --border-color: rgba(255, 255, 255, ${system.borderOpacity / 100});
}`;
  };

  const handleCopyTokens = () => {
    navigator.clipboard.writeText(generateTokensCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="playground"
      className="relative z-20 bg-[var(--bg-main,#080808)] py-20 sm:py-28 md:py-36 px-5 sm:px-8 border-t border-white/[0.08] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 border-b border-white/[0.08] pb-6 gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2.5">
              <span className="text-[var(--primary-accent,#0055ff)] font-bold flex items-center gap-1.5">
                <SlidersVertical className="w-3.5 h-3.5" />
                05
              </span>
              <span>— DESIGN SYSTEM PLAYBOOK</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-[#f4f0ea]">
              COMPONENT PLAYBOOK
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Global Sync Toggle Button */}
            <button
              type="button"
              onClick={() => setSystem((prev) => ({ ...prev, applyGlobally: !prev.applyGlobally }))}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all border ${
                system.applyGlobally
                  ? 'bg-[var(--primary-accent,#0055ff)]/15 border-[var(--primary-accent,#0055ff)]/40 text-[#f4f0ea]'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  system.applyGlobally
                    ? 'bg-[var(--primary-accent,#0055ff)] animate-pulse'
                    : 'bg-neutral-500'
                }`}
              />
              <span>{system.applyGlobally ? 'APPLIED GLOBALLY' : 'LOCAL SANDBOX'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs tracking-wider text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* 1-Click Theme Preset Gallery */}
        <div className="mb-10">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
            <span>INSTANT THEME RECIPES</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PRESET_THEMES.map((theme) => {
              const isSelected =
                system.accentColor.toLowerCase() === theme.accentColor.toLowerCase() &&
                system.bgColor === theme.bgColor;
              return (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => handleApplyPreset(theme)}
                  className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'border-[var(--primary-accent,#0055ff)] bg-white/[0.08]'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent,#0055ff)]" />
                    )}
                  </div>
                  <div className="font-mono text-xs font-semibold text-[#f4f0ea] truncate">
                    {theme.name}
                  </div>
                  <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider truncate">
                    {theme.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Split: Playbook Form & Live Component Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Playbook Controls Form (5 cols) */}
          <div className="lg:col-span-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5 sm:p-6 shadow-2xl">
            {/* Form Navigation Tabs */}
            <div className="flex items-center gap-1 border-b border-white/10 pb-3 mb-6 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('palette')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === 'palette'
                    ? 'bg-[var(--primary-accent,#0055ff)] text-white font-medium shadow-md'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>COLORS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('type')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === 'type'
                    ? 'bg-[var(--primary-accent,#0055ff)] text-white font-medium shadow-md'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>TYPOGRAPHY</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('surfaces')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === 'surfaces'
                    ? 'bg-[var(--primary-accent,#0055ff)] text-white font-medium shadow-md'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>SURFACES</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('export')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === 'export'
                    ? 'bg-[var(--primary-accent,#0055ff)] text-white font-medium shadow-md'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>EXPORT</span>
              </button>
            </div>

            {/* TAB 1: Colors & Canvas */}
            {activeTab === 'palette' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Accent Color Picker & Swatches */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="font-mono text-xs text-neutral-300 uppercase tracking-wider">
                      Primary Accent Color
                    </label>
                    <span className="font-mono text-xs text-[var(--primary-accent,#0055ff)] font-semibold uppercase">
                      {system.accentColor}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {ACCENT_SWATCHES.map((hex) => (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => setSystem((prev) => ({ ...prev, accentColor: hex }))}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          system.accentColor.toLowerCase() === hex.toLowerCase()
                            ? 'scale-110 border-white ring-2 ring-[var(--primary-accent,#0055ff)]'
                            : 'border-white/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                    {/* Custom HTML Color Input */}
                    <label className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center cursor-pointer overflow-hidden bg-white/10 hover:bg-white/20 relative">
                      <Palette className="w-3.5 h-3.5 text-neutral-300" />
                      <input
                        type="color"
                        value={system.accentColor}
                        onChange={(e) =>
                          setSystem((prev) => ({ ...prev, accentColor: e.target.value }))
                        }
                        className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                      />
                    </label>
                  </div>
                </div>

                {/* Background Atmosphere Swatches */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="font-mono text-xs text-neutral-300 uppercase tracking-wider">
                      Background Canvas Tone
                    </label>
                    <span className="font-mono text-xs text-neutral-400 uppercase">
                      {system.bgColor}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {BG_SWATCHES.map((bg) => (
                      <button
                        key={bg.value}
                        type="button"
                        onClick={() =>
                          setSystem((prev) => ({
                            ...prev,
                            bgColor: bg.value,
                            surfaceColor: bg.surface,
                          }))
                        }
                        className={`p-2 rounded border font-mono text-[11px] text-left flex items-center gap-2 transition-all ${
                          system.bgColor === bg.value
                            ? 'border-[var(--primary-accent,#0055ff)] bg-white/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded border border-white/20"
                          style={{ backgroundColor: bg.value }}
                        />
                        <span className="truncate">{bg.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wireframe Border Contrast Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-mono text-xs text-neutral-300 uppercase tracking-wider">
                      Wireframe Border Contrast
                    </label>
                    <span className="font-mono text-xs text-[var(--primary-accent,#0055ff)]">
                      {system.borderOpacity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="35"
                    value={system.borderOpacity}
                    onChange={(e) =>
                      setSystem((prev) => ({ ...prev, borderOpacity: Number(e.target.value) }))
                    }
                    className="w-full accent-[var(--primary-accent,#0055ff)] cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                </div>
              </motion.div>
            )}

            {/* TAB 2: Typography */}
            {activeTab === 'type' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Display Heading Font Family */}
                <div>
                  <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-2">
                    Display Headline Font
                  </label>
                  <div className="space-y-1.5">
                    {DISPLAY_FONTS.map((font) => (
                      <button
                        key={font.value}
                        type="button"
                        onClick={() => handleSelectFont(font)}
                        className={`w-full p-2.5 rounded border text-left font-mono text-xs transition-all flex items-center justify-between ${
                          system.displayFont === font.value
                            ? 'border-[var(--primary-accent,#0055ff)] bg-[var(--primary-accent,#0055ff)]/10 text-white font-medium'
                            : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                        {system.displayFont === font.value && (
                          <Check className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Height Calibration (Consistent Across All Fonts) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-mono text-xs text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlignVerticalJustifyCenter className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
                      <span>Headline Line-Height</span>
                    </label>
                    <span className="font-mono text-xs text-[var(--primary-accent,#0055ff)] font-semibold">
                      {system.lineHeight}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[
                      { label: 'Compact', val: '1.0' },
                      { label: 'Optimal', val: '1.05' },
                      { label: 'Relaxed', val: '1.14' },
                      { label: 'Open', val: '1.24' },
                    ].map((lh) => (
                      <button
                        key={lh.val}
                        type="button"
                        onClick={() => setSystem((prev) => ({ ...prev, lineHeight: lh.val }))}
                        className={`py-1.5 rounded border font-mono text-[10px] uppercase transition-all ${
                          system.lineHeight === lh.val
                            ? 'border-[var(--primary-accent,#0055ff)] bg-white/10 text-white'
                            : 'border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {lh.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body Font Family */}
                <div>
                  <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-2">
                    Body & Interface Font
                  </label>
                  <div className="space-y-1.5">
                    {BODY_FONTS.map((bFont) => (
                      <button
                        key={bFont.value}
                        type="button"
                        onClick={() => setSystem((prev) => ({ ...prev, bodyFont: bFont.value }))}
                        className={`w-full p-2 rounded border text-left font-mono text-xs transition-all flex items-center justify-between ${
                          system.bodyFont === bFont.value
                            ? 'border-[var(--primary-accent,#0055ff)] bg-[var(--primary-accent,#0055ff)]/10 text-white font-medium'
                            : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span style={{ fontFamily: bFont.value }}>{bFont.label}</span>
                        {system.bodyFont === bFont.value && (
                          <Check className="w-3.5 h-3.5 text-[var(--primary-accent,#0055ff)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Letter Spacing Tracking */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-mono text-xs text-neutral-300 uppercase tracking-wider">
                      Headline Letter Spacing
                    </label>
                    <span className="font-mono text-xs text-[var(--primary-accent,#0055ff)]">
                      {system.letterSpacing}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Tight', val: '-0.03em' },
                      { label: 'Standard', val: '-0.01em' },
                      { label: 'Wide', val: '0.04em' },
                      { label: 'Ultra', val: '0.10em' },
                    ].map((sp) => (
                      <button
                        key={sp.val}
                        type="button"
                        onClick={() => setSystem((prev) => ({ ...prev, letterSpacing: sp.val }))}
                        className={`py-1.5 rounded border font-mono text-[10px] uppercase transition-all ${
                          system.letterSpacing === sp.val
                            ? 'border-[var(--primary-accent,#0055ff)] bg-white/10 text-white'
                            : 'border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Transform Toggle */}
                <div>
                  <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-2">
                    Typography Casing
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSystem((prev) => ({ ...prev, textTransform: 'uppercase' }))}
                      className={`p-2 rounded border font-mono text-xs transition-all ${
                        system.textTransform === 'uppercase'
                          ? 'border-[var(--primary-accent,#0055ff)] bg-white/10 text-white'
                          : 'border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      UPPERCASE (ALL CAPS)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSystem((prev) => ({ ...prev, textTransform: 'none' }))}
                      className={`p-2 rounded border font-mono text-xs transition-all ${
                        system.textTransform === 'none'
                          ? 'border-[var(--primary-accent,#0055ff)] bg-white/10 text-white'
                          : 'border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      Natural Sentence Case
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: Surfaces & Geometry */}
            {activeTab === 'surfaces' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Border Radius Presets */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-mono text-xs text-neutral-300 uppercase tracking-wider">
                      Corner Curvature Radius
                    </label>
                    <span className="font-mono text-xs text-[var(--primary-accent,#0055ff)]">
                      {system.borderRadius}px
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 mb-3">
                    {[
                      { label: 'Sharp', val: 0 },
                      { label: 'Micro', val: 4 },
                      { label: 'Smooth', val: 8 },
                      { label: 'Fluid', val: 16 },
                      { label: 'Pill', val: 99 },
                    ].map((rad) => (
                      <button
                        key={rad.val}
                        type="button"
                        onClick={() => setSystem((prev) => ({ ...prev, borderRadius: rad.val }))}
                        className={`p-2 border font-mono text-[10px] uppercase transition-all ${
                          system.borderRadius === rad.val
                            ? 'border-[var(--primary-accent,#0055ff)] bg-white/10 text-white'
                            : 'border-white/10 text-neutral-400 hover:text-white'
                        }`}
                        style={{ borderRadius: `${Math.min(rad.val, 16)}px` }}
                      >
                        {rad.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="28"
                    value={system.borderRadius}
                    onChange={(e) =>
                      setSystem((prev) => ({ ...prev, borderRadius: Number(e.target.value) }))
                    }
                    className="w-full accent-[var(--primary-accent,#0055ff)] cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                {/* Overlays */}
                <div>
                  <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-2.5">
                    Background Overlays
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSystem((prev) => ({ ...prev, enableGrid: !prev.enableGrid }))
                      }
                      className={`w-full p-2.5 rounded border text-left font-mono text-xs flex items-center justify-between transition-all ${
                        system.enableGrid
                          ? 'border-[var(--primary-accent,#0055ff)] bg-[var(--primary-accent,#0055ff)]/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Grid className="w-3.5 h-3.5" />
                        <span>Blueprint Matrix Grid Overlay</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold">
                        {system.enableGrid ? 'ACTIVE' : 'OFF'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSystem((prev) => ({ ...prev, enableScanlines: !prev.enableScanlines }))
                      }
                      className={`w-full p-2.5 rounded border text-left font-mono text-xs flex items-center justify-between transition-all ${
                        system.enableScanlines
                          ? 'border-[var(--primary-accent,#0055ff)] bg-[var(--primary-accent,#0055ff)]/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Radio className="w-3.5 h-3.5" />
                        <span>CRT / Cyber Scanlines</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold">
                        {system.enableScanlines ? 'ACTIVE' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: Export & Tokens */}
            {activeTab === 'export' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-neutral-300 uppercase tracking-wider">
                    Generated CSS Tokens
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyTokens}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--primary-accent,#0055ff)] text-white font-mono text-xs hover:brightness-110 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'COPIED!' : 'COPY CSS'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-neutral-300 overflow-x-auto leading-relaxed max-h-[260px] no-scrollbar">
                  <pre>{generateTokensCSS()}</pre>
                </div>

                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  These tokens dynamically power every section, typography hierarchy, and UI surface on this website.
                </p>
              </motion.div>
            )}
          </div>

          {/* Column 2: Live Interactive Component Test-Bed (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Specimen 01: Typographic Billboard Test */}
            <div
              className="p-6 sm:p-8 border transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderColor: `rgba(255, 255, 255, ${system.borderOpacity / 100})`,
                borderRadius: `${system.borderRadius}px`,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                  <Type className="w-3 h-3 text-[var(--primary-accent,#0055ff)]" />
                  SPECIMEN 01 • DISPLAY TYPOGRAPHY
                </span>
                <span className="font-mono text-[10px] text-[var(--primary-accent,#0055ff)] uppercase font-semibold">
                  LIVE RENDER
                </span>
              </div>

              <div
                className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f4f0ea] mb-3"
                style={{
                  fontFamily: system.displayFont,
                  letterSpacing: system.letterSpacing,
                  lineHeight: system.lineHeight,
                  textTransform: system.textTransform,
                }}
              >
                <span>SURFACES</span>{' '}
                <span style={{ color: system.accentColor }}>& SYSTEMS</span>
              </div>

              <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-wider">
                Precision typography system responding in real time to variable letterforms, line-heights, and spacing.
              </p>
            </div>

            {/* Specimen 02: Interactive Buttons & Badges */}
            <div
              className="p-6 sm:p-8 border transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderColor: `rgba(255, 255, 255, ${system.borderOpacity / 100})`,
                borderRadius: `${system.borderRadius}px`,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                  <Box className="w-3 h-3 text-[var(--primary-accent,#0055ff)]" />
                  SPECIMEN 02 • INTERACTIVE ACTION BUTTONS
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase">
                  CLICK TO TEST
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                {/* Primary Solid Action Button */}
                <button
                  type="button"
                  onClick={() => setActiveDemoState(activeDemoState === 'success' ? 'default' : 'success')}
                  className="px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-semibold transition-all hover:brightness-110 active:scale-95 flex items-center gap-2 text-white"
                  style={{
                    backgroundColor: system.accentColor,
                    borderRadius: `${system.borderRadius}px`,
                  }}
                >
                  {activeDemoState === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                  <span>{activeDemoState === 'success' ? 'DEPLOYED' : 'PRIMARY ACTION'}</span>
                </button>

                {/* Secondary Glass Button */}
                <button
                  type="button"
                  className="px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-200 hover:text-white bg-white/10 hover:bg-white/15 transition-all border border-white/10"
                  style={{ borderRadius: `${system.borderRadius}px` }}
                >
                  SECONDARY GLASS
                </button>

                {/* Outline Ghost Button */}
                <button
                  type="button"
                  className="px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all hover:bg-white/5"
                  style={{
                    borderColor: system.accentColor,
                    borderWidth: '1px',
                    color: system.accentColor,
                    borderRadius: `${system.borderRadius}px`,
                  }}
                >
                  OUTLINE GHOST
                </button>
              </div>

              {/* Status Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/5">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] tracking-wider uppercase font-semibold"
                  style={{
                    backgroundColor: `${system.accentColor}20`,
                    color: system.accentColor,
                    borderColor: `${system.accentColor}40`,
                    borderWidth: '1px',
                    borderRadius: `${system.borderRadius}px`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: system.accentColor }}
                  />
                  <span>REALTIME SYSTEM ACTIVE</span>
                </span>

                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] uppercase text-neutral-300 bg-white/5 border border-white/10"
                  style={{ borderRadius: `${system.borderRadius}px` }}
                >
                  <span>LATENCY</span>
                  <span style={{ color: system.accentColor }}>12MS</span>
                </span>

                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] uppercase text-neutral-300 bg-white/5 border border-white/10"
                  style={{ borderRadius: `${system.borderRadius}px` }}
                >
                  <span>TOKENS</span>
                  <span style={{ color: system.accentColor }}>100% OK</span>
                </span>
              </div>
            </div>

            {/* Specimen 03: Live Form Controls & Metric Tile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Segmented Control & Live Input */}
              <div
                className="p-5 border transition-all duration-300 flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: `rgba(255, 255, 255, ${system.borderOpacity / 100})`,
                  borderRadius: `${system.borderRadius}px`,
                }}
              >
                <div className="mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-3">
                    SEGMENTED TABS
                  </span>
                  
                  {/* Segmented Control */}
                  <div className="flex p-1 bg-black/40 border border-white/10 rounded-lg">
                    {['Overview', 'Tokens', 'Specs'].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setSelectedSegment(tab)}
                        className={`flex-1 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${
                          selectedSegment === tab
                            ? 'bg-white/15 text-white font-semibold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                        style={{
                          borderRadius: `${Math.max(2, system.borderRadius - 4)}px`,
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Toggle Switch */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="font-mono text-xs text-neutral-300">
                    High-Contrast Mode
                  </span>
                  <button
                    type="button"
                    onClick={() => setToggleState(!toggleState)}
                    className="w-11 h-6 rounded-full transition-colors relative p-0.5"
                    style={{
                      backgroundColor: toggleState ? system.accentColor : 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <motion.div
                      animate={{ x: toggleState ? 20 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-white shadow"
                    />
                  </button>
                </div>
              </div>

              {/* Metric Stat Tile */}
              <div
                className="p-5 border transition-all duration-300 flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: `rgba(255, 255, 255, ${system.borderOpacity / 100})`,
                  borderRadius: `${system.borderRadius}px`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      SYSTEM INTEGRITY
                    </span>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: system.accentColor }}
                    >
                      99.98%
                    </span>
                  </div>

                  <div
                    className="text-3xl sm:text-4xl font-black font-display text-white mb-2"
                    style={{
                      fontFamily: system.displayFont,
                      letterSpacing: system.letterSpacing,
                      lineHeight: system.lineHeight,
                    }}
                  >
                    0.04 MS
                  </div>
                  
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    Zero re-render frame overhead across all screen viewports
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-4">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ backgroundColor: system.accentColor }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
