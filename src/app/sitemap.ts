import { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

import { getDisciplines, getIndividualCourses, getAllBlogPosts, getAllAgencyCaseStudies, getAllAgencyServices } from '@/shared/services/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split('T')[0];

  const disciplinesData = await getDisciplines();
  const individualCoursesData = await getIndividualCourses();
  const blogPosts = await getAllBlogPosts();
  const agencyCaseStudies = await getAllAgencyCaseStudies();
  const agencyServices = await getAllAgencyServices();

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/agency',
    '/agency/contact',
    '/academy',
    '/academy/courses/individual',
    '/contact',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  // 2. Agency Portfolio
  const portfolioRoutes = agencyCaseStudies.map((study) => ({
    url: `${siteConfig.url}/agency/portfolio/${study.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Agency Services
  const serviceRoutes = agencyServices.map((service) => ({
    url: `${siteConfig.url}/agency/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 4. Academy Disciplines & Tracks
  const disciplineRoutes: MetadataRoute.Sitemap = [];
  const trackRoutes: MetadataRoute.Sitemap = [];

  disciplinesData.forEach((discipline) => {
    // Discipline Overview Page
    disciplineRoutes.push({
      url: `${siteConfig.url}/academy/courses/${discipline.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });

    // Individual Track Pages inside the discipline
    discipline.tracks.forEach((track) => {
      trackRoutes.push({
        url: `${siteConfig.url}/academy/courses/${discipline.slug}/${track.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  // 5. Academy Individual Courses
  const individualCourseRoutes = individualCoursesData.map((course) => ({
    url: `${siteConfig.url}/academy/courses/individual/${course.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 6. Blog
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  blogRoutes.unshift({
    url: `${siteConfig.url}/blog`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  });

  return [
    ...staticRoutes,
    ...portfolioRoutes,
    ...serviceRoutes,
    ...disciplineRoutes,
    ...trackRoutes,
    ...individualCourseRoutes,
    ...blogRoutes,
  ];
}
