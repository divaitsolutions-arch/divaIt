import { notFound } from 'next/navigation';
import { getDisciplines, getDisciplineBySlug } from '@/shared/services/cms';
import type { Metadata } from 'next';
import TrackDetail from '@/features/academy/components/tracks/TrackDetail';
import { siteConfig } from '@/shared/config/site';
import { generateCourseSchema, generateBreadcrumbSchema } from '@/shared/lib/seo';

type Params = { discipline: string, track: string };

export async function generateStaticParams() {
  const disciplines = await getDisciplines();
  const params: { discipline: string; track: string }[] = [];
  disciplines.forEach((disc) => {
    disc.tracks.forEach((t) => {
      params.push({ discipline: disc.slug, track: t.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { discipline, track } = await params;
  const discData = await getDisciplineBySlug(discipline);
  if (!discData) return { title: 'Track Not Found' };
  const trackData = discData.tracks.find(t => t.slug === track);
  if (!trackData) return { title: 'Track Not Found' };

  return {
    title: `${trackData.title} | ${siteConfig.name} Academy`,
    description: trackData.heroDesc,
    openGraph: {
      title: `${trackData.title} | ${siteConfig.name} Academy`,
      description: trackData.heroDesc,
      url: `${siteConfig.url}/academy/courses/${discipline}/${track}`,
      siteName: siteConfig.name,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/academy/courses/${discipline}/${track}`,
    },
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { discipline, track } = await params;
  const discData = await getDisciplineBySlug(discipline);
  if (!discData) notFound();
  const trackData = discData.tracks.find(t => t.slug === track);
  if (!trackData) notFound();

  const schema = generateCourseSchema({
    name: trackData.title,
    description: trackData.heroDesc,
    url: `${siteConfig.url}/academy/courses/${discipline}/${track}`
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Academy', url: `${siteConfig.url}/academy` },
    { name: 'Career Paths', url: `${siteConfig.url}/academy#courses` },
    { name: discData.title, url: `${siteConfig.url}/academy/courses/${discipline}` },
    { name: trackData.title, url: `${siteConfig.url}/academy/courses/${discipline}/${track}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <TrackDetail discipline={discData} track={trackData} />
    </>
  );
}
