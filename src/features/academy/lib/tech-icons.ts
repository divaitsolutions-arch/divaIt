import type { IconType } from 'react-icons';
import * as SimpleIcons from 'react-icons/si';
import * as SimpleIconsData from 'simple-icons';
import { Database } from 'lucide-react';

// ... existing resolveIcon / ICON_MAP unchanged ...

const FALLBACKS: Record<string, IconType> = {
    database: Database as unknown as IconType,
};

export function resolveTechIcon(slug: string): IconType | null {
    if (FALLBACKS[slug]) {
        return FALLBACKS[slug];
    }

    const exportName = `Si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
    const Icon = (SimpleIcons as unknown as Record<string, IconType | undefined>)[exportName];

    return Icon ?? null;
}

const BRAND_COLORS: Record<string, string> = {
    openai: '#000000',
    anthropic: '#D97757',
    canva: '#00C4CC',
    midjourney: '#2C2D30',
    ahrefs: '#1A2B49',
    lookerstudio: '#4285F4',
    make: '#000000',
    zapier: '#FF4A00',
    n8n: '#EA4B71',
    cursor: '#000000',
};

/**
 * Resolves a tech-catalog icon slug to its official brand hex color,
 * sourced from the `simple-icons` data package (same slugs as
 * react-icons/si, just lowercase "si" export prefix instead of "Si").
 * Returns null for fallback/non-brand entries (e.g. 'database'),
 * letting the caller fall back to the discipline's theme accent.
 */
export function resolveTechColor(slug: string): string | null {
    if (BRAND_COLORS[slug]) {
        return BRAND_COLORS[slug];
    }

    if (FALLBACKS[slug]) {
        return null;
    }

    const exportName = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
    const icon = (SimpleIconsData as unknown as Record<string, { hex: string } | undefined>)[exportName];

    return icon ? `#${icon.hex}` : null;
}