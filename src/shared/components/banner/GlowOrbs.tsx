'use client';

interface GlowOrbsProps {
    glowClass: string;
}

/**
 * Two large blurred ambient circles, positioned top-left and bottom-right
 * of their parent (which must be `relative`/`overflow-hidden`). Purely
 * decorative — hidden from assistive tech.
 */
export function GlowOrbs({ glowClass }: GlowOrbsProps) {
    return (
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay" aria-hidden="true">
            <div className={`absolute -left-[20%] -top-[20%] h-[500px] w-[500px] rounded-full opacity-20 blur-3xl ${glowClass}`} />
            <div className={`absolute -bottom-[20%] -right-[20%] h-[600px] w-[600px] rounded-full opacity-20 blur-3xl ${glowClass}`} />
        </div>
    );
}