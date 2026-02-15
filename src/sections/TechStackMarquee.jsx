import { motion } from 'framer-motion';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiGreensock, SiFramer,
  SiNodedotjs, SiExpress, SiPostman,
  SiMongodb, SiSupabase, SiFirebase,
  SiVercel, SiNetlify, SiDocker,
  SiGit, SiGithub
} from 'react-icons/si';

const TECH_STACK = [
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34C26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "REST APIs", icon: SiPostman, color: "#FF6C37" },
  { name: "MongoDB", icon: SiMongodb, color: "#13AA52" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F1502F" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
];

const TechStackMarquee = () => {
  // Duplicate the array for seamless loop
  const duplicatedStack = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#0A0A0A] to-black py-16 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD400] to-transparent" />
      
      {/* Section label */}
      <div className="relative z-10 text-center mb-12 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#FFD400] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-2"
        >
          Technology Arsenal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-4xl font-black text-white tracking-tight"
        >
          Tools & Technologies
        </motion.h2>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* Marquee track */}
        <motion.div
          className="flex gap-8 md:gap-12 py-8"
          animate={{ x: [0, -1920] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon container */}
                <div className="relative">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-[#FFD400]/50 transition-all duration-300"
                    whileHover={{
                      backgroundColor: "rgba(255, 212, 0, 0.1)",
                      boxShadow: "0 0 30px rgba(255, 212, 0, 0.3)",
                    }}
                  >
                    <Icon
                      size={32}
                      className="text-white/70 group-hover:text-[#FFD400] transition-colors duration-300"
                      style={{ color: tech.color }}
                    />
                  </motion.div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FFD400]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                  />
                </div>

                {/* Tech name */}
                <motion.p
                  className="text-xs md:text-sm font-semibold text-white/60 group-hover:text-[#FFD400] transition-colors duration-300 text-center whitespace-nowrap"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                >
                  {tech.name}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD400] to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-[#FFD400] blur-[100px]"
        />
      </div>
    </section>
  );
};

export default TechStackMarquee;
