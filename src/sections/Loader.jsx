import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        if (onComplete) onComplete();
      }
    });

    const pathLength = pathRef.current.getTotalLength();

    // Prepare the path for the drawing animation
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 1
    });

    tl.to({}, { duration: 0.5 }) // Initial pause
      // The "Writing" animation
      .to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2.2, // Slightly slower for readability
        ease: "power2.inOut"
      })
      // Cinematic scale and glow
      .to(svgRef.current, {
        scale: 1.08,
        filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))",
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to({}, { duration: 0.6 }) // Hold
      // Slide reveal
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
      })
      .to(svgRef.current, {
        opacity: 0,
        y: -60,
        duration: 0.8,
        ease: "power2.in"
      }, "-=1.1");

    return () => {
      tl.kill();
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FFD400]"
    >
      <div className="relative w-full max-w-[350px] md:max-w-[550px] px-10">
        <svg 
          ref={svgRef}
          viewBox="0 0 500 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          {/* Handwritten Cursive "Atif" Path */}
          <path
            ref={pathRef}
            d="M71,135 C71,135 94,36 110,36 C126,36 108,135 108,135 M85,90 L135,90 M170,135 L170,75 M155,75 L185,75 M210,135 L210,85 M210,65 L212,65 M240,135 L240,75 C240,75 240,55 260,55 C280,55 275,75 275,75 L275,135 M255,95 L295,95"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <title>Atif</title>
        </svg>
      </div>

      <div className="absolute bottom-10 left-10 overflow-hidden">
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-black tracking-[0.4em] text-[#0A0A0A] uppercase opacity-60">
                System.Auth / Atif Afsar
            </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;