import type { MetadataRoute } from 'next';

const BASE_URL = 'https://nrg-ingenieria.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/styleguide'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
