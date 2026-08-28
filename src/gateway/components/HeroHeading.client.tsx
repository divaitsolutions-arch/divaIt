'use client';

import { motion } from "motion/react";
import { siteConfig } from '@/shared/config/site';

export function HeroHeading() {
  return (
    <>
      <h1 className="hero-heading">
        <motion.span
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="block text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(to right, #f97316, #ef4444, #ec4899, #a855f7, #6366f1, #3b82f6)' }}
        >
          {siteConfig.name}
        </motion.span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-steel"
      >
        Building Digital Solutions. Empowering People. Since <span className="text-cta">2017</span>.
      </motion.p>
    </>
  );
}
