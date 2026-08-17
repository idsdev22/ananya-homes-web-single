import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for elements with .reveal-* classes
 */
export function useScrollReveal() {
  useEffect(() => {
    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger'
      );

      if (!('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('revealed'));
        return () => {};
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };

    const cleanup = observeElements();
    return () => cleanup && cleanup();
  }, []);
}
