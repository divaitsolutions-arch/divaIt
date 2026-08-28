/* ============================================================
   Footer navigation — hrefs must match section ids on pages
   ============================================================ */
import { siteConfig } from "./site";

export const academyFooterContent = {
  tagline: "Live training. Real projects. Careers that pay.",
  columns: [
    {
      title: "Academy",
      links: [
        { label: "Courses", href: "#courses" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Mentors", href: "#mentors" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Enroll", href: "#enroll" },
        { label: "Email Us", href: `mailto:${siteConfig.contact.email}` },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Agency Services", href: "/agency" },
        { label: "Blog", href: "/blog" },
        { label: "Home", href: "/" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const agencyFooterContent = {
  tagline: "We design, build, and ship digital products that grow revenue.",
  columns: [
    {
      title: "Agency",
      links: [
        { label: "Services", href: "#services" },
        { label: "Our Projects", href: "#portfolio" },
        { label: "Our Process", href: "#process" },
        { label: "Client Stories", href: "#testimonials" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Start a Project", href: "#contact" },
        { label: "Email Us", href: `mailto:${siteConfig.contact.email}` },
        { label: "Call Us", href: "tel:+9779800000000" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Training Academy", href: "/academy" },
        { label: "Blog", href: "/blog" },
        { label: "Home", href: "/" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
