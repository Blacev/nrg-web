'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';

const NAV_LINKS = [
  { href: '/', labelKey: 'inicio' },
  { href: '/servicios', labelKey: 'servicios' },
  { href: '/equipo', labelKey: 'equipo' },
  { href: '/sectores', labelKey: 'sectores' },
  { href: '/contacto', labelKey: 'contacto' },
] as const;

type NavLabelKey = (typeof NAV_LINKS)[number]['labelKey'];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const light = !scrolled; // navbar is over dark hero when not scrolled

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
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
            <span className={cn(
              'font-display text-2xl font-bold tracking-tight transition-colors duration-300',
              light ? 'text-text-light' : 'text-primary',
            )}>
              NRG
            </span>
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
                href={pathname}
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

          {/* Botón hamburguesa — siempre muestra el icono de menú */}
          <button
            className={cn(
              'rounded-md p-2 transition-colors hover:bg-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden',
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

      {/* Menú móvil — drawer de pantalla completa */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-surface lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Cabecera del drawer con logo y botón X */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-label="NRG — Inicio"
            >
              NRG
            </Link>
            <button
              className="rounded-md p-2 text-primary transition-colors hover:bg-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Links de navegación */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
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
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer del drawer: switch idioma + CTA */}
          <div className="border-t border-border px-4 py-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-base" aria-label="Selector de idioma">
              <span className={cn('font-semibold transition-colors', locale === 'es' ? 'text-primary' : 'text-muted-foreground')}>
                ES
              </span>
              <span className="text-border" aria-hidden="true">|</span>
              <Link
                href={pathname}
                locale={otherLocale}
                className={cn('font-semibold transition-colors', locale === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-primary')}
              >
                EN
              </Link>
            </div>
            <Link
              href="/contacto"
              className="block w-full rounded-lg bg-accent py-3.5 text-center text-base font-bold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {t('cotizar')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
