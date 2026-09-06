import { Project, PlaygroundItem, Capability, ProcessStep } from '../types';

export const PORTRAIT_IMAGE = 'https://your-direct-link-here.com/portrait.jpg'; // Replace with your direct image link

export const PROJECTS_DATA: Project[] = [
  {
    id: 'artistry-alley',
    number: '01',
    title: 'Elavet LMS ',
    subtitle: 'Complate SAAS Product Design',
    description: 'An end-to-end learning management platform designed to make course creation, learner management, and performance tracking feel clear, scalable, and effortless.',
    role: ['Product Design',
      'UI/UX Architecture',
      'Design System',
      'Brand & Visual Design'],
    year: '2026',
    category: 'PRODUCT DESIGN / WEB PLATFORM',
    heroImage: 'src/assets/images/Elevate LMS.jpg', // Replace with your direct image link
    accentColor: '#0055ff',
    stats: [
      { label: 'Screens Designed', value: '65+' },
      { label: 'Personas', value: '3' },
      { label: 'Design Definitions', value: '120+' }
    ],
    overview: 'Elevate LMS is a modern learning management system created as part of an internship project. The product brings course creation, learner administration, analytics, and platform management into one cohesive SaaS experience.',
    challenge: 'The challenge was to design a scalable LMS experience that could support multiple user types and complex workflows without making the platform feel overwhelming. Alongside the product experience, the project also required a strong visual identity and a consistent design language.',
    solution: 'Designed the product from the brand identity through to the full interface system—establishing the logo and brand guidelines, defining a reusable component library, and creating 65+ screens across multiple personas. The final system balances structured SaaS functionality with a distinctive visual direction.',
    deliverables: ['Logo Design & Brand Guidelines',
      'Complete Design System',
      'Marketing Website',
      '3 User Personas',
      '65+ Product Screens'],
    technologies: ['Figma',
      'Design Systems',
      'Prototyping',
      'UI/UX Design'],
    liveUrl: 'https://www.figma.com/design/hlOhpeBos86txFTKSquP9r/LMS-By-Kishan-Chauhan?node-id=724-63220&t=HCYdbrYFRBxOUvSU-1'
  },
  {
    id: 'chronos-spatial',
    number: '02',
    title: 'CHRONOS SPATIAL',
    subtitle: 'Next-gen spatial operating system interface',
    description: 'A revolutionary spatial computing design system and gesture-driven workspace interface exploring depth-aware micro-interactions and minimalist eye-tracked ergonomics.',
    role: ['Product Architecture', 'Spatial UI/UX', 'Interaction Design', 'Prototyping'],
    year: '2025',
    category: 'SPATIAL COMPUTING / OS DESIGN',
    heroImage: 'https://your-direct-link-here.com/project2.jpg', // Replace with your direct image link
    accentColor: '#3b82f6',
    stats: [
      { label: 'Eye Strain Reduction', value: '-38%' },
      { label: 'Gesture Precision', value: '99.4%' },
      { label: 'Design Tokens', value: '450+ Components' }
    ],
    overview: 'Chronos OS bridges traditional desktop productivity with immersive spatial computing. It removes skeuomorphic clutter in favor of floating Swiss grid cards and ethereal cobalt illumination.',
    challenge: 'Designing spatial interfaces without causing spatial fatigue or cognitive overload in 3D multi-window environments.',
    solution: 'Engineered a strict typographic anchor system that auto-aligns windows along the user’s primary visual horizon with gentle depth cues and minimal hand-pinch gestures.',
    deliverables: ['Spatial Design System', 'Eye-Tracking Microinteractions', 'Multi-Window Spatial Canvas', 'Developer Spec Tokens'],
    technologies: ['Figma', 'Spatial Prototyping', 'Three.js', 'Shader Graph', 'Tailwind CSS'],
    liveUrl: 'https://chronos-spatial.example.com'
  },
  {
    id: 'monolith-sound',
    number: '03',
    title: 'MONOLITH SOUND',
    subtitle: 'Industrial hardware synth & generative audio lab',
    description: 'An avant-garde audio synthesis platform merging brutalist physical rack hardware with a dynamic generative browser sound synthesizer and real-time waveform visualizer.',
    role: ['Hardware UI', 'Interaction Design', 'DSP Visualizer', 'Brand Architecture'],
    year: '2024',
    category: 'HARDWARE UI / SOUND DESIGN',
    heroImage: 'https://your-direct-link-here.com/project3.jpg', // Replace with your direct image link
    accentColor: '#f97316',
    stats: [
      { label: 'Audio Engine Latency', value: '4.2ms' },
      { label: 'Sound Designers', value: '35,000+' },
      { label: 'Preset Fidelity', value: '32-bit Float' }
    ],
    overview: 'Monolith Sound creates instruments for producers seeking brutalist minimalism. We harmonized the tactile physical knobs with zero-latency software frequency envelopes.',
    challenge: 'Translating complex modular synthesis patch cords into an intuitive, visually stunning dark interface that thrives during live stage performances.',
    solution: 'Constructed an oscillating cobalt waveform visualizer with high-contrast tactile slider controls and customizable macro modulation matrices.',
    deliverables: ['Hardware Front Panel Layout', 'Web Synth Application', 'Modulation Matrix UI', 'Physical Packaging Design'],
    technologies: ['Web Audio API', 'Canvas 2D', 'React', 'Figma Hardware Specs', 'SVG Shaders'],
    liveUrl: 'https://monolith-sound.example.com'
  }
];

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: 'pg-1',
    title: 'Kinetic Warp Specimen',
    category: 'Typography Experiment',
    year: '2025',
    image: 'https://your-direct-link-here.com/playground1.jpg', // Replace with your direct image link
    aspectRatio: '1:1',
    description: 'Algorithmic 3D letterform deformation driven by cursor velocity and audio frequencies.',
    tags: ['Kinetic Type', 'GLSL Shaders', 'Swiss Minimal']
  },
  {
    id: 'pg-2',
    title: 'Deep Fluid Resonance',
    category: 'Generative Computation',
    year: '2025',
    image: 'https://your-direct-link-here.com/playground2.jpg', // Replace with your direct image link
    aspectRatio: '4:3',
    description: 'Real-time Navier-Stokes fluid simulation with cobalt blue surface tension and dark matter physics.',
    tags: ['Generative Art', 'Fluid Dynamics', 'Cobalt Series']
  },
  {
    id: 'pg-3',
    title: 'Chrono-Clock Matrix',
    category: 'Interface Experiment',
    year: '2024',
    image: 'https://your-direct-link-here.com/playground3.jpg', // Replace with your direct image link
    aspectRatio: '16:9',
    description: 'An abstract time-sculpture displaying planetary orbital alignments through minimalist clock dials.',
    tags: ['UI Concept', 'Time Architecture', 'Monochrome']
  },
  {
    id: 'pg-4',
    title: 'Sub-Bass Wave Canvas',
    category: 'Audio Visualizer',
    year: '2024',
    image: 'https://your-direct-link-here.com/playground4.jpg', // Replace with your direct image link
    aspectRatio: '1:1',
    description: 'Harmonic particle cloud responding to low-frequency sinusoidal sub-bass waves.',
    tags: ['Web Audio', 'Particle Physics', 'Creative Dev']
  }
];

export const CAPABILITIES_DATA: Capability[] = [
  {
    id: 'cap-1',
    number: '01',
    title: 'PRODUCT DESIGN',
    subtitle: 'End-to-End Product Architecture & Strategy',
    description: 'Translating ambiguous user problems into structured, scalable software products. From discovery synthesis and journey mapping to design systems and high-fidelity production specs.',
    deliverables: ['Information Architecture', 'Product Strategy', 'Interactive Flow Maps', 'Design Systems & Tokens', 'Design QA'],
    tools: ['Figma', 'Linear', 'FigJam', 'Notion', 'Principle']
  },
  {
    id: 'cap-2',
    number: '02',
    title: 'UI / UX DESIGN',
    subtitle: 'Precision Digital Interface Craft',
    description: 'Obsessing over spatial layout, optical balance, density hierarchy, keyboard navigation, micro-interactions, and frictionless user flows.',
    deliverables: ['Responsive Web Interfaces', 'Mobile Application UI (iOS & Android)', 'Design Systems', 'Micro-Interactions'],
    tools: ['Figma', 'Framer', 'Protopie', 'Tailwind UI', 'Storybook']
  },
  {
    id: 'cap-3',
    number: '03',
    title: 'VISUAL DESIGN',
    subtitle: 'Editorial Art Direction & Expression',
    description: 'Crafting distinctive brand languages that cut through generic SaaS homogeneity through bespoke typography, intentional color theory, and tactile composition.',
    deliverables: ['Art Direction', 'Custom Typography Pairing', 'Editorial Layouts', 'Iconography Systems', 'Brand Guidelines'],
    tools: ['Illustrator', 'Photoshop', 'Midjourney (Fine Art R&D)', 'Glyphs']
  },
  {
    id: 'cap-4',
    number: '04',
    title: 'BRAND IDENTITY',
    subtitle: 'Cohesive Visual Storytelling & Identity Systems',
    description: 'Creating timeless brand identities with structural rigor. Defining how products speak, look, and resonate across every physical and digital touchpoint.',
    deliverables: ['Logo & Mark Systems', 'Color & Type Tokens', 'Brand Collateral', 'Motion Principles', 'Digital Asset Libraries'],
    tools: ['Illustrator', 'Figma', 'After Effects', 'InDesign']
  },
  {
    id: 'cap-5',
    number: '05',
    title: 'WEB DESIGN',
    subtitle: 'Immersive Editorial Web Experiences',
    description: 'Designing interactive web spaces that evoke emotion. Combining Swiss minimalism, editorial storytelling, and silky smooth scroll narratives.',
    deliverables: ['Landing Pages', 'Portfolio & Gallery Sites', 'Editorial Portals', 'Responsive Layouts'],
    tools: ['Figma', 'Framer', 'Webflow', 'Next.js']
  },
  {
    id: 'cap-6',
    number: '06',
    title: 'CREATIVE DEVELOPMENT',
    subtitle: 'Bridging Design Craft with Modern Code',
    description: 'Transforming designs into production-ready web experiences with clean TypeScript, fluid CSS animations, and bespoke interaction logic.',
    deliverables: ['React / TypeScript Applications', 'Framer Motion Choreography', 'Tailwind CSS Architectures', 'Performance Optimization'],
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite', 'Node.js']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    name: 'DISCOVER',
    summary: 'Immersion & Problem Deconstruction',
    description: 'Uncovering root constraints, user mental models, competitive landscape, and business objectives before drawing a single rectangle.',
    activities: ['Stakeholder Interviews', 'User Research & Synthesis', 'Constraint Mapping', 'Analogous Inspiration Audit']
  },
  {
    step: '02',
    name: 'DEFINE',
    summary: 'Strategic Blueprint & Core Theses',
    description: 'Synthesizing insights into focused product pillars, user journey arcs, and clear architectural north stars.',
    activities: ['User Flow Architecture', 'Information Hierarchy', 'Feature Scoping & Priority Matrix', 'Creative Direction Hypotheses']
  },
  {
    step: '03',
    name: 'DESIGN',
    summary: 'Visual Craft & System Architecture',
    description: 'Translating functional flows into high-contrast, mathematically balanced interfaces with rigorous typography and spatial harmony.',
    activities: ['Wireframing to High-Fidelity UI', 'Component Library Building', 'Typography & Color Tokens', 'Editorial Layouts']
  },
  {
    step: '04',
    name: 'PROTOTYPE',
    summary: 'Tactile Motion & Ergonomics Testing',
    description: 'Building high-fidelity interactive prototypes to validate transition physics, gesture friction, and sensory feedback.',
    activities: ['Interactive State Flows', 'Micro-interaction Timing', 'Haptic & Audio Cues', 'User Usability Testing']
  },
  {
    step: '05',
    name: 'BUILD',
    summary: 'Production Code & Engineering Fidelity',
    description: 'Writing pixel-perfect, accessible code with semantic HTML, fluid responsive breakpoints, and performant 60fps animations.',
    activities: ['Clean Component Modularization', 'CSS/Motion Tuning', 'Cross-Device QA', 'Lighthouse Optimization']
  },
  {
    step: '06',
    name: 'REFINE',
    summary: 'Telemetry, Polish & Continuous Evolution',
    description: 'Observing real-world interaction behavior, tightening edge cases, and elevating the product through intentional iteration.',
    activities: ['User Behavior Analytics', 'A/B Micro-Friction Audits', 'Design Polish Sprints', 'System Documentation']
  }
];
