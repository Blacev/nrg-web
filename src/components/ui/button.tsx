import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-colors duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        /* ── shadcn base ──────────────────────────────────────────────── */
        default:
          'bg-primary text-primary-foreground hover:bg-primary-light',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-muted hover:text-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20',
        link: 'text-primary underline-offset-4 hover:underline',

        /* ── NRG variantes de marca ────────────────────────────────────── */
        // Botón primario NRG: ámbar (CTA principal)
        primary:
          'bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm hover:shadow',
        // Botón secundario NRG: contorno navy
        'secondary-navy':
          'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
        // Ghost NRG: texto navy, sin fondo
        'ghost-navy':
          'text-primary hover:bg-bg-alt',
        // Invertido: sobre fondos oscuros (fondo blanco, texto navy)
        inverted:
          'bg-surface text-primary hover:bg-muted border border-surface/20',
      },
      size: {
        sm: 'h-8 gap-1.5 px-3 text-sm rounded-md',
        default: 'h-10 gap-2 px-4 text-sm',
        lg: 'h-12 gap-2 px-6 text-base',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
