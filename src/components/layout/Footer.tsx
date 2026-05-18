import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';

// Footer es Server Component — los hooks de navegación necesitan ser client
// Por eso extraemos el switch de idioma a un sub-componente client
import FooterLangSwitch from './FooterLangSwitch';

const SERVICIOS = [
  { href: '/servicios/mantenimiento', label: 'Mantenimiento' },
  { href: '/servicios/montaje', label: 'Montaje' },
  { href: '/servicios/puesta-en-marcha', label: 'Puesta en marcha' },
  { href: '/servicios/alineacion', label: 'Alineación' },
  { href: '/servicios/asesoria', label: 'Asesoría técnica' },
  { href: '/servicios/suministros', label: 'Suministros' },
];

const EMPRESA = [
  { href: '/equipo', labelKey: 'equipo' as const },
  { href: '/sectores', labelKey: 'sectores' as const },
  { href: '/contacto', labelKey: 'contacto' as const },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-primary-dark text-text-light">
      <Container as="div">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Marca */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="NRG — Inicio"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-text-light">
                NRG
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-light/70">
              {t('tagline')}
            </p>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-sm text-text-light/60 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="NRG en LinkedIn"
            >
              {/* SVG LinkedIn — Lucide no lo incluye aún */}
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Col 2 — Servicios */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              {t('servicios')}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {SERVICIOS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-light/70 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Empresa */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              {t('empresa')}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {EMPRESA.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-light/70 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                  >
                    {tNav(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              {t('contacto')}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href="mailto:contacto@nrg-ingenieria.com"
                  className="flex items-center gap-2 text-sm text-text-light/70 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                >
                  <Mail className="size-4 shrink-0 opacity-70" />
                  contacto@nrg-ingenieria.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-text-light/50">
                  <Phone className="size-4 shrink-0 opacity-50" />
                  +57 (pendiente)
                </span>
              </li>
              <li>
                <a
                  href="https://wa.me/57"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-light/70 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                >
                  <MessageCircle className="size-4 shrink-0 opacity-70" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-text-light/10 py-6 sm:flex-row">
          <p className="text-xs text-text-light/50">{t('derechos')}</p>

          <div className="flex items-center gap-6">
            <FooterLangSwitch />
            <Link
              href="/legal/privacidad"
              className="text-xs text-text-light/50 transition-colors hover:text-accent"
            >
              {t('privacidad')}
            </Link>
            <Link
              href="/legal/terminos"
              className="text-xs text-text-light/50 transition-colors hover:text-accent"
            >
              {t('terminos')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
