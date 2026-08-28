import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: `Software Development & IT Agency in Nepal | ${siteConfig.name}`,
  description:
    'Web development, digital marketing, UI/UX design, and IT consulting for businesses in Nepal. Fixed scope, weekly demos, measurable results.',
  keywords: ['Software Agency Nepal', 'Web Development Company Kathmandu', 'Digital Marketing Agency Nepal', 'IT Consulting Nepal', 'App Development Nepal'],
  openGraph: {
    title: `Software Development & IT Agency | ${siteConfig.name}`,
    description: 'Web development, digital marketing, UI/UX design, and IT consulting for businesses in Nepal.',
    url: `${siteConfig.url}/agency`,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Software Development & IT Agency | ${siteConfig.name}`,
    description: 'Web development, digital marketing, UI/UX design, and IT consulting for businesses in Nepal.',
  },
  alternates: {
    canonical: `${siteConfig.url}/agency`,
  },
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <div data-brand="agency" className="contents">{children}</div>;
}
