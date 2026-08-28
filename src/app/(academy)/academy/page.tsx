import AcademyHero from "@/features/academy/components/academy-hero";
import AcademyStatsAndTrust from "@/features/academy/components/AcademyStatsAndTrust";
import CareerPaths from "@/features/academy/components/CareerPaths";
import HowItWorks from "@/features/academy/components/HowItWorks";
import Mentors from "@/features/academy/components/Mentors";
import FAQ from "@/features/academy/components/FAQ";
import AcademyCTAWrapper from "@/features/academy/components/AcademyCTAWrapper";
import AcademyPackagesBanner from "@/features/academy/components/AcademyPackagesBanner";
import { generateAcademyOrganizationSchema, generateFAQSchema } from "@/shared/lib/seo";
import { siteConfig } from "@/shared/config/site";
import { faqContent } from "@/features/academy/config/academy.content";
import { getDisciplines, getIndividualCourses, getAllTeamMembers } from "@/shared/services/cms";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `IT Training Academy in Nepal | ${siteConfig.name}`,
  description:
    `Live, project-based IT training in web development, design, digital marketing, and AI automation. Build a real portfolio and launch your tech career with ${siteConfig.name}.`,
  keywords: ['IT training Nepal', 'Web Development bootcamp Kathmandu', 'Digital Marketing course Nepal', 'AI Automation training', 'Full Stack Development course', 'IT training institute Nepal'],
  openGraph: {
    title: `IT Training Academy | ${siteConfig.name}`,
    description: 'Live, project-based IT training in web development, design, digital marketing, and AI automation.',
    url: `${siteConfig.url}/academy`,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `IT Training Academy | ${siteConfig.name}`,
    description: 'Live, project-based IT training in web development, design, digital marketing, and AI automation.',
  },
  alternates: {
    canonical: `${siteConfig.url}/academy`,
  },
};

export default async function AcademyHome() {
  const schema = generateAcademyOrganizationSchema();
  const disciplines = await getDisciplines();
  const courses = await getIndividualCourses();
  const teamMembers = await getAllTeamMembers();
  const faqSchema = generateFAQSchema(faqContent.items as { question: string, answer: string }[]);

  return (
    <div className="min-h-[100dvh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AcademyHero />
      <AcademyStatsAndTrust />
      <AcademyPackagesBanner />
      <CareerPaths initialDisciplines={disciplines} initialCourses={courses} />
      <HowItWorks />
      <Mentors members={teamMembers} />
      <FAQ />
      <AcademyCTAWrapper />
    </div>
  );
}