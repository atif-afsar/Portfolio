import { useLocation } from "react-router-dom";
import NavLink from "./NavLink.jsx";
import { profile, projectCategories } from "../profile.js";

const NavBar = () => {
  const { pathname } = useLocation();
  const inProjects = pathname.startsWith("/projects");
  const yy = String(new Date().getFullYear()).slice(2);

  return (
    <nav className="showcase-nav" aria-label="Showcase">
      <div className="showcase-nav-name">
        <p>{profile.firstName}</p>
        <p>{profile.lastName}</p>
        <h3>Showcase &apos;{yy}</h3>
      </div>
      <div className="showcase-nav-links">
        <NavLink to="/" text="HOME" />
        <NavLink to="/about" text="ABOUT" />
        <NavLink to="/experience" text="EXPERIENCE" />
        <NavLink to="/projects" text="PROJECTS" />
        {inProjects && (
          <div className="showcase-nav-sub">
            {projectCategories.map((c) => (
              <NavLink key={c.slug} to={`/projects/${c.slug}`} text={`${c.title} ${c.subtitle}`.toUpperCase()} />
            ))}
          </div>
        )}
        <NavLink to="/contact" text="CONTACT" />
      </div>
    </nav>
  );
};

export default NavBar;
