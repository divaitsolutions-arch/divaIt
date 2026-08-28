
import { motion } from 'motion/react';

export function OrbitalPaths() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center translate-x-[15%]">
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[900px] h-[900px] max-w-none opacity-60"
      >
        <defs>
          <linearGradient id="orbitGradient" x1="0" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" stopOpacity="0" />
            <stop offset="0.25" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="0.65" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.g 
          className="orbit-group-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <circle cx="500" cy="500" r="420" stroke="url(#orbitGradient)" strokeWidth="2" fill="none" />
          {/* Travelling particles */}
          <circle cx="80" cy="500" r="4" fill="#ec4899" className="transition-all duration-500 dark:[filter:drop-shadow(0_0_16px_#ec4899)_brightness(1.5)]" />
          <circle cx="920" cy="500" r="3" fill="#a855f7" className="transition-all duration-500 dark:[filter:drop-shadow(0_0_16px_#a855f7)_brightness(1.5)]" />
          <circle cx="500" cy="80" r="5" fill="#f97316" className="transition-all duration-500 dark:[filter:drop-shadow(0_0_16px_#f97316)_brightness(1.5)]" />
        </motion.g>
      </svg>
    </div>
  );
}
