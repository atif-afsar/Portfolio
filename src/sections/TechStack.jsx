import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiGreensock, SiFramer, SiSimpleicons,
  SiNodedotjs, SiExpress, SiPostman,
  SiMongodb, SiSupabase, SiFirebase,
  SiVercel, SiNetlify, SiDocker,
  SiGit, SiGithub,
  SiGoogle, SiSpeedtest
} from 'react-icons/si';

/* ============================================================
   RESPONSIVE TECH STACK CONFIG
   - Dynamic coordinates: Desktop (Absolute) vs Mobile (Grid)
   ============================================================ */

const ALL_TECHS = [
  { name: "Next.js", icon: SiNextdotjs, x: "8%", y: "15%", delay: 0 },
  { name: "React", icon: SiReact, x: "15%", y: "35%", delay: 0.05 },
  { name: "TypeScript", icon: SiTypescript, x: "22%", y: "55%", delay: 0.1 },
  { name: "JavaScript", icon: SiJavascript, x: "12%", y: "75%", delay: 0.15 },
  { name: "HTML5", icon: SiHtml5, x: "78%", y: "20%", delay: 0.2 },
  { name: "CSS3", icon: SiCss3, x: "85%", y: "40%", delay: 0.25 },
  { name: "Tailwind", icon: SiTailwindcss, x: "88%", y: "65%", delay: 0.3 },
  { name: "GSAP", icon: SiGreensock, x: "5%", y: "45%", delay: 0.35 },
  { name: "Framer", icon: SiFramer, x: "92%", y: "50%", delay: 0.4 },
  { name: "Lenis", icon: SiSimpleicons, x: "50%", y: "8%", delay: 0.45 },
  { name: "Node.js", icon: SiNodedotjs, x: "32%", y: "22%", delay: 0.5 },
  { name: "Express", icon: SiExpress, x: "68%", y: "28%", delay: 0.55 },
  { name: "REST API", icon: SiPostman, x: "42%", y: "75%", delay: 0.6 },
  { name: "MongoDB", icon: SiMongodb, x: "28%", y: "85%", delay: 0.65 },
  { name: "Supabase", icon: SiSupabase, x: "72%", y: "80%", delay: 0.7 },
  { name: "Firebase", icon: SiFirebase, x: "58%", y: "15%", delay: 0.75 },
  { name: "Vercel", icon: SiVercel, x: "18%", y: "60%", delay: 0.8 },
  { name: "Netlify", icon: SiNetlify, x: "82%", y: "88%", delay: 0.85 },
  { name: "Docker", icon: SiDocker, x: "45%", y: "50%", delay: 0.9 },
  { name: "Git", icon: SiGit, x: "10%", y: "25%", delay: 0.95 },
  { name: "GitHub", icon: SiGithub, x: "90%", y: "12%", delay: 1.0 },
  { name: "SEO", icon: SiGoogle, x: "58%", y: "85%", delay: 1.05 },
  { name: "Performance", icon: SiSpeedtest, x: "38%", y: "42%", delay: 1.1 }
];

const FloatingTechIcon = ({ tech, index, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const Icon = tech.icon;

  const animationDuration = useMemo(() => 5 + (index % 3), [index]);
  const floatY = useMemo(() => Math.sin(index) * 15, [index]);

  return (
    <motion.div
      className={isMobile ? "relative" : "absolute"}
      style={!isMobile ? { left: tech.x, top: tech.y } : {}}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      animate={!isMobile && !prefersReducedMotion ? {
        y: [0, floatY, 0],
      } : {}}
      transition={{ 
        scale: { duration: 0.4, delay: isMobile ? index * 0.05 : tech.delay },
        y: { duration: animationDuration, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group"
      >
        <motion.div
          whileHover={{ scale: 1.1, y: -5 }}
          className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl cursor-pointer transition-all duration-500 border-2 ${
            isHovered 
            ? 'bg-[#FFD400]/20 border-[#FFD400] shadow-[0_0_30px_rgba(255,212,0,0.3)]' 
            : 'bg-white/5 border-white/10 backdrop-blur-md'
          }`}
        >
          <Icon size={24} className={isHovered ? 'text-[#FFD400]' : 'text-white/50'} />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FFD400] text-black text-[10px] font-black uppercase tracking-tighter rounded z-50 pointer-events-none"
            >
              {tech.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function TechStackSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden py-20 flex flex-col items-center justify-center">
      
      {/* Background UI elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FFD400] opacity-[0.03] blur-[150px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#FFD400 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-30 pointer-events-none">
        <div className="text-center max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#FFD400] text-[10px] md:text-xs font-black tracking-[0.5em] uppercase border border-[#FFD400]/30 px-4 py-2 rounded-full inline-block mb-8"
          >
            Technical Arsenal
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-6"
          >
            TECH I <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>MASTER</span>
          </motion.h1>

          <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto font-medium leading-relaxed mb-12">
            A curated selection of technologies I use to build world-class digital products. 
            Focused on performance, scalability, and user experience.
          </p>

          <div className="flex justify-center gap-8 md:gap-16">
            {[
              { label: 'Tech Stack', value: '23+' },
              { label: 'Experience', value: '2Y+' },
              { label: 'Performance', value: '99' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-4xl font-black text-[#FFD400]">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Icon Container */}
      {isMobile ? (
        /* MOBILE GRID: structured and clean */
        <div className="container mx-auto px-6 mt-16 z-40">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center text-white/50 text-xs md:text-sm font-medium mb-8 tracking-wide"
          >
            Tap icons to see tech names
          </motion.p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 md:gap-6 justify-items-center">
            {ALL_TECHS.map((tech, index) => (
              <FloatingTechIcon key={tech.name} tech={tech} index={index} isMobile={true} />
            ))}
          </div>
        </div>
      ) : (
        /* DESKTOP FLOATING: Premium scattered look */
        <div className="absolute inset-0 z-10">
          {ALL_TECHS.map((tech, index) => (
            <FloatingTechIcon key={tech.name} tech={tech} index={index} isMobile={false} />
          ))}
        </div>
      )}

      {/* Footer Visual */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-20 hidden lg:block">
        <div className="text-[10px] text-white tracking-[0.3em] uppercase mb-4">Interactive Environment</div>
        <div className="w-px h-16 bg-gradient-to-b from-[#FFD400] to-transparent mx-auto" />
      </div>
    </section>
  );
}