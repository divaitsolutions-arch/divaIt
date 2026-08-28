'use client';

import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { agencyProcessContent } from '@/features/agency/config/agency.content';
import { PhoneCall, FileText, Code2, Rocket } from 'lucide-react';
import { Container } from '@/shared/components/layout/Container';

const processIcons = [PhoneCall, FileText, Code2, Rocket];

export default function AgencyProcess() {
  const processRef = useScrollReveal<HTMLElement>('li', {
    yOffset: 30,
    duration: 0.7,
    stagger: 0.15,
  });
  const process = agencyProcessContent;

  return (
 <section ref={processRef} id="process" className="relative w-full py-16 lg:py-24 overflow-hidden">
      <Container>
        <h2 className="section-heading text-center mb-16">{process.headline}</h2>
        
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] hidden h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent md:block" />
          
          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {process.steps.map((step, index) => {
              const Icon = processIcons[index] ?? Code2;
              return (
                <li key={step.title} className="group relative flex flex-col items-center text-center">
                  {/* Numbered Gradient Circle */}
                  <div className="relative z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(160,59,184,0.2)]">
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-10 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-panel text-primary group-hover:bg-transparent group-hover:text-white transition-colors duration-500">
                      <Icon size={24} />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-black text-white shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-ink mb-3">{step.title}</h3>
                  <p className="text-base leading-relaxed text-steel">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
