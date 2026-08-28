'use client';

/** Decorative dashed "constellation" ellipses, shown on lg+ screens only. */
export function OrbitPaths() {
    return (
        <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <ellipse
                cx="72"
                cy="45"
                rx="20"
                ry="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.25"
                strokeDasharray="1.5 2"
                className="text-primary/25"
                transform="rotate(-12 72 45)"
            />
            <ellipse
                cx="80"
                cy="58"
                rx="16"
                ry="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.25"
                strokeDasharray="1.5 2"
                className="text-primary/20"
                transform="rotate(8 80 58)"
            />
        </svg>
    );
}