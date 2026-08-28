'use client';

import Link from 'next/link';
import { ChevronLeft, ExternalLink, Quote, MoveRight } from 'lucide-react';
import type { CaseStudyData } from '@/features/agency/types/models';
import { Button } from '@/shared/components/ui/Button';

export default function CaseStudyClient({ study }: { study: CaseStudyData }) {
  return (
    <main className="min-h-[100dvh] bg-paper text-ink pb-20">
      
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none h-[600px] overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full hidden opacity-20"
          style={{ backgroundColor: study.accent }}
        />
        <div className="absolute inset-0 mesh-grid opacity-30 mask-bottom-fade" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-4 pt-36 lg:px-8 lg:pt-48">
        
        {/* Back Link */}
        <Link
          href="/agency#portfolio"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Portfolio
        </Link>

        {/* 2-Column Sidebar Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Sidebar Project Info */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            
            {/* Header Info */}
            <div>
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${study.gradient} text-2xl font-black text-white shadow-xl shadow-ink/5 ring-1 ring-black/5`}
              >
                {study.initial}
              </div>
              <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.2em] text-steel">
                {study.industry} · {study.timeline}
              </div>
              <h1 className="font-display text-3xl font-bold leading-tight lg:text-4xl mb-4">
                {study.name}
              </h1>
              <p className="text-sm font-bold tracking-widest uppercase" style={{ color: study.accent }}>
                {study.type}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/10 bg-panel px-3 py-1.5 text-[13px] font-bold text-steel"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-steel mb-3">Built With</h3>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white border border-ink/5 px-3 py-1 text-[13px] font-semibold text-ink shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Link */}
            {study.liveLink && (
              <div className="pt-4 border-t border-ink/5">
                <a
                  href={study.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex w-full justify-center items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg bg-gradient-to-r ${study.gradient}`}
                >
                  Visit Live Site
                  <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
            
          </div>


          {/* Right Column: The Story */}
          <div className="lg:col-span-8 bg-white border border-ink/5 rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            
            {/* Summary */}
            <p className="text-lg md:text-xl font-medium leading-relaxed text-ink mb-16">
              {study.heroDesc}
            </p>

            {/* Results Grid - Compact 2x2 inside column */}
            <div className="mb-16">
              <h3 className="font-display text-xl font-bold mb-5">Impact & Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.results.map((result) => (
                  <div
                    key={result.metric}
                    className="rounded-xl border border-ink/10 bg-panel p-4 shadow-sm"
                  >
                    <div
                      className="mb-1 text-2xl font-black tracking-tight"
                      style={{ color: study.accent }}
                    >
                      {result.value}
                    </div>
                    <div className="mb-1 text-sm font-bold text-ink">{result.metric}</div>
                    <p className="text-helper leading-relaxed">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-12 mb-16">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-primary mb-3">The Challenge</h3>
                <p className="text-base leading-relaxed text-steel">{study.challenge}</p>
              </div>
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-emerald-600 mb-3">Our Solution</h3>
                <p className="text-base leading-relaxed text-steel">{study.solution}</p>
              </div>
            </div>

            {/* Testimonial */}
            {study.testimonial && (
              <div className="relative rounded-2xl border border-ink/5 bg-panel p-8">
                <div className="absolute top-6 right-6 text-ink/5">
                  <Quote size={60} strokeWidth={1} fill="currentColor" />
                </div>
                <p className="relative z-10 mb-6 text-lg font-medium leading-relaxed text-ink italic">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </p>
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${study.gradient} text-[13px] font-bold text-white shadow-sm ring-2 ring-white`}
                  >
                    {study.testimonial.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-display text-base font-bold text-ink">{study.testimonial.name}</div>
                    <div className="text-[13px] font-semibold uppercase tracking-wider text-steel">{study.testimonial.role}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom CTA block */}
            <div className="mt-16 pt-12 border-t border-ink/5 text-center">
              <h3 className="mb-3 font-display text-2xl font-bold">Want similar results?</h3>
              <p className="mb-6 text-helper">Let&apos;s talk about your project. Free consultation, no commitment.</p>
              <Button href="/agency/contact" variant="gradient-blue" className="px-8 py-3 rounded-full shadow-md hover:-translate-y-0.5 transition-transform">
                Start Your Project <MoveRight size={16} className="ml-2" />
              </Button>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
