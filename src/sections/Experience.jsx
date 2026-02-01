import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { experience } from '../data/experience';

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.2 
  });

  const isLeft = index % 2 === 0;
  const isEducation = exp.type === 'education';

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start mb-12 md:mb-20">
      {/* Content */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.7, 
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1] 
        }}
        className={`${isLeft ? 'md:text-right md:pr-6' : 'md:order-2 md:pl-6'} bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100`}
      >
        {/* Type Badge */}
        <div className="inline-block mb-4">
          <span className={`px-4 py-2 text-sm font-bold tracking-wider rounded-full ${
            isEducation 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isEducation ? 'EDUCATION' : 'WORK EXPERIENCE'}
          </span>
        </div>

        {/* Duration */}
        <div className="mb-3">
          <span className="bg-gray-900 text-white px-3 py-1 text-sm font-mono rounded">
            {exp.duration}
          </span>
        </div>

        {/* Role & Company */}
        <h3 className="text-xl md:text-2xl font-bold text-black mb-2 leading-tight">
          {exp.role}
        </h3>
        <p className="text-lg text-gray-700 mb-4 font-semibold">
          {exp.company}
        </p>

        {/* Points */}
        <ul className="space-y-2">
          {exp.points.map((point, pointIndex) => (
            <motion.li
              key={pointIndex}
              initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 20 : -20 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 + pointIndex * 0.1 + 0.3,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="flex items-start gap-3 text-gray-600 leading-relaxed"
            >
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm md:text-base">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Timeline dot (centered, hidden on mobile) */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1 + 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 ${
          isEducation ? 'bg-blue-500' : 'bg-yellow-500'
        }`}
      />

      {/* Right side content (desktop) - empty div for grid spacing */}
      <div className={`hidden md:block ${isLeft ? 'md:order-2' : ''}`} />
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

  return (
    <section 
      ref={sectionRef}
      data-section="experience"
      className="relative bg-gray-50 py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Heading */}
        <motion.div
          ref={headingRef}
          style={{ opacity: headingOpacity, y: headingY }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm tracking-widest text-yellow-600 mb-4 uppercase font-bold">
            Career Journey / Timeline
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black tracking-tight mb-6">
            MY JOURNEY
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From academic foundations to professional excellence — 
            a continuous journey of learning, building, and innovating in the world of technology.
          </p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-8" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (hidden on mobile, shown on desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-gray-300 to-blue-500 -translate-x-1/2" />

          {/* Experience Cards */}
          <div className="relative">
            {experience.map((exp, index) => (
              <ExperienceCard 
                key={index} 
                exp={exp} 
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              What's Next?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Currently pursuing my B.Tech while gaining hands-on experience through internships. 
              Always eager to take on new challenges and contribute to innovative projects.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                Open to Opportunities
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                Available for Projects
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;