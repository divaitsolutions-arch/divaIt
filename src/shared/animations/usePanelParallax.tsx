'use client';

import { useRef } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'motion/react';
import { usePointerCoarse } from './usePointerCoarse';

interface UsePanelParallaxOptions {
    /**
     * Damp the tracked values with a spring instead of following the pointer
     * 1:1. Off by default (matches PromotionalPackagesBanner's original
     * instant-tracking feel); PackagesBanner opts in for its softer,
     * springier feel.
     */
    smooth?: boolean;
}

interface UsePanelParallax {
    panelRef: React.RefObject<HTMLDivElement | null>;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    handleMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleLeave: () => void;
}

/**
 * Shared pointer-parallax wiring for the promotional banners: tracks mouse
 * position relative to a panel, skips coarse (touch) pointers via
 * usePointerCoarse, and resets to center on mouse-leave.
 *
 * This was previously duplicated — separately, and with a
 * matchMedia-per-mousemove bug in both copies — inside
 * PromotionalPackagesBanner.tsx and PackagesBanner.tsx.
 */
export function usePanelParallax({ smooth = false }: UsePanelParallaxOptions = {}): UsePanelParallax {
    const panelRef = useRef<HTMLDivElement>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 100, damping: 20 });
    const springY = useSpring(rawY, { stiffness: 100, damping: 20 });
    const isCoarsePointer = usePointerCoarse();

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isCoarsePointer || !panelRef.current) return;
        const rect = panelRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        rawX.set(relX);
        rawY.set(relY);
    };

    const handleLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    return {
        panelRef,
        mouseX: smooth ? springX : rawX,
        mouseY: smooth ? springY : rawY,
        handleMove,
        handleLeave,
    };
}