/* ============================================================
   Gateway (home) page content
   ============================================================ */

import { siteConfig } from "@/shared/config/site";

export const gatewayContent = {
  brand: siteConfig.name,
  tagline: "Two doors. One standard: work that holds up.",
  description:
    "We run an IT agency for clients who need software and marketing that performs. We run an academy for people who want those same skills in their own career.",
  agency: {
    title: "IT Solutions Agency",
    description:
      "Websites, apps, ads, and brand systems. Scoped clearly, shipped on schedule, measured against business outcomes.",
    href: "/agency",
  },
  academy: {
    title: "Skill Development Training Center",
    description: "Master modern tech skills with industry experts. Project-based learning designed for real-world jobs. Graduate with proof, not promises.",
    href: "/academy",
  },
  stats: [
    { value: "120+", label: "Client projects delivered" },
    { value: "800+", label: "Students trained" },
    { value: "7+", label: "Years in market" },
    { value: "96%", label: "Repeat business" },
  ],
  trust: {
    label: "Tools we teach and ship with",
    tools: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Node.js", icon: "nodejs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Figma", icon: "figma" },
      { name: "AWS", icon: "aws" },
      { name: "Google Ads", icon: "google" },
      { name: "PostgreSQL", icon: "database" },
      { name: "Docker", icon: "docker" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Canva", icon: "canva" },
    ],
  },
} as const;
