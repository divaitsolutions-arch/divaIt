/* ============================================================
   Academy page content — single source of truth
   ============================================================ */

import { contactLinks } from "@/shared/lib/contact";
import {
  AcademyHeroSchema,
  CareerPathsSchema,
  HowItWorksSchema,
  MentorsSchema,
  FaqSchema,
  AcademyCtaSchema,
} from './academy.schema';





const _academyHeroContent = {
  eyebrowBadge: "Diva Skill Development Training",
  headline: ["Build the skills", "companies actually", "pay for."],
  description:
    "Live classes. Real world projects. Expert mentors. Everything you need to get job-ready.",
  primaryCta: { label: "Enroll Now", href: "/" },
  secondaryCta: { label: "Explore Creator Packages", href: "/packages" },
  floatingCards: [
    { title: "Live Classes", desc: "Learn from industry experts", position: "top-left" as const },
    { title: "Mentor Support", desc: "1:1 guidance when you need it", position: "right" as const },
    { title: "Real Projects", desc: "Build. Showcase. Get Hired.", position: "bottom-left" as const },
    { title: "Certificate", desc: "Industry recognized certifications", position: "bottom-right" as const },
  ],
  stats: [
    { value: "Live", label: "Instructor-led classes", icon: "users" as const },
    { value: "Practical", label: "Weekly project work", icon: "briefcase" as const },
    { value: "Focused", label: "Career-ready skills", icon: "trending" as const },
    { value: "Flexible", label: "Payment options", icon: "star" as const },
  ],
} as const;

const _careerPathsContent = {
  headline: "Career Path",
  subhead: "Choose a path that matches your goals and build practical skills with mentor feedback.",
  cta: { label: "Not sure which track? Book a Consultation", href: contactLinks.academyConsultation },
} as const;

const _howItWorksContent = {
  headline: "Four steps. One outcome: a job you can do.",
  description:
    "No passive video libraries. You join live sessions, submit work, get feedback, and repeat until the skill sticks.",
  cta: { label: "Talk to Admissions", href: contactLinks.academyConsultation },
  steps: [
    {
      title: "Choose your track",
      description:
        "We place you in the right cohort based on your goal and current level. Beginners welcome.",
    },
    {
      title: "Learn live, build weekly",
      description:
        "Instructors teach in real time. Every week you ship something: a landing page, a campaign, a model, a reel.",
    },
    {
      title: "Get reviewed by practitioners",
      description:
        "Mentors grade your work like a team lead would: clarity, quality, speed, and how you explain tradeoffs.",
    },
    {
      title: "Graduate with proof",
      description:
        "Portfolio, certificate, and placement support. We help with CV, interviews, and introductions where we can.",
    },
  ],
} as const;

const _mentorsContent = {
  headline: "Our Team",
  description: "The people behind your learning experience. We teach what we practice and practice what we teach.",
} as const;

const _faqContent = {
  headline: "Straight answers before you enroll.",
  subhead: "Still unsure? Book a free call. No pressure to sign up.",
  items: [
    {
      question: "Do I need experience?",
      answer:
        "No for most tracks. We start from fundamentals and ramp fast. If you already have skills, we skip the basics and give you harder projects.",
    },
    {
      question: "How long are the programs?",
      answer:
        "Most tracks run 8-16 weeks. Full-time cohorts meet daily. Part-time options meet evenings and weekends. Duration depends on the track you choose.",
    },
    {
      question: "What do I get when I finish?",
      answer:
        "A Diva IT Solution certificate, a portfolio of graded projects, career coaching, and access to our alumni network and job referrals.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes. Full refund within the first 7 days if the program is not the right fit. After that, we handle cases individually and fairly.",
    },
    {
      question: "Do you help with jobs?",
      answer:
        "We provide CV reviews, mock interviews, and career guidance. We cannot guarantee placement or a specific outcome.",
    },
    {
      question: "Can I switch tracks?",
      answer:
        "Yes, within the first three weeks at no extra charge if seats are available in the new cohort.",
    },
  ],
} as const;

const _academyCtaContent = {
  eyebrow: "July 2026 cohort open",
  headline: "Ready to start?",
  headlineAccent: "Secure your spot.",
  description:
    "Enroll directly if you know your track, or book a free consultation to discuss your goals with our team.",
  primaryCta: { label: "Enroll Now", href: "/" },
  secondaryCta: { label: "Book Free Consultation", href: contactLinks.academyConsultation },
  trustItems: ["Flexible payment", "Certificate included", "Placement support"],
} as const;

export const academyHeroContent = AcademyHeroSchema.parse(_academyHeroContent);
export const careerPathsContent = CareerPathsSchema.parse(_careerPathsContent);
export const howItWorksContent = HowItWorksSchema.parse(_howItWorksContent);
export const mentorsContent = MentorsSchema.parse(_mentorsContent);
export const faqContent = FaqSchema.parse(_faqContent);
export const academyCtaContent = AcademyCtaSchema.parse(_academyCtaContent);
