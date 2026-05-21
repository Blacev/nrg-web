import type { Metadata } from 'next';
import { Eye, Users, FileText, Globe2, type LucideIcon } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { getEquipoContent } from '@/lib/content';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { TeamMemberCard } from '@/components/sections/TeamMemberCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const approachIconMap: Record<string, LucideIcon> = {
  Eye, Users, FileText, Globe2,
};

type Props = {
  params: Promise<{ locale: string }>;
};

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await getEquipoContent(locale as 'es' | 'en');
  const title =
    locale === 'es' ? 'El equipo | NRG Ingeniería' : 'The team | NRG Engineering';
  return {
    title,
    description: content.hero.subtitle,
    openGraph: { title, description: content.hero.subtitle },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function EquipoPage({ params }: Props) {
  const { locale } = await params;
  const content = await getEquipoContent(locale as 'es' | 'en');
  const { nav, hero, philosophy, members, credentials, approach, cta } = content;

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
      <section className="relative overflow-hidden bg-primary-dark py-20 md:py-28">
        <svg
          className="absolute inset-0 h-full w-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="eq-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eq-dots)" />
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

      {/* ── Filosofía ────────────────────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <Eyebrow className="mb-4">{philosophy.eyebrow}</Eyebrow>
              <Heading as="h2" size="2" className="mb-8">
                {philosophy.title}
              </Heading>
            </AnimatedSection>
            <div className="space-y-5">
              {philosophy.paragraphs.map((paragraph, i) => (
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

      {/* ── Quiénes somos ────────────────────────────────────────────────── */}
      <section className="bg-bg-alt py-16 md:py-24">
        <Container>
          <AnimatedSection className="mb-10 text-center">
            <Eyebrow className="mb-3">{members.eyebrow}</Eyebrow>
            <Heading as="h2" size="2" className="mb-4">
              {members.title}
            </Heading>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {members.subtitle}
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.items.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.15}>
                <TeamMemberCard member={member} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Credenciales ─────────────────────────────────────────────────── */}
      <section className="bg-primary py-16 md:py-20">
        <Container>
          <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-text-light sm:text-3xl">
              {credentials.title}
            </h2>
            <p className="mt-3 text-base text-text-light/60">{credentials.subtitle}</p>
          </AnimatedSection>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {credentials.items.map((item, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.15}
                className={[
                  i < credentials.items.length - 1
                    ? 'lg:border-r lg:border-text-light/10'
                    : '',
                ].join(' ')}
              >
                <AnimatedCounter
                  value={item.value}
                  unit={item.unit}
                  label={item.label}
                  className="font-mono text-5xl font-medium text-accent sm:text-6xl"
                  unitClassName="ml-1 text-3xl sm:text-4xl"
                />
              </AnimatedSection>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Cómo trabajamos ──────────────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-24">
        <Container>
          <AnimatedSection className="mb-12 text-center">
            <Eyebrow className="mb-3">{approach.eyebrow}</Eyebrow>
            <Heading as="h2" size="2">{approach.title}</Heading>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {approach.items.map((item, i) => {
              const Icon = approachIconMap[item.icon] ?? Eye;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="flex gap-5 rounded-xl border border-border bg-bg-alt p-6">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                      <Icon className="size-6 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
      <section className="relative overflow-hidden bg-linear-to-br from-primary-dark via-primary to-primary-dark py-20 md:py-28">
        <svg
          className="absolute inset-0 h-full w-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="eq-cta-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eq-cta-dots)" />
        </svg>
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold text-text-light sm:text-3xl lg:text-4xl">
                {cta.title}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-text-light/70">
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
                className={buttonVariants({ variant: 'inverted', size: 'lg' })}
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
