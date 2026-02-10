import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Note: You can use react-icons or any SVG library for the icons
import { 
  SiNextdotjs, SiReact, SiTailwindcss, SiFramer, 
  SiTypescript, SiNodedotjs, SiPostgresql, SiGreensock, 
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiThreedotjs,
  SiPostman,
  SiExpress,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiGit,
  SiGithub,
  SiFigma,
  SiGoogle,
  SiSpeedtest,
  SiW3Schools,
  SiMongodb,
  SiSimpleicons
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const TechBadge = ({ icon: Icon, name, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm transition-colors hover:border-[#f5c400]/50"
    >
      <div className="text-4xl text-white group-hover:text-[#f5c400] transition-colors">
        <Icon />
      </div>
      <div>
        <h4 className="text-white font-bold tracking-tight">{name}</h4>
        <div className="h-0.5 w-0 bg-[#f5c400] group-hover:w-full transition-all duration-300" />
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const categories = [
  {
    title: "Frontend",
    techs: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript (ES6+)", icon: SiJavascript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
      { name: "Tailwind CSS", icon: SiTailwindcss }
    ]
  },
  {
    title: "Motion, UI & 3D",
    techs: [
      { name: "GSAP", icon: SiGreensock },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Lenis", icon: SiSimpleicons }
    ]
  },
  {
    title: "Backend",
    techs: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: SiPostman }
    ]
  },
  {
    title: "Database & Auth",
    techs: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase }
    ]
  },
  {
    title: "DevOps & Hosting",
    techs: [
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
      { name: "Docker", icon: SiDocker }
    ]
  },
  {
    title: "Tools & Workflow",
    techs: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
    ]
  },
  {
    title: "Performance & Quality",
    techs: [
      { name: "SEO Optimization", icon: SiGoogle },
      { name: "Web Performance", icon: SiSpeedtest },
    ]
  }
]


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal title
      gsap.from(".tech-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      });

      // Reveal cards
      gsap.from(".tech-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5c400]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#f5c400]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div ref={titleRef} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#f5c400]" />
            <span className="text-[#f5c400] font-mono text-sm tracking-[0.3em] uppercase">The Engine</span>
          </div>
          
          <h2 className="tech-title text-6xl md:text-8xl font-black text-white leading-none tracking-tighter overflow-hidden">
            <span className="inline-block">TECH</span> <br />
            <span className="inline-block text-[#f5c400]">STACK</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="tech-grid space-y-20">
          {categories.map((cat, idx) => (
            <div key={idx} className="tech-card border-t border-white/10 pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Category Label */}
                <div className="lg:col-span-3">
                  <h3 className="text-white/40 font-mono text-xs uppercase tracking-[0.5em] mb-4">
                    {cat.title}
                  </h3>
                </div>

                {/* Tech Badges */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {cat.techs.map((tech, tIdx) => (
                    <TechBadge key={tIdx} name={tech.name} icon={tech.icon} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Footer */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 font-medium max-w-sm">
            Always evolving with the latest industry standards to build 
            <span className="text-white italic"> performant </span> and 
            <span className="text-white"> scalable </span> digital products.
          </p>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 rounded-full border border-[#f5c400]/50 flex items-center justify-center relative cursor-help"
          >
            <div className="absolute inset-0 rounded-full border border-[#f5c400] animate-ping opacity-20" />
            <span className="text-[#f5c400] font-bold text-xs uppercase tracking-tighter">Stack</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;