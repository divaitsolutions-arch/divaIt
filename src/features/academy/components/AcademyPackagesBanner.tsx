'use client';

import { Sparkles, Gift } from 'lucide-react';
import PackagesBanner, { type DescriptionPart } from '@/shared/components/banner/PackagesBanner';
import type { OrbitIconPlacement } from '@/shared/components/OrbitField';
import type { OrbitDotPlacement } from '@/shared/components/banner/OrbitDots';

/* Academy-side instance: creator & monetization course packages. */

const ORBIT_ICONS: OrbitIconPlacement[] = [
  { id: 'meta', top: '8%', right: '27%', size: 46, depth: 0.35 },
  { id: 'youtube', top: '10%', right: '8%', size: 52, depth: 0.5 },
  { id: 'facebook', top: '78%', right: '8%', size: 46, depth: 0.4 },
  { id: 'instagram', top: '76%', right: '20%', size: 46, depth: 0.4 },
  { id: 'tiktok', top: '72%', right: '35%', size: 46, depth: 0.45 },
  { id: 'googleads', top: '45%', right: '43%', size: 50, depth: 0.35 },
  { id: 'google', top: '20%', right: '40%', size: 56, depth: 0.3 },
  { id: 'wordpress', top: '38%', right: '5%', size: 46, depth: 0.4 },
];

const ORBIT_DOTS: OrbitDotPlacement[] = [
  { top: '27%', right: '46%' },
  { top: '48%', right: '20%' },
  { top: '58%', right: '4%' },
  { top: '81%', right: '17%' },
];

const DESCRIPTION_PARTS: DescriptionPart[] = [
  { text: 'Explore our curated programs to help you earn online through ' },
  { text: 'YouTube', color: '#EF4444' },
  { text: ', ' },
  { text: 'AdSense', color: '#3B82F6' },
  { text: ', ' },
  { text: 'Meta Ads', color: '#4F46E5' },
  { text: ', and ' },
  { text: 'Social Media', color: '#EC4899' },
  { text: '.' },
];

export default function AcademyPackagesBanner() {
  return (
    <PackagesBanner
      eyebrowIcon={Sparkles}
      eyebrowLabel="Specialized Programs"
      trendingLabel="Trending"
      headline={
        <>
          Creator &amp; Monetization
          <br />
          Packages
        </>
      }
      description={DESCRIPTION_PARTS}
      ctaHref="/packages"
      ctaText="View Packages"
      ctaNote={['Find the right', 'package for you']}
      icons={ORBIT_ICONS}
      orbitDots={ORBIT_DOTS}
      pulseBadge={{
        icon: Gift,
        title: 'Special Offers',
        subtitle: 'For a limited time',
        top: '45%',
        right: '27%',
      }}
    />
  );
}