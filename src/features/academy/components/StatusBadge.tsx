import type { ReactNode } from 'react';

// Real signal only. If a path/course doesn't carry an explicit badge from
// content data, the caller simply doesn't render this — no index-based or
// string-length based guessing. Wire this to real enrollment/rating data
// when available.
export function StatusBadge({ label, tone = 'brand', icon, iconClassName }: { label: string; tone?: 'brand' | 'amber'; icon?: ReactNode; iconClassName?: string }) {
    const toneClasses =
        tone === 'amber'
            ? 'bg-amber-500/10 text-amber-600'
            : 'bg-primary/10 text-primary';
    return (
        <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[13px] font-bold uppercase tracking-wider ${toneClasses}`}>
            {icon && <span className={iconClassName}>{icon}</span>}
            {label}
        </span>
    );
}