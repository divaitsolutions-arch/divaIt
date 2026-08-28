'use client';

import { MoveRight } from 'lucide-react';
import { CtaLink } from '@/shared/components/CtaLink';
import { howItWorksContent } from '@/features/academy/config/academy.content';
import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { Container } from '@/shared/components/layout/Container';

const stepAccents = [
  'from-primary to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-primary to-orange-500',
];

export default function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>('.hiw-step', {
    yOffset: 40,
    duration: 0.7,
    stagger: 0.15,
  });
  const { headline, description, cta, steps } = howItWorksContent;

  return (
    <section
 ref={sectionRef}
 id="how-it-works"
 className="relative w-full py-16 lg:py-24"
 >
      <Container className="flex flex-col gap-16 lg:flex-row lg:gap-24">
        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-28">
            <h2 className="section-heading mb-5">{headline}</h2>
            <p className="mb-8 text-base leading-relaxed text-steel md:text-lg">{description}</p>
            <CtaLink
              href={cta.href}
              className="group inline-flex items-center gap-2 rounded-xl bg-surface-inverse px-7 py-3.5 text-sm font-bold text-paper transition-colors hover:bg-surface-inverse/90"
            >
              {cta.label}
              <MoveRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </CtaLink>
          </div>
        </div>

        <div className="relative w-full lg:w-2/3">
          <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-ink/10 md:block" aria-hidden="true" />
          <ol className="flex list-none flex-col gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <li key={step.title} className="hiw-step relative flex gap-6 md:gap-10">
                <div className="relative z-10 shrink-0">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stepAccents[index]} text-sm font-bold text-white`}>
                    {index + 1}
                  </div>
                </div>
                <div className="pt-0.5">
                  <h3 className="mb-2 font-display text-xl font-bold text-ink lg:text-2xl">{step.title}</h3>
                  <p className="text-base leading-relaxed text-steel">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
