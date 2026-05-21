import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Droplets, Cloud, Flame, ChevronRight,
  Users, GitBranch, Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/lib/navigation';
import { routing } from '@/i18n/routing';
import { getSectoresContent } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

// ─── Icon maps ───────────────────────────────────────────────────────────────

const sectorIconMap: Record<string, LucideIcon> = {
  Droplets, Cloud, Flame,
};

const crossoverIconMap: Record<string, LucideIcon> = {
  Users, GitBranch, Wallet,
};

// ─── Visual maps (styling only, not content) ─────────────────────────────────

const sectorGradients: Record<string, string> = {
  hidro: 'from-[#0a2a6e] via-primary to-[#0e4f8a]',
  vapor: 'from-primary-dark via-[#1a2f55] to-primary',
  gas:   'from-primary via-[#0f2d5a] to-[#1e3a3a]',
};

// ─── Static generation ───────────────────────────────────────────────────────

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await getSectoresContent(locale as 'es' | 'en');
  const title =
    locale === 'es' ? 'Sectores | NRG Ingeniería' : 'Sectors | NRG Engineering';
  return {
    title,
    description: content.hero.subtitle,
    openGraph: { title, description: content.hero.subtitle },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function SectoresPage({ params }: Props) {
  const { locale } = await params;
  const content = await getSectoresContent(locale as 'es' | 'en');
  const { nav, hero, intro, sectors, crossover, cta, labels } = content;

  const breadcrumbItems = [
    { label: nav.breadcrumbHome, href: '/' as const },
    { label: hero.eyebrow },
  ];

  return (
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-bg-alt py-4">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-dark py-24 md:py-32">
        <svg
          className="absolute inset-0 h-full w-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="sec-hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sec-hero-dots)" />
        </svg>
        <div className="absolute left-0 top-0 h-1 w-32 bg-accent" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection delay={0}>
              <Eyebrow className="mb-4">{hero.eyebrow}</Eyebrow>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <Heading as="h1" size="1" className="text-text-light">
                {hero.title}
              </Heading>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="mt-6 text-lg leading-relaxed text-text-light/70">
                {hero.subtitle}
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <Heading as="h2" size="2" className="mb-8">
                {intro.title}
              </Heading>
            </AnimatedSection>
            <div className="space-y-5">
              {intro.paragraphs.map((paragraph, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <p className="text-base leading-8 text-foreground">
                    {paragraph}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Sector blocks (alternating layout) ───────────────────────────── */}
      {sectors.map((sector, i) => {
        const SectorIcon = sectorIconMap[sector.icon] ?? Droplets;
        const isReversed = i % 2 !== 0;
        const sectionBg = i % 2 === 0 ? 'bg-bg-alt' : 'bg-surface';
        const isAmber = sector.accentColor !== 'teal';
        const contentVariant = isReversed ? 'slideFromRight' : 'slideFromLeft';
        const imageVariant = isReversed ? 'slideFromLeft' : 'slideFromRight';

        return (
          <section
            key={sector.id}
            className={cn('min-h-[75vh] py-20 md:py-28 lg:py-32', sectionBg)}
          >
            <Container className="h-full">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                {/* ── Content side ─────────────────────────────────────── */}
                <AnimatedSection
                  variant={contentVariant}
                  className={cn(isReversed && 'lg:order-2')}
                >
                  {/* Icon + tag */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className={cn(
                      'flex size-10 items-center justify-center rounded-lg',
                      isAmber ? 'bg-accent/15' : 'bg-success/15',
                    )}>
                      <SectorIcon
                        className={cn('size-5', isAmber ? 'text-accent' : 'text-success')}
                        aria-hidden="true"
                      />
                    </div>
                    <Eyebrow className={cn(!isAmber && 'text-success')}>
                      {sector.tag}
                    </Eyebrow>
                  </div>

                  <Heading as="h2" size="2" className="mb-5">
                    {sector.title}
                  </Heading>

                  <p className="mb-8 text-base leading-relaxed text-foreground">
                    {sector.fullDescription}
                  </p>

                  {/* Turbine types grid */}
                  <div className="mb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {labels.turbineTypesLabel}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {sector.turbineTypes.map((t) => (
                        <div
                          key={t.name}
                          className="rounded-lg border border-border bg-surface p-3 shadow-sm"
                        >
                          <p className="font-display text-sm font-semibold text-primary">
                            {t.name}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {t.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications list */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {labels.applicationsLabel}
                    </p>
                    <ul className="space-y-2">
                      {sector.applications.map((app, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-foreground">
                          <ChevronRight
                            className={cn(
                              'mt-0.5 size-4 shrink-0',
                              isAmber ? 'text-accent' : 'text-success',
                            )}
                            aria-hidden="true"
                          />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>

                {/* ── Image / placeholder side ─────────────────────────── */}
                <AnimatedSection
                  variant={imageVariant}
                  className={cn('relative', isReversed && 'lg:order-1')}
                >
                  {sector.image ? (
                    <div className="relative min-h-[420px] overflow-hidden rounded-2xl">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    /* Gradient placeholder */
                    <div
                      className={cn(
                        'relative min-h-[420px] overflow-hidden rounded-2xl bg-linear-to-br',
                        sectorGradients[sector.id] ?? sectorGradients.hidro,
                      )}
                    >
                      {/* Dot pattern */}
                      <svg
                        className="absolute inset-0 h-full w-full opacity-15"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <defs>
                          <pattern
                            id={`sec-dots-${sector.id}`}
                            x="0" y="0" width="28" height="28"
                            patternUnits="userSpaceOnUse"
                          >
                            <circle cx="1" cy="1" r="0.8" fill="white" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#sec-dots-${sector.id})`} />
                      </svg>

                      {/* Large icon watermark */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <SectorIcon className="size-56 text-white/5" aria-hidden="true" />
                      </div>

                      {/* Tag label bottom-left */}
                      <div className="absolute bottom-6 left-6">
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-text-light/25">
                          {sector.tag}
                        </span>
                      </div>

                      {/* Accent line */}
                      <div className={cn(
                        'absolute left-0 top-0 h-1.5 w-24',
                        isAmber ? 'bg-accent' : 'bg-success',
                      )} />
                    </div>
                  )}
                </AnimatedSection>

              </div>
            </Container>
          </section>
        );
      })}

      {/* ── Crossover (navy) ─────────────────────────────────────────────── */}
      <section className="bg-primary py-16 md:py-24">
        <Container>
          <AnimatedSection className="mb-12 text-center">
            <Eyebrow className="mb-3">{crossover.eyebrow}</Eyebrow>
            <Heading as="h2" size="2" className="text-text-light">
              {crossover.title}
            </Heading>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-3">
            {crossover.items.map((item, i) => {
              const CrossIcon = crossoverIconMap[item.icon] ?? Users;
              return (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <div className="flex flex-col gap-4 rounded-xl bg-primary-dark/50 p-6">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-accent/15">
                      <CrossIcon className="size-6 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-text-light">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-light/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-accent" />
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                {cta.title}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {cta.subtitle}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={cta.ctaPrimary.href}
                className={buttonVariants({ variant: 'primary', size: 'lg' })}
              >
                {cta.ctaPrimary.label}
              </Link>
              <Link
                href={cta.ctaSecondary.href}
                className={buttonVariants({ variant: 'secondary-navy', size: 'lg' })}
              >
                {cta.ctaSecondary.label}
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
