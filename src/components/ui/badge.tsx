import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'accent' | 'success' | 'outline' | 'muted';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary text-primary-foreground',
  accent: 'bg-accent/15 text-accent-foreground font-semibold',
  success: 'bg-success/10 text-success font-medium',
  outline: 'border border-border bg-transparent text-muted-foreground',
  muted: 'bg-muted text-muted-foreground',
};

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
