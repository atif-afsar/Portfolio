import { useNavigate } from "react-router-dom";
import { projectCategories, projectImage, projects, hostname } from "../profile.js";

const CategoryBox = ({ category }) => {
  const navigate = useNavigate();
  const cover = projectImage(category.projects.find((p) => p.image) || {});
  return (
    <button className="big-button" onClick={() => navigate(`/projects/${category.slug}`)}>
      {cover && (
        <img
          src={cover}
          alt=""
          width="160"
          height="73"
          style={{ width: 160, height: "auto", border: "1px solid #000", flexShrink: 0 }}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h1 style={{ fontSize: 48 }}>{category.title}</h1>
        <h3>{category.subtitle}</h3>
        <p style={{ fontSize: 16 }}>
          {category.projects.length} projects · {category.blurb}
        </p>
      </div>
    </button>
  );
};

const featured = projects.find((p) => p.featured);

// Highlighted card for the featured project, above the category boxes.
const FeaturedBox = ({ project }) => {
  const navigate = useNavigate();
  const slug = projectCategories.find((c) => c.projects.includes(project))?.slug;
  return (
    <div
      style={{ border: "3px double #0000a3", background: "#fffff0", padding: 16, marginBottom: 24 }}
    >
      <p className="featured-badge">★ FEATURED PROJECT</p>
      <button
        className="big-button"
        onClick={() => navigate(`/projects/${slug}`)}
        style={{ flexWrap: "wrap", background: "#fff" }}
      >
        <img
          src={projectImage(project)}
          alt={`Screenshot of ${project.title}`}
          width="280"
          height="128"
          style={{ width: 280, maxWidth: "100%", height: "auto", border: "1px solid #000", flexShrink: 0 }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: "1 1 240px" }}>
          <h2 style={{ fontSize: 28 }}>{project.title}</h2>
          <p style={{ fontSize: 16 }}>{project.description}</p>
        </div>
      </button>
      {project.liveLink && (
        <p style={{ marginTop: 10, fontSize: 16 }}>
          Live at{" "}
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            {hostname(project.liveLink)}
          </a>
        </p>
      )}
    </div>
  );
};

const Projects = () => (
  <article>
    <h1>Projects</h1>
    <h3>&amp; Things I&apos;ve Shipped</h3>
    <br />
    <p>
      Click on one of the areas below to check out my work. Client projects are live in production for real
      businesses, the AI &amp; interactive media projects are where I experiment with LLMs and computer vision, and
      the internship builds are where it started. Every project links to its live site and/or source code. Enjoy!
    </p>
    <br />
    {featured && <FeaturedBox project={featured} />}
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {projectCategories.map((c) => (
        <CategoryBox key={c.slug} category={c} />
      ))}
    </div>
  </article>
);

export default Projects;
