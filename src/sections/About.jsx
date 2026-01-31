"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ============================================================
   EASING — shared curve for all motion, keeps everything cohesive
   ============================================================ */
const EASE = [0.25, 0.46, 0.45, 0.94];

/* ============================================================
   DATA
   ============================================================ */
const stats = [
  { number: 2,  suffix: "+", label: "Years Experience" },
  { number: 10, suffix: "+", label: "Projects Done" },
  { number: 5,  suffix: "+", label: "Happy Clients" },
  { number: 50, suffix: "+", label: "GitHub Repos" },
];

const services = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, interactive user interfaces with React, Tailwind CSS, and modern web technologies. Pixel-perfect and performance-first.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Backend Development",
    description:
      "Creating scalable server-side applications with Node.js, Express, and MongoDB. RESTful APIs built for reliability and speed at scale.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Full-Stack Solutions",
    description:
      "End-to-end development from concept to deployment. Seamless integration across the entire stack with clean architecture and optimal performance.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

/* ============================================================
   AnimatedCounter — counts from 0 to target using rAF.
   Fires once when the stat card enters the viewport.
   ============================================================ */
const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!startRef.current) startRef.current = timestamp;
    const elapsed = timestamp - startRef.current;
    // 1.2s duration with ease-out cubic
    const duration = 1200;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    setCount(Math.round(eased * target));
    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [target]);

  useEffect(() => {
    if (!isInView) return;
    startRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, animate]);

  return (
    <span ref={ref} className="text-yellow-500 font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
      {count}{suffix}
    </span>
  );
};

/* ============================================================
   ServiceCard — hover micro-interaction:
     - Yellow left border slides down
     - Icon background fills
     - Text color shifts
   ============================================================ */
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    /* Outer: scroll-reveal only */
    <motion.div
      ref={ref}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
    >
      {/* Inner: hover variants propagate to children */}
      <motion.div
        className="relative flex flex-col gap-5 p-6 md:p-8 cursor-default"
        variants={{ idle: {}, active: {} }}
        initial="idle"
        whileHover="active"
      >
        {/* Left border — slides down on parent hover */}
        <motion.div
          className="absolute left-0 top-0 w-0.5 bg-yellow-500"
          variants={{ idle: { height: "0%" }, active: { height: "100%" } }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* Icon block */}
        <div className="relative w-14 h-14 flex items-center justify-center text-black">
          {/* Yellow background fill — scales in on parent hover */}
          <motion.div
            className="absolute inset-0 bg-yellow-500"
            variants={{ idle: { scale: 0 }, active: { scale: 1 } }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ borderRadius: 4, transformOrigin: "bottom left" }}
          />
          {/* Icon */}
          <motion.div
            className="relative z-10"
            variants={{ idle: { scale: 1 }, active: { scale: 1.1 } }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-black font-bold text-base md:text-lg uppercase tracking-wide leading-tight group-hover:text-yellow-600 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-black/45 text-sm leading-relaxed">
          {service.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   About — main section
   ============================================================ */
const About = () => {
  const sectionRef = useRef(null);

  /* Scroll-driven subtle parallax on the content block */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  /* Refs for triggering each block */
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef,    { once: true, amount: 0.5 });

  const bioRef      = useRef(null);
  const bioInView   = useInView(bioRef,      { once: true, amount: 0.4 });

  const statsRef    = useRef(null);
  const statsInView = useInView(statsRef,    { once: true, amount: 0.3 });

  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} data-section="about" className="relative bg-white z-20">
      <motion.div
        style={{ y: contentY }}
        className="ml-16 px-6 md:px-12 lg:px-20 xl:px-24 py-24 md:py-32 max-w-6xl"
      >

        {/* ══════════════════════════════════════════════════════
            TITLE BLOCK — clip-path reveal + drawing borders
            ══════════════════════════════════════════════════════ */}
        <div ref={titleRef} className="mb-14">
          {/* Top dotted border — draws in from left */}
          <motion.div
            className="w-full h-px mb-5 origin-left"
            style={{ backgroundImage: "repeating-linear-gradient(to right, #000 0, #000 4px, transparent 4px, transparent 10px)" }}
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />

          {/* Title — clip-path wipe reveal */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-none tracking-tighter mb-5"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={titleInView
              ? { clipPath: "inset(0 0 0% 0)" }
              : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            ABOUT ME
          </motion.h1>

          {/* Bottom dotted border — draws in from left, delayed */}
          <motion.div
            className="w-full h-px origin-left"
            style={{ backgroundImage: "repeating-linear-gradient(to right, #000 0, #000 4px, transparent 4px, transparent 10px)" }}
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════
            BIO BLOCK — name reveal + yellow underline draw +
            description clip-path wipe
            ══════════════════════════════════════════════════════ */}
        <div ref={bioRef} className="mb-20">
          {/* Name line */}
          <motion.div
            initial={false}
            animate={bioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-2"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-black/80">
              I'm <span className="font-bold text-black">Atif Afsar</span>, Full-Stack Developer
            </p>
            {/* Yellow underline — draws in after name appears */}
            <motion.div
              className="mt-3 h-0.5 bg-yellow-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={bioInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              style={{ width: "200px" }}
            />
          </motion.div>

          {/* Description — clip-path wipe (top → bottom) */}
          <motion.p
            className="text-base md:text-lg text-black/50 leading-relaxed max-w-2xl mt-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={bioInView
              ? { clipPath: "inset(0 0 0% 0)" }
              : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            Enthusiastic Full-Stack Developer with a passion for creating interactive, scalable,
            and visually polished digital experiences. I specialize in React, Node.js, and
            JavaScript — focusing on clean architecture, smooth animations, and thoughtful
            user experience. My work combines engineering excellence with modern design principles.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════════
            STATS — staggered card entrance + animated counters
            ══════════════════════════════════════════════════════ */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={statsInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 28, scale: 0.92 }
              }
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="group bg-black p-5 md:p-7 relative overflow-hidden"
            >
              {/* Subtle yellow corner accent — slides in on hover */}
              <motion.div
                className="absolute top-0 right-0 w-8 h-8 bg-yellow-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{ transformOrigin: "top right" }}
              />

              {/* Counter */}
              <div className="mb-2 relative z-10">
                {statsInView && <AnimatedCounter target={stat.number} suffix={stat.suffix} />}
              </div>

              {/* Label */}
              <p className="text-white/50 text-[10px] md:text-xs font-semibold uppercase tracking-widest leading-tight relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            SERVICES — header with drawing accent + staggered cards
            ══════════════════════════════════════════════════════ */}
        <div ref={servicesRef}>
          {/* Section header */}
          <motion.div
            initial={false}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <p className="text-xs tracking-widest text-yellow-500 uppercase mb-3">
              What I Do
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-black leading-none">
              CAPABILITIES
            </h2>
            {/* Yellow rule — draws in */}
            <motion.div
              className="mt-4 h-0.5 bg-yellow-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={servicesInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              style={{ width: "80px" }}
            />
          </motion.div>

          {/* Service cards */}
          <div className="grid md:grid-cols-3 gap-2 md:gap-4">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default About;