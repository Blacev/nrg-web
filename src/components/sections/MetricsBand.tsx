import { Container } from '@/components/ui/container';
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
            <div
              key={index}
              className={[
                'flex flex-col items-center gap-1 text-center',
                index < metrics.length - 1
                  ? 'lg:border-r lg:border-text-light/10'
                  : '',
              ].join(' ')}
            >
              <dd className="font-mono text-5xl font-medium text-accent sm:text-6xl">
                {metric.value}
                <span className="ml-1 text-3xl sm:text-4xl">{metric.unit}</span>
              </dd>
              <dt className="text-sm font-medium text-text-light/60 sm:text-base">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
