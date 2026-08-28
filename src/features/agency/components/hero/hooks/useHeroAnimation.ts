import { useEffect } from 'react';
import { useAnimate, stagger } from 'motion/react';

export function useHeroAnimation() {
  const [containerRef, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (!containerRef.current) return;

    const sequence: [Element | Element[], Record<string, unknown>, Record<string, unknown>][] = [];
    
    // .hero-entrance
    const entrances = Array.from(containerRef.current.querySelectorAll('.hero-entrance'));
    if (entrances.length > 0) {
      animate(entrances, { opacity: 0, y: 40, scale: 0.95 }, { duration: 0 });
      sequence.push([
        entrances,
        { opacity: 1, y: 0, scale: 1 },
        { duration: 1.2, delay: stagger(0.15), ease: "easeOut", at: 0 }
      ]);
    }
    
    // .chart-line
    const lines = Array.from(containerRef.current.querySelectorAll('.chart-line'));
    if (lines.length > 0) {
      animate(lines, { strokeDasharray: '0 1000' }, { duration: 0 });
      sequence.push([
        lines,
        { strokeDasharray: '1000 0' },
        { duration: 2.5, ease: "easeInOut", at: 0.5 }
      ]);
    }

    // .chart-area
    const areas = Array.from(containerRef.current.querySelectorAll('.chart-area'));
    if (areas.length > 0) {
      animate(areas, { opacity: 0, y: 10 }, { duration: 0 });
      sequence.push([
        areas,
        { opacity: 0.8, y: 0 },
        { duration: 2.5, ease: "easeOut", at: 1 }
      ]);
    }

    // .chart-dot
    const dots = Array.from(containerRef.current.querySelectorAll('.chart-dot'));
    if (dots.length > 0) {
      animate(dots, { scale: 0, opacity: 0 }, { duration: 0 });
      sequence.push([
        dots,
        { scale: 1, opacity: 1 },
        { duration: 0.5, delay: stagger(0.1), type: "spring", bounce: 0.4, at: 1 }
      ]);
    }

    if (sequence.length > 0) animate(sequence);
  }, [animate, containerRef]);

  return { containerRef };
}
