import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = ({ onLoadingComplete }) => {
  const [showText, setShowText] = useState(false)
  const [exitLoader, setExitLoader] = useState(false)

  useEffect(() => {
    // Disable scrolling while loader is active
    document.body.style.overflow = 'hidden'

    // Show text after stripes cover screen
    const textTimer = setTimeout(() => setShowText(true), 900)
    
    // Start exit animation
    const exitTimer = setTimeout(() => {
      setShowText(false)
      setTimeout(() => setExitLoader(true), 200)
    }, 1800)
    
    // Complete loading and re-enable scrolling
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = 'auto'
      onLoadingComplete()
    }, 2500)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
      document.body.style.overflow = 'auto'
    }
  }, [onLoadingComplete])

  // Create 8 vertical stripes
  const stripes = Array.from({ length: 8 })

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      {/* Vertical Yellow Stripes */}
      {stripes.map((_, index) => (
        <motion.div
          key={index}
          className="absolute top-0 bottom-0 bg-yellow-400"
          style={{
            left: `${(index * 100) / stripes.length}%`,
            width: `${100 / stripes.length}%`,
          }}
          initial={{ y: '100%' }}
          animate={{
            y: exitLoader ? '-100%' : '0%'
          }}
          transition={{
            duration: 0.7,
            delay: exitLoader ? index * 0.04 : index * 0.05,
            ease: [0.65, 0, 0.35, 1]
          }}
        />
      ))}

      {/* Center Text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10 px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.65, 0, 0.35, 1]
            }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tight text-center leading-none">
              Atif Afsar
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Loader
