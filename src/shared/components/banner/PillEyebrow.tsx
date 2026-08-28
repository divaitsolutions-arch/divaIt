'use client';

interface PillEyebrowProps {
    label: string;
}

/** Simple bordered pill eyebrow (e.g. "Business Growth"). */
export function PillEyebrow({ label }: PillEyebrowProps) {
    return (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/80 px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.15em] text-steel backdrop-blur-sm shadow-sm">
            {label}
        </div>
    );
}