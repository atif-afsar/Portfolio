import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Experimental = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd400';
        ctx.fill();
      }
    }

    // Reduce particle count on mobile for performance
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    const particles = Array.from({ length: particleCount }, () => new Particle());

    let animationFrameId;
    const animate = () => {
      ctx.fillStyle = 'rgba(11, 11, 11, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      ctx.strokeStyle = '#ffd400';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.2;

      // Adjust connection distance for mobile
      const connectionDistance = window.innerWidth < 768 ? 100 : 150;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-4 md:px-6 w-full"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          // Responsive size for the icon container
          className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#ffd400] mb-6 md:mb-8"
        >
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[#0b0b0b]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // Fluid typography: smaller on mobile, 5xl/7xl on desktop
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-tight"
        >
          Innovation in
          <br />
          <span className="text-[#ffd400]">Every Detail</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          // Adjusted text size for mobile readability
          className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-xs md:max-w-2xl mx-auto"
        >
          Pushing boundaries with creative code and experimental design
        </motion.p>

        {/* Floating elements - Hidden or adjusted for mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              // Scale down floating squares on mobile so they don't cover text
              className="absolute w-8 h-8 md:w-16 md:h-16 border-2 border-[#ffd400] rounded-lg opacity-20 md:opacity-100"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 50}%`
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experimental;