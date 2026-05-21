import {
  Globe, Layers, MessageCircle, Clock, FileCheck,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { HomeContent } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layers,
  MessageCircle,
  Clock,
  FileCheck,
};

type Props = {
  whyUs: HomeContent['whyUs'];
};

export function WhyUs({ whyUs }: Props) {
  return (
    <section className="bg-bg-alt py-20 md:py-28">
      <Container>
        <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
          <Eyebrow className="mb-3">{whyUs.eyebrow}</Eyebrow>
          <Heading as="h2" size="2">{whyUs.title}</Heading>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyUs.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Globe;
            return (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 text-center shadow-sm">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary/8">
                    <Icon className="size-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-primary leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
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
