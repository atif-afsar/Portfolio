import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MarqueeText = ({ items, speed = 25, className = '', textClassName = '' }) => {
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const marquee = marqueeRef.current;
    
    // Clone items for seamless loop
    const clone = content.cloneNode(true);
    marquee.appendChild(clone);

    const totalWidth = content.offsetWidth;
    
    // Create animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(marquee, {
      x: -totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, [speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        <div ref={contentRef} className="flex">
          {items.map((item, index) => (
            <span key={index} className={textClassName}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;
