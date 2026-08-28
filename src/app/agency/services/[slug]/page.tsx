import { notFound } from 'next/navigation';
import { getAllAgencyServices, getAgencyServiceBySlug } from '@/shared/services/cms';
import type { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';
import { siteConfig } from '@/shared/config/site';

type Params = { slug: string };

export async function generateStaticParams() {
  const services = await getAllAgencyServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAgencyServiceBySlug(slug);
  if (!data) return { title: 'Service Not Found' };

  return {
    title: `${data.title} | ${siteConfig.name} Agency`,
    description: data.heroDesc,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = await getAgencyServiceBySlug(slug);
  if (!data) notFound();

  return <ServiceDetailClient service={data} />;
}

