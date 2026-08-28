import { useEffect, useLayoutEffect } from 'react';
import { useAnimate, useInView, stagger } from 'motion/react';
import type { MutableRefObject } from 'react';
import type { EasingDefinition } from 'motion/react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ScrollRevealOptions {
  yOffset?: number;
  duration?: number;
  stagger?: number;
  ease?: EasingDefinition;
  start?: string;
}

/**
 * Reusable hook for triggering reveal animations on scroll.
 * Automatically handles reduced motion preferences.
 * Reimplemented with Framer Motion for a lightweight animation stack.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  selectorOrChildren: string | 'children' = 'children',
  options: ScrollRevealOptions = {}
): MutableRefObject<T | null> {
  const [scope, animate] = useAnimate<T>();
  const isInView = useInView(scope, { once: true, margin: "-10% 0px" });

  const {
    yOffset = 24,
    duration = 0.6,
    stagger: staggerTime = 0.05,
    ease = 'easeOut',
  } = options;

  useIsomorphicLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !scope.current) return;

    const target = selectorOrChildren === 'children' 
      ? Array.from(scope.current.children) 
      : selectorOrChildren;

    if (!isInView) {
      animate(target as Element[], { y: yOffset, opacity: 0 }, { duration: 0 });
    } else {
      animate(
        target as Element[],
        { y: 0, opacity: 1 },
        { duration, delay: staggerTime ? stagger(staggerTime) : 0, ease }
      );
    }
  }, [isInView, scope, selectorOrChildren, yOffset, duration, staggerTime, ease, animate]);

  return scope as MutableRefObject<T | null>;
}
