'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoveRight, CheckCircle2, ChevronDown, Clock, Users, Headphones, Star, Award } from 'lucide-react';
import { packagesContent } from '@/features/academy/config/packages.content';
import { useEnrollmentModal } from '@/features/academy/enrollment/contexts/EnrollmentModalContext';
import { resolveIcon } from '@/features/academy/lib/icons';
import { Container } from '@/shared/components/layout/Container';
import { Package, FAQ } from '@/features/academy/types/models';

export default function PackagesClient({
  initialPackages = [],
  initialFaqs = []
}: {
  initialPackages?: Package[],
  initialFaqs?: FAQ[]
}) {
  const { hero } = packagesContent;
  const packages = initialPackages.length > 0 ? initialPackages : packagesContent.packages;
  const { openModal } = useEnrollmentModal();
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const togglePackage = (id: string) => {
    setExpandedPackages((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-[100dvh] bg-paper pb-24 pt-24 text-ink">
      {/* ━━━ Hero Section ━━━ */}
      <section className="relative overflow-hidden px-6 pb-16 text-center lg:px-12">
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2">
            <Star size={14} className="text-primary" />
            <span className="text-[13px] font-bold uppercase tracking-widest text-primary">
              {hero.badge}
            </span>
          </div>
          <h1 className="mb-4 page-heading text-ink">
            {hero.headline}
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg font-medium text-ink/80">
            {hero.description}
          </p>

          {/* Trust Signal / Social Proof */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    key={i}
                    src={`https://i.pravatar.cc/300?img=${i + 10}`}
                    alt="Student"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-paper object-cover shadow-sm"
                  />
                ))}
              </div>
              <p className="text-[14px] font-medium text-steel">
                Join <span className="font-bold text-ink">500+ students</span>
              </p>
            </div>

            <div className="hidden h-8 w-px bg-ink/10 sm:block" />

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex gap-0.5 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-0.5 text-[14px] font-medium text-steel">
                <span className="font-bold text-ink">4.9/5</span> Google Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Pricing Grid ━━━ */}
      <Container as="section" className="relative z-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {packages.map((pkg) => {
            const Icon = resolveIcon(pkg.icon as string);
            const SupportIcon = resolveIcon(pkg.supportIcon || 'Users');
            const isExpanded = expandedPackages[pkg.id] || false;
            const visibleCount = 5;
            const displayFeatures = isExpanded ? pkg.features : pkg.features.slice(0, visibleCount);
            const hiddenCount = pkg.features.length - visibleCount;

            // Discount calculation
            const discountPercent = pkg.regularPriceValue
              ? Math.round(((pkg.regularPriceValue - pkg.priceValue) / pkg.regularPriceValue) * 100)
              : null;

            return (
              <article
                key={pkg.id}
                className={`group relative flex flex-col rounded-2xl transition-all duration-300 ${pkg.popular
                  ? 'border-2 bg-paper z-10 shadow-xl shadow-ink/[0.03] lg:scale-[1.02]'
                  : 'border border-ink/[0.08] bg-paper shadow-sm hover:border-ink/[0.12] hover:shadow-md'
                  }`}
                style={{
                  borderColor: pkg.popular ? pkg.accent : undefined,
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-[14px] font-bold uppercase tracking-[0.08em] text-white shadow-md"
                    style={{
                      backgroundColor: pkg.accent,
                    }}
                  >
                    <Star size={14} fill="currentColor" />
                    Most Popular
                  </div>
                )}

                <div className="flex flex-1 flex-col px-8 pb-8 pt-8 md:px-9 md:pt-10">

                  {/* ── Icon ── */}
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl shadow-sm"
                    style={{ backgroundColor: pkg.accent, color: '#fff' }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  {/* ── Title + Badge ── */}
                  <div className="mb-2 flex flex-row items-center gap-2">
                    <h2
                      className="whitespace-nowrap font-display text-[1.1rem] font-bold tracking-tight text-ink lg:text-[1.2rem]"
                      title={pkg.title}
                    >
                      {pkg.title}
                    </h2>
                    {pkg.badge && (
                      <span
                        className="shrink-0 inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[13px] font-bold uppercase tracking-widest"
                        style={{ backgroundColor: `${pkg.accent}15`, color: pkg.accent }}
                      >
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* ── Description ── */}
                  <p className="mb-6 text-[16px] font-medium leading-relaxed text-ink/80">
                    {pkg.description}
                  </p>

                  {/* ── Price ── */}
                  {pkg.offlinePriceValue ? (
                    <div className="mb-6 flex w-full items-stretch gap-2">
                      <div className="flex flex-1 flex-col rounded-xl border border-ink/10 bg-paper p-3 text-center shadow-sm">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-steel">Online</span>
                        <div className="mt-auto pt-1.5">
                          {pkg.regularPriceValue && (
                            <p className="text-[11px] font-semibold text-ink/40 line-through">
                              Rs.{pkg.regularPriceValue.toLocaleString('en-NP')}
                            </p>
                          )}
                          <p className="font-display text-lg font-extrabold tracking-tight text-ink tabular-nums">
                            Rs.{pkg.priceValue.toLocaleString('en-NP')}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col rounded-xl border border-ink/10 bg-paper p-3 text-center shadow-sm" style={{ borderColor: `${pkg.accent}40`, backgroundColor: `${pkg.accent}08` }}>
                        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: pkg.accent }}>Physical</span>
                        <div className="mt-auto pt-1.5">
                          <p className="font-display text-lg font-extrabold tracking-tight text-ink tabular-nums">
                            Rs.{pkg.offlinePriceValue.toLocaleString('en-NP')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 flex flex-row items-center gap-1.5 sm:gap-2 lg:gap-2.5 whitespace-nowrap">
                      {pkg.regularPriceValue && (
                        <span className="text-[15px] font-semibold text-ink/50">
                          Rs.{' '}
                          <span className="relative inline-block">
                            <span>{pkg.regularPriceValue.toLocaleString('en-NP')}</span>
                            <span
                              className="absolute left-[-3px] right-[-3px] top-1/2 h-[1.5px] bg-red-400/70"
                              style={{ transform: 'rotate(-12deg) translateY(-50%)' }}
                              aria-hidden="true"
                            />
                          </span>
                          /-
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-[15px] font-bold text-ink">Rs.</span>
                        <span className="font-display text-[1.4rem] font-extrabold tracking-tight text-ink sm:text-[1.5rem] lg:text-[1.75rem]">
                          {pkg.priceValue.toLocaleString('en-NP')}
                        </span>
                        <span className="text-[15px] font-bold text-ink">/-</span>
                      </div>
                      {discountPercent && discountPercent > 0 && (
                        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[14px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                          Save {discountPercent}%
                        </span>
                      )}
                    </div>
                  )}

                  {/* ── Features ── */}
                  <ul className="mb-2 flex flex-col gap-3" role="list">
                    {displayFeatures.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={16}
                          className="mt-[3px] shrink-0"
                          style={{ color: pkg.accent }}
                          aria-hidden="true"
                        />
                        <span className="text-[14px] font-semibold leading-snug text-ink/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Show more / less */}
                  {hiddenCount > 0 && (
                    <button
                      type="button"
                      onClick={() => togglePackage(pkg.id)}
                      className="mb-4 mt-1 inline-flex items-center gap-1 self-start text-[14px] font-semibold transition-colors"
                      style={{ color: pkg.accent }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? (
                        <>
                          Show less
                          <ChevronDown size={14} className="rotate-180 transition-transform" />
                        </>
                      ) : (
                        <>
                          +{hiddenCount} More Premium Features
                          <ChevronDown size={14} />
                        </>
                      )}
                    </button>
                  )}

                  {/* ── Divider (mt-auto pushes bottom section down to align buttons) ── */}
                  <div className="mt-auto pt-4">
                    <div className="mb-6 h-px bg-ink/[0.06]" />
                  </div>

                  {/* ── Bottom Meta (Duration + Support) ── */}
                  <div className="mb-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 text-[14px] text-ink/80">
                      <Clock size={16} className="shrink-0" style={{ color: pkg.accent }} />
                      <span className="font-medium">Duration: <span className="font-bold text-ink">{pkg.duration}</span></span>
                    </div>
                    {pkg.support && (
                      <div className="flex items-center gap-2.5 text-[14px] text-ink/80">
                        <SupportIcon size={16} className="shrink-0" style={{ color: pkg.accent }} />
                        <span className="font-bold text-ink">{pkg.support}</span>
                      </div>
                    )}
                  </div>

                  {/* ── CTA ── */}
                  <button
                    type="button"
                    onClick={() => openModal(pkg.title)}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] ${pkg.popular
                      ? 'text-white shadow-md hover:brightness-110'
                      : 'border border-ink/10 bg-paper text-ink hover:bg-ink/[0.03]'
                      }`}
                    style={
                      pkg.popular
                        ? { backgroundColor: pkg.accent }
                        : { color: pkg.accent }
                    }
                  >
                    Enroll Now
                    <MoveRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      {/* ━━━ FAQ Section (Contextual) ━━━ */}
      {initialFaqs && initialFaqs.length > 0 && (
        <Container as="section" className="relative z-10 mt-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">
              Not sure which package is right for you?
            </h2>
            <div className="flex flex-col gap-4">
              {initialFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={faq._id} className="rounded-2xl border border-ink/10 bg-paper p-1 transition-all hover:border-ink/20">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-colors hover:bg-ink/5"
                    >
                      <span className="font-display text-lg font-bold text-ink">
                        {faq.question}
                      </span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown size={20} />
                      </span>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-base leading-relaxed text-steel">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      )}

      {/* ━━━ Bottom Banner ━━━ */}
      <section className="mx-auto mt-24 max-w-5xl px-6 text-center">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-panel p-12 md:p-16 shadow-lg border border-ink/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 opacity-50" />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-ink md:text-4xl">Looking for a specific technical career?</h2>
            <p className="mb-10 max-w-2xl text-lg text-steel">
              If you want to become a specialized software engineer, data scientist, or UI/UX designer, check out our full-scale immersive bootcamps.
            </p>
            <Link
              href="/academy#courses"
              className="inline-flex items-center gap-2 rounded-2xl bg-ink px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03] shadow-lg hover:shadow-xl"
            >
              Explore Academy Bootcamps
              <MoveRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
