'use client';

import { useScrollReveal } from '@/shared/animations/useScrollReveal';
import type { CaseStudyData } from '@/features/agency/types/models';
import { ArrowUpRight, Code2, ShoppingCart, Megaphone, PenTool, Layout, Box, CreditCard, Database, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/shared/components/layout/Container';
import { Carousel } from '@/shared/components/ui/Carousel';

const getTagIcon = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('commerce') || t.includes('shop')) return <ShoppingCart size={12} className="text-emerald-500" strokeWidth={2.5} />;
  if (t.includes('ads') || t.includes('marketing') || t.includes('seo')) return <Megaphone size={12} className="text-orange-500" strokeWidth={2.5} />;
  if (t.includes('next') || t.includes('react') || t.includes('app') || t.includes('web')) return <Code2 size={12} className="text-blue-500" strokeWidth={2.5} />;
  if (t.includes('brand') || t.includes('design')) return <PenTool size={12} className="text-purple-500" strokeWidth={2.5} />;
  if (t.includes('booking')) return <Layout size={12} className="text-amber-500" strokeWidth={2.5} />;
  if (t.includes('payment')) return <CreditCard size={12} className="text-emerald-600" strokeWidth={2.5} />;
  if (t.includes('cms')) return <Database size={12} className="text-blue-600" strokeWidth={2.5} />;
  if (t.includes('education')) return <BookOpen size={12} className="text-primary" strokeWidth={2.5} />;
  return <Box size={12} className="text-steel" strokeWidth={2.5} />;
};

const projectSlugMap: Record<string, string> = {
  'Union Hydropower': 'union-hydropower',
  'Himalayan Trails Co.': 'himalayan-trails',
  'NovaPay FinTech': 'novapay',
  'GreenBasket D2C': 'greenbasket',
  'EduReach NGO': 'edureach',
};

const projectImageMap: Record<string, string> = {
  'Union Hydropower': 'https://res.cloudinary.com/bpul49io/image/upload/v1784799835/hydrowebproject_golwkh.png',
  'Himalayan Trails Co.': '/agency/images/portfolio/himalayan-trails.png',
  'NovaPay FinTech': '/agency/images/portfolio/novapay.png',
  'GreenBasket D2C': '/agency/images/portfolio/greenbasket.png',
  'EduReach NGO': '/agency/images/portfolio/edureach.png',
};

export default function AgencyPortfolio({ 
  projects, 
  content 
}: { 
  projects: CaseStudyData[]; 
  content: { headline: string; subhead: string; } 
}) {
  const portfolioRef = useScrollReveal<HTMLDivElement>('children', { stagger: 0.1, yOffset: 30 });

  return (
 <section id="portfolio" className="relative w-full py-16 lg:py-24">
      <Container>
        <div ref={portfolioRef}>
          <h2 className="section-heading">{content.headline}</h2>
          <p className="mt-4 mb-10 max-w-xl text-base leading-relaxed text-steel md:text-lg">{content.subhead}</p>

          <div className="@container w-full mt-4">
          <Carousel
            items={projects}
            keyExtractor={(project) => project.name}
            accentColorClass="bg-primary"
            continuous={true}
            bleed={false}
            gap="gap-8"
            renderItem={(project) => {
              const slug = project.slug;
              const imageSrc = projectImageMap[project.name];
              return (
                <div
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-panel p-2 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 border border-ink/5 hover:border-primary/30 w-[85cqw] sm:w-[600px] lg:w-[650px] shrink-0"
                >
                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink/5">
                    {imageSrc ? (
                      <Image 
                        src={imageSrc} 
                        alt={project.name} 
                        fill 
                        sizes="(max-width: 640px) 85vw, 650px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-display text-4xl font-bold text-steel/30">
                        {project.initial}
                      </div>
                    )}
                    {/* Hover Overlay - Gradient removed to show photos clearly */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                      <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
                        <Link
                          href={slug ? `/agency/portfolio/${slug}` : '#'}
                          className="inline-flex items-center gap-3 group/link"
                        >
                          <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg text-ink">
                            <div className="absolute inset-0 rounded-full bg-white transition-opacity duration-300 group-hover/link:opacity-0" />
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${project.accent} opacity-0 transition-opacity duration-300 group-hover/link:opacity-100`} />
                            <ArrowUpRight size={20} className="relative z-10 transition-colors duration-300 group-hover/link:text-white" />
                          </div>
                          <span className="text-white font-bold tracking-wide group-hover/link:underline underline-offset-4">View Case Study</span>
                        </Link>
                        
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 text-[13px] font-bold shadow-xl hover:-translate-y-1 transition-all"
                          >
                            Visit Site <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-5 pb-4 flex-1">
                    <div className="mb-3 flex flex-wrap gap-2.5 shrink-0">
                      {project.tags?.map(tag => {
                        const Icon = getTagIcon(tag);
                        return (
                          <span key={tag} className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-panel px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-wider text-ink shadow-sm transition-colors hover:border-ink/20">
                            {Icon}
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                    
                    <h3 className="font-display text-2xl font-black text-ink mb-3">{project.name}</h3>
                    
                    <div className="inline-flex items-center gap-2.5 rounded-full bg-emerald-50/80 px-4 py-2 text-sm font-bold text-emerald-600 border border-emerald-100 w-fit mt-auto dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                      {project.result}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
        </div>
      </Container>
    </section>
  );
}
