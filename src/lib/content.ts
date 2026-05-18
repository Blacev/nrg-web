// Helpers para cargar contenido desde archivos JSON
// Uso: await getHomeContent('es') → retorna HomeContent tipado

import type {
  HomeContent,
  EquipoContent,
  ServiciosContent,
  ServicioItem,
  SectoresContent,
  ContactoContent,
} from './types';

type Locale = 'es' | 'en';

// ─── Home ────────────────────────────────────────────────────────────────────

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  const data = await import(`@/content/${locale}/home.json`);
  return data.default as HomeContent;
}

// ─── Equipo ──────────────────────────────────────────────────────────────────

export async function getEquipoContent(locale: Locale): Promise<EquipoContent> {
  const data = await import(`@/content/${locale}/equipo.json`);
  return data.default as EquipoContent;
}

// ─── Servicios ───────────────────────────────────────────────────────────────

export async function getServiciosContent(locale: Locale): Promise<ServiciosContent> {
  const data = await import(`@/content/${locale}/servicios.json`);
  return data.default as ServiciosContent;
}

export async function getServicioBySlug(
  locale: Locale,
  slug: string,
): Promise<ServicioItem | null> {
  const content = await getServiciosContent(locale);
  return content.services.find((s) => s.slug === slug) ?? null;
}

export async function getAllServicioSlugs(locale: Locale): Promise<string[]> {
  const content = await getServiciosContent(locale);
  return content.services.map((s) => s.slug);
}

// ─── Sectores ────────────────────────────────────────────────────────────────

export async function getSectoresContent(locale: Locale): Promise<SectoresContent> {
  const data = await import(`@/content/${locale}/sectores.json`);
  return data.default as SectoresContent;
}

// ─── Contacto ────────────────────────────────────────────────────────────────

export async function getContactoContent(locale: Locale): Promise<ContactoContent> {
  const data = await import(`@/content/${locale}/contacto.json`);
  return data.default as ContactoContent;
}
