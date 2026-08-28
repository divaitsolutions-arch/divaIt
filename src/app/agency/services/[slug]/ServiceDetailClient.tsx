'use client';

import Link from 'next/link';
import { ChevronLeft, MoveRight, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ServiceData } from '@/features/agency/types/models';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
      >
        <span className="text-sm font-bold text-ink pr-8">{question}</span>
        {open ? <ChevronUp size={18} className="shrink-0 text-steel" /> : <ChevronDown size={18} className="shrink-0 text-steel" />}
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-ink/80 -mt-1">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function ServiceDetailClient({ service }: { service: ServiceData }) {
  return (
    <main className="min-h-[100dvh] bg-paper text-ink pb-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none h-[600px] overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full hidden opacity-10"
          style={{ backgroundColor: service.accent }}
        />
        <div className="absolute inset-0 mesh-grid opacity-15 mask-bottom-fade" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-4 pt-36 lg:px-8 lg:pt-48">
        
        {/* Back Link */}
        <Link
          href="/agency#services"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Services
        </Link>

        {/* 2-Column Sidebar Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Sidebar Info */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-panel/80 px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.15em] text-steel border border-ink/10 backdrop-blur-sm shadow-sm">
                Agency Service
              </div>
              <h1 className="font-display text-3xl font-bold leading-tight lg:text-4xl mb-4">
                {service.title}
              </h1>
              <p className="text-lg font-semibold" style={{ color: service.accent }}>
                {service.subtitle}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="pt-6 border-t border-ink/5">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-steel mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-panel border border-ink/10 px-3 py-1.5 text-[13px] font-bold text-ink shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Get a Quote */}
            <div className="pt-6 border-t border-ink/5">
              <Link
                href="/agency/contact"
                className={`group inline-flex w-full justify-center items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg bg-gradient-to-r ${service.gradient}`}
                style={{ boxShadow: `0 8px 30px -8px ${service.shadow}` }}
              >
                Get a Quote
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Main Content Stream */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview */}
            <div>
              <p className="text-lg leading-relaxed text-ink/85 md:text-xl font-medium">
                {service.heroDesc}
              </p>
            </div>

            {/* Features Grid (Compact 2x2 style) */}
            <div>
              <h3 className="font-display text-xl font-bold mb-5">What&apos;s Included</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.features.map((feature, i) => (
                  <div
                    key={feature.title}
                    className="group relative rounded-2xl border border-ink/10 bg-panel p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-sm font-black text-steel transition-all duration-500 group-hover:bg-gradient-to-br group-hover:text-white"
                        style={{ ['--tw-gradient-from' as string]: service.accent, ['--tw-gradient-to' as string]: service.accent + '99' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h4 className="font-display text-base font-bold text-ink leading-tight">{feature.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-ink/80">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h3 className="font-display text-xl font-bold mb-5">How We Deliver</h3>
              <div className="space-y-0 rounded-2xl border border-ink/10 bg-panel px-6 py-2 shadow-sm">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-center gap-5 py-4 border-b border-ink/10 last:border-0">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}99)` }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm font-bold text-ink">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-display text-xl font-bold mb-5">Common Questions</h3>
              <div className="rounded-2xl border border-ink/10 bg-panel px-6 shadow-sm">
                {service.faq.map((item) => (
                  <FAQItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="rounded-3xl border border-ink/10 bg-panel p-8 text-center shadow-sm">
              <h3 className="mb-3 font-display text-xl font-bold">Ready to start?</h3>
              <p className="mb-6 text-helper">
                Tell us about your project. We respond within one business day.
              </p>
              <Link
                href="/agency/contact"
                className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${service.gradient} px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg`}
                style={{ boxShadow: `0 8px 30px -8px ${service.shadow}` }}
              >
                Start a Project
                <MoveRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
