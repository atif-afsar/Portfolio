import { useState } from 'react';
import MarqueeText from '../components/ui/MarqueeText';

const Marquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  const services = [
    "✦ UI/UX Design ✦",
    "★ Brand Identity ★", 
    "◆ Code Customization ◆",
    "● Website Design & Development ●"
  ];

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient borders */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 opacity-50" />
      
      <MarqueeText 
        items={services}
        speed={isPaused ? 0 : 25}
        className="py-6 relative z-10"
        textClassName="text-xl md:text-3xl font-bold uppercase tracking-wider px-6 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-500"
      />
      
      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute top-2 right-4 text-xs text-gray-400 uppercase tracking-widest animate-pulse">
          Paused
        </div>
      )}
    </div>
  );
};

export default Marquee;