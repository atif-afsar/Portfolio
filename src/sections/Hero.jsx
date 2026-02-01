import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useParallax } from "../hooks/useParallax";

// Floating Button Component
const FloatingButton = ({ button, index }) => {
  return (
    <motion.button
      onClick={button.onClick}
      className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center cursor-pointer z-50 backdrop-blur-sm border border-yellow-300/20"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        delay: 0.6 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.15,
        rotate: 5,
        background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        boxShadow: "0 8px 25px rgba(251, 191, 36, 0.4)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      style={{
        boxShadow: "0 4px 15px rgba(251, 191, 36, 0.2)",
      }}
    >
      <motion.div
        className="relative z-10 text-black drop-shadow-sm"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {button.icon}
      </motion.div>
      
      {/* Subtle inner glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        }}
      />
    </motion.button>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const backgroundRef = useRef(null);
  
  // Parallax effects with different speeds for layered depth
  const backgroundY = useParallax(backgroundRef, 50);
  const imageY = useParallax(imageRef, 30);
  
  // Additional scroll-based transforms for more complex parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const floatingButtonsY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.1]);

  // Scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('[data-section="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.querySelector('[data-section="projects"]');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Floating button icons (SVG) - white icons for yellow background
  const floatingButtons = [
    {
      id: "home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: "Home",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      id: "profile",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: "About",
      onClick: scrollToAbout,
    },
    {
      id: "projects",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      label: "Projects",
      onClick: scrollToProjects,
    },
    {
      id: "portfolio",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      label: "Portfolio",
      onClick: scrollToProjects,
    },
    {
      id: "contact",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Contact",
      onClick: scrollToContact,
    },
    {
      id: "send",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      label: "Send",
      onClick: scrollToContact,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden z-10 ml-16"
    >
      {/* Parallax Background Elements */}
      <motion.div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        {/* Subtle geometric shapes for parallax */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/8 rounded-full blur-lg" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-400/3 rounded-full blur-2xl" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </motion.div>
      
      <div className="w-full h-screen relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side - Text Content (50%) - White Background */}
          <motion.div
            className="flex flex-col space-y-6 lg:space-y-8 bg-white px-6 md:px-12 lg:px-20 xl:px-24 justify-center relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle parallax background elements for text side */}
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 25]) }}
            >
              <div className="absolute top-16 left-8 w-24 h-24 bg-yellow-400/3 rounded-full blur-xl" />
              <div className="absolute bottom-20 right-12 w-32 h-32 bg-yellow-400/2 rounded-full blur-2xl" />
              <div className="absolute top-1/2 left-4 w-16 h-16 bg-yellow-400/4 rounded-full blur-lg" />
            </motion.div>
            
            {/* Content with subtle parallax offset */}
            <motion.div
              className="relative z-10"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -15]) }}
            >
              {/* Intro Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-base md:text-lg font-bold tracking-wider uppercase text-gray-600"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                FULL-STACK DEVELOPER
              </motion.p>

              {/* Name with Accent Highlight */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                I'm{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-black">Atif Afsar</span>
                  <motion.span
                    className="absolute bottom-2 left-0 right-0 h-4 bg-yellow-400 opacity-60 -z-0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </motion.h1>

              {/* Role Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Computer Science Engineer & Software Developer
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                I craft cutting-edge web applications with React, Node.js, and JavaScript. 
                Passionate about building scalable, interactive digital experiences that solve real-world problems.
              </motion.p>

              {/* Primary CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={scrollToAbout}
                className="self-start bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-bold uppercase tracking-wider relative overflow-hidden group border border-yellow-300/20"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)",
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                }}
                whileTap={{ scale: 0.98, y: -1 }}
                style={{ 
                  fontFamily: "'Inter', system-ui, sans-serif",
                  boxShadow: "0 4px 15px rgba(251, 191, 36, 0.2)",
                }}
              >
                <span className="relative z-10 drop-shadow-sm">More About Me</span>
                
                {/* Animated background shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                
                {/* Inner glow */}
                <div 
                  className="absolute inset-0 opacity-50 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Image with Floating Buttons (50%) - Grey Background */}
          <motion.div
            className="relative flex justify-center lg:justify-end items-center h-full bg-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Parallax Background Layer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ y: backgroundY }}
            >
              {/* Subtle background shapes with parallax */}
              <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-yellow-400/10 rounded-full blur-lg" />
              <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-yellow-400/8 rounded-full blur-md" />
              <div className="absolute top-1/2 right-1/6 w-12 h-12 bg-yellow-400/6 rounded-full blur-sm" />
            </motion.div>
            
            <div className="relative w-full h-full flex items-center justify-end">
              {/* Profile Image - Large to fill 50% area */}
              <div className="relative z-0 w-full h-full flex items-center justify-end pr-4 lg:pr-8">
                {/* Full Image - Sized to fill the grey area with parallax */}
                <motion.div
                  ref={imageRef}
                  className="relative h-full w-auto max-w-full flex items-center justify-end"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  style={{ y: imageY }}
                >
                  {/* Main Image with Premium Effects */}
                  <motion.img
                    src="/hero.png"
                    alt="Atif Afsar"
                    className="h-full w-auto max-w-full object-contain object-right relative z-10"
                    style={{
                      filter: 'contrast(1.1) brightness(1.05) saturate(0.9)',
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      const parent = e.target.parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl font-black text-gray-400">PROFILE</div>';
                      }
                    }}
                  />
                  
                  {/* Premium Gradient Overlay with parallax-responsive opacity */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,193,7,0.08) 100%)',
                      mixBlendMode: 'overlay',
                      opacity: overlayOpacity,
                    }}
                  />
                  
                  {/* Subtle Glow Effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-0 opacity-30"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(255,193,7,0.15) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                    }}
                  />
                </motion.div>
              </div>

              {/* Floating Action Buttons - Vertical Stack on Right Side with parallax */}
              <motion.div 
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 pointer-events-auto"
                style={{ y: floatingButtonsY }}
              >
                {floatingButtons.map((button, index) => (
                  <FloatingButton key={button.id} button={button} index={index} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
