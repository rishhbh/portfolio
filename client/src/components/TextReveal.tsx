import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  forceAnimate?: boolean;
}

export function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  forceAnimate = false,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          y: '100%',
          opacity: 0,
        },
        visible: {
          y: '0%',
          opacity: 1,
        },
      };

  return (
    <div className={`overflow-hidden block ${className}`}>
      <motion.div
        initial="hidden"
        whileInView={!forceAnimate ? "visible" : undefined}
        animate={forceAnimate ? "visible" : undefined}
        viewport={{ once: true, margin: '0px' }}
        variants={variants}
        transition={{
          delay,
          duration,
          ease: [0.16, 1, 0.3, 1], // Sleek, premium ease-out cubic
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
