import NavLink from "./NavLink.jsx";
import { profile, work } from "../profile.js";

const current = work[0];

const Home = () => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "48px 16px",
    }}
  >
    <h1 style={{ fontSize: "clamp(48px, 9vw, 80px)", marginBottom: 16, lineHeight: 0.9 }}>{profile.name}</h1>
    <h2>{profile.role}</h2>
    <p style={{ marginTop: 12, fontSize: 17, color: "#333" }}>
      {profile.specialties.slice(1).join("  ·  ")}
    </p>

    <nav
      aria-label="Showcase"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 32px", marginTop: 56 }}
    >
      <NavLink to="/about" text="ABOUT" style={{ padding: 8 }} />
      <NavLink to="/experience" text="EXPERIENCE" style={{ padding: 8 }} />
      <NavLink to="/projects" text="PROJECTS" style={{ padding: 8 }} />
      <NavLink to="/contact" text="CONTACT" style={{ padding: 8 }} />
    </nav>

    {current && (
      <p style={{ marginTop: 56, fontSize: 16, color: "#444" }}>
        Currently: {current.role.replace(/\s*\(.*\)/, "")} @ {current.company.split("|")[0].trim()} ·{" "}
        {profile.location}
        <br />
        <b>Open to relocation</b>
      </p>
    )}
  </div>
);

export default Home;
