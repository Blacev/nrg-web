'use client';

import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link, usePathname, asHref } from '@/lib/navigation';
import { cn } from '@/lib/utils';

// Mirrors the map in Navbar.tsx — bidirectional so it works from both ES and EN slugs
const SERVICE_SLUG_MAP: Record<string, { es: string; en: string }> = {
  mantenimiento:      { es: 'mantenimiento',    en: 'maintenance' },
  maintenance:        { es: 'mantenimiento',    en: 'maintenance' },
  montaje:            { es: 'montaje',          en: 'installation' },
  installation:       { es: 'montaje',          en: 'installation' },
  'puesta-en-marcha': { es: 'puesta-en-marcha', en: 'commissioning' },
  commissioning:      { es: 'puesta-en-marcha', en: 'commissioning' },
  alineacion:         { es: 'alineacion',       en: 'alignment' },
  alignment:          { es: 'alineacion',       en: 'alignment' },
  asesoria:           { es: 'asesoria',         en: 'consulting' },
  consulting:         { es: 'asesoria',         en: 'consulting' },
  suministros:        { es: 'suministros',      en: 'supplies' },
  supplies:           { es: 'suministros',      en: 'supplies' },
};

export default function FooterLangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const currentSlug = typeof params.slug === 'string' ? params.slug : null;
  const otherLocale = locale === 'es' ? 'en' : 'es';

  const switchHref = currentSlug
    ? {
        pathname: '/servicios/[slug]' as const,
        params: { slug: SERVICE_SLUG_MAP[currentSlug]?.[otherLocale as 'es' | 'en'] ?? currentSlug },
      }
    : asHref(pathname);

  return (
    <div className="flex items-center gap-1.5 text-xs" aria-label="Selector de idioma">
      <span className={cn(locale === 'es' ? 'font-bold text-text-light/80' : 'text-text-light/40')}>
        ES
      </span>
      <span className="text-text-light/20" aria-hidden="true">|</span>
      <Link
        href={switchHref}
        locale={otherLocale}
        className={cn(
          'transition-colors hover:text-accent',
          locale === 'en' ? 'font-bold text-text-light/80' : 'text-text-light/40',
        )}
      >
        EN
      </Link>
    </div>
  );
}
