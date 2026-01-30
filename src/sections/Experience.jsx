import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const experienceData = [
  {
    year: '2024',
    period: 'Present',
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    description: 'Leading development of cloud-native applications using React, Node.js, and AWS. Architecting scalable solutions for enterprise clients.',
  },
  {
    year: '2022',
    period: '2024',
    role: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    description: 'Built responsive web applications with modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-impact features.',
  },
  {
    year: '2020',
    period: '2022',
    role: 'Frontend Developer',
    company: 'Creative Studio',
    description: 'Crafted pixel-perfect user interfaces with React and Tailwind CSS. Focused on performance optimization and accessibility.',
  },
  {
    year: '2019',
    period: '2020',
    role: 'Junior Developer',
    company: 'StartupHub',
    description: 'Started my professional journey building web applications. Learned best practices in agile development and version control.',
  },
];

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 
  });

  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
      {/* Left side content (desktop) */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1] 
        }}
        className={`${isLeft ? 'md:text-right md:pr-8' : 'md:order-2 md:pl-8'}`}
      >
        <div className="inline-block mb-3">
          <span className="bg-yellow-400 text-black px-4 py-1.5 text-sm font-bold tracking-wider">
            {experience.year} {experience.period !== experience.year && `— ${experience.period}`}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 leading-tight">
          {experience.role}
        </h3>
        <p className="text-lg text-black/70 mb-3 font-medium">
          {experience.company}
        </p>
        <p className="text-base text-black/60 leading-relaxed max-w-md">
          {experience.description}
        </p>
      </motion.div>

      {/* Timeline dot (centered, hidden on mobile) */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.15 + 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-lg z-10"
      />

      {/* Right side content (desktop) - empty div for grid spacing */}
      <div className={`hidden md:block ${isLeft ? 'md:order-2' : ''}`} />
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  // Scroll-based opacity for main heading
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Main Heading */}
        <motion.div
          ref={headingRef}
          style={{ opacity: headingOpacity, y: headingY }}
          className="mb-20 md:mb-32"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black tracking-tight">
            MY JOURNEY
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 mt-6" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line (hidden on mobile, shown on desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/20 -translate-x-1/2" />

          {/* Experience Cards */}
          <div className="relative">
            {experienceData.map((experience, index) => (
              <ExperienceCard 
                key={index} 
                experience={experience} 
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-black/20 mt-16 origin-left"
        />
      </div>
    </section>
  );
};

export default Experience;