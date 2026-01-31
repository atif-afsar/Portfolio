import React, { useRef } from "react";
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

const ServiceCard = ({ service, index, progress, range, targetScale }) => {
  // Map scroll progress to a subtle scale-down effect for the "previous" card
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale }}
        className="relative h-[80vh] w-full bg-white border border-black/10 flex flex-col md:flex-row items-center justify-between p-12 md:p-24 overflow-hidden shadow-2xl"
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
            className="text-5xl md:text-7xl font-bold uppercase mb-8 leading-none"
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
          className="hidden md:flex w-64 h-64 bg-yellow-500 items-center justify-center relative group"
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
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative bg-white ml-16">
      {/* Intro Section */}
      <div className="h-[40vh] flex items-end px-16 md:px-24 ">
        <div className="max-w-4xl">
          <h2 className="text-xs tracking-[0.3em] text-black/40 uppercase mb-4">What I offer</h2>
          <p className="text-4xl md:text-6xl font-light leading-tight">
            Elevating brands through <span className="font-bold text-yellow-500">meticulous design</span> and technical excellence.
          </p>
        </div>
      </div>

      {/* Services Stack */}
      <div className="px-6 md:px-12">
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
            />
          );
        })}
      </div>

      {/* Spacer for final card exit visibility */}
      <div className="h-[20vh]" />
    </section>
  );
};

export default MyServices;