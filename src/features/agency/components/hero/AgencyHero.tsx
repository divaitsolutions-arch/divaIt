'use client';

import { Shield, Play, Clock } from 'lucide-react';
import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { useMagneticHover } from '@/shared/animations/useMagneticHover';
import { Button } from '@/shared/components/ui/Button';
import { motion } from 'motion/react';
import { agencyHeroContent } from '@/features/agency/config/agency.content';
import { HeroVisual } from './HeroVisual';
import { Container } from '@/shared/components/layout/Container';

const trustItems: { Icon: React.ElementType; label: string }[] = [
  { Icon: Shield, label: 'No obligation consultation' },
  { Icon: Clock, label: 'Usually responds within 24 hours' },
];

export default function AgencyHero() {
  const heroRef = useScrollReveal<HTMLElement>('.hero-reveal', {
    yOffset: 24,
    duration: 0.8,
    stagger: 0.12,
    ease: 'easeOut',
  });

  const hero = agencyHeroContent;

  return (
    <section
      ref={heroRef}
      id="about"
      className="relative w-full overflow-x-clip pt-24 pb-16 text-ink lg:pt-28 lg:pb-20"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 mesh-grid opacity-[0.35]" />
        <div className="absolute -top-32 right-[-10%] h-[560px] w-[560px] rounded-full bg-primary/[0.06] hidden" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-trust/[0.05] hidden" />
      </div>

      <Container className="relative z-10">
        {/* ── Two-column hero ── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-6">
          {/* Left column */}
          <div>
            {/* Eyebrow — dot + label */}
            <div className="hero-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.08] px-4 py-1.5 text-[13px] font-bold uppercase tracking-wider text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              {hero.eyebrow}
            </div>

            {/* Headline */}
            <h1 className="hero-reveal mb-6 max-w-xl hero-heading">
              {hero.headline[0]}{' '}
              <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                {hero.headline[1]}
              </span>
              {hero.headline[2] ? <>{' '}{hero.headline[2]}</> : null}
            </h1>

            {/* Description */}
            <p className="hero-reveal mb-10 max-w-[480px] text-base leading-relaxed text-steel md:text-xl">
              {hero.description}
            </p>

            {/* CTA row — pill buttons */}
            <div className="hero-reveal flex flex-wrap items-center gap-4">
              <MagneticCta href={hero.primaryCta.href} label={hero.primaryCta.label} />

              <Button href={hero.secondaryCta.href} variant="outline" arrow={false}>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Play
                      size={9}
                      fill="currentColor"
                      className="translate-x-px text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  {hero.secondaryCta.label}
                </span>
              </Button>
            </div>

            {/* Trust row — 3 icon items */}
            <div className="hero-reveal mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {trustItems.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[13px] text-ink font-medium">
                  <Icon size={13} className="shrink-0 text-steel" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* ── Trusted-by logo bar (Moved to left column) ── */}
            {hero.trustedBy && hero.trustedBy.length > 0 && (
              <div className="hero-reveal mt-12">
                <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.2em] text-steel">
                  Trusted by forward-thinking brands
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {hero.trustedBy.map((name) => (
                    <span
                      key={name}
                      className="text-sm font-bold text-steel transition-colors hover:text-ink flex items-center gap-1.5"
                    >
                      <div className="w-3 h-3 bg-steel rounded-full clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column — dashboard mockup */}
          <div className="hero-reveal relative hidden lg:flex items-center justify-center overflow-visible">
            <HeroVisual />
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="hero-reveal mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full relative z-20">
          {[
            { value: "120+", label: "Projects Delivered", sub: "Across 15+ industries", icon: "🚀", color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
            { value: "40+", label: "Active Clients", sub: "Long-term partnerships", icon: "👥", color: "text-primary dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
            { value: "7+", label: "Years in Market", sub: "Building digital success", icon: "🏆", color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
            { value: "96%", label: "Client Retention", sub: "We build trust", icon: "📈", color: "text-primary dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 dark:bg-[#05040a]/80 backdrop-blur-sm border border-ink/10 dark:border-white/10 rounded-2xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-ink dark:text-white tracking-tight">{stat.value}</div>
                <div className="text-sm font-bold text-ink dark:text-white leading-tight mt-1">{stat.label}</div>
                <div className="text-[13px] text-steel mt-0.5 sm:text-sm">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <ScrollCue />
    </section>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function MagneticCta({ href, label }: { href: string; label: string }) {
  const { ref, x, y } = useMagneticHover<HTMLDivElement>(0.25);

  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block">
      <Button href={href} variant="cta">
        {label}
      </Button>
    </motion.div>
  );
}

function ScrollCue() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 flex-col items-center gap-2 lg:flex z-30"
      aria-hidden="true"
    >
      <div className="relative w-6 h-10 rounded-full border-[2.5px] border-primary flex justify-center pt-1.5 bg-white shadow-sm shadow-primary/20">
        <div
          className="w-1 h-2 bg-primary rounded-full"
          style={{ animation: 'premium-mouse-scroll 2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite' }}
        />
      </div>
    </div>
  );
}