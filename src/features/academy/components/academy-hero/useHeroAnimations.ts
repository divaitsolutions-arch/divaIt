import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { useAnimate, stagger } from "motion/react";

export interface HeroAnimationRefs {
  container: MutableRefObject<HTMLElement | null>;
  leftCol: MutableRefObject<HTMLDivElement | null>;
  rightCol: MutableRefObject<HTMLDivElement | null>;
  floatingCards: MutableRefObject<(HTMLDivElement | null)[]>;
}

/**
 * Orchestrates the entrance timeline for the AcademyHero section.
 * Separates animation choreography from component rendering.
 */
export function useHeroAnimations(): HeroAnimationRefs {
  const [scope, animate] = useAnimate<HTMLElement>();
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !scope.current) {
      if (scope.current) {
        scope.current.querySelectorAll(".hero-reveal").forEach((el) => ((el as HTMLElement).style.opacity = "1"));
      }
      return;
    }

    const sequence: [Element | Element[], Record<string, unknown>, Record<string, unknown>][] = [];

    /* Left column — staggered children */
    if (leftColRef.current && leftColRef.current.children.length > 0) {
      // Lift the CSS FOUC blanket off the parent since we are animating the children
      leftColRef.current.style.opacity = "1";
      
      const children = Array.from(leftColRef.current.children);
      animate(children, { y: 40, opacity: 0 }, { duration: 0 });
      sequence.push([
        children,
        { y: 0, opacity: 1 },
        { duration: 0.9, delay: stagger(0.1), ease: "easeOut", at: 0.1 }
      ]);
    }

    /* Right column — laptop + cards container */
    if (rightColRef.current) {
      animate(rightColRef.current, { x: 60, opacity: 0 }, { duration: 0 });
      sequence.push([
        rightColRef.current,
        { x: 0, opacity: 1 },
        { duration: 1.1, ease: "easeOut", at: 0.3 }
      ]);
    }

    /* Floating feature cards — pop-in with spring */
    const cards = floatingRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length > 0) {
      animate(cards, { scale: 0.5, opacity: 0, y: 20 }, { duration: 0 });
      sequence.push([
        cards,
        { scale: 1, opacity: 1, y: 0 },
        { duration: 0.6, delay: stagger(0.15), type: "spring", bounce: 0.4, at: 1.0 }
      ]);
    }

    if (sequence.length > 0) {
      animate(sequence);
    }
  }, [animate, scope]);

  return {
    container: scope,
    leftCol: leftColRef,
    rightCol: rightColRef,
    floatingCards: floatingRef,
  };
}
