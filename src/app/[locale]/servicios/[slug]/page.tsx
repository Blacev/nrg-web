import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Wrench, Settings, Play, Crosshair, Lightbulb, Package,
  Check, ChevronRight, TrendingUp, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/lib/navigation';
import { routing } from '@/i18n/routing';
import { getServiciosContent, getServicioBySlug } from '@/lib/content';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';

const iconMap: Record<string, LucideIcon> = {
  Wrench, Settings, Play, Crosshair, Lightbulb, Package,
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// ─── Static generation ───────────────────────────────────────────────────────

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const content = await getServiciosContent(locale as 'es' | 'en');
      return content.services.map((s) => ({ locale, slug: s.slug }));
    }),
  );
  return results.flat();
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const servicio = await getServicioBySlug(locale as 'es' | 'en', slug);
  if (!servicio) return {};
  return {
    title: `${servicio.title} | NRG Ingeniería`,
    description: servicio.heroSubtitle,
    openGraph: {
      title: `${servicio.title} | NRG Ingeniería`,
      description: servicio.heroSubtitle,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ServicioPage({ params }: Props) {
  const { locale, slug } = await params;
  const content = await getServiciosContent(locale as 'es' | 'en');
  const servicio = content.services.find((s) => s.slug === slug);

  if (!servicio) notFound();

  const { page } = content;
  const otros = content.services.filter((s) => s.slug !== slug);
  const Icon = iconMap[servicio.icon] ?? Wrench;

  const breadcrumbItems = [
    { label: page.breadcrumbHome, href: '/' as const },
    { label: page.breadcrumbServices, href: '/servicios' as const },
    { label: servicio.title },
  ];

  return (
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-bg-alt py-4">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </div>

      {/* ── Hero split ───────────────────────────────────────────────────── */}
      <section className="bg-bg-alt py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: text + CTAs */}
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-accent/15">
                  <Icon className="size-4 text-accent" aria-hidden="true" />
                </div>
                <Eyebrow>{servicio.title}</Eyebrow>
              </div>

              <Heading as="h1" size="1">{servicio.heroTitle}</Heading>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {servicio.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className={buttonVariants({ variant: 'primary', size: 'lg' })}
                >
                  {page.detailCtaPrimary}
                </Link>
                <Link
                  href="/servicios"
                  className={buttonVariants({ variant: 'secondary-navy', size: 'lg' })}
                >
                  {page.detailCtaSecondary}
                </Link>
              </div>
            </div>

            {/* Right: gradient image placeholder */}
            <div className="relative h-72 overflow-hidden rounded-2xl bg-linear-to-br from-primary-dark via-primary to-primary-light lg:h-96">
              <svg
                className="absolute inset-0 h-full w-full opacity-15"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="sh-dots"
                    x="0" y="0" width="28" height="28"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="0.8" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#sh-dots)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="size-36 text-white/8" aria-hidden="true" />
              </div>
              <div className="absolute left-0 top-0 h-1.5 w-24 bg-accent" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Qué incluye ──────────────────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-24">
        <Container>
          <Heading as="h2" size="2" className="mb-10 text-center">
            {servicio.includes.title}
          </Heading>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {servicio.includes.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-border bg-bg-alt p-4"
              >
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <Check className="size-3.5 text-accent" aria-hidden="true" />
                </div>
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Aplicaciones ─────────────────────────────────────────────────── */}
      <section className="bg-bg-alt py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading as="h2" size="3" className="mb-8">
              {servicio.applications.title}
            </Heading>
            <ul className="space-y-4">
              {servicio.applications.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-foreground">
                  <ChevronRight
                    className="mt-0.5 size-5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Beneficios ───────────────────────────────────────────────────── */}
      <section className="bg-primary-dark py-16 md:py-24">
        <Container>
          <Heading as="h2" size="2" className="mb-10 text-center text-text-light">
            {servicio.benefits.title}
          </Heading>
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {servicio.benefits.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl bg-primary/50 p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                  <TrendingUp className="size-5 text-accent" aria-hidden="true" />
                </div>
                <span className="text-sm leading-relaxed text-text-light/85">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA de cierre ────────────────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {servicio.closing}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contacto"
                className={buttonVariants({ variant: 'primary', size: 'lg' })}
              >
                {page.detailCtaPrimary}
              </Link>
              <Link
                href="/servicios"
                className={buttonVariants({ variant: 'ghost-navy', size: 'lg' })}
              >
                {page.detailCtaViewAll}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Otros servicios (cross-sell) ─────────────────────────────────── */}
      <section className="bg-bg-alt py-16">
        <Container>
          <div className="mb-8 text-center">
            <Eyebrow className="mb-2">{page.otherServicesEyebrow}</Eyebrow>
            <Heading as="h2" size="3">{page.otherServicesTitle}</Heading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {otros.map((s) => {
              const OtherIcon = iconMap[s.icon] ?? Wrench;
              return (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-primary/25 hover:shadow-sm"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/8">
                    <OtherIcon className="size-4 text-accent" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm font-semibold leading-snug text-primary transition-colors duration-200 group-hover:text-accent">
                      {s.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {s.shortDescription}
                    </p>
                  </div>
                  <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors duration-200 group-hover:text-primary">
                    {page.otherServicesViewLabel}
                    <ArrowRight className="size-3" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
