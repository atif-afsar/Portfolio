import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { label: "Home", id: "home", num: "01" },
    { label: "About", id: "about", num: "02" },
    { label: "Skills", id: "skills", num: "03" },
    { label: "Experience", id: "experience", num: "04" },
    { label: "Projects", id: "projects", num: "05" },
    { label: "Services", id: "services", num: "06" },
    { label: "Contact", id: "contact", num: "07" },
  ];

  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setIsMobileOpen(false);
    setTimeout(() => {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        section?.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Check if at top (home section)
      if (scrollPosition < 100) {
        setActiveSection("home");
        return;
      }

      // Check each section
      for (const item of navItems) {
        if (item.id === "home") continue;
        const section = document.querySelector(`[data-section="${item.id}"]`);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Handle resize and check mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      // Close mobile menu when switching to desktop
      if (!isMobileView) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    
    const resizeListener = () => checkMobile();
    window.addEventListener("resize", resizeListener);
    
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  // Desktop view
  if (!isMobile) {
    return (
      <div className="fixed left-0 top-0 bottom-0 w-12 bg-yellow-400 flex flex-col items-center z-50">
        <div className="flex flex-col items-center gap-0.5 py-3 h-full justify-center">
          {navItems.map((item, index) => (
            <div key={item.id} className="flex flex-col items-center flex-shrink-0">
              <motion.button
                onClick={() => scrollToSection(item.id)}
                className={`text-[10px] font-bold uppercase tracking-wider px-1 py-1 transition-colors whitespace-nowrap ${
                  activeSection === item.id ? "text-black font-black" : "text-black/40 hover:text-black"
                }`}
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
              {index < navItems.length - 1 && <div className="h-4 w-[1px] bg-black/10 my-1" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mobile view
  return (
    <>
      {/* Premium Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center z-[70] shadow-2xl active:scale-90 transition-transform"
      >
        <div className="flex flex-col gap-1.5 items-end">
          <motion.span 
            animate={isMobileOpen ? { rotate: 45, y: 8, width: 24 } : { rotate: 0, y: 0, width: 24 }}
            className="h-0.5 bg-black origin-center transition-all" 
          />
          <motion.span 
            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 bg-black w-16 transition-all"
            style={{ width: '16px' }} 
          />
          <motion.span 
            animate={isMobileOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 24 }}
            className="h-0.5 bg-black origin-center transition-all" 
          />
        </div>
      </button>

      <AnimatePresence mode="wait">
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            className="fixed inset-0 z-[60] bg-black overflow-hidden flex flex-col"
          >
            {/* Architectural Background Elements */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#0a0a0a]"
            />
            
            <div className="relative z-10 flex flex-col h-full justify-center px-8 sm:px-12">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="group flex items-baseline gap-4 text-left outline-none"
                    >
                      <span className={`font-mono text-sm transition-colors ${
                        activeSection === item.id ? "text-yellow-400" : "text-yellow-400/40"
                      }`}>
                        {item.num}
                      </span>
                      <span className={`text-5xl sm:text-7xl font-bold tracking-tighter uppercase transition-all ${
                        activeSection === item.id ? "text-white" : "text-white/20"
                      }`}>
                        {item.label}
                      </span>
                      {activeSection === item.id && (
                        <motion.div 
                          layoutId="dot" 
                          className="w-3 h-3 bg-yellow-400 rounded-full self-center"
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Footer Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-12 left-8 right-8 flex justify-between items-end"
              >
                <p className="text-white/20 text-[10px] font-mono">©2026</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;