import { useState, useEffect } from 'react'
import About from './sections/About'
import Hero from './sections/Hero'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Cursor from './components/layout/Cursor'
import Sidebar from './components/layout/Sidebar'
import MyServices from './sections/MyServices'
import Marquee from './sections/Marquee'
import Experimental from './sections/Experimental'
import Loader from './sections/Loader'
import TechStack from './sections/TechStack'


const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset loading state on page refresh
    setIsLoading(true)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <>
    <Cursor />
    <Sidebar />
    <div className="relative">
      <Hero />
      <div className="relative z-20">
        <Marquee />
        <About />
        <Skills />
       <TechStack />
        <Experience />
        <Projects />
        <MyServices />
        <Experimental />

        <Contact />
      </div>
    </div>
    </>
  )
}

export default App
