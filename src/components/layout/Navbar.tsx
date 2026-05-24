'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, asHref } from '@/lib/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';

const NAV_LINKS = [
  { href: '/', labelKey: 'inicio' },
  { href: '/servicios', labelKey: 'servicios' },
  { href: '/equipo', labelKey: 'equipo' },
  { href: '/sectores', labelKey: 'sectores' },
  { href: '/contacto', labelKey: 'contacto' },
] as const;

// Bidirectional slug map — works from both ES and EN slugs
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

type NavLabelKey = (typeof NAV_LINKS)[number]['labelKey'];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  // useParams gives the raw route segment value regardless of which locale URL is active.
  // On /es/servicios/mantenimiento AND /en/services/maintenance, params.slug is the actual slug.
  const params = useParams();
  const currentSlug = typeof params.slug === 'string' ? params.slug : null;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Needed to avoid calling createPortal during SSR (document.body does not exist server-side)
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Body scroll lock — prevents page scrolling while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const isHomePage = pathname === '/';
  const light = isHomePage && !scrolled;

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  // Build the href for the locale switcher.
  // On service detail pages, translate the slug to the target locale.
  // On all other pages, next-intl's Link handles pathname translation automatically.
  const switchHref = currentSlug
    ? {
        pathname: '/servicios/[slug]' as const,
        params: { slug: SERVICE_SLUG_MAP[currentSlug]?.[otherLocale as 'es' | 'en'] ?? currentSlug },
      }
    : asHref(pathname);

  // Mobile menu — extracted so it can be portalled into document.body.
  // This escapes the <header>'s backdrop-filter stacking context, which would otherwise
  // confine position:fixed children to the header's 64px height when scrolled.
  const mobileMenu = (
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-60 bg-primary-dark/70 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-70 flex h-screen w-full max-w-sm flex-col bg-surface shadow-xl lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Cabecera */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label="NRG — Inicio"
              >
                <Image
                  src="/images/logo/logo-color-compact.png"
                  width={140}
                  height={50}
                  alt="NRG — Ingeniería en movimiento"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                className="rounded-md p-2 text-primary transition-colors hover:bg-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="flex flex-col gap-1" role="list">
                {NAV_LINKS.map(({ href, labelKey }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3.5 text-xl font-semibold transition-colors duration-200',
                        isActive(href)
                          ? 'bg-primary/5 text-primary'
                          : 'text-foreground hover:bg-muted hover:text-primary',
                      )}
                    >
                      {t(labelKey as NavLabelKey)}
                      {isActive(href) && (
                        <span className="ml-auto size-2 rounded-full bg-accent" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="shrink-0 border-t border-border px-4 py-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-base" aria-label="Selector de idioma">
                <span className={cn('font-semibold transition-colors', locale === 'es' ? 'text-primary' : 'text-muted-foreground')}>
                  ES
                </span>
                <span className="text-border" aria-hidden="true">|</span>
                <Link
                  href={switchHref}
                  locale={otherLocale}
                  onClick={() => setMenuOpen(false)}
                  className={cn('font-semibold transition-colors', locale === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-primary')}
                >
                  EN
                </Link>
              </div>
              <Link
                href="/contacto"
                onClick={() => setMenuOpen(false)}
                className="block w-full rounded-lg bg-accent py-3.5 text-center text-base font-bold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {t('cotizar')}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border bg-surface/95 shadow-sm backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between"
            aria-label="Navegación principal"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label="NRG — Inicio"
            >
              <Image
                src={light ? '/images/logo/logo-light-compact.png' : '/images/logo/logo-color-compact.png'}
                width={140}
                height={50}
                alt="NRG — Ingeniería en movimiento"
                priority
                className="h-10 w-auto"
              />
            </Link>

            {/* Links desktop */}
            <ul className="hidden items-center gap-7 lg:flex" role="list">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'relative py-1 text-sm font-medium transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
                      isActive(href)
                        ? light ? 'text-text-light' : 'text-primary'
                        : light
                          ? 'text-text-light/70 hover:text-text-light'
                          : 'text-muted-foreground hover:text-primary',
                    )}
                  >
                    {t(labelKey as NavLabelKey)}
                    {isActive(href) && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Acciones desktop */}
            <div className="hidden items-center gap-5 lg:flex">
              {/* Switch idioma */}
              <div className="flex items-center gap-1.5 text-sm" aria-label="Selector de idioma">
                <span className={cn(
                  'transition-colors duration-200',
                  locale === 'es'
                    ? light ? 'font-bold text-text-light' : 'font-bold text-primary'
                    : light ? 'text-text-light/60' : 'text-muted-foreground',
                )}>
                  ES
                </span>
                <span className={cn('transition-colors duration-200', light ? 'text-text-light/30' : 'text-border')} aria-hidden="true">
                  |
                </span>
                <Link
                  href={switchHref}
                  locale={otherLocale}
                  className={cn(
                    'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
                    locale === 'en'
                      ? light ? 'font-bold text-text-light' : 'font-bold text-primary'
                      : light ? 'text-text-light/60 hover:text-text-light' : 'text-muted-foreground hover:text-primary',
                  )}
                >
                  EN
                </Link>
              </div>

              {/* CTA */}
              <Link
                href="/contacto"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {t('cotizar')}
              </Link>
            </div>

            {/* Botón hamburguesa */}
            <button
              className={cn(
                'rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden',
                light ? 'text-text-light hover:bg-text-light/10' : 'text-primary hover:bg-primary/8',
              )}
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </button>
          </nav>
        </Container>
      </header>

      {/* Portal renders the mobile menu directly into document.body, escaping the header's
          backdrop-filter stacking context which would otherwise trap position:fixed children
          inside the header's 64px height when the user has scrolled */}
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
