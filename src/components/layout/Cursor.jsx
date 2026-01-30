import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs
  const cursorX = useSpring(mouseX, { stiffness: 600, damping: 40 });
  const cursorY = useSpring(mouseY, { stiffness: 600, damping: 40 });

  const shadowX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const shadowY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Shadow */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-black/40 pointer-events-none z-[9998]"
        style={{
          translateX: shadowX,
          translateY: shadowY,
        }}
      />

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-yellow-400 pointer-events-none z-[9999]"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
      />
    </>
  );
};

export default Cursor;
