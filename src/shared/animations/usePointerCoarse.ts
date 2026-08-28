'use client';

import { useEffect, useState } from 'react';

/**
 * Reports whether the primary pointer is coarse (touch), so hover/drag-only
 * interactions (e.g. mouse-parallax) can skip themselves on touch devices.
 *
 * Reads `matchMedia` once on mount + listens for changes, instead of being
 * called inline inside a mousemove handler (which previously ran the
 * matchMedia lookup on every pointer event in both PromotionalPackagesBanner
 * and PackagesBanner).
 */
export function usePointerCoarse(): boolean {
    const [isCoarse, setIsCoarse] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(pointer: coarse)');
        setIsCoarse(mql.matches);

        // Covers devices where pointer type can change at runtime, e.g. a
        // 2-in-1 laptop switching between mouse and touch/stylus.
        const handleChange = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
        mql.addEventListener('change', handleChange);
        return () => mql.removeEventListener('change', handleChange);
    }, []);

    return isCoarse;
}