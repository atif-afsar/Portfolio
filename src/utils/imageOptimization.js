/**
 * Lazy load images with intersection observer
 * Supports responsive srcset and WebP fallback
 */
export const lazyLoadImage = (imgElement) => {
  if (!imgElement) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load data-src into src
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        
        // Load srcset if available
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px',
  });

  observer.observe(imgElement);
};

/**
 * Generate responsive image srcset
 */
export const generateSrcSet = (basePath, formats = ['webp', 'jpg']) => {
  const sizes = [320, 640, 1024, 1280];
  const srcsets = [];

  formats.forEach((format) => {
    sizes.forEach((size) => {
      srcsets.push(`${basePath}-${size}w.${format} ${size}w`);
    });
  });

  return srcsets.join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

export default {
  lazyLoadImage,
  generateSrcSet,
  preloadImage,
};
