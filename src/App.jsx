import React from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Cursor from './components/layout/Cursor'
import Sidebar from './components/layout/Sidebar'
import MyServices from './sections/MyServices'

const App = () => {
  return (
    <>
    <Cursor />
    <Sidebar />
    <div className="relative">
      <Hero />
      <div className="relative z-20">
        <About />
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
