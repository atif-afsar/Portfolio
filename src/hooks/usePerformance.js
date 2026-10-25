import { useEffect, useState } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// Low-end device heuristics (memory, connection, CPU cores). Read once.
const detectLowEnd = () => {
  // Check device memory
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return true;

  // Check connection speed
  const connection = navigator.connection;
  if (connection) {
    if (connection.effectiveType === '4g' && connection.saveData) return true;
    if (connection.effectiveType === '3g' || connection.effectiveType === '2g') return true;
  }

  // Check CPU cores
  return Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);
};

/**
 * Hook to detect low-end devices and user preferences
 * Returns performance optimization flags
 */
export const usePerformance = () => {
  const [isLowEnd] = useState(detectLowEnd);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION).matches
  );

  // Track changes to the reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    isLowEnd,
    prefersReducedMotion,
    shouldReduceAnimations: isLowEnd || prefersReducedMotion,
  };
};

export default usePerformance;
