import { Navigate, useParams } from "react-router-dom";
import { projectCategories, projectImage, hostname } from "../profile.js";

const ext = { target: "_blank", rel: "noopener noreferrer" };

const ProjectEntry = ({ project, index }) => {
  const img = projectImage(project);
  const source = project.sourceCode;
  const sourceIsRepo = source && hostname(source) === "github.com";
  return (
    <section
      style={
        project.featured
          ? { marginBottom: 32, padding: 16, border: "3px double #0000a3", background: "#fffff0" }
          : { marginBottom: 24 }
      }
    >
      {project.featured && <p className="featured-badge">★ FEATURED PROJECT</p>}
      <div className="header-row">
        <h2>{project.title}</h2>
        {project.liveLink && (
          <a href={project.liveLink} {...ext}>
            <h4>{hostname(project.liveLink)}</h4>
          </a>
        )}
      </div>
      <p className="tech-line" style={{ marginTop: 4 }}>
        {project.tech.join(" · ")}
      </p>
      <div className="text-block">
        <p>{project.description}</p>
      </div>
      {img && (
        <figure className="captioned-image" style={{ margin: "0 0 16px" }}>
          <img src={img} alt={`Screenshot of ${project.title}`} loading="lazy" width="1200" height="548" />
          <p>
            <sub>
              <b>Figure {index + 1}:</b> {project.title}
            </sub>
          </p>
        </figure>
      )}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
        {project.liveLink && (
          <a className="site-button" href={project.liveLink} {...ext} style={{ textDecoration: "none" }}>
            Visit live site
          </a>
        )}
        {source && (
          <a className="site-button" href={source} {...ext} style={{ textDecoration: "none" }}>
            {sourceIsRepo ? "View source code" : "View project"}
          </a>
        )}
      </div>
    </section>
  );
};

const ProjectCategory = () => {
  const { slug } = useParams();
  const category = projectCategories.find((c) => c.slug === slug);
  if (!category) return <Navigate to="/projects" replace />;

  return (
    <article>
      <h1>{category.title}</h1>
      <h3>{category.subtitle}</h3>
      <br />
      <p>{category.blurb}</p>
      <br />
      {category.projects.map((p, i) => (
        <ProjectEntry key={p.id} project={p} index={i} />
      ))}
    </article>
  );
};

export default ProjectCategory;
