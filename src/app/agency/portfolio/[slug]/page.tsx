import { notFound } from 'next/navigation';
import { getAllAgencyCaseStudies, getAgencyCaseStudyBySlug } from '@/shared/services/cms';
import type { Metadata } from 'next';
import CaseStudyClient from './CaseStudyClient';
import { siteConfig } from '@/shared/config/site';

type Params = { slug: string };

export async function generateStaticParams() {
  const studies = await getAllAgencyCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAgencyCaseStudyBySlug(slug);
  if (!data) return { title: 'Case Study Not Found' };

  return {
    title: `${data.name} — Case Study | ${siteConfig.name} Agency`,
    description: data.heroDesc,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = await getAgencyCaseStudyBySlug(slug);
  if (!data) notFound();

  return <CaseStudyClient study={data} />;
}

