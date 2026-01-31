"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "../data/projects";

/* ============================================================
   TUNABLES
   ============================================================ */
const CARD_W_VW = 55;          // card width in vw units
const CARD_GAP  = 48;          // px gap between cards
const INTRO_W_VW = 38;         // intro panel width in vw
const SCROLL_EXTRA_VH = 1.4;   // extra vh multiplier for pacing feel
/* ============================================================ */

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
   ProjectCard
   ────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, scrollYProgress }) => {
  const cardRef  = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

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

  /* ── Per-card parallax: each card reacts slightly differently
         to the overall scroll, creating subtle depth variation.
         Cards further along the row scale down a tiny bit while
         the leading card stays bold — a cinematic depth cue.      ── */
  const cardCount = projects.length;
  // Normalised position of THIS card in the row (0 = first, 1 = last)
  const cardNorm = cardCount > 1 ? index / (cardCount - 1) : 0;

  // Scale: first card stays at 1, last card dips to 0.96 as scroll starts
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 1 - cardNorm * 0.035]
  );
  // Subtle vertical drift per card — staggered vertical parallax
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, cardNorm * -12]
  );

  const hasVideo = project.video && project.video.length > 0;

  return (
    <motion.div
      ref={cardRef}
      style={{
        width: `${CARD_W_VW}vw`,
        scale: cardScale,
        y: cardY,
      }}
      className="flex-shrink-0 relative rounded-sm overflow-hidden bg-black cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Media block (aspect-locked 16:9) ── */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        {/* Scalable media wrapper — only Framer animates this, zero CSS transitions */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.image}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>

        {/* Gradient veil — always present for legibility, intensifies on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.5 }}
        />

        {/* ── Index badge ── */}
        <div className="absolute top-5 left-5 z-10">
          <span className="text-yellow-500 text-xs font-mono tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ── Hover reveal line — a thin yellow accent that slides in ── */}
        <motion.div
          className="absolute top-5 left-10 h-px bg-yellow-500 z-10"
          animate={{ width: hovered ? 40 : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      {/* ── Content overlay at bottom ── */}
      <div className="relative bg-black px-5 py-5">
        {/* Title row */}
        <div className="flex items-baseline gap-3 mb-2">
          <h3 className="text-white text-xl font-bold uppercase tracking-tight leading-none">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/45 text-xs leading-relaxed mb-4 max-w-sm line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="border border-white/15 text-white/50 text-[9px] uppercase tracking-widest px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
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

  /* ── Smooth the raw scroll value so the x translation eases
         rather than being a raw linear ramp.                     ── */
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,
    stiffness: 80,
    damping: 25,
  });

  /* ── Geometry: calculate exact travel distance in px ──
     totalTrackWidth = introPanel + N cards + (N) gaps
     travelDistance   = totalTrackWidth − viewportWidth
     We negate it because we translate left.                      ── */
  const introW      = (INTRO_W_VW / 100) * vw;
  const cardW       = (CARD_W_VW  / 100) * vw;
  const totalGaps   = projects.length; // gap after intro + between each card
  const trackWidth  = introW + projects.length * cardW + totalGaps * CARD_GAP;
  const travel      = -(trackWidth - vw);

  /* ── Map smoothed progress [0 → 1] to translateX [0 → travel] ── */
  const x = useTransform(smoothProgress, [0, 1], [0, travel]);

  /* ── Section height: tall enough to give scroll runway for full travel.
         We derive it from the travel distance itself so it always matches. ── */
  const scrollHeightVh = Math.max(
    300,
    (Math.abs(travel) / (typeof window !== "undefined" ? window.innerHeight || 900 : 900) + SCROLL_EXTRA_VH) * 100
  );

  /* ── Intro panel parallax: moves slower than cards for depth ── */
  const introX = useTransform(smoothProgress, [0, 1], [0, travel * 0.35]);
  const introOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const introY = useTransform(smoothProgress, [0, 0.4], [0, -40]);

  /* ── Scroll hint opacity ── */
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  /* ── Progress bar scaleX ── */
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      className="relative z-20 bg-white"
      style={{ height: `${scrollHeightVh}vh` }}
    >
      {/* ── Sticky frame — pins to viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* ─── Intro panel (parallax layer — moves at 35% speed) ─── */}
        <motion.div
          style={{ x: introX, y: introY, opacity: introOpacity }}
          className="absolute left-0 top-0 h-full flex flex-col justify-center pl-12 md:pl-20 z-10 pointer-events-none"
        >
          <p className="text-xs tracking-widest text-yellow-500 mb-5 uppercase">
            Projects / Selected Systems
          </p>
          <h2 className="text-6xl md:text-7xl font-bold leading-none text-black">
            SELECTED
            <br />
            <span className="text-yellow-500">WORKS</span>
          </h2>
          <p className="mt-6 text-black/40 max-w-xs text-sm italic leading-relaxed">
            A collection of immersive digital experiences and functional interfaces built for scale.
          </p>
        </motion.div>

        {/* ─── Horizontal card track ─── */}
        <motion.div
          style={{ x, gap: CARD_GAP }}
          className="flex items-center"
        >
          {/* Spacer matching intro panel width so cards start after it */}
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
          <span className="text-black/25 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px bg-yellow-500"
            animate={{ height: [28, 10, 28] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>

        {/* ─── Progress bar ─── */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black/6 z-20">
          <motion.div
            className="h-full bg-yellow-500 origin-left"
            style={{ scaleX: barScale }}
          />
        </div>

        {/* ─── Subtle left edge vignette to signal more content ─── */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default Projects;