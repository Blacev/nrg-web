import { Container } from '@/components/ui/container';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { HomeContent } from '@/lib/types';

type Props = {
  metrics: HomeContent['metrics'];
};

export function MetricsBand({ metrics }: Props) {
  return (
    <section className="bg-primary py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.15}
              className={[
                index < metrics.length - 1
                  ? 'lg:border-r lg:border-text-light/10'
                  : '',
              ].join(' ')}
            >
              <AnimatedCounter
                value={metric.value}
                unit={metric.unit}
                label={metric.label}
                className="font-mono text-5xl font-medium text-accent sm:text-6xl"
                unitClassName="ml-1 text-3xl sm:text-4xl"
              />
            </AnimatedSection>
          ))}
        </dl>
      </Container>
    </section>
  );
}
