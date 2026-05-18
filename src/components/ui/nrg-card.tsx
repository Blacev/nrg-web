import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'bordered' | 'flat';

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-surface border border-border shadow-sm hover:shadow-md',
  bordered: 'bg-surface border-2 border-primary/10 hover:border-primary/30',
  flat: 'bg-bg-alt',
};

type NRGCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
};

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function NRGCard({
  children,
  className,
  variant = 'default',
  padding = 'md',
}: NRGCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-shadow duration-200',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
