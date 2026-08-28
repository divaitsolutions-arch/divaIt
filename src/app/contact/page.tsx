import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ContactFormClient } from '@/gateway/contact/ContactForm.client';
import { StructuredData } from '@/shared/components/seo/StructuredData';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: "Get in touch with us to accelerate your career or build your next big product.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function GlobalContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "image": siteConfig.url + "/shared/logo.png",
    "url": siteConfig.url,
    "telephone": siteConfig.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "addressCountry": "NP"
    },
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.linkedin
    ]
  };

  return (
    <>
      <StructuredData data={localBusinessSchema} />
      <main className="min-h-[100dvh] bg-paper text-ink pb-24 pt-24 lg:pt-32">
      <div className="mx-auto w-full max-w-[800px] px-6 lg:px-12">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-steel transition-colors hover:text-ink"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Gateway
        </Link>

        <div className="mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <h1 className="page-heading mb-4">
              Get in touch.
            </h1>
            <p className="text-lg text-steel max-w-xl">
              Whether you are looking to accelerate your career or build your next big product, we are here to help.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-primary/5 p-6 border border-primary/10 shrink-0">
             <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Direct Contact</h3>
             <a href="mailto:contact@divaitsolutions.com" className="font-medium text-ink hover:text-primary transition-colors flex items-center gap-2"><Mail size={14}/> contact@divaitsolutions.com</a>
          </div>
        </div>

        <ContactFormClient />
      </div>
    </main>
    </>
  );
}
