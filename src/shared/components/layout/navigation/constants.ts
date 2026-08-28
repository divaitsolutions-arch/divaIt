import {
    Building2,
    GraduationCap,
    Code2,
    Database,
    Palette,
    Megaphone,
    Sparkles,
    Terminal,
} from "lucide-react";
import { academyNavigation, agencyNavigation } from "@/shared/config/site";
import type { Division, DivisionConfig } from "./types";

export const divisions: Record<Division, DivisionConfig> = {
    agency: {
        key: "agency",
        label: "Diva IT Solution",
        shortLabel: "Services",
        icon: Building2,
        description: "Web, mobile, AI, automation and custom software for clients.",
        basePath: "/agency",
        gradient: "from-primary to-orange-500",
        accentText: "text-primary",
        accentBg: "bg-primary",
        accentSoftBg: "bg-primary/10",
        links: [...agencyNavigation.links],
        cta: agencyNavigation.cta,
        megaMenus: [
            {
                attachTo: "Services",
                categories: [
                    {
                        icon: Code2,
                        title: "Development",
                        links: [
                            { label: "Web Development", href: "/agency/services/web-development" },
                            { label: "Mobile App Development", href: "/agency/services/app-development" },
                            { label: "E-Commerce", href: "/agency/services/ecommerce" },
                        ],
                        viewAllHref: "/agency#services",
                        tint: { bg: "bg-rose-500/10", text: "text-rose-500" },
                    },
                    {
                        icon: Palette,
                        title: "Design",
                        links: [
                            { label: "Brand & Design", href: "/agency/services/brand-design" },
                            { label: "IT Consulting", href: "/agency/services/it-consulting" },
                        ],
                        viewAllHref: "/agency#services",
                        tint: { bg: "bg-teal-500/10", text: "text-teal-600" },
                    },
                    {
                        icon: Sparkles,
                        title: "Growth & Intelligence",
                        links: [
                            { label: "AI Consulting & Automation", href: "/agency/services/ai-automation" },
                            { label: "Digital Marketing", href: "/agency/services/digital-marketing" },
                        ],
                        viewAllHref: "/agency#services",
                        tint: { bg: "bg-amber-500/10", text: "text-amber-600" },
                    },
                ],
                guidance: {
                    heading: "Not sure which service fits?",
                    body: "Get a free consultation with our solutions team.",
                    ctaLabel: "Get a Quote",
                    ctaHref: "/agency/contact",
                },
            }
        ],
    },
    academy: {
        key: "academy",
        label: "Diva Skill Development Training",
        shortLabel: "Training",
        icon: GraduationCap,
        description: "Industry-ready courses, bootcamps and creator programs.",
        basePath: "/academy",
        gradient: "from-primary to-pink-500",
        accentText: "text-primary",
        accentBg: "bg-primary",
        accentSoftBg: "bg-primary/10",
        links: [...academyNavigation.links],
        cta: academyNavigation.cta,
        megaMenus: [
            {
                attachTo: "Bootcamps",
                categories: [
                    {
                        icon: Terminal,
                        title: "Programming",
                        links: [
                            { label: "HTML & CSS Fundamentals", href: "/academy/courses/individual/html-css" },
                            { label: "JavaScript Essentials", href: "/academy/courses/individual/javascript" },
                            { label: "Python Programming", href: "/academy/courses/individual/python" },
                            { label: "SQL & Database Design", href: "/academy/courses/individual/sql-databases" },
                        ],
                        viewAllHref: "/academy/courses/individual",
                        tint: { bg: "bg-cyan-500/10", text: "text-cyan-600" },
                    },
                    {
                        icon: Code2,
                        title: "Development",
                        links: [
                            { label: "MERN Stack Development", href: "/academy/courses/full-stack-development/mern-stack" },
                            { label: "React + Django", href: "/academy/courses/full-stack-development/react-django" },
                        ],
                        viewAllHref: "/academy/courses/full-stack-development",
                        tint: { bg: "bg-rose-500/10", text: "text-rose-500" },
                    },
                    {
                        icon: Database,
                        title: "Data & AI",
                        links: [
                            { label: "Data Science & Analytics", href: "/academy/courses/data-and-ai", upcoming: true },
                            { label: "AI & Machine Learning", href: "/academy/courses/data-and-ai", upcoming: true },
                        ],
                        viewAllHref: "/academy/courses/data-and-ai",
                        tint: { bg: "bg-violet-500/10", text: "text-violet-500" },
                    },
                    {
                        icon: Palette,
                        title: "Design & Creative",
                        links: [
                            { label: "UI/UX Product Design", href: "/academy/courses/design-creative", upcoming: true },
                            { label: "Graphic Design & Branding", href: "/academy/courses/design-creative/graphic-design" },
                            { label: "Video & Motion Graphics", href: "/academy/courses/design-creative/video-motion" },
                        ],
                        viewAllHref: "/academy/courses/design-creative",
                        tint: { bg: "bg-teal-500/10", text: "text-teal-600" },
                    },
                    {
                        icon: Megaphone,
                        title: "Digital Marketing",
                        links: [
                            { label: "Performance Marketing", href: "/academy/courses/digital-marketing/performance" },
                            { label: "SEO & Content Strategy", href: "/academy/courses/digital-marketing/seo-content" },
                        ],
                        viewAllHref: "/academy/courses/digital-marketing",
                        tint: { bg: "bg-amber-500/10", text: "text-amber-600" },
                    },
                ],
                guidance: {
                    heading: "Not sure which course is right for you?",
                    body: "Get free career guidance from our experts.",
                    ctaLabel: "Get Guidance",
                    ctaHref: "/contact",
                },
            },
            {
                attachTo: "Creator Packages",
                categories: [
                    {
                        icon: Sparkles,
                        title: "Digital Micro-Business",
                        links: [
                            { label: "Digital Marketing Course", href: "/packages#digital-marketing" },
                            { label: "Basic Package", href: "/packages#basic-package" },
                            { label: "Standard Package", href: "/packages#standard-package" },
                        ],
                        viewAllHref: "/packages",
                        tint: { bg: "bg-primary/10", text: "text-primary" },
                    }
                ],
                guidance: {
                    heading: "Not sure which package fits?",
                    body: "We can help you choose the right starter toolkit for your goals.",
                    ctaLabel: "Book a Call",
                    ctaHref: "/contact",
                }
            }
        ],
    },
};

const hashEquivalents: Record<string, string> = {
    "#services": "#courses",
    "#portfolio": "#success",
    "#process": "#how-it-works",
    "#testimonials": "#mentors",
    "#courses": "#services",
    "#success": "#portfolio",
    "#how-it-works": "#process",
    "#mentors": "#testimonials",
};

export function getDivisionSwitchHref(target: Division): string {
    const targetBase = divisions[target].basePath;
    if (typeof window === "undefined") return targetBase;
    const currentHash = window.location.hash;
    const mapped = currentHash ? hashEquivalents[currentHash] : undefined;
    return mapped ? `${targetBase}${mapped}` : targetBase;
}