
import { motion } from 'motion/react';
import { Dashboard } from './dashboard/Dashboard';
import { PhoneMockup } from './phone/PhoneMockup';
import { CodeCard } from './code/CodeCard';
import { FloatingTechIcons } from './floating/FloatingTechIcons';
import { OrbitalPaths } from './floating/OrbitalPaths';
import { useHeroAnimation } from './hooks/useHeroAnimation';
import { useMouseParallax } from './hooks/useMouseParallax';

export function HeroVisual() {
  const { containerRef } = useHeroAnimation();
  const { x, y } = useMouseParallax({ amount: 12 });

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="relative w-full h-[620px] flex items-center justify-center isolate origin-center scale-[0.55] sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.7] lg:translate-x-16 xl:scale-[0.8] xl:translate-x-12"
      style={{ perspective: '1800px' }}
    >
      {/* Background Glow — pink/orange radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none -z-20"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, rgba(249,115,22,0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Orbital Path Background */}
      <OrbitalPaths />

      {/* Floating Icons — parallax layer */}
      <motion.div className="absolute inset-0 z-40" style={{ x, y }}>
        <FloatingTechIcons />
      </motion.div>

      {/* ── Main 2D composition ── */}
      <div className="relative z-10 w-[750px] h-full flex items-center justify-center">

        {/* Dashboard (Back layer) — offset so growth extends left & up only */}
        <div
          className="hero-entrance absolute"
          style={{ zIndex: 10, marginLeft: '-20px', marginTop: '-10px' }}
        >
          <Dashboard />
        </div>

        {/* Code Card (Front-left) — moved in front of dashboard */}
        <div
          className="hero-entrance absolute"
          style={{
            bottom: '2%',
            left: '-6%',
            zIndex: 20,
          }}
        >
          <CodeCard />
        </div>

        {/* Phone (Front-right) — premium mockup */}
        <div
          className="hero-entrance absolute"
          style={{
            bottom: '4%',
            right: '-2%',
            zIndex: 30,
          }}
        >
          <PhoneMockup />
        </div>
      </div>
    </div>
  );
}
