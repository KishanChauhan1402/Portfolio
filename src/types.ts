export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  role: string[];
  year: string;
  category: string;
  heroImage: string;
  accentColor?: string;
  stats?: { label: string; value: string }[];
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  technologies: string[];
  galleryImages?: string[];
  liveUrl?: string;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  aspectRatio: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface ProcessStep {
  step: string;
  name: string;
  summary: string;
  description: string;
  activities: string[];
}
