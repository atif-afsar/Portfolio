"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";

/* ============================================================
   AWARD-WINNING PROJECTS SHOWCASE
   Performance-optimized horizontal scroll with premium design
   Now fully responsive with mobile-optimized layout
   ============================================================ */

const CARD_W_VW = 42;
const CARD_GAP = 40;
const INTRO_W_VW = 38;
const SCROLL_EXTRA_VH = 1.3;

/* ──────────────────────────────────────────────────────────────
   useWindowWidth — Debounced for performance
   ────────────────────────────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  
  useEffect(() => {
    let timeoutId;
    const fn = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setW(window.innerWidth), 150);
    };
    window.addEventListener("resize", fn, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", fn);
    };
  }, []);
  
  return w;
}

/* ──────────────────────────────────────────────────────────────
   useIsMobile — Detect mobile devices
   ────────────────────────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  
  useEffect(() => {
    let timeoutId;
    const fn = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(window.innerWidth < 1024), 150);
    };
    window.addEventListener("resize", fn, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", fn);
    };
  }, []);
  
  return isMobile;
}

/* ──────────────────────────────────────────────────────────────
   CaseStudyModal — Premium modal with backdrop blur
   ────────────────────────────────────────────────────────────── */
const CaseStudyModal = ({ caseStudy, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !caseStudy) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-yellow-500">
          <div>
            <div className="text-xs font-bold tracking-widest text-yellow-600 mb-2 uppercase">Case Study</div>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight">{caseStudy.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors text-3xl leading-none -mt-1 ml-4 flex-shrink-0"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          <div className="relative pl-4 sm:pl-6 border-l-4 border-yellow-500">
            <h3 className="text-lg sm:text-xl font-black text-yellow-600 mb-2 sm:mb-3 uppercase tracking-wide">Problem</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{caseStudy.problem}</p>
          </div>
          
          <div className="relative pl-4 sm:pl-6 border-l-4 border-yellow-500">
            <h3 className="text-lg sm:text-xl font-black text-yellow-600 mb-2 sm:mb-3 uppercase tracking-wide">Approach</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{caseStudy.approach}</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-black text-yellow-600 mb-3 sm:mb-4 uppercase tracking-wide">Architecture</h3>
            <ul className="space-y-2">
              {caseStudy.architecture.map((item, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-black text-yellow-600 mb-3 sm:mb-4 uppercase tracking-wide">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-shadow"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-black text-white rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-black text-yellow-400 mb-3 sm:mb-4 uppercase tracking-wide">Outcome</h3>
            <p className="text-gray-100 text-sm sm:text-base leading-relaxed">{caseStudy.outcome}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────
   ProjectCard — Optimized with GPU acceleration & Responsive
   ────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, scrollYProgress, isMobile }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const caseStudy = useMemo(() => 
    caseStudies.find(cs => 
      cs.id.toLowerCase().includes(project.title.toLowerCase().split(' ')[0].toLowerCase()) ||
      project.title.toLowerCase().includes(cs.id.toLowerCase().split('-')[0])
    ), [project.title]
  );

  const onIntersect = useCallback(([entry]) => {
    setVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(onIntersect, { 
      threshold: 0.25,
      rootMargin: '50px'
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onIntersect]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible || hovered) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [visible, hovered]);

  const cardCount = projects.length;
  const cardNorm = useMemo(() => 
    cardCount > 1 ? index / (cardCount - 1) : 0, 
    [index, cardCount]
  );

  const cardScale = useTransform(
    scrollYProgress, 
    [0, 0.15], 
    [1, prefersReducedMotion ? 1 : 1 - cardNorm * 0.025]
  );
  
  const cardY = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0, prefersReducedMotion ? 0 : cardNorm * -12]
  );

  const hasVideo = project.video && project.video.length > 0;

  // Mobile card styles
  const mobileCardStyles = isMobile ? {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto'
  } : {
    width: `${CARD_W_VW}vw`,
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        style={{
          ...mobileCardStyles,
          scale: isMobile ? 1 : cardScale,
          y: isMobile ? 0 : cardY,
          willChange: 'transform',
        }}
        initial={isMobile ? { opacity: 0, y: 40 } : {}}
        whileInView={isMobile ? { opacity: 1, y: 0 } : {}}
        viewport={isMobile ? { once: true, margin: "-100px" } : {}}
        transition={isMobile ? { duration: 0.6, delay: index * 0.1 } : {}}
        className="flex-shrink-0 relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer flex flex-col h-full group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/10" }}>
          <motion.div
            className="w-full h-full flex items-center justify-center relative"
            animate={{ scale: hovered && !prefersReducedMotion ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {hasVideo ? (
              <video
                ref={videoRef}
                src={project.video}
                poster={project.image}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            )}
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />
          </motion.div>

          <motion.div 
            className="absolute top-3 sm:top-5 left-3 sm:left-5 z-10"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
              {project.category}
            </span>
          </motion.div>

          <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-10">
            <div className="bg-black/90 backdrop-blur-sm text-yellow-400 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-mono font-bold border border-yellow-500/30">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500/20"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
            animate={{
              scale: hovered ? 1.2 : 1,
              opacity: hovered ? 0.3 : 0.1,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="p-5 sm:p-7 bg-white flex flex-col flex-grow relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent" />
          
          <h3 className="text-xl sm:text-2xl font-black text-black mb-2 sm:mb-3 leading-tight line-clamp-2 tracking-tight">
            {project.title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-3 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
            {project.tech.slice(0, 3).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + i * 0.05 }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold transition-colors border border-gray-200"
              >
                {tag}
              </motion.span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-gray-400 text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 font-semibold">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sm:w-[14px] sm:h-[14px]">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live
              </a>
            )}
            
            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-gray-700 hover:text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sm:w-[14px] sm:h-[14px]">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Code
              </a>
            )}
          </div>

          <div className="absolute bottom-0 left-5 sm:left-7 right-5 sm:right-7 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </motion.div>

      <CaseStudyModal
        caseStudy={caseStudy}
        isOpen={showCaseStudy}
        onClose={() => setShowCaseStudy(false)}
      />
    </>
  );
};

/* ──────────────────────────────────────────────────────────────
   Projects — Main Component with Responsive Layout
   ────────────────────────────────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null);
  const vw = useWindowWidth();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.4,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { introW, cardW, trackWidth, travel, scrollHeightVh } = useMemo(() => {
    if (isMobile) {
      return { 
        introW: 0, 
        cardW: 0, 
        trackWidth: 0, 
        travel: 0, 
        scrollHeightVh: 'auto' 
      };
    }
    
    const introW = (INTRO_W_VW / 100) * vw;
    const cardW = (CARD_W_VW / 100) * vw;
    const totalGaps = projects.length;
    const trackWidth = introW + projects.length * cardW + totalGaps * CARD_GAP;
    const travel = -(trackWidth - vw);
    const scrollHeightVh = Math.max(
      300,
      (Math.abs(travel) / (typeof window !== "undefined" ? window.innerHeight || 900 : 900) + SCROLL_EXTRA_VH) * 100
    );
    
    return { introW, cardW, trackWidth, travel, scrollHeightVh };
  }, [vw, isMobile]);

  const x = useTransform(smoothProgress, [0, 1], [0, travel]);
  const introX = useTransform(smoothProgress, [0, 1], [0, prefersReducedMotion ? 0 : travel * 0.25]);
  const introOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const introY = useTransform(smoothProgress, [0, 0.4], [0, prefersReducedMotion ? 0 : -40]);
  const introBlur = useTransform(smoothProgress, [0, 0.3], [0, 8]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Mobile Layout
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        data-section="projects"
        className="relative z-20 bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <motion.div
              className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mb-4 sm:mb-6 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isMobile ? 48 : 64 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            
            <motion.p
              className="text-xs tracking-[0.3em] text-yellow-600 mb-4 sm:mb-6 uppercase font-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Portfolio · Live Projects
            </motion.p>
            
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] text-black mb-4 sm:mb-6 tracking-tighter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              FEATURED
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                PROJECTS
              </span>
            </motion.h2>
            
            <motion.p
              className="text-gray-600 max-w-2xl text-base sm:text-lg leading-relaxed font-medium mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Real-world applications built for clients and personal innovation. 
              Each project showcases different aspects of modern web development.
            </motion.p>

            <motion.div
              className="flex gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black">{projects.length}+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black">{new Set(projects.flatMap(p => p.tech)).size}+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Technologies</div>
              </div>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-6 sm:space-y-8">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Horizontal Scroll Layout (unchanged)
  return (
    <section
      ref={sectionRef}
      data-section="projects"
      className="relative z-20 bg-gradient-to-b from-gray-50 to-white"
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          style={{ 
            x: introX, 
            y: introY, 
            opacity: introOpacity,
            filter: useTransform(introBlur, (v) => `blur(${v}px)`),
          }}
          className="absolute left-0 top-0 h-full flex flex-col justify-center pl-12 md:pl-24 pr-8 z-10 pointer-events-none max-w-xl"
        >
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          
          <motion.p
            className="text-xs tracking-[0.3em] text-yellow-600 mb-6 uppercase font-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Portfolio · Live Projects
          </motion.p>
          
          <motion.h2
            className="text-6xl md:text-7xl font-black leading-[0.95] text-black mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            FEATURED
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              PROJECTS
            </span>
          </motion.h2>
          
          <motion.p
            className="text-gray-600 max-w-md text-lg leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Real-world applications built for clients and personal innovation. 
            Each project showcases different aspects of modern web development.
          </motion.p>

          <motion.div
            className="flex gap-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div>
              <div className="text-3xl font-black text-black">{projects.length}+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-black text-black">{new Set(projects.flatMap(p => p.tech)).size}+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Technologies</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ x, gap: CARD_GAP, willChange: 'transform' }}
          className="flex items-center"
        >
          <div style={{ width: `${INTRO_W_VW}vw`, flexShrink: 0 }} />

          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
            />
          ))}

          <div style={{ width: '20vw', flexShrink: 0 }} />
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
        >
          <div className="bg-black/80 backdrop-blur-sm px-5 py-2 rounded-full">
            <span className="text-yellow-400 text-xs tracking-[0.2em] uppercase font-black">Scroll to explore</span>
          </div>
          <motion.div
            className="w-0.5 bg-gradient-to-b from-yellow-500 to-transparent rounded-full"
            animate={{ height: [16, 24, 16] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200/50 backdrop-blur-sm z-20 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 origin-left relative"
            style={{ scaleX: barScale }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50/50 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default Projects;