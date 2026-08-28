'use client';

import { TrendingUp, type LucideIcon } from 'lucide-react';

interface IconEyebrowProps {
    icon?: LucideIcon;
    label: string;
    /** If provided, renders a secondary "Trending"-style pill next to the label. */
    trendingLabel?: string;
}

/** Icon-chip eyebrow row (icon square + uppercase label), with an optional trending tag.
 *  When no icon is given, the label renders as a bordered pill instead. */
export function IconEyebrow({ icon: Icon, label, trendingLabel }: IconEyebrowProps) {
    return (
        <div className="mb-6 flex flex-wrap items-center gap-3">
            {Icon ? (
                <div className="inline-flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Icon size={16} className="text-primary" />
                    </span>
                    <span className="text-sm font-bold uppercase tracking-widest text-primary">{label}</span>
                </div>
            ) : (
                <span className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-ink/70">
                    {label}
                </span>
            )}
            {trendingLabel && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-[13px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(239,68,68,0.6)]">
                    <TrendingUp size={11} />
                    {trendingLabel}
                </span>
            )}
        </div>
    );
}