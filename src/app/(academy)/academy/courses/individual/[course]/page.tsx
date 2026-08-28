import { notFound } from 'next/navigation';
import { getIndividualCourses, getIndividualCourseBySlug } from '@/shared/services/cms';
import type { Metadata } from 'next';
import IndividualCourseDetail from '@/features/academy/components/individual-courses/IndividualCourseDetail';
import { siteConfig } from '@/shared/config/site';
import { generateCourseSchema, generateBreadcrumbSchema } from '@/shared/lib/seo';

type Params = { course: string };

export async function generateStaticParams() {
  const courses = await getIndividualCourses();
  return courses.map((course) => ({ course: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { course } = await params;
  const data = await getIndividualCourseBySlug(course);
  if (!data) return { title: 'Course Not Found' };

  return {
    title: `${data.title} | ${siteConfig.name} Academy`,
    description: data.heroDesc,
    openGraph: {
      title: `${data.title} | ${siteConfig.name} Academy`,
      description: data.heroDesc,
      url: `${siteConfig.url}/academy/courses/individual/${course}`,
      siteName: siteConfig.name,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/academy/courses/individual/${course}`,
    },
  };
}

export default async function IndividualCoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { course } = await params;
  const data = await getIndividualCourseBySlug(course);
  if (!data) notFound();

  const schema = generateCourseSchema({
    name: data.title,
    description: data.heroDesc,
    url: `${siteConfig.url}/academy/courses/individual/${course}`
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Academy', url: `${siteConfig.url}/academy` },
    { name: 'Individual Courses', url: `${siteConfig.url}/academy/courses/individual` },
    { name: data.title, url: `${siteConfig.url}/academy/courses/individual/${course}` },
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
      <IndividualCourseDetail course={data} />
    </>
  );
}
