"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, certifications } from "../data/skills";

/* ============================================================
   MINIMAL SKILL CARD — Clean, premium design
   ============================================================ */
const SkillCard = ({ skill, index, category }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group relative bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-yellow-200 transition-all duration-300"
    >
      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
        {skill.name}
      </h3>
      
      {/* Category */}
      <p className="text-sm text-gray-500 mb-4">
        {skill.category}
      </p>
      
      {/* Subtle Accent Line */}
      <motion.div
        className="h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.05 + 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
      />
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

/* ============================================================
   CERTIFICATION BADGE — Minimal certification display
   ============================================================ */
const CertificationBadge = ({ cert, index }) => {
  const badgeRef = useRef(null);
  const isInView = useInView(badgeRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={badgeRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group bg-gray-50 hover:bg-yellow-50 rounded-lg p-4 border border-gray-200 hover:border-yellow-300 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-8 h-8 bg-yellow-100 group-hover:bg-yellow-200 rounded-full flex items-center justify-center transition-colors duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-600">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm leading-tight truncate">
            {cert.name}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {cert.issuer} • {cert.year}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN SKILLS SECTION — Premium minimal design
   ============================================================ */
const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });

  // Organize skills by category
  const skillCategories = [
    { title: "Frontend", skills: skills.frontend, color: "from-blue-500 to-blue-600" },
    { title: "Backend", skills: skills.backend, color: "from-green-500 to-green-600" },
    { title: "Tools & Platforms", skills: skills.tools, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <section 
      ref={sectionRef}
      data-section="skills"
      className="relative bg-gray-50 py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm tracking-widest text-yellow-600 mb-4 uppercase font-semibold">
            Technical Expertise
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A curated collection of technologies and tools I use to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="mb-16 md:mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-12 last:mb-0">
              {/* Category Header */}
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: categoryIndex * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className={`w-1 h-8 bg-gradient-to-b ${category.color} rounded-full`} />
                <h3 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h3>
              </motion.div>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    category={category.title}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Certifications
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Professional certifications and continuous learning achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <CertificationBadge
                key={cert.name}
                cert={cert}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-600 font-medium text-sm">
              Continuously expanding skillset
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;