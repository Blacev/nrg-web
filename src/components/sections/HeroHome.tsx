'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link, asHref } from '@/lib/navigation';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { buttonVariants } from '@/components/ui/button';
import type { HomeContent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { defaultTransition } from '@/lib/motion';

type Props = {
  hero: HomeContent['hero'];
};

const item = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { ...defaultTransition, delay },
});

const fadeItem = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { ...defaultTransition, delay },
});

export function HeroHome({ hero }: Props) {
  return (
    <section className="relative -mt-16 min-h-screen overflow-hidden bg-primary-dark flex items-center">
      {/* Layer 1 — Photo (LCP candidate, must be priority) */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-turbina-pelton.jpg"
          alt="Turbina Pelton en casa de máquinas - NRG Ingeniería en movimiento"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Layer 2a — Base dark overlay: mobile 90%, desktop 85% (high opacity needed for metallic reflections) */}
      <div
        className="absolute inset-0 z-10 bg-primary/70 sm:bg-primary/60"
        aria-hidden="true"
      />

      {/* Layer 2b — Directional gradient: left side denser (text area), right side thinner (image breathes) */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-r from-primary/80 via-primary/50 to-primary/25"
        aria-hidden="true"
      />

      {/* Layer 3 — Dot-grid texture (above overlays, preserves industrial detail feel) */}
      <svg
        className="absolute inset-0 z-20 h-full w-full"
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

      {/* Layer 3b — Radial glow from top-center */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 10%, rgba(30,58,111,0.7) 0%, transparent 70%)',
        }}
      />

      {/* Layer 3c — Subtle amber accent glow — bottom left */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 0% 100%, rgba(232,159,60,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Layer 4 — Content */}
      <Container className="relative z-40 pb-24 pt-40">
        <div className="max-w-3xl">
          <motion.div {...item(0)}>
            <Eyebrow variant="accent" className="mb-6">
              {hero.eyebrow}
            </Eyebrow>
          </motion.div>

          <h1 className="font-display text-4xl font-bold leading-tight text-text-light sm:text-5xl lg:text-6xl xl:text-7xl">
            <motion.span className="block" {...item(0.15)}>
              {hero.title}
            </motion.span>
            <motion.span className="block text-accent" {...item(0.3)}>
              {hero.titleHighlight}
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-text-light/70 sm:text-lg"
            {...item(0.45)}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            {...item(0.6)}
          >
            <Link
              href={asHref(hero.ctaPrimary.href)}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={asHref(hero.ctaSecondary.href)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-text-light/25 px-6 text-base font-semibold text-text-light transition-colors duration-200 hover:border-text-light/50 hover:bg-text-light/8"
            >
              {hero.ctaSecondary.label}
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center gap-2 text-text-light/40"
        {...fadeItem(1.2)}
      >
        <span className="text-xs font-medium uppercase tracking-[0.15em]">scroll</span>
        <ChevronDown className="size-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
