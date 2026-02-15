import { useEffect } from 'react';

/**
 * SEO Component for dynamic meta tags
 * Usage: <SEO title="Page Title" description="Page description" />
 */
const SEO = ({ 
  title = 'Atif Afsar - Full Stack Developer & Creative Engineer',
  description = 'Award-winning full stack developer specializing in React, Next.js, and high-performance web experiences.',
  image = '/public/hero.png',
  url = 'https://atifafsar.com',
  type = 'website'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateProperty = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description);
    updateMeta('og:title', title);
    updateMeta('twitter:title', title);

    // Open Graph
    updateProperty('og:type', type);
    updateProperty('og:description', description);
    updateProperty('og:image', image);
    updateProperty('og:url', url);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, image, url, type]);

  return null;
};

export default SEO;
