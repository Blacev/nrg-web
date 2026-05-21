'use client';

import { motion } from 'framer-motion';
import { fadeUp, fadeIn, slideFromLeft, slideFromRight, defaultTransition } from '@/lib/motion';
import type { Variants } from 'framer-motion';

type Variant = 'fadeUp' | 'fadeIn' | 'slideFromLeft' | 'slideFromRight';

const variantMap: Record<Variant, Variants> = {
  fadeUp,
  fadeIn,
  slideFromLeft,
  slideFromRight,
};

type Props = {
  variant?: Variant;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedSection({
  variant = 'fadeUp',
  delay = 0,
  className,
  children,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variantMap[variant]}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
