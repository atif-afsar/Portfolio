import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Brand Strategy",
    description: "Defining the core identity and positioning that sets your business apart in a crowded digital landscape.",
    tags: ["Visual Identity", "Positioning", "Research"],
  },
  {
    id: "02",
    title: "Product Design",
    description: "Crafting intuitive, user-centric interfaces that prioritize conversion and seamless interaction.",
    tags: ["UI/UX", "Prototyping", "Design Systems"],
  },
  {
    id: "03",
    title: "Frontend Engineering",
    description: "Translating complex designs into pixel-perfect, high-performance code with cinematic motion.",
    tags: ["React", "Framer Motion", "WebGL"],
  },
  {
    id: "04",
    title: "Creative Direction",
    description: "Leading the creative process from concept to execution to ensure a cohesive and impactful narrative.",
    tags: ["Storytelling", "Art Direction", "Motion"],
  },
];

const ServiceCard = ({ service, index, progress, range, targetScale, isMobile }) => {
  // Desktop: Map scroll progress to a subtle scale-down effect
  const scale = useTransform(progress, range, [1, targetScale]);

  // Mobile: Simple card with scroll-triggered animation
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="relative min-h-[500px] sm:min-h-[600px] w-full bg-white border border-black/10 flex flex-col p-6 sm:p-8 md:p-12 overflow-hidden shadow-xl rounded-2xl mb-6 sm:mb-8"
      >
        {/* Background Number Reveal */}
        <span className="absolute -bottom-6 sm:-bottom-10 -right-6 sm:-right-10 text-[10rem] sm:text-[15rem] md:text-[20rem] font-bold text-black/[0.03] select-none">
          {service.id}
        </span>

        <div className="z-10 flex-1 flex flex-col">
          <p className="text-yellow-500 font-mono text-xs sm:text-sm mb-3 sm:mb-4 tracking-widest">
            SERVICE {service.id}
          </p>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase mb-4 sm:mb-6 md:mb-8 leading-none"
          >
            {service.title}
          </motion.h3>
          <p className="text-base sm:text-lg md:text-xl text-black/60 mb-6 sm:mb-8 md:mb-10 leading-relaxed flex-1">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {service.tags.map((tag, i) => (
              <motion.span 
                key={tag} 
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-black/10 text-xs tracking-tighter uppercase font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Visual Element - Responsive */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-yellow-500 flex items-center justify-center relative group self-end"
        >
          <div className="absolute inset-3 sm:inset-4 border border-black/20 group-hover:inset-2 transition-all duration-500" />
          <p className="text-black font-bold -rotate-90 tracking-tighter text-xs sm:text-sm">EST. 2026</p>
        </motion.div>
      </motion.div>
    );
  }

  // Desktop: Stacking card animation
  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale }}
        className="relative h-[80vh] w-full bg-white border border-black/10 flex flex-col md:flex-row items-center justify-between p-12 md:p-16 lg:p-24 overflow-hidden shadow-2xl"
      >
        {/* Background Number Reveal */}
        <span className="absolute -bottom-10 -right-10 text-[20rem] font-bold text-black/[0.03] select-none">
          {service.id}
        </span>

        <div className="z-10 max-w-xl">
          <p className="text-yellow-500 font-mono text-sm mb-4 tracking-widest">
            SERVICE {service.id}
          </p>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase mb-8 leading-none"
          >
            {service.title}
          </motion.h3>
          <p className="text-lg md:text-xl text-black/60 mb-10 leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {service.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 border border-black/10 text-xs tracking-tighter uppercase font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Element - Decorative Interactive Box */}
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.05 }}
          className="hidden md:flex w-56 h-56 lg:w-64 lg:h-64 bg-yellow-500 items-center justify-center relative group"
        >
           <div className="absolute inset-4 border border-black/20 group-hover:inset-2 transition-all duration-500" />
           <p className="text-black font-bold -rotate-90 tracking-tighter">EST. 2024</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const MyServices = () => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Detect mobile/tablet devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section 
      ref={container} 
      data-section="services" 
      className="relative bg-white lg:ml-16 pt-0 lg:pt-20"
    >
      {/* Intro Section - Responsive */}
      <div className="min-h-[30vh] sm:min-h-[35vh] lg:h-[40vh] flex items-end px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-4xl">
          <motion.h2 
            className="text-xs tracking-[0.3em] text-black/40 uppercase mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What I offer
          </motion.h2>
          <motion.p 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elevating brands through{" "}
            <span className="font-bold text-yellow-500">meticulous design</span>{" "}
            and technical excellence.
          </motion.p>
        </div>
      </div>

      {/* Services Stack or Grid */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12">
        {isMobile ? (
          // Mobile: Vertical scrolling cards
          <div className="space-y-0">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                index={i}
                service={service}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={1}
                isMobile={true}
              />
            ))}
          </div>
        ) : (
          // Desktop: Stacking cards
          <>
            {services.map((service, i) => {
              const targetScale = 1 - (services.length - i) * 0.05;
              return (
                <ServiceCard
                  key={service.id}
                  index={i}
                  service={service}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                  isMobile={false}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Spacer for final card exit visibility */}
      <div className="h-[10vh] sm:h-[15vh] lg:h-[20vh]" />
    </section>
  );
};

export default MyServices;