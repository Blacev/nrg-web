import { ChevronRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="size-3.5 shrink-0 text-border" aria-hidden="true" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
