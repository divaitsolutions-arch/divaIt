'use client';

import { useState, useCallback } from 'react';
import { faqContent } from '@/features/academy/config/academy.content';
import { Container } from '@/shared/components/layout/Container';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { headline, subhead, items } = faqContent;

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
 <section id="faq" className="relative w-full border-t border-ink/5 py-16 text-ink lg:py-24">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="lg:w-5/12 lg:sticky lg:top-28 lg:self-start">
            <h2 className="section-heading">{headline}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel">{subhead}</p>
          </div>

          <div className="lg:w-7/12">
            {items.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={faq.question} className="border-b border-ink/10">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className={`font-display text-base font-bold md:text-lg ${isOpen ? 'text-primary' : 'text-ink'}`}>
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none ${
                        isOpen ? 'bg-primary text-white' : 'bg-ink/5 text-steel'
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pb-5"
                  >
                    <p className="text-base leading-relaxed text-steel">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
