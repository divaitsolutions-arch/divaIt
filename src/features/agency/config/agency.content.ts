/* ============================================================
   Agency page content — single source of truth
   ============================================================ */

import {
  AgencyHeroSchema,
  AgencyServicesSchema,
  AgencyPortfolioSchema,
  AgencyProcessSchema,
  AgencyTestimonialsSchema,
  AgencyCtaSchema,
  AgencyTeamSchema,
} from './agency.schema';


const _agencyHeroContent = {
  eyebrow: "IT SOLUTIONS AGENCY",
  headline: ["We bring your", "ideas", "into life."],
  description: "Divait Solutions doesn't just deliver websites, software, or marketing services. We combine technology, digital strategy, and AI to help businesses build better systems, create more opportunities, and grow more efficiently.",
  primaryCta: { label: "Hire Us", href: "/agency/contact" },
  secondaryCta: { label: "Explore Our Work", href: "#portfolio" },
  stats: [
    { value: "120+", label: "Projects delivered" },
    { value: "40+", label: "Active clients" },
    { value: "5 yrs", label: "In market" },
    { value: "96%", label: "Repeat business" },
  ],
  trustedBy: ["BoltShift", "kanba", "IdeaFlow", "HexaLab", "venza"],
} as const;

const _agencyServicesContent = {
  headline: "What we ship.",
  subhead: "We engineer digital ecosystems designed to scale your operations, reduce overhead, and accelerate growth.",
  services: [
    {
      title: "Web Development",
      description: "We don't just build websites; we engineer digital storefronts that convert visitors into loyal customers and drive measurable business growth.",
      accent: "from-blue-500 to-blue-700",
      shadow: "rgba(59,130,246,0.35)",
    },
    {
      title: "AI Consulting & Automation",
      description: "Unlock unfair advantages. We integrate intelligent automation into your workflows to cut operational costs and free your team to focus on scaling.",
      accent: "from-primary to-purple-700",
      shadow: "rgba(160,59,184,0.35)",
    },
    {
      title: "Digital Marketing",
      description: "Stop wasting ad spend. Our data-driven marketing systems are built to acquire customers at scale, dominate local search, and maximize your ROI.",
      accent: "from-primary to-rose-600",
      shadow: "rgba(237,51,44,0.35)",
    },
    {
      title: "Brand & Design",
      description: "Position yourself as the premium choice. We craft cohesive, high-converting visual identities that instantly communicate trust and authority to your market.",
      accent: "from-primary to-purple-700",
      shadow: "rgba(160,59,184,0.35)",
    },
    {
      title: "App Development",
      description: "Turn complex services into seamless mobile experiences. We build robust cross-platform apps that keep your business directly in your customers' pockets.",
      accent: "from-emerald-500 to-emerald-700",
      shadow: "rgba(16,185,129,0.35)",
    },
    {
      title: "E-Commerce Solutions",
      description: "Transform your retail operations. We develop high-performance digital storefronts engineered for maximum conversion, streamlined inventory, and global reach.",
      accent: "from-amber-500 to-orange-600",
      shadow: "rgba(245,158,11,0.35)",
    },
    {
      title: "IT Infrastructure Strategy",
      description: "Build on a solid foundation. We provide enterprise-grade technology consulting to ensure your digital infrastructure scales seamlessly with your ambitions.",
      accent: "from-indigo-500 to-indigo-700",
      shadow: "rgba(99,102,241,0.35)",
    },
    {
      title: "Managed Cloud & Domains",
      description: "Zero-headache digital ownership. We manage your domains, security, and cloud hosting so you can focus entirely on running your business, securely and reliably.",
      accent: "from-cyan-500 to-cyan-700",
      shadow: "rgba(6,182,212,0.35)",
    },
  ],
} as const;

const _agencyPortfolioContent = {
  headline: "Our Projects",
  subhead: "Recent client projects across Nepal and overseas.",
  projects: [
    {
      name: "Union Hydropower",
      type: "Website Redesign",
      result: "Modernized WordPress presence",
      tags: ["WordPress", "Web Design", "Hydropower"],
      accent: "from-teal-500 to-emerald-500",
      initial: "UH",
      liveLink: "https://www.unionhydropower.com.np/",
    },
    {
      name: "Himalayan Trails Co.",
      type: "Booking platform + SEO",
      result: "+140% organic traffic in 6 months",
      tags: ["Next.js", "SEO", "Booking"],
      accent: "from-blue-500 to-cyan-500",
      initial: "HT",
    },
    {
      name: "NovaPay FinTech",
      type: "Marketing site + brand",
      result: "Launch in 5 weeks, 2.1s LCP",
      tags: ["Branding", "React", "Payments"],
      accent: "from-primary to-orange-500",
      initial: "NP",
    },
    {
      name: "GreenBasket D2C",
      type: "Next.js + Meta ads",
      result: "3.2x ROAS in first quarter",
      tags: ["E-Commerce", "Next.js", "Ads"],
      accent: "from-emerald-500 to-teal-500",
      initial: "GB",
    },
    {
      name: "EduReach NGO",
      type: "Web app + CMS",
      result: "12k monthly active learners",
      tags: ["Web App", "CMS", "Education"],
      accent: "from-purple-500 to-pink-500",
      initial: "ER",
    },
  ],
} as const;

const _agencyProcessContent = {
  headline: "How we work.",
  steps: [
    {
      title: "Discovery call",
      description: "30 minutes. You share goals, budget, and timeline. We tell you what is realistic and what it costs.",
    },
    {
      title: "Scope & proposal",
      description: "Fixed deliverables, milestones, and payment schedule. No vague hourly buckets unless you ask for them.",
    },
    {
      title: "Build in sprints",
      description: "Weekly demos. You see progress early and can redirect before money is wasted.",
    },
    {
      title: "Launch & support",
      description: "Handover, training, and optional maintenance. We stay available for iteration.",
    },
  ],
} as const;

const _agencyTestimonialsContent = {
  headline: "Clients stay because the work performs.",
  quotes: [
    {
      quote: "They rebuilt our site and ad tracking in one sprint. Leads doubled without increasing spend.",
      name: "Meera Adhikari",
      role: "CEO, Himalayan Trails Co.",
    },
    {
      quote: "Clear communication, no jargon. We always knew what we were paying for and when it would ship.",
      name: "Dev Rajbhandari",
      role: "Founder, NovaPay",
    },
    {
      quote: "Design and dev under one roof saved us months. The brand finally matches the product quality.",
      name: "Laxmi Shrestha",
      role: "Marketing Director, GreenBasket",
    },
  ],
} as const;

const _agencyTeamContent = {
  headline: "Our Team",
  description: "A small, focused team that ships real work. We lead every project personally. No handoffs to junior staff you have never met.",
} as const;

const _agencyCtaContent = {
  headline: "Ready to",
  headlineAccent: "grow your business?",
  description: "Tell us about your business, your current challenges, and where you want to go. We'll help identify the right combination of technology, digital strategy, and automation for your business.",
  primaryCta: { label: "Start a Project", href: "/agency/contact" },
  secondaryCta: { label: "Back to Home", href: "/" },
  trustItems: ["Free discovery call", "Fixed-scope options", "Weekly demos"],
} as const;

export const agencyHeroContent = AgencyHeroSchema.parse(_agencyHeroContent);
export const agencyServicesContent = AgencyServicesSchema.parse(_agencyServicesContent);
export const agencyPortfolioContent = AgencyPortfolioSchema.parse(_agencyPortfolioContent);
export const agencyProcessContent = AgencyProcessSchema.parse(_agencyProcessContent);
export const agencyTestimonialsContent = AgencyTestimonialsSchema.parse(_agencyTestimonialsContent);
export const agencyCtaContent = AgencyCtaSchema.parse(_agencyCtaContent);
export const agencyTeamContent = AgencyTeamSchema.parse(_agencyTeamContent);