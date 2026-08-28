import { notFound } from 'next/navigation';
import { getDisciplines, getDisciplineBySlug } from '@/shared/services/cms';
import type { Metadata } from 'next';
import DisciplineOverviewClient from '@/features/academy/components/tracks/TracksOverviewClient';
import { siteConfig } from '@/shared/config/site';
import { generateBreadcrumbSchema } from '@/shared/lib/seo';

type Params = { discipline: string };

export async function generateStaticParams() {
  const disciplines = await getDisciplines();
  return disciplines.map((discipline) => ({ discipline: discipline.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { discipline } = await params;
  const data = await getDisciplineBySlug(discipline);
  if (!data) return { title: 'Discipline Not Found' };

  return {
    title: `${data.title} | ${siteConfig.name} Academy`,
    description: data.heroDesc,
    openGraph: {
      title: `${data.title} | ${siteConfig.name} Academy`,
      description: data.heroDesc,
      url: `${siteConfig.url}/academy/courses/${discipline}`,
      siteName: siteConfig.name,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/academy/courses/${discipline}`,
    },
  };
}

export default async function DisciplinePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { discipline } = await params;
  const data = await getDisciplineBySlug(discipline);
  if (!data) notFound();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Academy', url: `${siteConfig.url}/academy` },
    { name: 'Career Paths', url: `${siteConfig.url}/academy#courses` },
    { name: data.title, url: `${siteConfig.url}/academy/courses/${discipline}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <DisciplineOverviewClient discipline={data} />
    </>
  );
}
