
import { SiReact, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { FaAws, FaCloud } from 'react-icons/fa';
import { FloatingIcon } from './FloatingIcon';
import { motion } from 'motion/react';

export function FloatingTechIcons() {
  const icons = [
    { component: FaAws, color: "#232F3E", shape: "circle", top: '15.6%', left: '74.1%', scale: 0.9, delay: 0 },
    { component: SiTypescript, color: "#3178C6", shape: undefined, top: '32.3%', left: '88.1%', scale: 1, delay: 0.4 },
    { component: SiReact, color: "#61DAFB", shape: undefined, top: '53.6%', left: '91.8%', scale: 1, delay: 0.8 },
    { component: SiNextdotjs, color: "#000000", shape: "circle", top: '74.1%', left: '84.4%', scale: 0.9, delay: 1.2 },
    { component: FaCloud, color: "#ec4899", shape: undefined, top: '88.1%', left: '67.7%', scale: 1.1, delay: 1.6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center translate-x-[15%]">
      <div className="relative w-[900px] h-[900px]">
        {/* Arc sweeping from top-right corner down the right side */}
        {icons.map((icon, index) => (
          <div
            key={index}
            className="tech-icon hero-entrance absolute"
            style={{ 
              top: icon.top, 
              left: icon.left, 
              transform: `translate(-50%, -50%) scale(${icon.scale})` 
            }}
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: icon.delay,
              }}
            >
              <FloatingIcon icon={icon.component} color={icon.color} shape={icon.shape as "circle" | undefined} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
