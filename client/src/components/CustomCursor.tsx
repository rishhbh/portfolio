import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for a sharp but fluid tracking motion
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches || shouldReduceMotion) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expanded hover state on interactive elements
      if (target.closest('a, button, [role="button"], input, select, textarea, .cursor-hover')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101] hidden md:flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Core minimalist sharp square */}
        <motion.div
          animate={{
            width: isHovering ? 32 : 8,
            height: isHovering ? 32 : 8,
            rotate: isHovering ? 90 : 0,
            borderRadius: 0, // Enforcing sharp corners explicitly
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.5
          }}
          className="bg-white pointer-events-none"
        />
      </motion.div>
    </>
  );
}
