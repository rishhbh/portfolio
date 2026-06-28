import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  id?: string;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  className = '',
  id,
}: BlurFadeProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, do a simple fade-in with no blur and no y displacement
  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          filter: 'blur(12px)',
          opacity: 0,
          y: yOffset,
        },
        visible: {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
        },
      };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1], // Sleek, premium ease-out cubic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
