import { motion } from 'framer-motion';

const MarqueeText = ({ 
  items = [], 
  speed = 20, 
  direction = 'left',
  className = '',
  textClassName = '',
  separator = '•',
  backgroundColor = 'bg-black',
  textColor = 'text-white'
}) => {
  const content = items.join(` ${separator} `);
  
  return (
    <div className={`relative flex overflow-hidden ${backgroundColor} ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ 
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] 
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* First set */}
        <span className={`${textColor} ${textClassName}`}>
          {content} {separator} {content} {separator}
        </span>
        {/* Second set for seamless loop */}
        <span className={`${textColor} ${textClassName}`}>
          {content} {separator} {content} {separator}
        </span>
      </motion.div>
      
      {/* Gradient Overlays */}
      <div className={`absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-current to-transparent z-10 ${backgroundColor.replace('bg-', 'from-')}`} />
      <div className={`absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-current to-transparent z-10 ${backgroundColor.replace('bg-', 'from-')}`} />
    </div>
  );
};

export default MarqueeText;