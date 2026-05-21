import {
  Wrench, Settings, Play, Crosshair, Lightbulb, Package, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Link, asHref } from '@/lib/navigation';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { HomeContent } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Settings,
  Play,
  Crosshair,
  Lightbulb,
  Package,
};

type Props = {
  services: HomeContent['services'];
};

export function ServicesGrid({ services }: Props) {
  return (
    <section className="bg-bg-alt py-20 md:py-28">
      <Container>
        <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
          <Eyebrow className="mb-3">{services.eyebrow}</Eyebrow>
          <Heading as="h2" size="2">{services.title}</Heading>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Wrench;
            return (
              <AnimatedSection key={item.slug} delay={i * 0.1}>
                <Link
                  href={{ pathname: '/servicios/[slug]' as const, params: { slug: item.slug } }}
                  className={cn(
                    'group flex flex-col gap-4 rounded-xl border border-border bg-surface p-7',
                    'border-b-2 border-b-transparent transition-all duration-200',
                    'hover:border-b-accent hover:shadow-md',
                  )}
                >
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/8 transition-colors duration-200 group-hover:bg-accent/10">
                    <Icon className="size-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary transition-gap duration-200 group-hover:gap-2">
                    {services.viewDetailLabel}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.15}>
          <Link
            href={asHref(services.ctaHref)}
            className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors duration-200 hover:text-accent"
          >
            {services.ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
