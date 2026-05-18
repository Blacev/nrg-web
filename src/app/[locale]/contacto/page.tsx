import type { Metadata } from 'next';
import { Mail, Phone, MessageCircle, Clock, MapPin, ChevronDown, type LucideIcon } from 'lucide-react';
import { getContactoContent } from '@/lib/content';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ContactForm } from '@/components/sections/ContactForm';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const sidebarIconMap: Record<string, LucideIcon> = {
  Mail, Phone, MessageCircle, Clock, MapPin,
};

type Props = { params: Promise<{ locale: string }> };

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await getContactoContent(locale as 'es' | 'en');
  const title =
    locale === 'es' ? 'Contacto | NRG Ingeniería' : 'Contact | NRG Engineering';
  return {
    title,
    description: content.hero.subtitle,
    robots: { index: true, follow: true },
    openGraph: { title, description: content.hero.subtitle },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  const content = await getContactoContent(locale as 'es' | 'en');
  const { nav, hero, form, sidebar, faq } = content;

  const contactEmail =
    sidebar.items.find((i) => i.icon === 'Mail')?.value ?? '';

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
            <pattern id="ct-hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ct-hero-dots)" />
        </svg>
        <div className="absolute left-0 top-0 h-1 w-32 bg-accent" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-4">{hero.eyebrow}</Eyebrow>
            <Heading as="h1" size="1" className="text-text-light">
              {hero.title}
            </Heading>
            <p className="mt-6 text-lg leading-relaxed text-text-light/70">
              {hero.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Form + Sidebar ───────────────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">

            {/* Form card (2/3) */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
                <h2 className="font-display text-xl font-semibold text-primary">{form.title}</h2>
                <p className="mt-1 mb-6 text-sm text-muted-foreground">{form.subtitle}</p>
                <ContactForm form={form} contactEmail={contactEmail} />
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <div>
              <div className="rounded-xl bg-primary p-6 lg:p-7">
                <h2 className="mb-5 font-display text-base font-semibold text-text-light">
                  {sidebar.title}
                </h2>
                <div className="space-y-4">
                  {sidebar.items.map((item, i) => {
                    const ItemIcon = sidebarIconMap[item.icon] ?? Mail;
                    const content = (
                      <>
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                          <ItemIcon className="size-4 text-accent" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium uppercase tracking-wide text-text-light/40">
                            {item.label}
                          </p>
                          <p className="text-sm font-medium text-text-light">{item.value}</p>
                        </div>
                      </>
                    );
                    return item.href ? (
                      <a
                        key={i}
                        href={item.href}
                        className="flex items-start gap-3 transition-opacity hover:opacity-80"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={i} className="flex items-start gap-3">
                        {content}
                      </div>
                    );
                  })}
                </div>

                {/* Emergency block */}
                <div className="mt-6 rounded-lg border border-accent/20 bg-accent/10 p-4">
                  <p className="text-xs font-semibold text-accent">{sidebar.emergencyTitle}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-light/70">
                    {sidebar.emergencyText}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-bg-alt py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <Eyebrow className="mb-3">{faq.eyebrow}</Eyebrow>
              <Heading as="h2" size="3">{faq.title}</Heading>
            </div>
            <div className="space-y-3">
              {faq.items.map((item, i) => (
                <details
                  key={i}
                  className="group overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-primary transition-colors duration-150 hover:bg-bg-alt [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown
                      className="size-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="border-t border-border px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
