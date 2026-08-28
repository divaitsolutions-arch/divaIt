import { useState } from 'react';
import { motion } from 'motion/react';

export function Particles() {
  const [particles] = useState(() => Array.from({ length: 40 }).map(() => ({
    width: Math.random() * 3 + 1 + 'px',
    height: Math.random() * 3 + 1 + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    opacity: Math.random() * 0.3 + 0.1,
    y: (Math.random() - 0.5) * 200,
    x: (Math.random() - 0.5) * 200,
    targetOpacity: Math.random() * 0.3 + 0.1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
  })));

  return (
    <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/40 hidden"
          style={{
            width: p.width,
            height: p.height,
            top: p.top,
            left: p.left,
          }}
          initial={{ opacity: p.opacity, x: 0, y: 0 }}
          animate={{
            y: p.y,
            x: p.x,
            opacity: p.targetOpacity,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
