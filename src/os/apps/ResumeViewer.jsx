import { profile } from "../profile.js";

const btn = { textDecoration: "none", fontSize: 15 };

const ResumeViewer = () => (
  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#c3c6ca" }}>
    <div style={{ display: "flex", gap: 8, padding: 6 }}>
      <a className="site-button" href={profile.resume} download={`${profile.name.replace(/\s+/g, "_")}_Resume.pdf`} style={btn}>
        Download
      </a>
      <a className="site-button" href={profile.resume} target="_blank" rel="noopener noreferrer" style={btn}>
        Open in new tab
      </a>
    </div>
    <iframe
      src={`${profile.resume}#view=FitH`}
      title={`${profile.name} resume`}
      style={{ flex: 1, border: 0, background: "#fff" }}
    />
  </div>
);

export default ResumeViewer;
