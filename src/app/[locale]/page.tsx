import type { Metadata } from 'next';
import { getHomeContent } from '@/lib/content';
import { HeroHome } from '@/components/sections/HeroHome';
import { MetricsBand } from '@/components/sections/MetricsBand';
import { ValueProps } from '@/components/sections/ValueProps';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { SectorsSection } from '@/components/sections/SectorsSection';
import { TeamPreview } from '@/components/sections/TeamPreview';
import { WhyUs } from '@/components/sections/WhyUs';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'NRG — Ingeniería en movimiento',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const content = await getHomeContent(locale as 'es' | 'en');

  return (
    <>
      <HeroHome hero={content.hero} />
      <MetricsBand metrics={content.metrics} />
      <ValueProps valueProps={content.valueProps} />
      <ServicesGrid services={content.services} />
      <SectorsSection sectors={content.sectors} />
      <TeamPreview teamPreview={content.teamPreview} />
      <WhyUs whyUs={content.whyUs} />
      <CtaBanner ctaBanner={content.ctaBanner} />
    </>
  );
}
