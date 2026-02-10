import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="card-item relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden w-full shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ 
        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15), 0 10px 30px -10px rgba(0,0,0,0.1)',
        willChange: 'transform'
      }}
    >
      {/* Accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-[#f5c400] to-[#ffb800]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Subtle gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#f5c400]/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-8 md:p-12">
        {/* Number badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 mb-8 bg-gradient-to-br from-[#f5c400] to-[#ffb800] rounded-xl font-mono text-lg font-black text-[#0a0a0a] shadow-lg">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-black text-[#0a0a0a] mb-5 leading-tight tracking-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#444] text-lg leading-relaxed mb-8 font-medium">
          {service.description}
        </p>

        {/* Features list */}
        <div className="space-y-3">
          {service.features.map((feature, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-3 text-base text-[#333]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-[#f5c400] to-[#ffb800] rounded-full shadow-sm" />
              <span className="font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WhatIDo = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(1);

  const services = [
  {
    title: "Award-Level Portfolios",
    description: "Visually striking portfolios crafted to stand out, tell powerful stories, and leave a lasting impression through motion-driven design.",
    features: [
      "Immersive Visual Storytelling",
      "Advanced Animations",
      "Bespoke Layout Systems",
      "Pixel-Perfect Responsive Design"
    ]
  },
  {
    title: "High-Conversion Landing Pages",
    description: "Conversion-focused landing pages engineered to capture attention, guide users, and drive measurable results.",
    features: [
      "Psychology-Driven UI",
      "Lightning-Fast Performance",
      "Conversion-Optimized CTAs",
      "Analytics & Tracking Ready"
    ]
  },
  {
    title: "Interactive & Animated Web Experiences",
    description: "Scroll-driven, motion-rich experiences that transform static websites into unforgettable digital journeys.",
    features: [
      "GSAP & Motion Systems",
      "Scroll-Triggered Animations",
      "Micro-Interactions",
      "High-Performance Rendering"
    ]
  },
  {
    title: "Scalable Admin Dashboards",
    description: "Robust, data-driven dashboards built for scale—designed to simplify complex workflows with clarity and control.",
    features: [
      "Real-Time Data Sync",
      "Role-Based Access Control",
      "Advanced Data Visualization",
      "Secure Authentication Flows"
    ]
  },
  {
    title: "Performance-Focused Web Engineering",
    description: "High-performance web builds optimized for speed, scalability, and seamless user experience across all devices.",
    features: [
      "Core Web Vitals Optimization",
      "Code Splitting & Lazy Loading",
      "SEO & Accessibility Best Practices",
      "Production-Grade Architecture"
    ]
  }
]


  useEffect(() => {
    const cards = gsap.utils.toArray('.card-item');
    
    if (!cards.length) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          // Performance optimization
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const current = Math.floor(self.progress * (cards.length - 0.01)) + 1;
            setActiveCard(current);
          }
        }
      });

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to(card, { 
            scale: 0.94, 
            opacity: 0.7,
            y: -20,
            duration: 0.5,
            ease: "power2.inOut"
          }, 0);
          return;
        }

        // Set initial position with better stacking
        gsap.set(card, { 
          yPercent: 100 * (i + 1), 
          zIndex: i,
          rotateX: 2 // Subtle 3D effect
        });

        // Slide up animation
        tl.to(card, {
          yPercent: 0,
          rotateX: 0,
          duration: 1,
          ease: "power2.out"
        }, i * 0.8);

        // Scale down previous card
        if (i < cards.length - 1) {
          tl.to(card, { 
            scale: 0.94, 
            opacity: 0.7,
            y: -20,
            duration: 0.5,
            ease: "power2.inOut"
          }, (i + 1) * 0.8);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full py-20">
          
          {/* Left: Content */}
         <div className="lg:col-span-5 flex flex-col justify-center">
  <div className="mb-8">
    <span className="inline-block text-xs tracking-[0.25em] uppercase font-black text-[#b69919] bg-[#f5c400]/10 px-4 py-2 rounded-full">
      SERVICES & EXPERTISE
    </span>
    <div className="mt-4 w-20 h-1 bg-gradient-to-r from-[#f5c400] to-[#ffb800] rounded-full" />
  </div>

  <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-10 text-[#0a0a0a]">
    WHAT<br />
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5c400] to-[#ffb800]">
      I BUILD
    </span>
  </h2>

  <div className="space-y-6 text-[#333] text-xl leading-relaxed max-w-md">
    <p className="font-medium">
      I design and engineer{' '}
      <span className="text-[#0a0a0a] font-black relative">
        immersive digital experiences
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#f5c400]/30"></span>
      </span>
      {' '}that fuse{' '}
      <span className="text-[#0a0a0a] font-black relative">
        bold visual identity
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#f5c400]/30"></span>
      </span>
      {' '}with{' '}
      <span className="text-[#0a0a0a] font-black relative">
        high-performance code
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#f5c400]/30"></span>
      </span>
      .
    </p>

    <p className="text-base text-[#666] italic font-medium border-l-4 border-[#f5c400] pl-4">
      “Design grabs attention. Motion creates emotion. Performance builds trust.”
    </p>
  </div>



            {/* Progress indicator */}
            <div className="mt-16 flex items-center gap-6">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden max-w-[120px]">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#f5c400] to-[#ffb800]"
                  style={{ width: `${(activeCard / services.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-sm text-[#0a0a0a] font-black font-mono tracking-wider bg-gray-100 px-4 py-2 rounded-lg">
                {String(activeCard).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: The Stacked Cards Container */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[600px] lg:min-h-[700px]">
            <div ref={containerRef} className="relative w-full h-full max-w-[550px] lg:max-w-none">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="card-wrapper absolute top-0 left-0 w-full"
                  style={{ 
                    zIndex: index,
                    perspective: '1000px'
                  }}
                >
                  <ServiceCard service={service} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;