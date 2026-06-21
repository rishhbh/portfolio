import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useReducedMotion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  
  // Track theme in a ref so we don't restart the RAF loop when theme toggles
  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is preferred
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches || shouldReduceMotion) {
      return;
    }

    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Initial state placed off-screen or center until first move
    const mouse = { x: width / 2, y: height / 2 };
    const renderedMouse = { x: width / 2, y: height / 2 };
    const history: Point[] = [];
    let isHovering = false;
    let currentScale = 1;
    let isIdle = false;
    let lastMoveTime = Date.now();
    let rafId: number;
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        renderedMouse.x = e.clientX;
        renderedMouse.y = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMoveTime = Date.now();
      
      if (isIdle) {
        isIdle = false;
        render(); // Wake up the loop
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select, textarea, .cursor-hover')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    const render = () => {
      // Lerp mouse
      renderedMouse.x += (mouse.x - renderedMouse.x) * 0.2;
      renderedMouse.y += (mouse.y - renderedMouse.y) * 0.2;

      // Lerp scale
      const targetScale = isHovering ? 1.5 : 1;
      currentScale += (targetScale - currentScale) * 0.2;

      // Check idle (optimization)
      const dist = Math.abs(mouse.x - renderedMouse.x) + Math.abs(mouse.y - renderedMouse.y);
      const scaleDist = Math.abs(targetScale - currentScale);
      
      if (dist < 0.1 && scaleDist < 0.01 && Date.now() - lastMoveTime > 100) {
        isIdle = true;
      }

      // Update history
      if (hasMoved) {
        history.push({ x: renderedMouse.x, y: renderedMouse.y });
        if (history.length > 20) {
          history.shift();
        }
      }

      // Update DOM cursor (Circle)
      if (cursor && hasMoved) {
        cursor.style.transform = `translate3d(${renderedMouse.x}px, ${renderedMouse.y}px, 0) translate3d(-50%, -50%, 0) scale(${currentScale})`;
        cursor.style.borderColor = themeRef.current === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        cursor.style.backgroundColor = isHovering 
          ? (themeRef.current === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)') 
          : 'transparent';
        cursor.style.opacity = '1';
      } else if (cursor && !hasMoved) {
        cursor.style.opacity = '0';
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw trail
      if (history.length > 1) {
        for (let i = 0; i < history.length - 1; i++) {
          const point = history[i];
          const nextPoint = history[i + 1];
          const progress = i / history.length; // 0 to 1

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          
          // Use quadratic curve to midpoints for a slightly smoother render if points are spaced
          const xc = (point.x + nextPoint.x) / 2;
          const yc = (point.y + nextPoint.y) / 2;
          ctx.quadraticCurveTo(point.x, point.y, xc, yc);
          
          const alpha = progress * 0.6; // Taper opacity
          ctx.strokeStyle = themeRef.current === 'dark' 
            ? `rgba(255, 255, 255, ${alpha})` 
            : `rgba(0, 0, 0, ${alpha})`;
          
          ctx.lineWidth = 0.5 + progress * 1.5;
          
          // Blur tapering (higher blur at the tail)
          ctx.shadowBlur = (1 - progress) * 8;
          ctx.shadowColor = themeRef.current === 'dark' ? 'white' : 'black';
          
          ctx.stroke();
        }
        
        // Connect the last midpoint exactly to the head
        const last = history[history.length - 1];
        const prev = history[history.length - 2];
        const xc = (prev.x + last.x) / 2;
        const yc = (prev.y + last.y) / 2;
        ctx.beginPath();
        ctx.moveTo(xc, yc);
        ctx.lineTo(last.x, last.y);
        ctx.strokeStyle = themeRef.current === 'dark' ? `rgba(255, 255, 255, 0.6)` : `rgba(0, 0, 0, 0.6)`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0;
        ctx.stroke();
      }

      if (!isIdle) {
        rafId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]); 

  if (shouldReduceMotion) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[100] custom-cursor-system hidden md:block"
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[24px] h-[24px] border rounded-full pointer-events-none z-[101] transition-colors duration-200 custom-cursor-system hidden md:block opacity-0"
        style={{ willChange: 'transform, opacity' }}
      />
    </>
  );
}
