/**
 * Structured Data (JSON-LD) for SEO
 * Add to head in App.jsx or use in SEO component
 */

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Atif Afsar',
  url: 'https://atifafsar.com',
  image: 'https://atifafsar.com/public/hero.png',
  description: 'Full Stack Developer & Creative Engineer',
  jobTitle: 'Full Stack Developer',
  location: {
    '@type': 'Place',
    name: 'Aligarh, India'
  },
  sameAs: [
    'https://www.linkedin.com/in/atif-afsar-64903b33a?originalSubdomain=in',
    'https://github.com/atif-afsar',
    'https://twitter.com/atif_afsar'
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Web Design',
    'Animation',
    'GSAP',
    'Framer Motion',
    'Node.js',
    'MongoDB',
    'Web Performance'
  ]
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atif Afsar',
  url: 'https://atifafsar.com',
  logo: 'https://atifafsar.com/public/hero.png',
  description: 'Award-winning full stack developer specializing in React, Next.js, and high-performance web experiences',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'atifafsar648@gmail.com',
    telephone: '+91-9389030329'
  },
  sameAs: [
    'https://www.linkedin.com/in/atif-afsar-64903b33a?originalSubdomain=in',
    'https://github.com/atif-afsar'
  ]
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://atifafsar.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://atifafsar.com#projects'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Contact',
      item: 'https://atifafsar.com#contact'
    }
  ]
};

/**
 * Inject structured data into head
 */
export const injectStructuredData = (schema) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

export default {
  personSchema,
  organizationSchema,
  breadcrumbSchema,
  injectStructuredData
};
