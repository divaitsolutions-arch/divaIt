import { client } from '@/sanity/lib/client';
import { 
  getAllDisciplinesQuery, 
  getAllIndividualCoursesQuery, 
  getPackagesQuery, 
  getAllBlogPostsQuery, 
  getBlogPostBySlugQuery, 
  getDisciplineBySlugQuery,
  getIndividualCourseBySlugQuery
} from '@/sanity/lib/queries';
import { cache } from 'react';
import type { BlogPost } from '@/shared/types/models';
import type { Discipline, Course, Package } from '@/features/academy/types/models';

// Using React's cache to deduplicate fetch requests if called multiple times in a single server render pass
// This is exactly how we avoid prop drilling with Server Components!

const fetchOptions = { next: { revalidate: 60 } };

export const getDisciplines = cache(async (): Promise<Discipline[]> => {
  return client.fetch<Discipline[]>(getAllDisciplinesQuery, {}, fetchOptions);
});

export const getDisciplineBySlug = cache(async (slug: string): Promise<Discipline | null> => {
  return client.fetch<Discipline>(getDisciplineBySlugQuery, { slug }, fetchOptions);
});

export const getIndividualCourses = cache(async (): Promise<Course[]> => {
  return client.fetch<Course[]>(getAllIndividualCoursesQuery, {}, fetchOptions);
});

export const getIndividualCourseBySlug = cache(async (slug: string): Promise<Course | null> => {
  return client.fetch<Course>(getIndividualCourseBySlugQuery, { slug }, fetchOptions);
});

export const getPackages = cache(async (): Promise<Package[]> => {
  return client.fetch<Package[]>(getPackagesQuery, {}, fetchOptions);
});

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return client.fetch<BlogPost[]>(getAllBlogPostsQuery, {}, fetchOptions);
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  return client.fetch<BlogPost>(getBlogPostBySlugQuery, { slug }, fetchOptions);
});

// --- Agency Fetch Functions ---
import type { CaseStudyData, ServiceData, PromotionalSolutionGroup } from '@/features/agency/types/models';
import {
  getAllAgencyCaseStudiesQuery,
  getAgencyCaseStudyBySlugQuery,
  getAllAgencyServicesQuery,
  getAgencyServiceBySlugQuery,
  getAllAgencyPackageGroupsQuery
} from '@/sanity/lib/queries';

export const getAllAgencyCaseStudies = cache(async (): Promise<CaseStudyData[]> => {
  return client.fetch<CaseStudyData[]>(getAllAgencyCaseStudiesQuery, {}, fetchOptions);
});

export const getAgencyCaseStudyBySlug = cache(async (slug: string): Promise<CaseStudyData | null> => {
  return client.fetch<CaseStudyData>(getAgencyCaseStudyBySlugQuery, { slug }, fetchOptions);
});

export const getAllAgencyServices = cache(async (): Promise<ServiceData[]> => {
  return client.fetch<ServiceData[]>(getAllAgencyServicesQuery, {}, fetchOptions);
});

export const getAgencyServiceBySlug = cache(async (slug: string): Promise<ServiceData | null> => {
  return client.fetch<ServiceData>(getAgencyServiceBySlugQuery, { slug }, fetchOptions);
});

export const getAllAgencyPackageGroups = cache(async (): Promise<PromotionalSolutionGroup[]> => {
  return client.fetch<PromotionalSolutionGroup[]>(getAllAgencyPackageGroupsQuery, {}, fetchOptions);
});

// --- Shared Fetch Functions (Team, Legal) ---
import type { TeamMember, LegalPage } from '@/shared/types/models';
import {
  getAllTeamMembersQuery,
  getLegalPageBySlugQuery,
} from '@/sanity/lib/queries';

export const getAllTeamMembers = cache(async (): Promise<TeamMember[]> => {
  return client.fetch<TeamMember[]>(getAllTeamMembersQuery, {}, fetchOptions);
});

export const getLegalPageBySlug = cache(async (slug: string): Promise<LegalPage | null> => {
  return client.fetch<LegalPage>(getLegalPageBySlugQuery, { slug }, fetchOptions);
});

import type { FAQ } from '@/features/academy/types/models';
import { getFAQsQuery } from '@/sanity/lib/queries';

export const getAcademyFAQs = cache(async (): Promise<FAQ[]> => {
  return client.fetch<FAQ[]>(getFAQsQuery, {}, fetchOptions);
});

