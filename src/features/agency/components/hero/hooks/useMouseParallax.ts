import { useEffect } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'motion/react';

interface ParallaxOptions {
  amount?: number;
  inverse?: boolean;
}

export function useMouseParallax(
  options: ParallaxOptions = {}
): { x: MotionValue<number>; y: MotionValue<number> } {
  const { amount = 20, inverse = false } = options;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const x = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      const direction = inverse ? -1 : 1;

      mouseX.set(xPos * amount * direction);
      mouseY.set(yPos * amount * direction);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [amount, inverse, mouseX, mouseY]);

  return { x, y };
}
