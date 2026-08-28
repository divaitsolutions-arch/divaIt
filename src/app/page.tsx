import { Metadata } from 'next';
import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { gatewayContent } from '@/gateway/config/gateway.content';
import { siteConfig } from '@/shared/config/site';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiFigma, SiGooglecloud, SiPostgresql, SiDocker, SiTailwindcss, SiWordpress, SiCanvas } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import Image from 'next/image';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

/* ── Tool Icon Map ── */
const toolIconMap: Record<string, React.ReactNode> = {
  react: <SiReact size={14} />,
  nextjs: <SiNextdotjs size={14} />,
  nodejs: <SiNodedotjs size={14} />,
  typescript: <SiTypescript size={14} />,
  figma: <SiFigma size={14} />,
  aws: <FaAws size={14} />,
  google: <SiGooglecloud size={14} />,
  database: <SiPostgresql size={14} />,
  docker: <SiDocker size={14} />,
  tailwind: <SiTailwindcss size={14} />,
  wordpress: <SiWordpress size={14} />,
  canva: <SiCanvas size={14} />,
};

import { HeroHeading } from '@/gateway/components/HeroHeading.client';
import { AnimatedStats } from '@/gateway/components/AnimatedStats.client';
import { GatewayCards } from '@/gateway/components/GatewayCards.client';
import { FinaleCTAButtons } from '@/gateway/components/FinaleCTAButtons.client';
import { Container } from '@/shared/components/layout/Container';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: ['IT Company Nepal', 'Software Agency Kathmandu', 'IT Training Nepal', 'Web Development Nepal', 'Digital Marketing Nepal'],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/shared/logo.png`,
  "description": siteConfig.description,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "contactType": "customer service",
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kathmandu",
    "addressRegion": "Bagmati",
    "addressCountry": "NP",
  },
  "sameAs": [
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
    siteConfig.social.youtube,
  ],
};

export default function Home() {
  const { stats, trust } = gatewayContent;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="relative min-h-[100dvh] w-full overflow-x-clip font-sans selection:bg-primary/30">

        {/* ── Header ── */}
        <header className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 flex justify-between items-center z-50 pointer-events-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            {/* Restored the original colored logo */}
            <Image src="/shared/logo.png" alt="Diva IT Logo" width={180} height={60} className="object-contain h-10 md:h-12 w-auto" priority />
          </Link>
          <div className="flex items-center gap-4 md:gap-8">
            <ThemeToggle />
            <Link href="/blog" className="hidden md:block px-6 py-3 rounded-full border border-ink/20 bg-transparent text-ink font-bold text-sm hover:bg-ink hover:text-paper transition-all duration-300">
              Blog
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-ink/20 bg-transparent text-ink font-bold text-sm hover:bg-ink hover:text-paper transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </header>

        {/* ── Scrollable Content ── */}
        <div className="relative z-10 w-full mx-auto flex flex-col items-center">

          {/* Hero Section */}
          <Container as="section" className="pt-40 pb-16 md:pt-48 md:pb-24 flex flex-col justify-center min-h-[50vh]">
            <div className="max-w-6xl">
              <HeroHeading />
            </div>
          </Container>

          {/* ── Divisions Grid (Agency / Academy) ── */}
          <GatewayCards />

          {/* ── Stats Section ── */}
          <Container as="section" className="py-32 border-b border-ink/10">
              <AnimatedStats stats={stats} />
          </Container>

          {/* ── Tech Stack ── */}
          <Container as="section" className="py-32">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-steel shrink-0 mt-3 md:w-48">
                Industry Standards
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {trust.tools.map((tool, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-xl border border-ink/10 bg-transparent text-ink text-sm font-bold uppercase tracking-wider transition-all hover:bg-panel hover:border-ink/20 hover:-translate-y-1">
                    <span className="text-ink/50">{toolIconMap[tool.icon] || <Code2 size={16} />}</span>
                    {tool.name}
                  </div>
                ))}
              </div>
            </div>
          </Container>

          {/* ── Finale CTA ── */}
          <section className="w-full py-32 mt-16 relative overflow-hidden border-t border-ink/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/3 dark:from-primary/15 to-transparent hidden pointer-events-none" />
            <Container className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10">
              <div className="flex flex-col max-w-2xl">
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] tracking-tighter text-ink mb-6">
                  Ready to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">Get Started.</span>
                </h2>
                <p className="text-lg md:text-xl text-steel font-medium">
                  Just let us know, we will handle the rest.
                </p>
              </div>
              <FinaleCTAButtons />
            </Container>
          </section>

          {/* ── Footer ── */}
          <Container as="footer" className="py-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-ink/10">
            <div className="flex flex-col gap-2 md:items-start items-center text-center md:text-left">
              <p className="text-sm text-ink/80 font-bold tracking-[0.1em] uppercase">
                &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm text-ink/70 tracking-wider">
                <span>PAN: <span className="rounded bg-ink/10 px-1.5 py-0.5 text-ink/80">609524831</span></span>
                <span>REG: <span className="rounded bg-ink/10 px-1.5 py-0.5 text-ink/80">214103/75/076</span></span>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-bold tracking-[0.1em] uppercase text-ink/80">
              <Link href="/blog" className="hover:text-primary dark:hover:text-primary transition-colors">Blog</Link>
              <Link href={siteConfig.social.facebook} className="hover:text-primary dark:hover:text-primary transition-colors">Facebook</Link>
              <Link href={siteConfig.social.linkedin} className="hover:text-primary dark:hover:text-primary transition-colors">LinkedIn</Link>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
