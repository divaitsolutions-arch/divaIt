'use client';

import PackagesBanner, { type DescriptionPart } from '@/shared/components/banner/PackagesBanner';
import type { OrbitIconPlacement } from '@/shared/components/OrbitField';

/* Agency-side instance: web development package promo — clean, no icon/pill/orbit decoration. */

const WEB_DEV_BANNER_ICONS: OrbitIconPlacement[] = [
  { id: 'react', top: '10%', right: '15%', size: 50, depth: 0.4 },
  { id: 'django', top: '65%', right: '10%', size: 46, depth: 0.45 },
  { id: 'wordpress', top: '70%', right: '38%', size: 52, depth: 0.35 },
  { id: 'aws', top: '50%', right: '25%', size: 48, depth: 0.4 },
  { id: 'nextjs', top: '30%', right: '35%', size: 46, depth: 0.4 },
];

const WEB_DEV_BANNER_DESCRIPTION: DescriptionPart[] = [
  {
    text:
      'Websites, marketing, and branding designed for Nepali businesses. Choose a package, and we handle the rest — no technical knowledge needed.',
  },
];

export default function AgencyPackagesBanner() {
  return (
    <PackagesBanner
      eyebrowLabel="Business Growth"
      headline={
        <>
          Get more customers with a{' '}
          <span className="text-blue-500">professional digital presence.</span>
        </>
      }
      description={WEB_DEV_BANNER_DESCRIPTION}
      ctaText="Explore"
      ctaHref="/agency/web-development-packages"
      icons={WEB_DEV_BANNER_ICONS}
    />
  );
}