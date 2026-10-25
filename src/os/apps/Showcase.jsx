import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "../showcase/NavBar.jsx";
import Home from "../showcase/Home.jsx";
import About from "../showcase/About.jsx";
import Experience from "../showcase/Experience.jsx";
import Projects from "../showcase/Projects.jsx";
import ProjectCategory from "../showcase/ProjectCategory.jsx";
import Contact from "../showcase/Contact.jsx";

// The Showcase "website" inside its window. MemoryRouter keeps navigation
// inside the window instead of touching the page URL.
const Pages = ({ openApp }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <div className="showcase">
      {!isHome && <NavBar />}
      {/* keyed by path so each page starts scrolled to the top */}
      <div key={pathname} className="showcase-page" style={isHome ? { padding: 0 } : undefined}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectCategory />} />
          <Route path="/contact" element={<Contact openApp={openApp} />} />
        </Routes>
      </div>
    </div>
  );
};

const Showcase = ({ openApp }) => (
  <MemoryRouter>
    <Pages openApp={openApp} />
  </MemoryRouter>
);

export default Showcase;
