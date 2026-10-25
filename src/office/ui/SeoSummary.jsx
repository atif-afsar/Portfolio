import { profile, work, education, projects, skillGroups } from "../../os/profile.js";

// The 3D office is a canvas and AtifOS only renders one page at a time, so
// this is the text equivalent of the whole portfolio: what screen readers
// announce and what search engines index on "/". It is visually hidden, not
// hidden from assistive tech, and mirrors exactly what the OS shows.
const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const SeoSummary = () => (
  <main style={srOnly}>
    <h1>
      {profile.name} – {profile.specialties.join(", ")}
    </h1>
    <p>{profile.summary}</p>
    <p>
      Based in {profile.location}. {profile.relocation}.
    </p>

    <h2>Experience</h2>
    {work.map((w) => (
      <section key={w.role + w.duration}>
        <h3>
          {w.role} – {w.company} ({w.duration})
        </h3>
        <ul>
          {w.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
    ))}

    <h2>Education</h2>
    <ul>
      {education.map((e) => (
        <li key={e.role}>
          {e.role}, {e.company} ({e.duration})
        </li>
      ))}
    </ul>

    <h2>Projects</h2>
    {projects.map((p) => (
      <section key={p.id}>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <p>Built with {p.tech.join(", ")}.</p>
        {p.liveLink && <a href={p.liveLink}>{p.title} live site</a>}{" "}
        {p.sourceCode && <a href={p.sourceCode}>{p.title} source</a>}
      </section>
    ))}

    <h2>Skills</h2>
    {skillGroups.map((g) => (
      <p key={g.title}>
        {g.title}: {g.items.join(", ")}
      </p>
    ))}

    <h2>Contact</h2>
    <ul>
      <li>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </li>
      <li>
        <a href={profile.links.github}>GitHub</a>
      </li>
      <li>
        <a href={profile.links.linkedin}>LinkedIn</a>
      </li>
      <li>Phone / WhatsApp: {profile.phone}</li>
      <li>
        <a href={profile.resume}>Resume (PDF)</a>
      </li>
    </ul>
  </main>
);

export default SeoSummary;
