export interface CaseStudyData {
  slug: string;
  name: string;
  type: string;
  industry: string;
  result: string;
  heroDesc: string;
  accent: string;
  gradient: string;
  initial: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: { metric: string; value: string; description: string }[];
  techStack: string[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
  timeline: string;
  liveLink?: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  heroDesc: string;
  icon: string;
  accent: string;
  gradient: string;
  shadow: string;
  features: ServiceFeature[];
  techStack: string[];
  process: string[];
  faq: { question: string; answer: string }[];
}

export interface PromotionalPackageTier {
  id: string;
  name: string;
  popular?: boolean;
  accent: string;
  description: string;
  features: string[];
}

export interface PromotionalSolutionGroup {
  id: string;
  title: string;
  shortDesc: string;
  bestForLabel: string;
  whatItIs: string;
  whyItMatters: string;
  process: string[];
  benefits: string[];
  packages?: PromotionalPackageTier[];
  customFeaturesLabel?: string;
  customFeatures?: string[];
  bestForList: string[];
  ctaLabel: string;
}
