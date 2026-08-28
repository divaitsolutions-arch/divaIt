'use client';

import { Globe, TrendingUp, Palette, Smartphone, Code2, Server, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { Container } from '@/shared/components/layout/Container';
import { Carousel } from '@/shared/components/ui/Carousel';
import type { ServiceData } from '@/features/agency/types/models';

// Icons mapped to the 8 services in agency.content.ts
const serviceIcons = [
  Globe,        // Web Development
  Zap,          // AI Consulting & Automation
  TrendingUp,   // Digital Marketing
  Palette,      // Brand & Design
  Smartphone,   // App Development
  Code2,        // E-Commerce Solutions
  Server,       // IT Infrastructure Strategy
  ShieldCheck,  // Managed Cloud & Domains
];

export default function AgencyServices({ 
  services, 
  content 
}: { 
  services: ServiceData[]; 
  content: { headline: string; subhead: string; } 
}) {
  const headerRef = useScrollReveal<HTMLDivElement>('children', {
    yOffset: 20,
    duration: 0.6,
  });

  return (
    <section id="services" className="relative w-full py-16 lg:py-24 overflow-hidden bg-paper">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 mesh-grid opacity-30" />
      </div>

      <Container className="relative z-10 mb-12">
        <div ref={headerRef} className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/80 px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.15em] text-primary backdrop-blur-sm shadow-sm">
            What We Do
          </div>
          <h2 className="section-heading text-ink">
            {content.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel md:text-xl">
            {content.subhead}
          </p>
        </div>
      </Container>

      <Container className="relative z-10">
        <Carousel
          items={services}
          keyExtractor={(service) => service.title}
          continuous={true}
          gap="gap-6"
          renderItem={(service, index) => {
            const Icon = serviceIcons[index] ?? Globe;
            const slug = service.slug || 'web-development';
            
            return (
              <Link
                href={`/agency/services/${slug}`}
                className="group relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-ink/5 bg-panel p-6 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-ink/10 hover:shadow-xl md:w-[380px]"
              >
                {/* Background glow that appears on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]`}
                />
                
                {/* Top border highlight */}
                <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative z-10 flex flex-1 flex-col">
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      style={{ boxShadow: `0 8px 24px -6px ${service.shadow}` }}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink">{service.title}</h3>
                  </div>

                  <p className="mb-8 flex-1 text-sm leading-relaxed text-steel">{service.heroDesc}</p>

                  <div className="mt-auto flex items-center justify-between border-t border-ink/5 pt-5">
                    <span className="text-[13px] font-bold uppercase tracking-wider text-ink/50 transition-colors group-hover:text-ink">
                      Explore Service
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:bg-ink group-hover:text-paper group-hover:shadow-md">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          }}
        />
      </Container>
    </section>
  );
}
