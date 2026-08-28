import { Metadata } from 'next';
import PackagesClient from '@/features/academy/components/packages/PackagesClient';
import { siteConfig } from "@/shared/config/site";
import { getPackages, getAcademyFAQs } from '@/shared/services/cms';
import { generateFAQSchema } from '@/shared/lib/seo';

export const metadata: Metadata = {
  title: `Digital Marketing, YouTube & Web Dev Packages | ${siteConfig.name}`,
  description: 'Turn your digital skills into consistent income. Enroll in our specialized training packages for digital marketing, Meta Ads, YouTube monetization, and web development in Nepal.',
  keywords: ['Digital Marketing Course', 'YouTube Monetization Training', 'Web Development Training Nepal', 'Facebook Meta Ads Training', 'IT Training Packages'],
  openGraph: {
    title: `Creator & Monetization Packages | ${siteConfig.name}`,
    description: 'Turn your digital skills into consistent income with our specialized training packages.',
    url: `${siteConfig.url}/packages`,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Creator & Monetization Packages | ${siteConfig.name}`,
    description: 'Turn your digital skills into consistent income with our specialized training packages.',
  },
  alternates: {
    canonical: `${siteConfig.url}/packages`,
  },
};

export default async function PackagesPage() {
  const packages = await getPackages();
  const faqs = await getAcademyFAQs();
  
  const faqSchema = faqs?.length > 0 ? generateFAQSchema(faqs) : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <PackagesClient initialPackages={packages} initialFaqs={faqs} />
    </>
  );
}
