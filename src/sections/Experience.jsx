import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { experience } from '../data/experience';

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10% 0px -20% 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 items-center mb-16 md:mb-40">
      {/* Background Index Number - Premium aesthetic */}
      <motion.span 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 0.05, x: isLeft ? -20 : 20 }}
        className={`absolute hidden md:block text-[12rem] font-black text-white select-none pointer-events-none ${isLeft ? 'left-0' : 'right-0'}`}
      >
        0{index + 1}
      </motion.span>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`${isLeft ? 'md:text-right' : 'md:order-2'} relative z-10 pl-12 md:pl-0`}
      >
        {/* Date / Category Pill */}
        <div className={`flex items-center gap-3 mb-4 md:mb-6 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
          <span className="text-yellow-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
            {exp.duration}
          </span>
          <div className="h-[1px] w-8 md:w-12 bg-yellow-400/30" />
        </div>

        {/* Card Content */}
        <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 tracking-tighter leading-tight">
          {exp.role}
        </h3>
        <p className="text-lg md:text-xl text-yellow-400 mb-4 md:mb-6 font-medium italic">
          @{exp.company}
        </p>

        <ul className={`space-y-3 md:space-y-4 ${isLeft ? 'md:items-end' : 'items-start'} flex flex-col`}>
          {exp.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="group flex items-start gap-3 md:gap-4 text-gray-400 max-w-md"
            >
              {!isLeft && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 md:mt-2.5 flex-shrink-0 group-hover:scale-150 transition-transform" />}
              <span className="text-sm md:text-lg leading-relaxed">{point}</span>
              {isLeft && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 md:mt-2.5 flex-shrink-0 group-hover:scale-150 transition-transform" />}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Timeline Center Dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-full justify-center items-start pt-4">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="w-4 h-4 rounded-full bg-black border-2 border-yellow-400 z-20 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
        />
      </div>

      <div className={`hidden md:block ${isLeft ? 'md:order-2' : ''}`} />
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll line filling
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      data-section="experience"
      className="relative bg-black py-16 md:py-32 lg:py-48 overflow-hidden text-white"
    >
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Main Heading Section */}
        <div className="mb-20 md:mb-32 text-left">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-yellow-400 font-mono tracking-[0.5em] mb-3 md:mb-4 text-xs md:text-sm"
          >
            HISTORY
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-9xl font-black tracking-tighter leading-none"
          >
            EXPERIENCE<span className="text-yellow-400">.</span>
          </motion.h2>
        </div>

        {/* The Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-[300px] md:top-[400px] bottom-40 w-[1px] bg-white/10 -translate-x-1/2">
          <motion.div 
            style={{ scaleY }}
            className="w-full h-full bg-gradient-to-b from-yellow-400 to-yellow-600 origin-top shadow-[0_0_20px_rgba(250,204,21,0.4)]"
          />
        </div>

        {/* Content Cards */}
        <div className="relative mt-20">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>

        {/* Bottom CTA / Next Step */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 md:mt-20 p-6 sm:p-8 md:p-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-[80px]" />
          <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 italic">Ready for the next chapter?</h3>
          <p className="text-gray-400 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
            I'm currently seeking roles where I can bridge the gap between complex engineering and elegant design.
          </p>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-yellow-400 text-black font-black tracking-widest uppercase text-xs md:text-sm rounded-full"
          >
           Hire Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;