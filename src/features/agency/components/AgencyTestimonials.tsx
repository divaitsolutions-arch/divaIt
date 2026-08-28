'use client';

import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import { agencyTestimonialsContent } from '@/features/agency/config/agency.content';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/shared/components/layout/Container';

const avatarMap: Record<string, string> = {
  'Meera Adhikari': '/agency/images/testimonials/meera.png',
  'Dev Rajbhandari': '/agency/images/testimonials/dev.png',
};

export default function AgencyTestimonials() {
  const testimonialsRef = useScrollReveal<HTMLElement>('blockquote');
  const testimonials = agencyTestimonialsContent;

  return (
 <section ref={testimonialsRef} id="testimonials" className="relative w-full py-16 lg:py-24">
      <Container>
        <h2 className="section-heading mb-14 text-center">{testimonials.headline}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.quotes.map((item, i) => {
            const initials = item.name.split(' ').map(n => n[0]).join('');
            const gradients = [
              'from-primary to-purple-600',
              'from-blue-500 to-cyan-500',
              'from-emerald-500 to-teal-500'
            ];
            const gradient = gradients[i % gradients.length];
            const avatarSrc = avatarMap[item.name];
            
            // Featured testimonial (middle one) gets a distinct look
            const isFeatured = i === 1;
            
            return (
              <blockquote 
                key={item.name} 
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isFeatured 
                    ? 'bg-gradient-to-br from-ink to-ink/90 dark:from-white/10 dark:to-white/5 text-white border-none shadow-[0_10px_40px_rgba(160,59,184,0.15)] md:-translate-y-4' 
                    : 'bg-white dark:bg-[#05040a] border border-ink/10 dark:border-white/10 text-ink dark:text-white hover:border-primary/20 hover:shadow-primary/5'
                }`}
              >
                {isFeatured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-20" />
                )}
                
                {/* Decorative Quote Mark */}
                <div className={`absolute top-6 right-6 transition-colors duration-500 ${isFeatured ? 'text-white/10 group-hover:text-white/20' : 'text-ink/5 group-hover:text-primary/10'}`}>
                  <Quote size={48} strokeWidth={1} fill="currentColor" />
                </div>
                
                {/* Star Rating */}
                <div className="relative z-10 flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className={isFeatured ? 'fill-amber-400 text-amber-400' : 'fill-amber-500 text-amber-500'} />
                  ))}
                </div>
                
                <p className={`relative z-10 text-lg md:text-xl font-medium leading-relaxed mb-10 ${isFeatured ? 'text-white' : 'text-ink dark:text-white/90'}`}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                
                <footer className="relative z-10 flex items-center gap-4 mt-auto">
                  <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-md ring-4 ${isFeatured ? 'ring-ink/50' : 'ring-white'}`}>
                    {avatarSrc ? (
                      <Image 
                        src={avatarSrc} 
                        alt={item.name} 
                        fill 
                        sizes="56px"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div>
                    <cite className={`font-display text-base font-bold not-italic ${isFeatured ? 'text-white' : 'text-ink dark:text-white'}`}>{item.name}</cite>
                    <p className={`text-[13px] font-semibold mt-1 ${isFeatured ? 'text-white/80' : 'text-steel'}`}>{item.role}</p>
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
