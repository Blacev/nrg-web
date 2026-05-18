import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = '1' | '2' | '3' | '4';

const sizeClasses: Record<HeadingSize, string> = {
  '1': 'text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl',
  '2': 'text-3xl leading-snug font-bold sm:text-4xl',
  '3': 'text-2xl leading-snug font-semibold sm:text-3xl',
  '4': 'text-xl leading-normal font-semibold sm:text-2xl',
};

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: HeadingLevel;
  size?: HeadingSize;
};

export function Heading({ children, className, as: Tag = 'h2', size }: HeadingProps) {
  const resolvedSize = size ?? (Tag.replace('h', '') as HeadingSize);
  return (
    <Tag className={cn('font-display text-primary', sizeClasses[resolvedSize], className)}>
      {children}
    </Tag>
  );
}
