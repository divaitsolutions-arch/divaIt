import { z } from 'zod';

const CtaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const AcademyHeroSchema = z.object({
  eyebrowBadge: z.string().min(1),
  headline: z.array(z.string()).min(1),
  description: z.string().min(1),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
  floatingCards: z.array(
    z.object({
      title: z.string(),
      desc: z.string(),
      position: z.enum(['top-left', 'right', 'bottom-left', 'bottom-right']),
    })
  ),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      icon: z.string(),
    })
  ),
});

export const CareerPathsSchema = z.object({
  headline: z.string().min(1),
  subhead: z.string().min(1),
  cta: CtaSchema,
});

export const HowItWorksSchema = z.object({
  headline: z.string().min(1),
  description: z.string().min(1),
  cta: CtaSchema,
  steps: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    })
  ),
});

export const MentorsSchema = z.object({
  headline: z.string().min(1),
  description: z.string().min(1).optional(),
});

export const FaqSchema = z.object({
  headline: z.string().min(1),
  subhead: z.string().min(1),
  items: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })
  ),
});

export const AcademyCtaSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  headlineAccent: z.string().min(1),
  description: z.string().min(1),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
  trustItems: z.array(z.string().min(1)),
});

export type AcademyHeroData = z.infer<typeof AcademyHeroSchema>;
export type CareerPathsData = z.infer<typeof CareerPathsSchema>;
export type HowItWorksData = z.infer<typeof HowItWorksSchema>;
export type MentorsData = z.infer<typeof MentorsSchema>;
export type FaqData = z.infer<typeof FaqSchema>;
export type AcademyCtaData = z.infer<typeof AcademyCtaSchema>;
