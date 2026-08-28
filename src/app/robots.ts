import { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/studio/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
