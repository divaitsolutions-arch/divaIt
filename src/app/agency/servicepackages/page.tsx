import PromotionalPackagesClient from './PromotionalPackagesClient';
import { generateAgencyLocalBusinessSchema } from '@/shared/lib/seo';
import { siteConfig } from '@/shared/config/site';
import { getAllAgencyPackageGroups } from '@/shared/services/cms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Web Development Packages | ${siteConfig.name}`,
  description:
    'Explore our tailored web development packages designed to solve real business problems and scale with your growth. WordPress, Custom React, and Web Applications.',
};

export default async function PromotionalPackagesPage() {
  const schema = generateAgencyLocalBusinessSchema();
  const packageGroups = await getAllAgencyPackageGroups();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PromotionalPackagesClient packageGroups={packageGroups} />
    </>
  );
}

