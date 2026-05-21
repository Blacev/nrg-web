import type { MetadataRoute } from 'next';

const BASE_URL = 'https://nrg-ingenieria.com';

const ES_SLUGS = ['mantenimiento', 'montaje', 'puesta-en-marcha', 'alineacion', 'asesoria', 'suministros'];
const EN_SLUGS = ['maintenance', 'installation', 'commissioning', 'alignment', 'consulting', 'supplies'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/es`,        lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/en`,        lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/es/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/en/services`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/es/equipo`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/en/team`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/es/sectores`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/en/sectors`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/es/contacto`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/en/contact`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/es/legal/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/en/legal/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/es/legal/terminos`,   lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/en/legal/terminos`,   lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const esServiceRoutes: MetadataRoute.Sitemap = ES_SLUGS.map((slug) => ({
    url: `${BASE_URL}/es/servicios/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const enServiceRoutes: MetadataRoute.Sitemap = EN_SLUGS.map((slug) => ({
    url: `${BASE_URL}/en/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...esServiceRoutes, ...enServiceRoutes];
}
