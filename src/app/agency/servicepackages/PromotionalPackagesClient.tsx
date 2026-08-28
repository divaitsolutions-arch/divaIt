'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, Layers, Check, ArrowRight, MessageCircle, Quote, Clock } from 'lucide-react';
import type { PromotionalSolutionGroup } from '@/features/agency/types/models';
import { Container } from '@/shared/components/layout/Container';
import { Button } from '@/shared/components/ui/Button';

/* ── Service Category Definitions ───────────────────────── */
interface ServiceCategory {
  id: string;
  label: string;
  accent: string;
  groups: PromotionalSolutionGroup[];
}

// Removed static SERVICE_CATEGORIES array since it's dynamically constructed from props now

/* ── Testimonials ───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "They rebuilt our website and now we get 3x more phone calls from customers who found us on Google.",
    name: "Meera Adhikari",
    role: "CEO, Himalayan Trails Co.",
  },
  {
    quote: "Finally, someone who explains things in plain language. No jargon, no confusion — just results.",
    name: "Dev Rajbhandari",
    role: "Founder, NovaPay",
  },
  {
    quote: "Our brand went from looking like a local shop to looking like a market leader. Worth every rupee.",
    name: "Laxmi Shrestha",
    role: "Marketing Director, GreenBasket",
  },
];

/* ── WhatsApp Number ────────────────────────────────────── */
const WHATSAPP_NUMBER = '9779800000000'; // Replace with your actual WhatsApp number
const WHATSAPP_MESSAGE = encodeURIComponent("Hi DivaIt! I'm interested in your digital services. Can we discuss?");

export default function PromotionalPackagesClient({ packageGroups }: { packageGroups: PromotionalSolutionGroup[] }) {
  // Dynamically group CMS packages into their parent categories
  const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
      id: 'web',
      label: 'Websites & Apps',
      accent: '#3B82F6',
      groups: packageGroups.filter(g => ['wordpress', 'custom', 'web-apps'].includes(g.id)),
    },
    {
      id: 'marketing',
      label: 'Marketing & Ads',
      accent: '#ED332C',
      groups: packageGroups.filter(g => ['social-media'].includes(g.id)),
    },
    {
      id: 'brand',
      label: 'Brand & Design',
      accent: '#A03BB8',
      groups: packageGroups.filter(g => ['brand-identity'].includes(g.id)),
    },
  ];
  const [activeCategoryId, setActiveCategoryId] = useState(SERVICE_CATEGORIES[0].id);
  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === activeCategoryId) || SERVICE_CATEGORIES[0];

  const [activeSolutionId, setActiveSolutionId] = useState(activeCategory.groups[0].id);
  const activeSolution = activeCategory.groups.find(s => s.id === activeSolutionId) || activeCategory.groups[0];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const cat = SERVICE_CATEGORIES.find(c => c.id === categoryId);
    if (cat) setActiveSolutionId(cat.groups[0].id);
  };

  return (
    <main className="min-h-[100dvh] bg-paper text-ink pb-12">
      
      {/* ─── Hero Section ─── */}
      <section className="relative w-full overflow-hidden pt-12 pb-6 lg:pt-16 lg:pb-8 border-b border-ink/5">
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay">
          <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full hidden opacity-100" style={{ backgroundColor: activeCategory.accent + '1A' }} />
          <div className="absolute inset-0 mesh-grid opacity-30" />
        </div>
        
        <Container className="relative z-10 text-center">
          <Link
            href="/agency"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Agency
          </Link>
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2" style={{ borderColor: activeCategory.accent + '33', backgroundColor: activeCategory.accent + '0D' }}>
              <Layers size={14} style={{ color: activeCategory.accent }} />
              <span className="text-[13px] font-bold uppercase tracking-wider" style={{ color: activeCategory.accent }}>
                Digital Solutions for Your Business
              </span>
            </div>
          </div>
          <h1 className="mb-6 page-heading max-w-4xl mx-auto leading-tight">
            Get More Customers. <span style={{ color: activeCategory.accent }}>Grow Your Business.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-steel md:text-xl">
            We help Nepali businesses succeed online. No confusing technical talk — just beautiful solutions that bring you more customers, save you time, and grow your brand.
          </p>
        </Container>
      </section>

      {/* ─── Top-Level Service Category Tabs ─── */}
      <section className="relative pt-8">
        <Container>
          <div className="mb-6 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1.5 rounded-2xl bg-panel p-1.5 shadow-sm border border-ink/10">
              {SERVICE_CATEGORIES.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                      isActive 
                        ? 'text-white shadow-md' 
                        : 'bg-transparent text-steel hover:text-ink hover:bg-ink/5'
                    }`}
                    style={isActive ? { backgroundColor: cat.accent } : undefined}
                  >
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Tabs for Solution Groups (only if more than 1) */}
          {activeCategory.groups.length > 1 && (
            <div className="mb-8 flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-2 rounded-[2rem] bg-panel p-2 shadow-sm border border-ink/10">
                {activeCategory.groups.map((solution) => {
                  const isActive = activeSolutionId === solution.id;
                  return (
                    <button
                      key={solution.id}
                      onClick={() => setActiveSolutionId(solution.id)}
                      className={`relative rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                        isActive 
                          ? 'text-white shadow-md' 
                          : 'bg-transparent text-steel hover:text-ink hover:bg-ink/5'
                      }`}
                      style={isActive ? { backgroundColor: activeCategory.accent } : undefined}
                    >
                      <span className="relative z-10">{solution.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Business Value Section (Left Aligned) */}
          <div className="max-w-4xl mb-8">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel px-3 py-1 text-[13px] font-bold uppercase tracking-widest mb-4 shadow-sm"
              style={{ color: activeCategory.accent }}
            >
              {activeSolution.bestForLabel}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 text-ink">
              {activeSolution.title}
            </h2>
            <p className="text-lg text-steel md:text-xl font-medium mb-6 leading-relaxed max-w-2xl">
              {activeSolution.whyItMatters}
            </p>
            
            {/* Simple Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left bg-panel p-6 rounded-3xl border border-ink/10">
              {activeSolution.benefits.slice(0,4).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                  <span className="text-sm font-bold text-ink">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          <div className="mb-10">
            <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
              <Clock size={20} className="text-steel" />
              How It Works
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeSolution.process.map((step, idx) => (
                <div key={idx} className="relative rounded-2xl border border-ink/10 bg-panel p-4 shadow-sm flex items-start gap-4">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white"
                    style={{ backgroundColor: activeCategory.accent }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-sm font-semibold text-ink leading-snug mt-1.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Full-Width Packages Grid OR Custom Features */}
          <div className="mb-8">
            <h3 className="font-display text-2xl font-bold mb-6">Choose Your Plan</h3>
            
            {activeSolution.packages ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:items-start lg:gap-8">
                {activeSolution.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`group relative flex flex-col rounded-[2rem] p-6 transition-all duration-300 ${
                      pkg.popular
                        ? 'border-2 bg-panel shadow-[0_8px_32px_rgb(0,0,0,0.06)] scale-100 lg:scale-[1.03] z-10'
                        : 'border border-ink/10 bg-paper hover:bg-panel shadow-sm hover:shadow-md'
                    }`}
                    style={{ borderColor: pkg.popular ? pkg.accent : undefined }}
                  >
                    {pkg.popular && (
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[13px] font-black uppercase tracking-widest text-white shadow-sm"
                        style={{ backgroundColor: pkg.accent }}
                      >
                        Most Popular
                      </div>
                    )}

                    <div className="mb-6 border-b border-ink/5 pb-6 text-center">
                      <h4 className="mb-3 font-display text-2xl font-bold">{pkg.name}</h4>
                      <p className="text-sm font-medium leading-relaxed text-steel">{pkg.description}</p>
                    </div>

                    <ul className="mb-8 flex flex-col gap-4 flex-1">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check size={18} strokeWidth={3} className="mt-0.5 shrink-0" style={{ color: pkg.accent }} />
                          <span className="text-sm font-semibold text-ink/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Dual CTA: Quote + WhatsApp */}
                    <div className="flex flex-col gap-2.5">
                      <Button href="/agency/contact" variant={pkg.popular ? "gradient-blue" : "outline"} className="w-full justify-center group/btn">
                        Get My Free Quote <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                      </Button>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2.5 text-[13px] font-bold text-emerald-600 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30"
                      >
                        <MessageCircle size={14} />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-ink/10 bg-panel p-10 md:p-16 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)]">
                <h4 className="mb-10 font-display text-2xl font-bold text-center">{activeSolution.customFeaturesLabel}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeSolution.customFeatures?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-paper p-5 rounded-2xl border border-ink/5 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      </div>
                      <span className="text-sm font-bold">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 flex flex-col items-center gap-3">
                  <Button href="/agency/contact" variant="gradient-blue" size="lg" className="px-12 group/btn">
                    {activeSolution.ctaLabel} <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                  </Button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] font-bold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    <MessageCircle size={14} />
                    Or chat with us on WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section className="pt-10 pb-4">
        <Container>
          <h2 className="section-heading mb-8 text-center text-ink">What Our Clients Say</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="relative rounded-[2rem] border border-ink/10 bg-panel p-6 shadow-sm"
              >
                <Quote size={24} className="mb-4 text-ink/10" />
                <p className="mb-6 text-sm font-medium leading-relaxed text-ink/80 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-ink/5 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-sm font-black text-steel">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-helper">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* ─── Cross-sell Section ─── */}
      <section className="pt-8 border-t border-ink/5 mt-8">
        <Container className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading mb-4 text-ink">We do more than just one thing.</h2>
          <p className="text-steel mb-8 text-base">
            We are a full-service digital agency for Nepal. Websites, marketing, branding, custom software — we handle your entire digital journey under one roof.
          </p>
          <div className="flex flex-row flex-nowrap items-center justify-center gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link href="/agency/services/digital-marketing" className="whitespace-nowrap text-blue-500 hover:underline font-bold text-[13px] uppercase tracking-wider">
              Digital Marketing
            </Link>
            <span className="text-ink/20 shrink-0">•</span>
            <Link href="/agency/services/ai-automation" className="whitespace-nowrap text-blue-500 hover:underline font-bold text-[13px] uppercase tracking-wider">
              AI & Automation
            </Link>
            <span className="text-ink/20 shrink-0">•</span>
            <Link href="/agency/services/brand-design" className="whitespace-nowrap text-blue-500 hover:underline font-bold text-[13px] uppercase tracking-wider">
              Brand & Design
            </Link>
          </div>
        </Container>
      </section>

    </main>
  );
}
