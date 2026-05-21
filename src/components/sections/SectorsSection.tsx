import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { HomeContent } from '@/lib/types';

const gradients: Record<string, string> = {
  hidro: 'from-[#0a2a6e] via-primary to-[#0e4f8a]',
  vapor: 'from-primary-dark via-[#1a2f55] to-primary',
  gas:   'from-primary via-[#0f2d5a] to-[#1e3a3a]',
};

const accentColors: Record<string, string> = {
  hidro: 'bg-accent',
  vapor: 'bg-success',
  gas:   'bg-accent',
};

type Props = {
  sectors: HomeContent['sectors'];
};

export function SectorsSection({ sectors }: Props) {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
          <Eyebrow className="mb-3">{sectors.eyebrow}</Eyebrow>
          <Heading as="h2" size="2">{sectors.title}</Heading>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.items.map((item, i) => (
            <AnimatedSection key={item.key} delay={i * 0.15}>
              <div className="group overflow-hidden rounded-xl border border-border shadow-sm transition-shadow duration-200 hover:shadow-md">
                {/* Image / Gradient placeholder */}
                <div
                  className={[
                    'relative flex h-48 items-end bg-linear-to-br p-6',
                    gradients[item.key] ?? gradients.hidro,
                  ].join(' ')}
                >
                  {/* Subtle dot pattern */}
                  <svg
                    className="absolute inset-0 h-full w-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern id={`dots-${item.key}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.8" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${item.key})`} />
                  </svg>

                  {/* Sector accent line */}
                  <div className={['absolute left-0 top-0 h-1 w-16 rounded-br-sm', accentColors[item.key] ?? accentColors.hidro].join(' ')} />

                  <span className="relative font-mono text-xs font-medium uppercase tracking-widest text-text-light/50">
                    {item.tag}
                  </span>
                </div>

                {/* Text */}
                <div className="bg-surface p-6">
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
