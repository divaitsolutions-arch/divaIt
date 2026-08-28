'use client';

export interface OrbitDotPlacement {
    top: string;
    right: string;
}

interface OrbitDotsProps {
    dots: OrbitDotPlacement[];
}

/** Small decorative dots scattered around a panel, shown on lg+ screens only. */
export function OrbitDots({ dots }: OrbitDotsProps) {
    return (
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            {dots.map((dot, i) => (
                <span
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-primary/40"
                    style={{ top: dot.top, right: dot.right }}
                />
            ))}
        </div>
    );
}