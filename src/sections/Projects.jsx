"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";

/* ============================================================
   TUNABLES
   ============================================================ */
const CARD_W_VW = 45;          // card width in vw units (reduced for better visibility)
const CARD_GAP  = 32;          // px gap between cards
const INTRO_W_VW = 35;         // intro panel width in vw
const SCROLL_EXTRA_VH = 1.2;   // extra vh multiplier for pacing feel

/* ──────────────────────────────────────────────────────────────
   useWindowWidth — reactive viewport width (handles resize + SSR)
   ────────────────────────────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ──────────────────────────────────────────────────────────────
   CaseStudyModal Component
   ────────────────────────────────────────────────────────────── */
const CaseStudyModal = ({ caseStudy, isOpen, onClose }) => {
  if (!isOpen || !caseStudy) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-black">{caseStudy.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-2">Problem</h3>
            <p className="text-gray-700 leading-relaxed">{caseStudy.problem}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-2">Approach</h3>
            <p className="text-gray-700 leading-relaxed">{caseStudy.approach}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-2">Architecture</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {caseStudy.architecture.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-2">Outcome</h3>
            <p className="text-gray-700 leading-relaxed">{caseStudy.outcome}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────
   ProjectCard
   ────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, scrollYProgress }) => {
  const cardRef  = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  // Find corresponding case study
  const caseStudy = caseStudies.find(cs => 
    cs.id.toLowerCase().includes(project.title.toLowerCase().split(' ')[0].toLowerCase()) ||
    project.title.toLowerCase().includes(cs.id.toLowerCase().split('-')[0])
  );

  /* ── IntersectionObserver → autoplay video when card is in view ── */
  const onIntersect = useCallback(([entry]) => {
    setVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(onIntersect, { threshold: 0.35 });
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

  /* ── Per-card parallax ── */
  const cardCount = projects.length;
  const cardNorm = cardCount > 1 ? index / (cardCount - 1) : 0;
  const cardScale = useTransform(scrollYProgress, [0, 0.15], [1, 1 - cardNorm * 0.02]);
  const cardY = useTransform(scrollYProgress, [0, 0.5], [0, cardNorm * -8]);

  const hasVideo = project.video && project.video.length > 0;

  return (
    <>
      <motion.div
        ref={cardRef}
        style={{
          width: `${CARD_W_VW}vw`,
          scale: cardScale,
          y: cardY,
        }}
        className="flex-shrink-0 relative rounded-lg overflow-hidden bg-white shadow-lg cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Media block ── */}
        <div className="relative w-full overflow-hidden flex items-center justify-center bg-gray-100" style={{ aspectRatio: "16/10" }}>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {hasVideo ? (
              <video
                ref={videoRef}
                src={project.video}
                poster={project.image}
                muted
                loop
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            )}
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {project.category}
            </span>
          </div>

          {/* Index badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-black/70 text-white px-2 py-1 rounded text-sm font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Content section ── */}
        <div className="p-6 bg-white">
          {/* Title */}
          <h3 className="text-2xl font-bold text-black mb-3 leading-tight">
            {project.title}
          </h3>

          {/* Description - Made more visible */}
          <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-gray-400 text-sm px-2 py-1">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
            
            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Source Code
              </a>
            )}
            
            {caseStudy && (
              <button
                onClick={() => setShowCaseStudy(true)}
                className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
                Case Study
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={caseStudy}
        isOpen={showCaseStudy}
        onClose={() => setShowCaseStudy(false)}
      />
    </>
  );
};

/* ──────────────────────────────────────────────────────────────
   Projects — main section
   ────────────────────────────────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null);
  const vw         = useWindowWidth();

  /* ── Scroll progress scoped to THIS section ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ── Smooth the raw scroll value ── */
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,
    stiffness: 80,
    damping: 25,
  });

  /* ── Geometry calculations ── */
  const introW      = (INTRO_W_VW / 100) * vw;
  const cardW       = (CARD_W_VW  / 100) * vw;
  const totalGaps   = projects.length;
  const trackWidth  = introW + projects.length * cardW + totalGaps * CARD_GAP;
  const travel      = -(trackWidth - vw);

  const x = useTransform(smoothProgress, [0, 1], [0, travel]);

  const scrollHeightVh = Math.max(
    300,
    (Math.abs(travel) / (typeof window !== "undefined" ? window.innerHeight || 900 : 900) + SCROLL_EXTRA_VH) * 100
  );

  /* ── Intro panel parallax ── */
  const introX = useTransform(smoothProgress, [0, 1], [0, travel * 0.3]);
  const introOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const introY = useTransform(smoothProgress, [0, 0.4], [0, -30]);

  /* ── UI elements ── */
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      className="relative z-20 bg-gray-50"
      style={{ height: `${scrollHeightVh}vh` }}
    >
      {/* ── Sticky frame ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* ─── Intro panel ─── */}
        <motion.div
          style={{ x: introX, y: introY, opacity: introOpacity }}
          className="absolute left-0 top-0 h-full flex flex-col justify-center pl-12 md:pl-20 z-10 pointer-events-none"
        >
          <p className="text-sm tracking-widest text-yellow-600 mb-4 uppercase font-bold">
            Portfolio / Live Projects
          </p>
          <h2 className="text-5xl md:text-6xl font-black leading-none text-black mb-4">
            FEATURED
            <br />
            <span className="text-yellow-500">PROJECTS</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-sm text-lg leading-relaxed">
            Real-world applications built for clients and personal innovation. 
            Each project showcases different aspects of modern web development.
          </p>
        </motion.div>

        {/* ─── Horizontal card track ─── */}
        <motion.div
          style={{ x, gap: CARD_GAP }}
          className="flex items-center"
        >
          {/* Spacer */}
          <div style={{ width: `${INTRO_W_VW}vw`, flexShrink: 0 }} />

          {/* Cards */}
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* ─── Scroll hint ─── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <span className="text-gray-400 text-xs tracking-widest uppercase font-medium">Scroll Horizontally</span>
          <motion.div
            className="w-px bg-yellow-500"
            animate={{ height: [20, 8, 20] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* ─── Progress bar ─── */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-20">
          <motion.div
            className="h-full bg-yellow-500 origin-left"
            style={{ scaleX: barScale }}
          />
        </div>

        {/* ─── Edge gradient ─── */}
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default Projects;