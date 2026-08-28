import { siteConfig } from "@/shared/config/site";

type CourseSchemaParams = {
  name: string;
  description: string;
  providerName?: string;
  providerUrl?: string;
  url?: string;
};

/**
 * Generates JSON-LD schema for an Educational Course.
 * This unlocks the Google "Course" rich results.
 */
export function generateCourseSchema({
  name,
  description,
  providerName = `${siteConfig.name} Academy`,
  providerUrl = siteConfig.url,
  url,
}: CourseSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": providerName,
      "sameAs": providerUrl,
    },
    // Optional but good for SEO if we have specific course pages
    ...(url && { "url": url }),
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Blended", // physical or online
      "location": {
        "@type": "Place",
        "name": providerName,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kathmandu",
          "addressCountry": "NP",
        }
      }
    }
  };
}

/**
 * Generates JSON-LD schema for the Educational Organization itself.
 * Should be placed on the Academy homepage.
 */
export function generateAcademyOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": `${siteConfig.name} Academy`,
    "url": `${siteConfig.url}/academy`,
    "logo": `${siteConfig.url}/logo.png`, // assuming standard logo path
    "contactPoint": {
      "@type": "ContactPoint",
      "email": siteConfig.contact.email,
      "contactType": "Admissions",
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressCountry": "NP",
    }
  };
}

/**
 * Generates JSON-LD schema for the Agency as a Local Business / Professional Service.
 * Should be placed on the Agency homepage.
 */
export function generateAgencyLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${siteConfig.name} Agency`,
    "url": `${siteConfig.url}/agency`,
    "logo": `${siteConfig.url}/logo.png`,
    "description": "Premium web development, digital marketing, and app development agency.",
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressCountry": "NP",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };
}

/**
 * Generates JSON-LD schema for a Frequently Asked Questions (FAQ) Page.
 * Unlocks collapsible FAQ rich snippets in Google search results.
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generates JSON-LD schema for a Breadcrumb List.
 * Helps search engines understand site hierarchy and displays cleaner URLs in SERPs.
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
