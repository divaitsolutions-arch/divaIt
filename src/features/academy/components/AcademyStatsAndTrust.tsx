"use client";

import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { academyHeroContent } from "@/features/academy/config/academy.content";
import { STAT_ICONS } from "./academy-hero/stat-icons";

const c = academyHeroContent;


export default function AcademyStatsAndTrust() {
  const statsRef = useScrollReveal<HTMLDivElement>('children', {
    yOffset: 20,
    duration: 0.6,
    stagger: 0.05
  });

  return (
    <section className="relative z-20 w-full bg-transparent px-6 pb-16 pt-12 lg:px-12 lg:pb-20 lg:pt-16">
      {/* ── Stats Bar ── */}
      <div className="mx-auto flex w-full max-w-[1200px] justify-center">
        <div
          ref={statsRef}
          className="flex w-full flex-wrap items-center justify-center gap-6 rounded-2xl border border-ink/10 bg-panel/90 px-6 py-5 shadow-sm backdrop-blur-xl sm:gap-10 lg:justify-between lg:gap-0 lg:px-10"
        >
          {c.stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 shadow-inner">
                {/* Adjusting icon sizes for crispness */}
                <div className="scale-75 sm:scale-90">{STAT_ICONS[stat.icon]}</div>
              </div>
              <div className="flex flex-col">
                <p className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-[13px] font-bold uppercase tracking-wider text-steel sm:text-[13px]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
