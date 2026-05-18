import { cn } from '@/lib/utils';

type SectionVariant = 'default' | 'alt' | 'dark';

const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-surface',
  alt: 'bg-bg-alt',
  dark: 'bg-primary-dark text-text-light',
};

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  as?: React.ElementType;
};

export function Section({ children, className, variant = 'default', as: Tag = 'section' }: SectionProps) {
  return (
    <Tag className={cn('py-16 md:py-24', variantClasses[variant], className)}>
      {children}
    </Tag>
  );
}
