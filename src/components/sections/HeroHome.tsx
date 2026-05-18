import { ChevronDown } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { buttonVariants } from '@/components/ui/button';
import type { HomeContent } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  hero: HomeContent['hero'];
};

export function HeroHome({ hero }: Props) {
  return (
    <section className="relative -mt-16 min-h-screen overflow-hidden bg-primary-dark flex items-center">
      {/* Background: dot-grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero-dots"
            x="0" y="0" width="32" height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="white" fillOpacity="0.10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* Radial glow from top-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 10%, rgba(30,58,111,0.7) 0%, transparent 70%)',
        }}
      />

      {/* Subtle amber accent glow — bottom left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 0% 100%, rgba(232,159,60,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <Container className="relative z-10 pb-24 pt-40">
        <div className="max-w-3xl">
          <Eyebrow variant="accent" className="mb-6">
            {hero.eyebrow}
          </Eyebrow>

          <h1 className="font-display text-4xl font-bold leading-tight text-text-light sm:text-5xl lg:text-6xl xl:text-7xl">
            <span>{hero.title}</span>
            {' '}
            <span className="text-accent">{hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-light/70 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-text-light/25 px-6 text-base font-semibold text-text-light transition-colors duration-200 hover:border-text-light/50 hover:bg-text-light/8"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-light/40">
        <span className="text-xs font-medium uppercase tracking-[0.15em]">scroll</span>
        <ChevronDown className="size-5 animate-bounce" />
      </div>
    </section>
  );
}
