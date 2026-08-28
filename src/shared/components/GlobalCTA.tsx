'use client';

import Image from 'next/image';
import { CheckCircle2, Mail, Phone, MapPin, Star, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { usePathname } from 'next/navigation';
import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { Button } from '@/shared/components/ui/Button';


interface GlobalCTAProps {
  id?: string;
  eyebrowText?: string;
  headline: React.ReactNode;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  trustItems?: string[];
  showContact?: boolean;
  onPrimaryClick?: () => void;
}

export default function GlobalCTA({
  id = 'contact',
  eyebrowText,
  headline,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  trustItems,
  showContact = true,
  onPrimaryClick,
}: GlobalCTAProps) {
  const sectionRef = useScrollReveal<HTMLElement>('.global-cta-inner', {
    yOffset: 32,
    duration: 0.8
  });
  const pathname = usePathname();
  const isAcademy = pathname?.startsWith('/academy');
  const isAgency = pathname?.startsWith('/agency');
  const ctaVariant: React.ComponentProps<typeof Button>['variant'] = isAcademy ? 'trust' : (isAgency ? 'cta' : 'primary');

  const checkColor = 'text-primary';
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full overflow-hidden border-t border-ink/10 py-16 lg:py-24"
    >
      {/* Immersive background glows */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-ink/[0.02]" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full hidden opacity-20 bg-primary" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full hidden opacity-10 bg-primary" />

      <div className="global-cta-inner relative z-10 mx-auto w-full max-w-[1250px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {eyebrowText && (
              <p className="mb-3 text-[13px] font-bold uppercase tracking-widest text-steel">{eyebrowText}</p>
            )}

            <h2 className="mb-4 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl text-ink">
              {headline}
            </h2>
            <p className="mb-6 max-w-lg text-base leading-relaxed text-steel">{description}</p>

            <div className="flex flex-wrap items-center gap-4">
              {onPrimaryClick ? (
                <Button
                  onClick={onPrimaryClick}
                  variant={ctaVariant}
                  className="rounded-xl"
                >
                  {primaryButtonText}
                </Button>
              ) : (
                <Button
                  href={primaryButtonLink}
                  variant={ctaVariant}
                  className="rounded-xl"
                >
                  {primaryButtonText}
                </Button>
              )}

              {secondaryButtonText && secondaryButtonLink && (
                <Button
                  href={secondaryButtonLink}
                  variant="outline"
                  arrow={false}
                  className="rounded-xl bg-panel shadow-sm hover:shadow-md"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>

            {showContact && (
              <div className="mt-8 grid grid-cols-1 gap-3 text-sm font-medium text-ink sm:grid-cols-2">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group flex items-center gap-2.5 transition-colors hover:text-ink"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors bg-primary/10 text-primary group-hover:bg-primary/20">
                    <Mail size={14} aria-hidden="true" />
                  </div>
                  {siteConfig.contact.email}
                </a>
                <a
                  href={phoneHref}
                  className="group flex items-center gap-2.5 transition-colors hover:text-ink"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors bg-primary/10 text-primary group-hover:bg-primary/20">
                    <Phone size={14} aria-hidden="true" />
                  </div>
                  {siteConfig.contact.phone}
                </a>
                <div className="flex items-center gap-2.5 sm:col-span-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin size={14} aria-hidden="true" />
                  </div>
                  {siteConfig.contact.location}
                </div>
              </div>
            )}

            {trustItems && trustItems.length > 0 && (
              <ul className="mt-6 flex w-full flex-wrap gap-2.5 border-t border-ink/10 pt-6">
                {trustItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 rounded-full border border-ink/5 bg-panel px-3.5 py-2 text-[13px] font-bold tracking-wide text-ink/85 shadow-sm">
                    <CheckCircle2 size={14} className={checkColor} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Column: Embedded Map with Custom Overlay */}
          <div className="mt-8 flex w-full flex-col lg:col-span-5 lg:mt-0">
            <div className="relative aspect-square w-full lg:-mr-12 lg:w-[calc(100%+3rem)] overflow-hidden rounded-xl bg-panel/50">
              <iframe
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=27.675089,85.342528&t=&z=18&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full opacity-90 transition-opacity hover:opacity-100 dark:opacity-80 dark:hover:opacity-100"
                title="Diva IT Solution Location"
              ></iframe>

              {/* Embedded inner shadow overlay (sits on top of the iframe so it's visible) */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_24px_rgba(0,0,0,0.1)] ring-1 ring-inset ring-ink/5 dark:shadow-[inset_0_0_32px_rgba(0,0,0,0.5)] dark:ring-white/10" />

              {/* Custom Overlay to hide native Google Maps card */}
              <div className="absolute left-3 top-3 z-10 flex w-fit min-w-[260px] flex-col gap-3 rounded-xl border border-ink/10 bg-paper/95 p-3.5 shadow-lg backdrop-blur-md sm:left-4 sm:top-4">

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=27.675089,85.342528"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/dir flex items-center gap-3 transition-opacity hover:opacity-80"
                  title="Get Directions"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink/5 bg-panel">
                    <Image src="/shared/logo.png" alt="Diva IT Solution Pvt. Ltd." width={40} height={40} className="object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold leading-tight text-ink transition-colors group-hover/dir:text-blue-600">Diva IT Solution Pvt. Ltd.</span>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="text-[13px] font-extrabold leading-none text-ink">5.0</span>
                      <div className="flex gap-0.5 text-[#FBBC04]">
                        <Star size={11} fill="currentColor" />
                        <Star size={11} fill="currentColor" />
                        <Star size={11} fill="currentColor" />
                        <Star size={11} fill="currentColor" />
                        <Star size={11} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </a>

                <a
                  href="https://share.google/unT7ecNN7fq0SLUqo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary/10 py-2 text-[13px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/15 hover:text-primary"
                >
                  Rate us on Google <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
