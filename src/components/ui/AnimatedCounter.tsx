'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, animate, useReducedMotion } from 'framer-motion';

function parseValue(value: string): { prefix: string; num: number } {
  const prefix = value.startsWith('+') ? '+' : '';
  const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return { prefix, num };
}

type Props = {
  value: string;
  unit: string;
  label: string;
  className?: string;
  unitClassName?: string;
  duration?: number;
};

export function AnimatedCounter({
  value,
  unit,
  label,
  className,
  unitClassName,
  duration = 2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { prefix, num } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCount(num);
      return;
    }

    const controls = animate(0, num, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, num, duration, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <dd className={className}>
        {prefix}{count}
        {unit && <span className={unitClassName}>{unit}</span>}
      </dd>
      <dt className="text-sm font-medium text-text-light/60 sm:text-base">{label}</dt>
    </div>
  );
}
