import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['500'],
});

const BASE_URL = 'https://nrg-ingenieria.com';

export const metadata: Metadata = {
  title: {
    default: 'NRG Ingeniería — Servicios para centrales eléctricas',
    template: '%s | NRG Ingeniería',
  },
  description:
    'Mantenimiento, montaje y puesta en marcha de turbinas hidráulicas, de vapor y de gas. Más de 35 años de experiencia combinada en 15 países.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'en': '/en',
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon-32x32.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'NRG Ingeniería',
    locale: 'es_CO',
    alternateLocale: 'en_US',
    images: [{ url: '/images/og/og-image.png', width: 1200, height: 630, alt: 'NRG Ingeniería' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og/og-image.png'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NRG Ingeniería',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo/logo-color-full.png`,
  description:
    'Servicios de ingeniería para centrales eléctricas: mantenimiento, montaje y puesta en marcha de turbinas hidráulicas, de vapor y de gas.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contacto@nrg-ingenieria.com',
    contactType: 'customer service',
    areaServed: ['CO', 'LATAM', 'ES'],
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: ['https://linkedin.com'],
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <Navbar />
            <main id="main-content" className="pt-16">{children}</main>
            <Footer />
            <ScrollToTopButton />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
