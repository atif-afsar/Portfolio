import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Premium Floating Button with Tooltip - Circular yellow background
const FloatingButton = ({ button, index }) => {
  return (
    <motion.div className="relative group">
      <motion.button
        onClick={button.onClick}
        className="relative w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center cursor-pointer z-50 transition-all duration-300 shadow-lg shadow-yellow-400/40 hover:shadow-xl hover:shadow-yellow-400/60"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 + index * 0.1 }}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="text-black transition-colors duration-300 flex items-center justify-center w-full h-full">
          {button.icon}
        </div>
      </motion.button>
      
      {/* Tooltip - Hidden on mobile, visible on hover on desktop */}
      <span className="hidden sm:block absolute right-12 sm:right-14 lg:right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest whitespace-nowrap shadow-xl border border-white/10">
        {button.label}
      </span>
    </motion.div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smoother Spring Parallax - only on desktop
  const smoothY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), {
    stiffness: 100,
    damping: 30
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Handle navigation
  const handleNavigation = (sectionId) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(`[data-section="${sectionId}"]`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const floatingButtons = [
    { id: "home", label: "Home", icon: <HomeIcon />, onClick: () => handleNavigation("home") },
    { id: "projects", label: "Work", icon: <GridIcon />, onClick: () => handleNavigation("projects") },
    { id: "contact", label: "Contact", icon: <MailIcon />, onClick: () => handleNavigation("contact") },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0a0a0a] text-white selection:bg-yellow-400 selection:text-black"
    >
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] bg-yellow-500/5 rounded-full blur-[120px]" />
        
        {/* Grid Pattern Overlay - More subtle on mobile */}
        <div 
          className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 lg:px-20 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center min-h-screen py-20 sm:py-24 lg:py-0">
          
          {/* Left Content (Column 1-7) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start justify-center order-1 lg:order-1"
            style={{ 
              opacity: isMobile ? 1 : textOpacity, 
              scale: isMobile ? 1 : textScale 
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <motion.span 
                className="h-[1px] w-6 sm:w-8 bg-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <span className="text-yellow-400 font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium">
                Available for Projects
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold sm:font-medium sm:leading-[0.9] tracking-tight sm:tracking-tighter mb-4 sm:mb-6 md:mb-8"
            >
              Building <span className="text-neutral-500 italic font-light">digital</span>
              <br />
              experiences<span className="text-yellow-400">.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            >
              I'm <span className="text-white font-semibold">Atif Afsar</span>, a Full-Stack Developer 
              specializing in building high-performance web applications with a focus on clean aesthetics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => {
                  const projectsSection = document.querySelector('[data-section="projects"]');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all active:scale-95 text-sm sm:text-base shadow-lg shadow-yellow-400/20 hover:shadow-xl hover:shadow-yellow-400/30"
              >
                View My Work
              </button>
              <button 
                onClick={() => {
                  const contactSection = document.querySelector('[data-section="contact"]');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/20 transition-all text-sm sm:text-base"
              >
                Get in Touch
              </button>
            </motion.div>
          </motion.div>

          {/* Right Image/Visuals (Column 8-12) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-2 lg:order-2">
            <motion.div 
              style={{ y: !isMobile ? smoothY : 0 }}
              className="relative w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[450px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Glowing Background Effect */}
              <div className="absolute inset-0 bg-yellow-400/20 rounded-[2rem] sm:rounded-[2.5rem] blur-[60px] sm:blur-[80px] -z-10" />
              
              {/* Image Container with Enhanced Border */}
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-white/20 bg-neutral-900 group shadow-2xl shadow-black/40">
                <motion.img
                  src="/hero.png"
                  alt="Atif Afsar"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                />
                
                {/* Enhanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated Border Highlight */}
                <motion.div 
                  className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.3) 0%, transparent 50%, rgba(250, 204, 21, 0.3) 100%)',
                    opacity: 0
                  }}
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Floating Navigation Buttons - Improved Mobile Positioning */}
              <div className="absolute -right-1.5 sm:-right-3 lg:-right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 sm:gap-2 lg:gap-4">
                {floatingButtons.map((btn, i) => (
                  <FloatingButton key={btn.id} button={btn} index={i} />
                ))}
              </div>

              {/* Decorative Corner Accent - Hidden on smallest mobile */}
              <motion.div 
                className="hidden xs:block absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 border-l-2 border-b-2 border-yellow-400/30 rounded-bl-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-yellow-400 via-yellow-400/50 to-transparent" />
      </motion.div>
    </section>
  );
};

// Premium Minimal Icons - Sleek and sophisticated
const HomeIcon = () => (
  <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12l9-9 9 9v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const GridIcon = () => (
  <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const MailIcon = () => (
  <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 7l-10 5L2 7"/>
  </svg>
);

export default Hero;