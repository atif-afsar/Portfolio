import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Subtle parallax

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0a0a] text-white px-6 py-32 md:px-20 lg:px-32 flex flex-col justify-center font-sans overflow-hidden"
    >
      {/* BACKGROUND ACCENT: Subtle Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* SIGNATURE LINE: Smoother Progress */}
      <div className="absolute left-6 md:left-12 top-0 h-full w-[1px] bg-white/10">
        <motion.div 
          style={{ scaleY: pathLength }}
          className="w-full h-full bg-[#FFD700] origin-top shadow-[0_0_15px_rgba(255,215,0,0.5)]"
        />
      </div>

      <motion.div 
        style={{ y: textY }}
        className="max-w-[1400px] mx-auto w-full relative z-10"
      >
        {/* LARGE EDITORIAL HEADLINE with Masking */}
        <div className="mb-24 md:mb-40 max-w-6xl">
          <motion.h2 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-6xl md:text-[clamp(3.5rem,9vw,8.5rem)] font-bold leading-[0.9] tracking-tight"
          >
            {["I create", "digital experiences", "that push boundaries", "and inspire users."].map((line, i) => (
              <div key={i} className="overflow-hidden mb-2">
                <motion.span 
                  variants={fadeInUp} 
                  className={`block ${line.includes('digital') || line.includes('boundaries') || line.includes('inspire') ? 'text-[#FFD700]' : 'text-white'}`}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.h2>
        </div>

        {/* ASYMMETRICAL BODY GRID */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16"
        >
          {/* Column 1 */}
          <motion.div variants={fadeInUp} className="space-y-8 border-l border-white/10 pl-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
              I’m a <span className="text-white font-medium italic">Full-Stack Developer</span> with a deep focus on 
              frontend excellence. My passion lies in building high-quality, responsive websites 
              that don’t just work—they <span className="text-[#FFD700]">captivate.</span>
            </p>
            <p className="text-lg text-gray-500 max-w-md">
              Every project I touch receives the same treatment: meticulous attention to 
              <span className="text-white/80"> performance, user experience,</span> and 
              <span className="text-white/80"> visual polish.</span>
            </p>
          </motion.div>

          {/* Column 2 */}
          <motion.div variants={fadeInUp} className="space-y-8 md:mt-20 border-l border-white/10 pl-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
              From <span className="text-white font-medium">React</span> and 
              <span className="text-white font-medium"> Node.js</span> to complex animations, 
              I bring a comprehensive skill set to every challenge.
            </p>
            <p className="text-lg text-gray-500 max-w-md">
              I believe the web should be <span className="text-[#FFD700] underline underline-offset-8 decoration-1">beautiful, fast,</span> and 
              <span className="text-[#FFD700]"> memorable.</span> That’s what I deliver.
            </p>
          </motion.div>
          
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;