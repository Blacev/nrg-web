import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/servicios': {
      es: '/servicios',
      en: '/services',
    },
    '/servicios/[slug]': {
      es: '/servicios/[slug]',
      en: '/services/[slug]',
    },
    '/equipo': {
      es: '/equipo',
      en: '/team',
    },
    '/sectores': {
      es: '/sectores',
      en: '/sectors',
    },
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
    '/legal/privacidad': '/legal/privacidad',
    '/legal/terminos': '/legal/terminos',
  },
});
