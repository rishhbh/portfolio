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
      const isMouseStopped = Date.now() - lastMoveTime > 100 && dist < 0.1;

      // Update history
      if (hasMoved) {
        if (!isMouseStopped) {
          history.push({ x: renderedMouse.x, y: renderedMouse.y });
          if (history.length > 45) {
            history.shift();
          }
        } else {
          // Mouse stopped. Decay the trail.
          if (history.length > 0) {
            history.shift();
          }
        }
      }

      if (isMouseStopped && scaleDist < 0.01 && history.length === 0) {
        isIdle = true;
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
      if (history.length > 2) {
        ctx.beginPath();
        ctx.moveTo(history[0].x, history[0].y);

        for (let i = 1; i < history.length - 1; i++) {
          const xc = (history[i].x + history[i + 1].x) / 2;
          const yc = (history[i].y + history[i + 1].y) / 2;
          ctx.quadraticCurveTo(history[i].x, history[i].y, xc, yc);
        }
        
        // Connect the last point
        const last = history[history.length - 1];
        ctx.lineTo(last.x, last.y);

        const tail = history[0];
        const head = last;
        
        // Prevent gradient error if tail and head are identical
        if (tail.x !== head.x || tail.y !== head.y) {
          const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
          const color = themeRef.current === 'dark' ? '255, 255, 255' : '0, 0, 0';
          
          // High intensity, tapering toward tail
          gradient.addColorStop(0, `rgba(${color}, 0)`);
          gradient.addColorStop(1, `rgba(${color}, 0.8)`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5; // Solid core line
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowBlur = 4; // Tight glow radius
          ctx.shadowColor = `rgba(${color}, 0.8)`;
          ctx.stroke();
        }
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
