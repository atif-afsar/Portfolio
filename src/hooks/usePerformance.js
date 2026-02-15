import { useEffect, useState } from 'react';

/**
 * Hook to detect low-end devices and user preferences
 * Returns performance optimization flags
 */
export const usePerformance = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Detect low-end devices
    const detectLowEnd = () => {
      // Check device memory
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        setIsLowEnd(true);
        return;
      }

      // Check connection speed
      if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.effectiveType === '4g' && connection.saveData) {
          setIsLowEnd(true);
          return;
        }
        if (connection.effectiveType === '3g' || connection.effectiveType === '2g') {
          setIsLowEnd(true);
          return;
        }
      }

      // Check CPU cores
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setIsLowEnd(true);
      }
    };

    detectLowEnd();

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    isLowEnd,
    prefersReducedMotion,
    shouldReduceAnimations: isLowEnd || prefersReducedMotion,
  };
};

export default usePerformance;
