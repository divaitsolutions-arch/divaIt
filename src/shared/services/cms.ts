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

const fetchOptions = { next: { revalidate: 60 } };

let fallbackData: any = null;
try {
  fallbackData = require('@/sanity/fallback.json');
} catch (e) {
  console.warn('Fallback data not found, will rely on live Sanity API.');
}

async function safeFetch<T>(queryKey: string, query: string, params: Record<string, any> = {}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, fetchOptions);
  } catch (error) {
    console.error(`[Sanity Fallback] Live fetch failed for ${queryKey}. Using fallback data. Error:`, error);
    if (!fallbackData || !fallbackData[queryKey]) {
      throw error;
    }
    if (params.slug) {
      return fallbackData[queryKey][params.slug] as T;
    }
    return fallbackData[queryKey] as T;
  }
}

export const getDisciplines = cache(async (): Promise<Discipline[]> => {
  return safeFetch<Discipline[]>('getAllDisciplinesQuery', getAllDisciplinesQuery);
});

export const getDisciplineBySlug = cache(async (slug: string): Promise<Discipline | null> => {
  return safeFetch<Discipline>('getDisciplineBySlugQuery', getDisciplineBySlugQuery, { slug });
});

export const getIndividualCourses = cache(async (): Promise<Course[]> => {
  return safeFetch<Course[]>('getAllIndividualCoursesQuery', getAllIndividualCoursesQuery);
});

export const getIndividualCourseBySlug = cache(async (slug: string): Promise<Course | null> => {
  return safeFetch<Course>('getIndividualCourseBySlugQuery', getIndividualCourseBySlugQuery, { slug });
});

export const getPackages = cache(async (): Promise<Package[]> => {
  return safeFetch<Package[]>('getPackagesQuery', getPackagesQuery);
});

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return safeFetch<BlogPost[]>('getAllBlogPostsQuery', getAllBlogPostsQuery);
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  return safeFetch<BlogPost>('getBlogPostBySlugQuery', getBlogPostBySlugQuery, { slug });
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
  return safeFetch<CaseStudyData[]>('getAllAgencyCaseStudiesQuery', getAllAgencyCaseStudiesQuery);
});

export const getAgencyCaseStudyBySlug = cache(async (slug: string): Promise<CaseStudyData | null> => {
  return safeFetch<CaseStudyData>('getAgencyCaseStudyBySlugQuery', getAgencyCaseStudyBySlugQuery, { slug });
});

export const getAllAgencyServices = cache(async (): Promise<ServiceData[]> => {
  return safeFetch<ServiceData[]>('getAllAgencyServicesQuery', getAllAgencyServicesQuery);
});

export const getAgencyServiceBySlug = cache(async (slug: string): Promise<ServiceData | null> => {
  return safeFetch<ServiceData>('getAgencyServiceBySlugQuery', getAgencyServiceBySlugQuery, { slug });
});

export const getAllAgencyPackageGroups = cache(async (): Promise<PromotionalSolutionGroup[]> => {
  return safeFetch<PromotionalSolutionGroup[]>('getAllAgencyPackageGroupsQuery', getAllAgencyPackageGroupsQuery);
});

// --- Shared Fetch Functions (Team, Legal) ---
import type { TeamMember, LegalPage } from '@/shared/types/models';
import {
  getAllTeamMembersQuery,
  getLegalPageBySlugQuery,
} from '@/sanity/lib/queries';

export const getAllTeamMembers = cache(async (): Promise<TeamMember[]> => {
  return safeFetch<TeamMember[]>('getAllTeamMembersQuery', getAllTeamMembersQuery);
});

export const getLegalPageBySlug = cache(async (slug: string): Promise<LegalPage | null> => {
  return safeFetch<LegalPage>('getLegalPageBySlugQuery', getLegalPageBySlugQuery, { slug });
});

import type { FAQ } from '@/features/academy/types/models';
import { getFAQsQuery } from '@/sanity/lib/queries';

export const getAcademyFAQs = cache(async (): Promise<FAQ[]> => {
  return safeFetch<FAQ[]>('getFAQsQuery', getFAQsQuery);
});
