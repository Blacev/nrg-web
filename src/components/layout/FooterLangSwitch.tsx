'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export default function FooterLangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === 'es' ? 'en' : 'es';

  return (
    <div className="flex items-center gap-1.5 text-xs" aria-label="Selector de idioma">
      <span className={cn(locale === 'es' ? 'font-bold text-text-light/80' : 'text-text-light/40')}>
        ES
      </span>
      <span className="text-text-light/20" aria-hidden="true">|</span>
      <Link
        href={pathname}
        locale={otherLocale}
        className={cn(
          'transition-colors hover:text-accent',
          locale === 'en' ? 'font-bold text-text-light/80' : 'text-text-light/40',
        )}
      >
        EN
      </Link>
    </div>
  );
}
