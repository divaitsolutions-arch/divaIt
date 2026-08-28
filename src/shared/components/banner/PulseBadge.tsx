'use client';

import type { LucideIcon } from 'lucide-react';

interface PulseBadgeProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    /** Position within the (relative) parent. */
    top: string;
    right: string;
    size?: number;
}

/** Pulsing circular centerpiece badge. Purely decorative. */
export function PulseBadge({ icon: Icon, title, subtitle, top, right, size = 116 }: PulseBadgeProps) {
    return (
        <div className="absolute" style={{ top, right, transform: 'translate(50%, -50%)' }} aria-hidden="true">
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                <span className="absolute inset-0 rounded-full bg-primary/50 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <span className="absolute inset-[-6px] rounded-full bg-primary/15" />
                <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#C24DDB] via-[#9B3FE0] to-[#6B2FD8] px-3 text-center shadow-[0_18px_40px_-8px_rgba(107,47,216,0.55)]">
                    <Icon size={20} className="mb-0.5 text-white" strokeWidth={1.75} />
                    <span className="text-[13px] font-bold leading-tight text-white">{title}</span>
                    <span className="mt-0.5 text-[13px] leading-tight text-white/85">{subtitle}</span>
                    <span className="mt-1 h-px w-6 bg-white/70" />
                </div>
            </div>
        </div>
    );
}