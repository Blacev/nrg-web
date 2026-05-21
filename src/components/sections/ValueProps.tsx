import {
  Award, Zap, ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { HomeContent } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  Award,
  Zap,
  ShieldCheck,
};

type Props = {
  valueProps: HomeContent['valueProps'];
};

export function ValueProps({ valueProps }: Props) {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
          <Heading as="h2" size="2">{valueProps.title}</Heading>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {valueProps.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-3">
          {valueProps.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Award;
            return (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-8 shadow-sm">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/8">
                    <Icon className="size-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">
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
  );
}
