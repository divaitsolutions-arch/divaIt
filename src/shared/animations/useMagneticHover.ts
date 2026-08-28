'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

/**
 * Attaches a magnetic / parallax translate effect to an element based on
 * pointer position within its bounds. Same primitive powers two different
 * feels depending on `strength`:
 *   - ~0.25–0.35 → magnetic CTA pull
 *   - ~0.02–0.05 → subtle showcase parallax
 *
 * No-ops entirely under prefers-reduced-motion.
 * Now implemented with Framer Motion, returns { ref, x, y } for use with <motion.div>.
 */
export function useMagneticHover<T extends HTMLElement>(strength = 0.3, stiffness = 150, damping = 15) {
    const ref = useRef<T>(null);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const x = useSpring(mouseX, { stiffness, damping });
    const y = useSpring(mouseY, { stiffness, damping });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const handleMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            mouseX.set(relX * strength);
            mouseY.set(relY * strength);
        };

        const handleLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
        };

        el.addEventListener('pointermove', handleMove);
        el.addEventListener('pointerleave', handleLeave);

        return () => {
            el.removeEventListener('pointermove', handleMove);
            el.removeEventListener('pointerleave', handleLeave);
        };
    }, [strength, mouseX, mouseY]);

    return { ref, x, y };
}