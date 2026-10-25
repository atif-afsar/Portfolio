import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Cursor from "./components/layout/Cursor";
import Sidebar from "./components/layout/Sidebar";
import Loader from "./sections/Loader";
import Chatbot from "./components/Chatbot";

// 3D office mode (new experience) — lazy so it stays out of the initial bundle
const OfficeApp = lazy(() => import("./office/OfficeApp.jsx"));

// Lazy load heavy sections
const Hero = lazy(() => import("./sections/Hero"));
const Marquee = lazy(() => import("./sections/Marquee"));
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const TechStack = lazy(() => import("./sections/TechStack"));
const TechStackMarquee = lazy(() => import("./sections/TechStackMarquee"));
const Experience = lazy(() => import("./sections/Experience"));
const Projects = lazy(() => import("./sections/Projects"));
const MyServices = lazy(() => import("./sections/MyServices"));
const Experimental = lazy(() => import("./sections/Experimental"));
const Contact = lazy(() => import("./sections/Contact"));

// Lightweight fallback loader
const SectionFallback = () => (
  <div className="min-h-screen bg-black animate-pulse" />
);

// The 3D office is the site. VITE_OFFICE_MODE=false brings back the classic
// scrolling site (kept for now as a fallback while the redesign settles).
const OFFICE_MODE = import.meta.env.VITE_OFFICE_MODE !== "false";

const App = () => {
  // 3D office + monitor-OS experience
  if (OFFICE_MODE) {
    return (
      <Suspense fallback={<div style={{ background: "#000", height: "100vh" }} />}>
        <OfficeApp />
      </Suspense>
    );
  }

  return <ClassicSite />;
};

const ClassicSite = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("classic-cursor");
    return () => document.body.classList.remove("classic-cursor");
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Cursor />
      <Sidebar />
      <div className="relative">
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>
        <div className="relative z-20">
          <Suspense fallback={<SectionFallback />}>
            <Marquee />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TechStack />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TechStackMarquee />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <MyServices />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Experimental />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </div>
      </div>
      <div className="pointer-events-none">
        <motion.div
          className="pointer-events-auto"
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Chatbot />
        </motion.div>
      </div>
    </>
  );
};

export default App;
