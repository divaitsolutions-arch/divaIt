export interface TechStackItem {
  name: string;
  icon: string;
}

export interface SyllabusItem {
  week: string;
  title: string;
  topics: string[];
}

export interface TuitionInfo {
  amount: number;
  offlineAmount?: number;
  originalAmount?: number;
  installments: string;
  note: string;
}

export interface TrackLevel {
  id: string;
  name: string;
  badge?: string;
  isDefault: boolean;
  duration: string;
  commitment: string;
  careerOutcome: string;
  techStack: TechStackItem[];
  requirements?: string[];
  learningOutcomes?: string[];
  projects?: string[];
  syllabus: SyllabusItem[];
  syllabusPdfUrl?: string;
  brochurePdfUrl?: string;
  courseNotesPdfUrl?: string;
  tuition: TuitionInfo;
}

export interface HowItWorksItem {
  step: string;
  desc: string;
}

export interface Discipline {
  _id: string;
  title: string;
  slug: string;
  category: string;
  heroDesc: string;
  icon: string;
  accent: string;
  gradient: string;
  sharedHighlights?: string[];
  whoIsThisFor?: {
    persona: string;
    icon: string;
    recommendedTrack: string;
    reason: string;
  }[];
  tracks: {
    title: string;
    slug: string;
    subtitle: string;
    heroDesc: string;
    popular?: boolean;
    upcoming?: boolean;
    levels: TrackLevel[];
  }[];
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  batch?: string;
  heroDesc: string;
  badge?: string;
  icon: string;
  accent: string;
  gradient: string;
  category: string;
  difficulty: string;
  duration: string;
  commitment: string;
  format: string;
  highlights: string[];
  prerequisites?: string[];
  techStack: TechStackItem[];
  syllabus: SyllabusItem[];
  syllabusPdfUrl?: string;
  brochurePdfUrl?: string;
  courseNotesPdfUrl?: string;
  projects?: string[];
  tuition: TuitionInfo;
  targetAudience?: string[];
  howItWorks?: HowItWorksItem[];
  popular?: boolean;
  relatedCourses?: string[];
  upgradePathTrack?: {
    discipline: string;
    track: string;
    label: string;
  };
}

export interface Package {
  _id: string;
  id: string; 
  title: string;
  priceValue: number;
  offlinePriceValue?: number;
  regularPriceValue?: number;
  period: string;
  duration: string;
  level: string;
  badge?: string;
  icon: string;
  popular?: boolean;
  accent: string;
  description: string;
  features: string[];
  support?: string;
  supportIcon?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
}
