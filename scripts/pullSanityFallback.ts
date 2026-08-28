import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Hardcode fallback credentials here if we are just running this script manually
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3kqucbo8';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-08-03';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // get freshest data
});

import {
  getAllDisciplinesQuery,
  getDisciplineBySlugQuery,
  getAllIndividualCoursesQuery,
  getIndividualCourseBySlugQuery,
  getPackagesQuery,
  getAllBlogPostsQuery,
  getBlogPostBySlugQuery,
  getAllAgencyCaseStudiesQuery,
  getAgencyCaseStudyBySlugQuery,
  getAllAgencyServicesQuery,
  getAgencyServiceBySlugQuery,
  getAllAgencyPackageGroupsQuery,
  getAllTeamMembersQuery,
  getLegalPageBySlugQuery,
  getFAQsQuery,
} from '../src/sanity/lib/queries';

async function main() {
  console.log('Fetching data from Sanity...');
  const fallbackData: Record<string, any> = {};

  try {
    // 1. Fetch Lists
    console.log('Fetching lists...');
    const disciplines = await client.fetch(getAllDisciplinesQuery);
    const individualCourses = await client.fetch(getAllIndividualCoursesQuery);
    const packages = await client.fetch(getPackagesQuery);
    const blogPosts = await client.fetch(getAllBlogPostsQuery);
    const caseStudies = await client.fetch(getAllAgencyCaseStudiesQuery);
    const services = await client.fetch(getAllAgencyServicesQuery);
    const packageGroups = await client.fetch(getAllAgencyPackageGroupsQuery);
    const teamMembers = await client.fetch(getAllTeamMembersQuery);
    const faqs = await client.fetch(getFAQsQuery);

    fallbackData.getAllDisciplinesQuery = disciplines;
    fallbackData.getAllIndividualCoursesQuery = individualCourses;
    fallbackData.getPackagesQuery = packages;
    fallbackData.getAllBlogPostsQuery = blogPosts;
    fallbackData.getAllAgencyCaseStudiesQuery = caseStudies;
    fallbackData.getAllAgencyServicesQuery = services;
    fallbackData.getAllAgencyPackageGroupsQuery = packageGroups;
    fallbackData.getAllTeamMembersQuery = teamMembers;
    fallbackData.getFAQsQuery = faqs;

    // 2. Fetch Individuals by Slug
    console.log('Fetching disciplines by slug...');
    fallbackData.getDisciplineBySlugQuery = {};
    for (const discipline of disciplines || []) {
      if (discipline.slug) {
        fallbackData.getDisciplineBySlugQuery[discipline.slug] = await client.fetch(getDisciplineBySlugQuery, { slug: discipline.slug });
      }
    }

    console.log('Fetching individual courses by slug...');
    fallbackData.getIndividualCourseBySlugQuery = {};
    for (const course of individualCourses || []) {
      if (course.slug) {
        fallbackData.getIndividualCourseBySlugQuery[course.slug] = await client.fetch(getIndividualCourseBySlugQuery, { slug: course.slug });
      }
    }

    console.log('Fetching blog posts by slug...');
    fallbackData.getBlogPostBySlugQuery = {};
    for (const post of blogPosts || []) {
      if (post.slug) {
        fallbackData.getBlogPostBySlugQuery[post.slug] = await client.fetch(getBlogPostBySlugQuery, { slug: post.slug });
      }
    }

    console.log('Fetching case studies by slug...');
    fallbackData.getAgencyCaseStudyBySlugQuery = {};
    for (const cs of caseStudies || []) {
      if (cs.slug) {
        fallbackData.getAgencyCaseStudyBySlugQuery[cs.slug] = await client.fetch(getAgencyCaseStudyBySlugQuery, { slug: cs.slug });
      }
    }

    console.log('Fetching services by slug...');
    fallbackData.getAgencyServiceBySlugQuery = {};
    for (const service of services || []) {
      if (service.slug) {
        fallbackData.getAgencyServiceBySlugQuery[service.slug] = await client.fetch(getAgencyServiceBySlugQuery, { slug: service.slug });
      }
    }

    console.log('Fetching legal pages...');
    // We don't have an 'getAllLegalPages' query easily available, so we'll fetch them generically
    const legalPagesRaw = await client.fetch(`*[_type == "legalPage"]{ "slug": slug.current }`);
    fallbackData.getLegalPageBySlugQuery = {};
    for (const page of legalPagesRaw || []) {
      if (page.slug) {
        fallbackData.getLegalPageBySlugQuery[page.slug] = await client.fetch(getLegalPageBySlugQuery, { slug: page.slug });
      }
    }

    // 3. Write to file
    const outputPath = path.join(__dirname, '../src/sanity/fallback.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2));
    console.log(`\n✅ Successfully wrote fallback data to ${outputPath}`);
  } catch (err) {
    console.error('Error fetching from Sanity:', err);
    process.exit(1);
  }
}

main();
