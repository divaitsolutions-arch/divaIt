import { z } from 'zod';

const CtaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const AgencyHeroSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.array(z.string()).min(1),
  description: z.string().min(1),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
  stats: z.array(
    z.object({
      value: z.string().min(1),
      label: z.string().min(1),
    })
  ),
  trustedBy: z.array(z.string().min(1)).optional(),
});

export const AgencyServicesSchema = z.object({
  headline: z.string().min(1),
  subhead: z.string().min(1),
  services: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      accent: z.string().min(1),
      shadow: z.string().min(1),
    })
  ),
});

export const AgencyPortfolioSchema = z.object({
  headline: z.string().min(1),
  subhead: z.string().min(1),
  projects: z.array(
    z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      result: z.string().min(1),
      tags: z.array(z.string().min(1)),
      accent: z.string().min(1),
      initial: z.string().min(1),
      liveLink: z.string().optional(),
    })
  ),
});

export const AgencyProcessSchema = z.object({
  headline: z.string().min(1),
  steps: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    })
  ),
});

export const AgencyTestimonialsSchema = z.object({
  headline: z.string().min(1),
  quotes: z.array(
    z.object({
      quote: z.string().min(1),
      name: z.string().min(1),
      role: z.string().min(1),
    })
  ),
});

export const AgencyCtaSchema = z.object({
  headline: z.string().min(1),
  headlineAccent: z.string().min(1),
  description: z.string().min(1),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
  trustItems: z.array(z.string().min(1)),
});

export const AgencyTeamSchema = z.object({
  headline: z.string().min(1),
  description: z.string().min(1).optional(),
});

export type AgencyHeroData = z.infer<typeof AgencyHeroSchema>;
export type AgencyServicesData = z.infer<typeof AgencyServicesSchema>;
export type AgencyPortfolioData = z.infer<typeof AgencyPortfolioSchema>;
export type AgencyProcessData = z.infer<typeof AgencyProcessSchema>;
export type AgencyTestimonialsData = z.infer<typeof AgencyTestimonialsSchema>;
export type AgencyCtaData = z.infer<typeof AgencyCtaSchema>;
export type AgencyTeamData = z.infer<typeof AgencyTeamSchema>;