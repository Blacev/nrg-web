import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Wrench, Settings, Play, Crosshair, Lightbulb, Package, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Link, asHref } from '@/lib/navigation';
import { getServiciosContent } from '@/lib/content';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { buttonVariants } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const iconMap: Record<string, LucideIcon> = {
  Wrench, Settings, Play, Crosshair, Lightbulb, Package,
};

const serviceGradients: Record<string, string> = {
  mantenimiento:    'from-primary-dark to-primary',
  montaje:          'from-[#071633] to-primary-light',
  'puesta-en-marcha': 'from-primary-dark via-primary to-[#1a3d6e]',
  alineacion:       'from-[#040c1c] to-[#0f2d5a]',
  asesoria:         'from-primary-dark to-[#1e3a6f]',
  suministros:      'from-[#071633] to-primary',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await getServiciosContent(locale as 'es' | 'en');
  return {
    title: page.title,
    description: page.subtitle,
    openGraph: { title: page.title, description: page.subtitle },
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  const { page, services } = await getServiciosContent(locale as 'es' | 'en');

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-b from-bg-alt to-surface py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection delay={0}>
              <Eyebrow className="mb-4">{page.eyebrow}</Eyebrow>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <Heading as="h1" size="1">{page.title}</Heading>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {page.subtitle}
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Grid de servicios ─────────────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Wrench;
              const gradient = serviceGradients[service.slug] ?? serviceGradients.mantenimiento;
              return (
                <AnimatedSection key={service.slug} delay={i * 0.1}>
                  <article className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow duration-200 hover:shadow-lg">
                    {/* Visual area — photo or gradient placeholder */}
                    <div className="relative h-44 overflow-hidden">
                      {service.image ? (
                        <>
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            quality={80}
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-primary/40" aria-hidden="true" />
                        </>
                      ) : (
                        <div className={cn('absolute inset-0 bg-linear-to-br', gradient)}>
                          <svg
                            className="absolute inset-0 h-full w-full opacity-15"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <defs>
                              <pattern
                                id={`sp-${service.slug}`}
                                x="0" y="0" width="28" height="28"
                                patternUnits="userSpaceOnUse"
                              >
                                <circle cx="1" cy="1" r="0.8" fill="white" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#sp-${service.slug})`} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="size-20 text-white/10" aria-hidden="true" />
                          </div>
                        </div>
                      )}
                      <div className="absolute left-0 top-0 h-1 w-20 rounded-br-sm bg-accent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4 p-7">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-primary/8">
                        <Icon className="size-5 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-semibold text-primary">
                          <Link
                            href={{ pathname: '/servicios/[slug]' as const, params: { slug: service.slug } }}
                            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {service.title}
                          </Link>
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {service.shortDescription}
                        </p>
                      </div>
                      <div
                        className="relative z-10 mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-accent"
                        aria-hidden="true"
                      >
                        {page.otherServicesViewLabel}
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA banda ────────────────────────────────────────────────────── */}
      <section className="bg-primary py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold text-text-light sm:text-3xl">
                {page.ctaTitle}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-text-light/70">
                {page.ctaSubtitle}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <Link
                href={asHref(page.ctaHref)}
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-8')}
              >
                {page.ctaLabel}
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
