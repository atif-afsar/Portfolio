import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        if (onComplete) onComplete();
      }
    });

    // Split text into characters for animation
    const chars = textRef.current.querySelectorAll('.char');
    
    // Optimized timeline - reduced from ~4.5s to ~2.5s
    tl.to({}, { duration: 0.15 }) // Reduced initial pause
      
      // Animate characters in sequence with stagger (faster)
      .fromTo(chars, 
        {
          opacity: 0,
          y: 30,
          rotationX: -60
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.5)"
        }
      )
      
      // Scale and glow effect (faster)
      .to(textRef.current, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      
      // Fade in subtext (faster)
      .fromTo(subtextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      )
      
      .to({}, { duration: 0.2 }) // Reduced hold time
      
      // Exit animation - slide up (faster)
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: "expo.inOut"
      })
      
      .to([textRef.current, subtextRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in"
      }, "-=0.5");

    return () => {
      tl.kill();
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  // Split text into individual characters
  const renderText = (text) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="char inline-block"
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FFD400]"
    >
      <div className="relative flex flex-col items-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6">
        {/* Main Text */}
        <h1 
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#0A0A0A] tracking-tight leading-tight"
          style={{ perspective: '1000px' }}
        >
          {renderText('I Am A Developer')}
        </h1>
        
        {/* Subtext */}
        <div 
          ref={subtextRef}
          className="flex items-center gap-2 sm:gap-3 opacity-0"
        >
          <div className="w-6 sm:w-8 md:w-12 h-[1.5px] sm:h-[2px] bg-[#0A0A0A]/40"></div>
          <span className="text-[9px] sm:text-xs md:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-[#0A0A0A]/60 uppercase whitespace-nowrap">
            Atif Afsar
          </span>
          <div className="w-6 sm:w-8 md:w-12 h-[1.5px] sm:h-[2px] bg-[#0A0A0A]/40"></div>
        </div>
      </div>

      {/* Bottom corner text */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8">
        <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] text-[#0A0A0A] uppercase opacity-40">
          System.Init
        </span>
      </div>
    </div>
  );
};

export default Loader;