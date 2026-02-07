import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection = () => {
  const containerRef = useRef(null);
  
  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Manifesto lines
  const manifestoLines = [
    { text: "I DESIGN WITH ", emphasis: "INTENT", suffix: "." },
    { text: "I BUILD ", emphasis: "EXPERIENCES", suffix: ", NOT SCREENS." },
    { text: "MOTION IS NOT DECORATION. ", emphasis: "IT IS MEANING", suffix: "." },
    { text: "EVERY INTERACTION ", emphasis: "EARNS ITS PLACE", suffix: "." },
    { text: "PERFORMANCE IS A ", emphasis: "FEATURE", suffix: ", NOT AN AFTERTHOUGHT." },
    { text: "I CARE ABOUT ", emphasis: "DETAILS", suffix: " MOST PEOPLE MISS." },
    { text: "I SHIP WORK I'M ", emphasis: "PROUD", suffix: " TO PUT MY NAME ON." }
  ];

  // Calculate animations for each line based on scroll
  const getLineAnimations = (index) => {
    const total = manifestoLines.length;
    const segmentSize = 1 / total;
    const start = index * segmentSize;
    const end = (index + 1) * segmentSize;
    
    // Opacity animation
    const opacity = useTransform(
      scrollYProgress,
      [start - 0.1, start, end, end + 0.1],
      [0.15, 1, 1, 0.15]
    );
    
    // Subtle scale animation
    const scale = useTransform(
      scrollYProgress,
      [start - 0.05, start + 0.02, end - 0.02, end + 0.05],
      [0.98, 1, 1, 0.98]
    );
    
    // Subtle Y movement
    const y = useTransform(
      scrollYProgress,
      [start - 0.05, start + 0.02, end - 0.02, end + 0.05],
      [10, 0, 0, -10]
    );
    
    return { opacity, scale, y };
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-black text-white"
      style={{ height: '350vh' }}
    >
      {/* Sticky container for manifesto text */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 py-16 md:py-20 overflow-hidden">
        
        {/* All manifesto lines visible together */}
        <div className="relative w-full max-w-[1300px] space-y-4 md:space-y-5 lg:space-y-6">
          {manifestoLines.map((line, index) => {
            const { opacity, scale, y } = getLineAnimations(index);
            
            return (
              <motion.div
                key={index}
                style={{ 
                  opacity,
                  scale,
                  y
                }}
                className="relative will-change-transform"
              >
                <h2 
                  className="text-[clamp(1.25rem,2.8vw,2.5rem)] md:text-[clamp(1.5rem,3vw,2.75rem)] font-black leading-[1.25] tracking-[-0.02em]"
                  style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif' }}
                >
                  <span className="text-white/80">{line.text}</span>
                  <span className="text-[#FFD700]">{line.emphasis}</span>
                  <span className="text-white/80">{line.suffix}</span>
                </h2>
              </motion.div>
            );
          })}
        </div>

        {/* Minimal progress indicator */}
        <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 flex-col items-center space-y-3">
          {manifestoLines.map((_, index) => {
            const total = manifestoLines.length;
            const segmentSize = 1 / total;
            const start = index * segmentSize;
            const end = (index + 1) * segmentSize;
            
            const fillProgress = useTransform(
              scrollYProgress,
              [start, end],
              [0, 1]
            );
            
            const dotOpacity = useTransform(
              scrollYProgress,
              [start - 0.1, start, end, end + 0.1],
              [0.2, 1, 1, 0.2]
            );
            
            return (
              <motion.div
                key={index}
                style={{ opacity: dotOpacity }}
                className="w-1 h-8 bg-white/10 rounded-full overflow-hidden"
              >
                <motion.div 
                  style={{ 
                    scaleY: fillProgress
                  }}
                  className="w-full h-full bg-[#FFD700] origin-top"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Animated background glow on active section */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.3, 0.3, 0])
          }}
          className="absolute inset-0 bg-gradient-radial from-[#FFD700]/5 via-transparent to-transparent pointer-events-none"
        />

      </div>

      {/* Minimal accent line - top left */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-24 w-20 h-px bg-[#FFD700]/50" />
      
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      
    </section>
  );
};

export default AboutSection;
