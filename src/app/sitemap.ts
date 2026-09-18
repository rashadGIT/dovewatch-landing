import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://dovewatch.com';
const ROUTES = ['', '/features', '/pricing', '/contact', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));
}
