import { cn } from '@/lib/utils';

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'accent' | 'muted';
};

export function Eyebrow({ children, className, variant = 'accent' }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.15em]',
        variant === 'accent' ? 'text-accent' : 'text-muted-foreground',
        className,
      )}
    >
      {children}
    </p>
  );
}
