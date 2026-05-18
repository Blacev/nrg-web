import { MessageCircle } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/ui/container';
import { buttonVariants } from '@/components/ui/button';
import type { HomeContent } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  ctaBanner: HomeContent['ctaBanner'];
};

export function CtaBanner({ ctaBanner }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-primary-dark py-20 md:py-28"
      style={{
        background:
          'linear-gradient(135deg, #020a15 0%, #050f22 55%, rgba(232,159,60,0.12) 100%)',
      }}
    >
      {/* Dot pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="cta-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-dots)" />
      </svg>

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight text-text-light sm:text-4xl lg:text-5xl">
            {ctaBanner.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-light/65 sm:text-lg">
            {ctaBanner.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={ctaBanner.ctaPrimary.href}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full sm:w-auto')}
            >
              {ctaBanner.ctaPrimary.label}
            </Link>
            <Link
              href={ctaBanner.ctaSecondary.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-text-light/25 px-6 py-3 text-base font-semibold text-text-light transition-colors duration-200 hover:border-text-light/50 hover:bg-text-light/8 sm:w-auto"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {ctaBanner.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
