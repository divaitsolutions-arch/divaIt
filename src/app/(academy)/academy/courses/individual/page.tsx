import type { Metadata } from 'next';
import IndividualCoursesClient from '@/features/academy/components/individual-courses/IndividualCoursesClient';
import { getIndividualCourses } from '@/shared/services/cms';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Individual Courses | ${siteConfig.name} Academy`,
  description:
    'Master one skill at a time. Short, focused programming courses on HTML, CSS, JavaScript, Python, React, Node.js, SQL, and more.',
  alternates: {
    canonical: `${siteConfig.url}/academy/courses/individual`,
  },
};

export default async function IndividualCoursesPage() {
  const courses = await getIndividualCourses();
  return <IndividualCoursesClient initialCourses={courses} />;
}
