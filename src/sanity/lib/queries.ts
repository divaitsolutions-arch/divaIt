import { groq } from 'next-sanity';

// Academy Queries
export const getAllDisciplinesQuery = groq`
  *[_type == "discipline"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    heroDesc,
    icon,
    accent,
    gradient,
    sharedHighlights,
    whoIsThisFor,
    tracks[]-> {
      title,
      "slug": slug.current,
      subtitle,
      heroDesc,
      popular,
      upcoming,
      levels[] {
        id,
        name,
        badge,
        isDefault,
        duration,
        commitment,
        careerOutcome,
        techStack,
        requirements,
        learningOutcomes,
        projects,
        syllabus,
        "syllabusPdfUrl": syllabusPdf.asset->url,
        "brochurePdfUrl": brochurePdf.asset->url,
        "courseNotesPdfUrl": courseNotesPdf.asset->url,
        tuition
      }
    }
  }
`;

export const getDisciplineBySlugQuery = groq`
  *[_type == "discipline" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    heroDesc,
    icon,
    accent,
    gradient,
    sharedHighlights,
    whoIsThisFor,
    tracks[]-> {
      title,
      "slug": slug.current,
      subtitle,
      heroDesc,
      popular,
      upcoming,
      levels[] {
        id,
        name,
        badge,
        isDefault,
        duration,
        commitment,
        careerOutcome,
        techStack,
        requirements,
        learningOutcomes,
        projects,
        syllabus,
        "syllabusPdfUrl": syllabusPdf.asset->url,
        "brochurePdfUrl": brochurePdf.asset->url,
        "courseNotesPdfUrl": courseNotesPdf.asset->url,
        tuition
      }
    }
  }
`;

export const getAllIndividualCoursesQuery = groq`
  *[_type == "individualCourse"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    batch,
    heroDesc,
    badge,
    icon,
    accent,
    gradient,
    category,
    difficulty,
    duration,
    commitment,
    format,
    highlights,
    prerequisites,
    techStack,
    syllabus,
    "syllabusPdfUrl": syllabusPdf.asset->url,
    "brochurePdfUrl": brochurePdf.asset->url,
    "courseNotesPdfUrl": courseNotesPdf.asset->url,
    projects,
    tuition,
    targetAudience,
    howItWorks,
    popular,
    relatedCourses,
    upgradePathTrack
  }
`;

export const getIndividualCourseBySlugQuery = groq`
  *[_type == "individualCourse" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    batch,
    heroDesc,
    badge,
    icon,
    accent,
    gradient,
    category,
    difficulty,
    duration,
    commitment,
    format,
    highlights,
    prerequisites,
    techStack,
    syllabus,
    "syllabusPdfUrl": syllabusPdf.asset->url,
    "brochurePdfUrl": brochurePdf.asset->url,
    "courseNotesPdfUrl": courseNotesPdf.asset->url,
    projects,
    tuition,
    targetAudience,
    howItWorks,
    popular,
    relatedCourses,
    upgradePathTrack
  }
`;

export const getPackagesQuery = groq`
  *[_type == "package"] | order(priceValue asc) {
    _id,
    "id": slug.current,
    title,
    priceValue,
    regularPriceValue,
    period,
    duration,
    level,
    icon,
    popular,
    accent,
    description,
    features
  }
`;

export const getFAQsQuery = groq`
  *[_type == "faq" && category in ["academy", "packages"]] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

// Blog Queries
export const getAllBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    author,
    date,
    readTime,
    tags,
    "coverImage": coverImage.asset->url,
    metaTitle,
    metaDescription,
    socials
  }
`;

export const getBlogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    content,
    excerpt,
    author,
    date,
    readTime,
    tags,
    "coverImage": coverImage.asset->url,
    metaTitle,
    metaDescription,
    socials
  }
`;

// Agency Queries
export const getAllAgencyCaseStudiesQuery = groq`
  *[_type == "agencyPortfolio"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    type,
    industry,
    result,
    heroDesc,
    accent,
    gradient,
    initial,
    tags,
    challenge,
    solution,
    results,
    techStack,
    testimonial,
    timeline,
    liveLink
  }
`;

export const getAgencyCaseStudyBySlugQuery = groq`
  *[_type == "agencyPortfolio" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    type,
    industry,
    result,
    heroDesc,
    accent,
    gradient,
    initial,
    tags,
    challenge,
    solution,
    results,
    techStack,
    testimonial,
    timeline,
    liveLink
  }
`;

export const getAllAgencyServicesQuery = groq`
  *[_type == "agencyService"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    heroDesc,
    icon,
    accent,
    gradient,
    shadow,
    features,
    techStack,
    process,
    faq
  }
`;

export const getAgencyServiceBySlugQuery = groq`
  *[_type == "agencyService" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    heroDesc,
    icon,
    accent,
    gradient,
    shadow,
    features,
    techStack,
    process,
    faq
  }
`;

export const getAllAgencyPackageGroupsQuery = groq`
  *[_type == "agencyPackageGroup"] | order(title asc) {
    _id,
    title,
    "id": slug.current,
    shortDesc,
    bestForLabel,
    whatItIs,
    whyItMatters,
    process,
    benefits,
    packages,
    customFeaturesLabel,
    customFeatures,
    bestForList,
    ctaLabel
  }
`;

// Team Member Queries
export const getAllTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image,
    order,
    socials
  }
`;

// Legal Page Queries
export const getLegalPageBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    updated,
    sections
  }
`;

