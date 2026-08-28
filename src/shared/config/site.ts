/* ============================================================
   Site Configuration — brand identity, contact, navigation
   ============================================================ */

export const siteConfig = {
  name: "Diva IT Solutions Pvt. Ltd.",
  tagline: "Build software. Train talent.",
  description:
    "Diva IT Solutions runs an IT agency and a skill development academy. We ship digital products for clients and train professionals through live, project-based programs.",
  keywords: ["IT training in Nepal", "Digital Marketing course", "Web Development bootcamp", "Software Agency Kathmandu", "AI Automation training", "Full Stack Development course"],
  url: "https://divaitsolutions.com",
  contact: {
    email: "contact@divaitsolutions.com",
    phone: "+977 9700617739",
    location: "Kathmandu, Nepal",
  },
  social: {
    linkedin: "https://linkedin.com/company/diva-it-solutions",
    facebook: "https://facebook.com/divaitsolutions",
    instagram: "https://instagram.com/divaitsolutions",
    youtube: "https://youtube.com/@divaitsolutions",
  },
} as const;

export const academyNavigation = {
  links: [
    { label: "Bootcamps", href: "/academy#courses" },
    { label: "Creator Packages", href: "/packages" },
    { label: "How It Works", href: "/academy#how-it-works" },
    { label: "Mentors", href: "/academy#mentors" },
    { label: "Blog", href: "/blog?from=academy" },
  ],
  cta: {
    label: "Enroll Now",
    href: "/academy#courses",
  },
} as const;

export const agencyNavigation = {
  links: [
    { label: "Services", href: "/agency#services" },
    { label: "Work", href: "/agency#portfolio" },
    { label: "Process", href: "/agency#process" },
    { label: "Clients", href: "/agency#testimonials" },
    { label: "Blog", href: "/blog?from=agency" },
  ],
  cta: {
    label: "Hire Us",
    href: "/agency/contact",
  },
} as const;

export const neutralNavigation = {
  links: [
    { label: "Agency", href: "/agency" },
    { label: "Academy", href: "/academy" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  cta: {
    label: "Get Started",
    href: "/",
  },
} as const;
