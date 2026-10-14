import { useEffect } from 'react';

export function useMotionReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const allSections = Array.from(document.querySelectorAll<HTMLElement>('.s'));
    const firstSection = allSections[0];

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.s:not(.hero) .t, .s:not(.hero) .v, .process-step, .tool-card, .s:not(.hero) details, .tradeoff-card'
      )
    ).filter((el) => {
      // Keep top-of-page section immediately visible and sharp
      if (firstSection && firstSection.contains(el)) return false;
      return true;
    });

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

    let checkTicking = false;
    let checkRafId: number | null = null;

    const checkVisible = () => {
      if (checkTicking) return;
      checkTicking = true;
      checkRafId = requestAnimationFrame(() => {
        checkTicking = false;
        const vh = window.innerHeight || 800;
        targets.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < vh + 120 && rect.bottom > -80) {
            el.classList.add('is-visible');
          }
        });
      });
    };

    const t1 = setTimeout(checkVisible, 200);
    const t2 = setTimeout(checkVisible, 650);
    window.addEventListener('scroll', checkVisible, { passive: true });

    return () => {
      if (checkRafId) cancelAnimationFrame(checkRafId);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', checkVisible);
      observer.disconnect();
    };
  }, []);
}
