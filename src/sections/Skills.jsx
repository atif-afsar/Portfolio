import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    }
  }),
  hover: {
    y: -12,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-5%" }}
      className="card-item relative bg-white rounded-3xl border border-gray-100 overflow-hidden w-full shadow-lg hover:shadow-2xl transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-[#f5c400] to-[#ffb800]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Hover Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#f5c400]/5 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative p-8 md:p-10 flex flex-col h-full">
        {/* Index Badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm font-bold text-[#0a0a0a] group-hover:bg-[#f5c400] transition-colors duration-300">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="h-px flex-grow ml-4 bg-gray-100" />
        </div>

        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-black text-[#0a0a0a] mb-4 leading-tight tracking-tight">
          {service.title}
        </h3>

        <p className="text-[#555] text-base md:text-lg leading-relaxed mb-8 font-medium">
          {service.description}
        </p>

        {/* Features list */}
        <div className="mt-auto space-y-3">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-sm md:text-base text-[#333]">
              <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#f5c400] rounded-full" />
              <span className="font-semibold">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WhatIDo = () => {
  const sectionRef = useRef(null);
  
  // Logic for the mobile progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const services = [
    {
      title: "Award-Level Portfolios",
      description: "Visually striking portfolios crafted to stand out, tell powerful stories, and leave a lasting impression.",
      features: ["Immersive Storytelling", "Advanced Animations", "Bespoke Layouts"]
    },
    {
      title: "High-Conversion Landing Pages",
      description: "Conversion-focused pages engineered to capture attention, guide users, and drive measurable results.",
      features: ["Psychology-Driven UI", "Fast Performance", "Optimized CTAs"]
    },
    {
      title: "Interactive Web Experiences",
      description: "Scroll-driven, motion-rich experiences that transform static sites into unforgettable journeys.",
      features: ["GSAP & Motion Systems", "Micro-Interactions", "High-Perf Rendering"]
    },
    {
      title: "Scalable Admin Dashboards",
      description: "Robust, data-driven dashboards designed to simplify complex workflows with clarity and control.",
      features: ["Real-Time Data Sync", "Role-Based Access", "Data Visualization"]
    },
    {
      title: "Performance Engineering",
      description: "High-performance builds optimized for speed, scalability, and seamless UX across all devices.",
      features: ["Core Web Vitals", "Lazy Loading", "Production Architecture"]
    },
    {
      title: "Brand Identity Systems",
      description: "Creating cohesive visual languages that bridge the gap between brand strategy and digital execution.",
      features: ["Visual Guidelines", "Typography Systems", "Art Direction"]
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-24 lg:py-32">
      
      {/* MOBILE SCROLL PROGRESS LINE (Left Side) */}
      <div className="absolute left-0 top-0 bottom-0 w-1 md:hidden pointer-events-none z-20 px-3 py-24">
         {/* Background Track */}
         <div className="w-0.5 h-full bg-gray-100 rounded-full mx-auto" />
         {/* Moving Yellow Line */}
         <motion.div 
            className="absolute top-24 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#f5c400] to-[#ffb800] rounded-full origin-top"
            style={{ scaleY, height: "calc(100% - 192px)" }} // Adjusting height to match py-24
         />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pl-10 md:pl-12 lg:px-16"> 
        {/* pl-10 added above to ensure the progress line doesn't overlap text on small screens */}
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-xs tracking-[0.3em] uppercase font-black text-[#b69919] bg-[#f5c400]/10 px-4 py-2 rounded-full">
              SERVICES & EXPERTISE
            </span>
            <div className="h-px w-12 bg-[#f5c400]" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8 text-[#0a0a0a]">
            WHAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5c400] to-[#ffb800]">I BUILD.</span>
          </h2>

          <div className="flex flex-col md:flex-row md:items-start gap-8 mt-10">
            <p className="text-[#333] text-xl md:text-2xl leading-relaxed font-medium md:w-2/3">
              I engineer <span className="text-[#0a0a0a] font-bold underline decoration-[#f5c400] decoration-4 underline-offset-4">immersive digital experiences</span> that fuse bold visual identity with high-performance code.
            </p>
            <p className="text-sm text-[#666] italic font-medium border-l-2 border-[#f5c400] pl-4 md:w-1/3 py-2">
              "Design grabs attention. Motion creates emotion. Performance builds trust."
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;