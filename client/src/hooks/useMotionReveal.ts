import { useEffect } from 'react';

export function useMotionReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.s:not(.hero) .t, .s:not(.hero) .v, .process-step, .tool-card, .s:not(.hero) details, .tradeoff-card'
      )
    );

    targets.forEach((el, i) => {
      el.classList.add('motion-reveal');
      el.style.setProperty('--reveal-delay', `${(i % 4) * 85}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    // Post-transition fallback: Once route slide transition settles (~850ms),
    // ensure elements within viewport get revealed reliably
    const checkVisible = () => {
      const vh = window.innerHeight || 800;
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + 150 && rect.bottom > -100) {
          el.classList.add('is-visible');
        }
      });
    };

    const t1 = setTimeout(checkVisible, 350);
    const t2 = setTimeout(checkVisible, 880);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, []);
}
