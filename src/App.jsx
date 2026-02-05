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

const App = () => {
  return (
    <>
    <Cursor />
    <Sidebar />
    <div className="relative">
      <Hero />
      <div className="relative z-20">
        <Marquee />
        <About />
        <Experimental />
        <Skills />
        <Experience />
        <Projects />
        <MyServices />
        <Contact />
      </div>
    </div>
    </>
  )
}

export default App
