import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Code2, Cpu, Globe, Layers, Layout, MessageSquare, 
  Database, Server, Zap, GitBranch, Box, Terminal, 
  Send, Sparkles, Smartphone 
} from 'lucide-react';

const SkillCard = ({ icon: Icon, name, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.05
          }
        }
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/5 rounded-2xl group cursor-pointer overflow-hidden"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 223, 0, 0.08) 0%, transparent 70%)",
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? "0 0 40px rgba(255, 223, 0, 0.3), inset 0 0 20px rgba(255, 223, 0, 0.05)"
            : "0 0 0px rgba(255, 223, 0, 0)"
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border"
        animate={{
          borderColor: isHovered ? "rgba(255, 223, 0, 0.5)" : "rgba(255, 255, 255, 0.05)"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </motion.div>

      {/* Icon with 3D transform */}
      <motion.div 
        className="mb-5 relative z-10"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          rotateZ: isHovered ? 5 : 0,
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <motion.div
          animate={{
            filter: isHovered 
              ? "drop-shadow(0 0 15px rgba(255, 223, 0, 0.8))" 
              : "drop-shadow(0 0 0px rgba(255, 223, 0, 0))"
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon 
            size={36} 
            strokeWidth={1.5}
            className="text-white group-hover:text-[#FFDF00] transition-colors duration-300"
          />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.span 
        className="text-sm font-semibold tracking-wide text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
      >
        {name}
      </motion.span>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-2 right-2 w-8 h-0.5 bg-gradient-to-l from-[#FFDF00] to-transparent" />
        <div className="absolute top-2 right-2 w-0.5 h-8 bg-gradient-to-b from-[#FFDF00] to-transparent" />
      </motion.div>
    </motion.div>
  );
};

const WhatIDo = () => {
  const skills = {
    frontend: [
      { name: "JavaScript", icon: Code2 },
      { name: "React", icon: Cpu },
      { name: "HTML5", icon: Globe },
      { name: "CSS3", icon: Layers },
      { name: "Tailwind CSS", icon: Layout },
      { name: "Framer Motion", icon: Zap },
      { name: "Responsive", icon: Smartphone },
    ],
    backend: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Terminal },
      { name: "Firebase", icon: FlameIcon },
      { name: "MongoDB", icon: Database },
      { name: "REST APIs", icon: Box },
    ],
    tools: [
      { name: "Git/GitHub", icon: GitBranch },
      { name: "Vite", icon: Zap },
      { name: "Postman", icon: MessageSquare },
      { name: "EmailJS", icon: Send },
      { name: "OpenAI", icon: Sparkles },
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-[#050505]">
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: `
                 linear-gradient(rgba(255, 223, 0, 0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255, 223, 0, 0.03) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Diagonal stripe accents */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 -left-1/4 w-[150%] h-[800px] bg-gradient-to-r from-transparent via-[#FFDF00]/10 to-transparent"
          style={{ transform: 'rotate(-15deg)' }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 -right-1/4 w-[150%] h-[600px] bg-gradient-to-l from-transparent via-[#FFDF00]/10 to-transparent"
          style={{ transform: 'rotate(-15deg)' }}
        />
      </div>

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFDF00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFDF00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#FFDF00]"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <span className="text-[#FFDF00] text-sm font-bold tracking-[0.3em] uppercase">
                Expertise
              </span>
              <motion.div 
                className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#FFDF00]"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          >
            What I Do
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Transforming complex challenges into elegant, high-performance digital solutions. 
            Specialized in modern tech stacks and seamless user experiences.
          </motion.p>
        </div>

        {/* Central Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative bg-gradient-to-br from-[#0f0f0f] to-[#050505] rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl backdrop-blur-sm"
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20">
            <div className="absolute top-4 left-4 w-12 h-0.5 bg-gradient-to-r from-[#FFDF00] to-transparent" />
            <div className="absolute top-4 left-4 w-0.5 h-12 bg-gradient-to-b from-[#FFDF00] to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20">
            <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-gradient-to-l from-[#FFDF00] to-transparent" />
            <div className="absolute bottom-4 right-4 w-0.5 h-12 bg-gradient-to-t from-[#FFDF00] to-transparent" />
          </div>

          <div className="space-y-20">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <motion.div 
                    className="h-[3px] bg-gradient-to-r from-[#FFDF00] to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 + 0.2 }}
                  />
                  <h3 className="text-white text-2xl font-bold capitalize tracking-tight">
                    {category}
                    <span className="text-[#FFDF00] ml-2">Development</span>
                  </h3>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                  {items.map((skill, idx) => (
                    <SkillCard key={idx} {...skill} index={idx} />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Custom Flame Icon
const FlameIcon = ({ size = 24, strokeWidth = 1.5, className, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round"  
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export default WhatIDo;