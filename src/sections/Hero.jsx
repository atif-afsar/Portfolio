import { motion } from "framer-motion";
import { useRef } from "react";

// Floating Button Component
const FloatingButton = ({ button, index }) => {
  return (
    <motion.button
      onClick={button.onClick}
      className="relative w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-full flex items-center justify-center text-white cursor-pointer z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.6 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#fbbf24",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative z-10 text-white"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {button.icon}
      </motion.div>
    </motion.button>
  );
};

const Hero = () => {
  const containerRef = useRef(null);

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
      className="relative min-h-screen flex items-center overflow-hidden z-10"
    >
      <div className="w-full h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side - Text Content (50%) - White Background */}
          <motion.div
            className="flex flex-col space-y-6 lg:space-y-8 bg-white px-6 md:px-12 lg:px-20 xl:px-24 justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Intro Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-base md:text-lg font-bold tracking-wider uppercase text-gray-600"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              HI THERE!
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
              Frontend Developer / Software Engineer
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              I build scalable, interactive, and visually polished digital experiences.
            </motion.p>

            {/* Primary CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={scrollToAbout}
              className="self-start bg-yellow-400 text-black px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-bold uppercase tracking-wider relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "#fbbf24" }}
              whileTap={{ scale: 0.98 }}
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              <span className="relative z-10">More About Me</span>
            </motion.button>
          </motion.div>

          {/* Right Side - Image with Floating Buttons (50%) - Grey Background */}
          <motion.div
            className="relative flex justify-center lg:justify-end items-center h-full bg-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full h-full flex items-center justify-end">
              {/* Profile Image - Large to fill 50% area */}
              <div className="relative z-0 w-full h-full flex items-center justify-end pr-4 lg:pr-8">
                {/* Full Image - Sized to fill the grey area */}
                <motion.img
                  src="/hero.png"
                  alt="Atif Afsar"
                  className="h-full w-auto max-w-full object-contain object-right relative z-0"
                  style={{
                    filter: 'grayscale(100%) contrast(1.05) brightness(0.95)',
                  }}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl font-black text-gray-400">PROFILE</div>';
                    }
                  }}
                />
                
                {/* Subtle dark overlay - Reduced opacity */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>

              {/* Floating Action Buttons - Vertical Stack on Right Side */}
              <div className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 pointer-events-auto">
                {floatingButtons.map((button, index) => (
                  <FloatingButton key={button.id} button={button} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
