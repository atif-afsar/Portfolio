import React from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import CaseStudies from './sections/CaseStudy'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Cursor from './components/layout/Cursor'

const App = () => {
  return (
    <>
    <Cursor />
    <div className="relative">
      <Hero />
      <div className="relative z-20">
        <About />
        <Skills />
        <Projects />
        <CaseStudies />
        <Experience />
        <Contact />
      </div>
    </div>
    </>
  )
}

export default App
