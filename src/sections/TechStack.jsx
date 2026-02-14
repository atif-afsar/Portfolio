import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiGreensock, SiFramer, SiSimpleicons,
  SiNodedotjs, SiExpress, SiPostman,
  SiMongodb, SiSupabase, SiFirebase,
  SiVercel, SiNetlify, SiDocker,
  SiGit, SiGithub,
  SiGoogle, SiSpeedtest
} from 'react-icons/si';

// All techs with floating positions
const ALL_TECHS = [
  { name: "Next.js", icon: SiNextdotjs, x: "8%", y: "15%" },
  { name: "React", icon: SiReact, x: "15%", y: "35%" },
  { name: "TypeScript", icon: SiTypescript, x: "22%", y: "55%" },
  { name: "JavaScript (ES6+)", icon: SiJavascript, x: "12%", y: "75%" },
  { name: "HTML5", icon: SiHtml5, x: "78%", y: "20%" },
  { name: "CSS3", icon: SiCss3, x: "85%", y: "40%" },
  { name: "Tailwind CSS", icon: SiTailwindcss, x: "88%", y: "65%" },
  { name: "GSAP", icon: SiGreensock, x: "5%", y: "45%" },
  { name: "Framer Motion", icon: SiFramer, x: "92%", y: "50%" },
  { name: "Lenis", icon: SiSimpleicons, x: "50%", y: "10%" },
  { name: "Node.js", icon: SiNodedotjs, x: "35%", y: "25%" },
  { name: "Express.js", icon: SiExpress, x: "65%", y: "30%" },
  { name: "REST APIs", icon: SiPostman, x: "42%", y: "70%" },
  { name: "MongoDB", icon: SiMongodb, x: "28%", y: "85%" },
  { name: "Supabase", icon: SiSupabase, x: "72%", y: "75%" },
  { name: "Firebase", icon: SiFirebase, x: "58%", y: "15%" },
  { name: "Vercel", icon: SiVercel, x: "18%", y: "60%" },
  { name: "Netlify", icon: SiNetlify, x: "82%", y: "85%" },
  { name: "Docker", icon: SiDocker, x: "45%", y: "50%" },
  { name: "Git", icon: SiGit, x: "10%", y: "25%" },
  { name: "GitHub", icon: SiGithub, x: "90%", y: "10%" },
  { name: "SEO Optimization", icon: SiGoogle, x: "55%", y: "80%" },
  { name: "Web Performance", icon: SiSpeedtest, x: "38%", y: "40%" }
];

const FloatingTechIcon = ({ tech, index }) => {
  const iconRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tech.icon;

  useEffect(() => {
    if (!iconRef.current) return;

    // Premium floating animation
    gsap.to(iconRef.current, {
      y: Math.sin(index) * 30,
      x: Math.cos(index) * 30,
      duration: 5 + (index % 3),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [index]);

  return (
    <div
      ref={iconRef}
      className="absolute"
      style={{ left: tech.x, top: tech.y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        whileHover={{ scale: 1.2 }}
        className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer transition-all duration-300 relative ${
          isHovered
            ? 'bg-[#FFD400]/25 shadow-[0_0_40px_rgba(255,212,0,0.7)]'
            : 'bg-white/8 backdrop-blur-sm'
        }`}
      >
        {/* Static Ring Effect */}
        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
          isHovered
            ? 'border-[#FFD400] shadow-[inset_0_0_20px_rgba(255,212,0,0.3)]'
            : 'border-[#FFD400]/30'
        }`} />
        
        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-transparent border-t-[#FFD400] border-r-[#FFD400]/50"
        />

        {/* Icon with rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + (index % 4), repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          <Icon
            size={32}
            className={`transition-colors duration-300 ${
              isHovered ? 'text-[#FFD400]' : 'text-white/80'
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0A0A0A]/90 border border-[#FFD400]/40 rounded-lg whitespace-nowrap pointer-events-none z-50"
          >
            <p className="text-white text-xs font-medium">{tech.name}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TechStackSection() {
  return (
    <section className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center selection:bg-[#FFD400] selection:text-black font-sans">
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.08, 0.04]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#FFD400] rounded-full blur-[150px]"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{ 
              duration: 10 + Math.random() * 5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            className="absolute w-1 h-1 bg-[#FFD400] rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-auto">
        {ALL_TECHS.map((tech, index) => (
          <FloatingTechIcon key={index} tech={tech} index={index} />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-20 text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[#FFD400] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Technical Stack
          </h2>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-6">
            TECH I <span className="text-transparent" style={{ WebkitTextStroke: '1px #FFD400' }}>BREATHE</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Crafting immersive digital experiences through high-performance code and fluid motion design.
          </p>
        </motion.div>
      </div>

      {/* Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
