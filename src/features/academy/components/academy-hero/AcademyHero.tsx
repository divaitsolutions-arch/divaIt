"use client";


import { Button } from '@/shared/components/ui/Button';
import { academyHeroContent } from "@/features/academy/config/academy.content";


import { motion } from "motion/react";
import LaptopMockup from "./LaptopMockup";
import { CARD_META, CARD_POSITIONS } from "./card-meta";

import { useEnrollmentModal } from "@/features/academy/enrollment/contexts/EnrollmentModalContext";
import { Container } from '@/shared/components/layout/Container';

/* ============================================================
   AcademyHero — Main hero section for the Academy landing page.

   Architecture (post-refactor):
   ├── LaptopMockup       → 3D MacBook + DashboardUI (component)
   ├── card-meta          → Floating card icon/position config
   └── stat-icons         → Stat bar icon mapping
   ============================================================ */

const c = academyHeroContent;

export default function AcademyHero() {
  const { openModal } = useEnrollmentModal();

  return (
    <section
      id="academy-hero"
      className="relative w-full overflow-hidden pt-28 pb-0 text-ink lg:pt-36"
    >
      {/* ── Premium Background ── */}
      <HeroBackground />

      {/* ── Hero Content ── */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <LeftColumn openModal={openModal} />
          <RightColumn />
        </div>
      </Container>

    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Sub-components — kept in the same file for co-location with
   the layout, but each is a focused, single-responsibility unit.
   Uses explicit ref props instead of forwardRef for simplicity
   with React 18's strict null-ref typing.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Background blurs + mesh grid ── */
function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -top-40 right-0 h-[700px] w-[700px] rounded-full bg-primary/[0.06] hidden" />
      <div className="absolute bottom-0 -left-40 h-[600px] w-[600px] rounded-full bg-pink-500/[0.05] hidden" />
      <div className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/[0.03] hidden" />
      <div className="absolute inset-0 mesh-grid" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}

/* ── Left Column: eyebrow, headline, CTAs, social proof ── */
function LeftColumn({ openModal }: { openModal: () => void }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hero-reveal flex w-full flex-col items-start lg:col-span-6 lg:pr-8"
    >
      {/* Eyebrow badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/[0.08] px-4 py-2">
        <span className="text-base" aria-hidden="true">
          🎓
        </span>
        <span className="text-[13px] font-bold uppercase tracking-wider text-primary">
          {c.eyebrowBadge}
        </span>
      </div>

      {/* Headline */}
      <h1 className="mb-6 max-w-[600px] hero-heading">
        {c.headline[0]}
        <br />
        <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
          {c.headline[1]}
        </span>
        <br />
        {c.headline[2]}
      </h1>

      {/* Description */}
      <p className="mb-8 max-w-md text-base leading-relaxed text-steel md:text-xl">
        {c.description}
      </p>

      {/* CTAs */}
      <div className="mb-8 flex flex-wrap items-center gap-6">
        <Button
          onClick={openModal}
          variant="cta"
          size="lg"
        >
          {c.primaryCta.label}
        </Button>
        <Button
          href={c.secondaryCta.href}
          variant="outline"
          size="lg"
        >
          {c.secondaryCta.label}
        </Button>
      </div>

    </motion.div>
  );
}

/* ── Right Column: Laptop mockup + floating feature cards ── */
function RightColumn() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="hero-reveal relative hidden mt-12 lg:col-span-6 lg:mt-0 lg:block"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-12 rounded-[40px] bg-gradient-to-tr from-primary/15 to-pink-500/10 hidden"
        aria-hidden="true"
      />

      <LaptopMockup />

      {/* Floating Feature Cards */}
      {c.floatingCards.map((card, i) => {
        const meta = CARD_META[card.title];
        return (
          <motion.div
            key={card.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 + i * 0.15 }}
            className={`absolute z-30 w-[140px] rounded-xl ring-1 ring-ink/5 bg-paper px-3 py-2.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] sm:w-[170px] sm:px-4 sm:py-3 ${i % 2 === 0 ? "float-card" : "float-card-delayed"
              } ${CARD_POSITIONS[card.position]}`}
          >
            <div
              className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${meta.bg}`}
            >
              <div className="scale-90 sm:scale-100">{meta.icon}</div>
            </div>
            <p className="text-[13px] font-bold leading-tight text-ink sm:text-sm">
              {card.title}
            </p>
            <p className="text-[13px] leading-relaxed text-steel sm:text-[13px]">
              {card.desc}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}