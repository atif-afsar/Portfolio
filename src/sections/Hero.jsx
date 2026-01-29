import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const Hero = () => {
  // mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // transform values for subtle movement
  const x = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const y = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      
      {/* System Label */}
      <div className="absolute top-10 left-10 text-xs tracking-widest text-yellow-400">
        CREATIVE SYSTEM — ONLINE
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">

        {/* Interactive Shape */}
        <motion.div
          style={{ x, y }}
          className="w-48 h-48 md:w-72 md:h-72 bg-yellow-400"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-lg md:text-xl text-white/80 max-w-xl"
        >
          crafting interactive <br />
          <span className="text-white">full-stack experiences</span>
        </motion.p>

      </div>

      {/* Accent Line */}
      <div className="absolute bottom-10 right-10 w-24 h-[2px] bg-yellow-400" />
    </section>
  );
};

export default Hero;
