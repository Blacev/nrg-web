import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { NRGCard } from '@/components/ui/nrg-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Styleguide — NRG' };

// ─── Helpers locales ─────────────────────────────────────────────────────────

function SwatchRow({ label, colors }: { label: string; colors: { name: string; bg: string }[] }) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-3">
        {colors.map(({ name, bg }) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <div className={`size-16 rounded-lg border border-border ${bg} shadow-sm`} />
            <span className="text-center text-xs text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-bg-alt">
      {/* Header */}
      <div className="border-b border-border bg-surface py-10">
        <Container>
          <Eyebrow>Sistema de diseño</Eyebrow>
          <Heading as="h1" size="2" className="mt-2">
            NRG Styleguide
          </Heading>
          <p className="mt-2 text-sm text-muted-foreground">
            Página interna — accesible en /[locale]/styleguide
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="flex flex-col gap-16">

          {/* ── PALETA ──────────────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Paleta de colores
            </Heading>
            <SwatchRow
              label="Primary (Navy)"
              colors={[
                { name: '#0A1F44\nprimary', bg: 'bg-primary' },
                { name: '#1E3A6F\nprimary-light', bg: 'bg-primary-light' },
                { name: '#050F22\nprimary-dark', bg: 'bg-primary-dark' },
              ]}
            />
            <SwatchRow
              label="Accent (Ámbar)"
              colors={[
                { name: '#E89F3C\naccent', bg: 'bg-accent' },
                { name: '#D08820\naccent-hover', bg: 'bg-accent-hover' },
              ]}
            />
            <SwatchRow
              label="Neutrales"
              colors={[
                { name: '#F8FAFC\nbg-alt', bg: 'bg-bg-alt' },
                { name: '#F1F5F9\nsecondary', bg: 'bg-secondary' },
                { name: '#E2E8F0\nborder', bg: 'bg-border' },
                { name: '#64748B\nmuted-fg', bg: 'bg-muted-foreground' },
                { name: '#0F172A\nforeground', bg: 'bg-foreground' },
              ]}
            />
            <SwatchRow
              label="Especiales"
              colors={[
                { name: '#0EA5A4\nsuccess', bg: 'bg-success' },
                { name: '#FFFFFF\nsurface', bg: 'bg-surface border border-border' },
              ]}
            />
          </section>

          {/* ── TIPOGRAFÍAS ─────────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Tipografías
            </Heading>
            <div className="space-y-6">
              {/* Space Grotesk */}
              <div className="rounded-lg border border-border bg-surface p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Space Grotesk — font-display
                  </p>
                  <Badge variant="muted">Headings / Display</Badge>
                </div>
                <p className="font-display text-5xl font-bold text-primary leading-tight">
                  Ingeniería en movimiento
                </p>
                <p className="mt-3 font-display text-2xl font-semibold text-primary">
                  Overhaul mayor de turbinas Pelton
                </p>
                <p className="mt-2 text-xs text-muted-foreground font-mono">
                  --font-display · weights: 600, 700
                </p>
              </div>

              {/* Inter */}
              <div className="rounded-lg border border-border bg-surface p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Inter — font-sans
                  </p>
                  <Badge variant="muted">Body / UI</Badge>
                </div>
                <p className="font-sans text-xl font-medium text-foreground">
                  Mantenimiento, montaje y puesta en marcha de turbinas hidráulicas.
                </p>
                <p className="mt-2 font-sans text-base text-foreground">
                  Servicios de ingeniería especializados para centrales eléctricas, con más de tres décadas de trayectoria internacional.
                </p>
                <p className="mt-2 font-sans text-sm text-muted-foreground">
                  Texto secundario en Inter 400 — descripciones, párrafos de apoyo y labels de UI.
                </p>
                <p className="mt-2 text-xs text-muted-foreground font-mono">
                  --font-sans · weights: 400, 500, 600, 700
                </p>
              </div>

              {/* JetBrains Mono */}
              <div className="rounded-lg border border-border bg-surface p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    JetBrains Mono — font-mono
                  </p>
                  <Badge variant="muted">Métricas / Datos técnicos</Badge>
                </div>
                <p className="font-mono text-4xl font-medium text-primary">
                  +35 años · 15 países
                </p>
                <p className="font-mono text-2xl font-medium text-accent mt-2">
                  +50 proyectos completados
                </p>
                <p className="mt-3 font-mono text-sm text-muted-foreground">
                  MW / RPM / kPa / °C — datos técnicos en contextos de ingeniería
                </p>
                <p className="mt-2 text-xs text-muted-foreground font-mono">
                  --font-mono · weight: 500
                </p>
              </div>
            </div>
          </section>

          {/* ── HEADINGS ────────────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Headings
            </Heading>
            <div className="rounded-lg border border-border bg-surface p-8 space-y-6">
              <Heading as="h1" size="1">H1 — Ingeniería en movimiento</Heading>
              <Heading as="h2" size="2">H2 — Servicios para centrales eléctricas</Heading>
              <Heading as="h3" size="3">H3 — Mantenimiento preventivo y correctivo</Heading>
              <Heading as="h4" size="4">H4 — Overhaul mayor de turbinas Pelton</Heading>
            </div>
          </section>

          {/* ── EYEBROW ─────────────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Eyebrow
            </Heading>
            <div className="rounded-lg border border-border bg-surface p-8 space-y-4">
              <div>
                <Eyebrow>Servicios de ingeniería</Eyebrow>
                <Heading as="h3" size="3" className="mt-2">El equipo es la empresa</Heading>
              </div>
              <div>
                <Eyebrow variant="muted">El equipo</Eyebrow>
                <Heading as="h3" size="3" className="mt-2">Décadas de experiencia</Heading>
              </div>
            </div>
          </section>

          {/* ── BOTONES ─────────────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Botones
            </Heading>

            <div className="space-y-6">
              {/* Variantes NRG — todas las tallas */}
              {(
                [
                  { variant: 'primary', label: 'Primary (CTA ámbar)', description: 'bg-accent · CTA principal', dark: false },
                  { variant: 'secondary-navy', label: 'Secondary Navy', description: 'border-primary · acción secundaria', dark: false },
                  { variant: 'ghost-navy', label: 'Ghost Navy', description: 'sin fondo · terciario', dark: false },
                  { variant: 'inverted', label: 'Inverted', description: 'bg-surface text-primary · sobre fondos oscuros', dark: true },
                ] as const
              ).map(({ variant, label, description, dark }) => (
                <div key={variant} className={dark ? 'rounded-lg bg-primary-dark p-6' : 'rounded-lg border border-border bg-surface p-6'}>
                  <div className="mb-4 flex items-center justify-between">
                    <p className={`text-xs font-semibold uppercase tracking-widest ${dark ? 'text-text-light/50' : 'text-muted-foreground'}`}>
                      {label}
                    </p>
                    <span className={`text-xs font-mono ${dark ? 'text-text-light/40' : 'text-muted-foreground'}`}>
                      {description}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant={variant} size="sm">{label} sm</Button>
                    <Button variant={variant} size="default">{label} md</Button>
                    <Button variant={variant} size="lg">{label} lg</Button>
                  </div>
                </div>
              ))}

              {/* Variantes shadcn base */}
              <div className="rounded-lg border border-border bg-surface p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Variantes shadcn base
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default (Navy)</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
            </div>
          </section>

          {/* ── BADGES ──────────────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Badges
            </Heading>
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Navy</Badge>
                <Badge variant="accent">Ámbar técnico</Badge>
                <Badge variant="success">0EA5A4</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="muted">Muted</Badge>
              </div>
            </div>
          </section>

          {/* ── CARDS ───────────────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Cards
            </Heading>
            <div className="grid gap-4 sm:grid-cols-3">
              <NRGCard variant="default">
                <Eyebrow className="mb-2">Servicio</Eyebrow>
                <Heading as="h4" size="4" className="mb-2">Mantenimiento</Heading>
                <p className="text-sm text-muted-foreground">
                  Card default — sombra sutil + hover con elevación.
                </p>
              </NRGCard>
              <NRGCard variant="bordered">
                <Eyebrow className="mb-2">Servicio</Eyebrow>
                <Heading as="h4" size="4" className="mb-2">Montaje</Heading>
                <p className="text-sm text-muted-foreground">
                  Card bordered — borde navy sutil que se acentúa en hover.
                </p>
              </NRGCard>
              <NRGCard variant="flat">
                <Eyebrow className="mb-2">Servicio</Eyebrow>
                <Heading as="h4" size="4" className="mb-2">Asesoría</Heading>
                <p className="text-sm text-muted-foreground">
                  Card flat — fondo bg-alt sin sombra, minimalista.
                </p>
              </NRGCard>
            </div>
          </section>

          {/* ── SECTION VARIANTS ────────────────────────────────────────────── */}
          <section>
            <Heading as="h2" size="3" className="mb-8 border-b border-border pb-4">
              Section variants
            </Heading>
            <div className="overflow-hidden rounded-lg border border-border">
              <Section variant="default">
                <Container>
                  <Eyebrow>variant=&quot;default&quot;</Eyebrow>
                  <Heading as="h3" size="3" className="mt-2">Fondo blanco (bg-surface)</Heading>
                </Container>
              </Section>
              <Section variant="alt">
                <Container>
                  <Eyebrow>variant=&quot;alt&quot;</Eyebrow>
                  <Heading as="h3" size="3" className="mt-2">Fondo alterno (bg-bg-alt)</Heading>
                </Container>
              </Section>
              <Section variant="dark">
                <Container>
                  <Eyebrow>variant=&quot;dark&quot;</Eyebrow>
                  <Heading as="h3" size="3" className="mt-2 text-text-light">
                    Fondo navy oscuro (bg-primary-dark)
                  </Heading>
                </Container>
              </Section>
            </div>
          </section>

        </div>
      </Container>
    </div>
  );
}
