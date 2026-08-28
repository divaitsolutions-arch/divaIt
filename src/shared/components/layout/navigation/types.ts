import type { LucideIcon } from "lucide-react";

export type Division = "agency" | "academy";

export interface NavLink {
    label: string;
    href: string;
}

export interface DivisionCta {
    label: string;
    href: string;
}

export interface MegaMenuLink {
    label: string;
    href: string;
    upcoming?: boolean;
}

export interface MegaMenuCategory {
    icon: LucideIcon;
    title: string;
    links: MegaMenuLink[];
    viewAllHref: string;
    tint: { bg: string; text: string };
}

export interface MegaMenuGuidance {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
}

export interface DivisionMegaMenu {
    attachTo: string;
    categories: MegaMenuCategory[];
    guidance: MegaMenuGuidance;
}

export interface DivisionConfig {
    key: Division;
    label: string;
    shortLabel: string;
    icon: LucideIcon;
    description: string;
    basePath: string;
    gradient: string;
    accentText: string;
    accentBg: string;
    accentSoftBg: string;
    links: NavLink[];
    cta: DivisionCta;
    megaMenus: DivisionMegaMenu[];
}