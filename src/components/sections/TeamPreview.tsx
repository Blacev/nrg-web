import { Link } from '@/lib/navigation';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Heading } from '@/components/ui/heading';
import { buttonVariants } from '@/components/ui/button';
import type { HomeContent } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  teamPreview: HomeContent['teamPreview'];
};

export function TeamPreview({ teamPreview }: Props) {
  return (
    <section className="bg-primary py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <div>
            <Eyebrow variant="accent" className="mb-4">
              {teamPreview.eyebrow}
            </Eyebrow>
            <Heading as="h2" size="2" className="text-text-light">
              {teamPreview.title}
            </Heading>
            <p className="mt-5 text-base leading-relaxed text-text-light/70 sm:text-lg">
              {teamPreview.subtitle}
            </p>
            <div className="mt-8">
              <Link
                href={teamPreview.ctaHref}
                className={cn(
                  buttonVariants({ variant: 'primary', size: 'lg' }),
                  'group',
                )}
              >
                {teamPreview.ctaLabel}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: highlight blockquote */}
          <div className="rounded-xl border-l-4 border-accent bg-accent/10 px-8 py-8">
            <blockquote>
              <p className="text-lg font-medium leading-relaxed text-text-light/90 sm:text-xl">
                &ldquo;{teamPreview.highlight}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
