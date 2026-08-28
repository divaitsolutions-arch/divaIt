'use client';

import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { ICON_REGISTRY, type IconRegistryId } from '@/shared/icons/brand-Icons';

/* ----------------------------------------------------------
   OrbitField

   Consolidates two near-identical, independently-drifted
   implementations of "floating brand icons with mouse parallax"
   that previously lived inside PromotionalPackagesBanner.tsx and
   PackagesBanner.tsx. Differences that had crept in between them:
     - one respected aria-hidden on the decorative wrapper, one
       didn't
     - one smoothed mouseX/mouseY with useSpring, one used the raw
       motion values directly
     - neither respected prefers-reduced-motion for the infinite
       float animation
   This version keeps the better behavior from each (spring +
   aria-hidden) and adds reduced-motion support once, centrally.
----------------------------------------------------------- */

export interface OrbitIconPlacement {
    id: IconRegistryId;
    top: string;
    right: string;
    size: number;
    depth: number;
}

interface OrbitFieldProps {
    icons: OrbitIconPlacement[];
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    /** Multiplier applied to depth for the parallax offset. Default 26. */
    parallaxStrength?: number;
    className?: string;
}

function OrbitIconNode({
    icon,
    index,
    mouseX,
    mouseY,
    parallaxStrength,
    prefersReducedMotion,
}: {
    icon: OrbitIconPlacement;
    index: number;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    parallaxStrength: number;
    prefersReducedMotion: boolean;
}) {
    const registryItem = ICON_REGISTRY[icon.id];

    // Reduced-motion fix: parallax is pointer-driven rather than a
    // self-running animation, so it's arguably not what WCAG 2.3.3 targets
    // — but continuous motion tied to hover can still bother
    // vestibular-sensitive users regardless of what triggers it. Taking the
    // stricter reading: zero the strength under reduced motion so the node
    // holds still, rather than leaving cursor-tracking at full power.
    const strength = prefersReducedMotion ? 0 : parallaxStrength * icon.depth;
    const x = useTransform(mouseX, (v) => v * strength);
    const y = useTransform(mouseY, (v) => v * strength);

    return (
        <motion.div
            style={{
                position: 'absolute',
                width: icon.size,
                height: icon.size,
                top: icon.top,
                right: icon.right,
                x,
                y,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                type: 'spring',
                bounce: 0.4,
            }}
            className="flex items-center justify-center rounded-2xl border border-white/50 bg-white/40 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.22)] backdrop-blur-md dark:border-ink/10 dark:bg-panel"
        >
            <motion.div
                animate={
                    prefersReducedMotion
                        ? undefined
                        : {
                            y: [0, 6, 0],
                            x: [0, index % 2 === 0 ? 3 : -3, 0],
                        }
                }
                transition={{
                    duration: 3 + index * 0.35,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                }}
            >
                {registryItem && registryItem.render(icon.size * 0.58)}
            </motion.div>
        </motion.div>
    );
}

export function OrbitField({ icons, mouseX, mouseY, parallaxStrength = 26, className }: OrbitFieldProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className={className} aria-hidden="true">
            {icons.map((icon, i) => (
                <OrbitIconNode
                    // id isn't guaranteed unique within a single placement array
                    // (the same brand icon can appear at two positions), so key
                    // on position too.
                    key={`${icon.id}-${i}`}
                    icon={icon}
                    index={i}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    parallaxStrength={parallaxStrength}
                    prefersReducedMotion={!!prefersReducedMotion}
                />
            ))}
        </div>
    );
}