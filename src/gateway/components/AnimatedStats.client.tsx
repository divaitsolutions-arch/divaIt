'use client';

import { motion } from "motion/react";
import { AnimatedCounter } from '@/gateway/components/GatewayUI';

type Stat = { value: string; label: string };

export function AnimatedStats({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
      {stats.map((stat, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}>
          <span className="block text-3xl md:text-5xl font-display font-bold text-ink mb-6 tracking-tighter">
            <AnimatedCounter value={stat.value} />
          </span>
          <span className="block text-[13px] md:text-sm font-bold uppercase tracking-[0.15em] text-steel border-t border-ink/10 pt-5">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
