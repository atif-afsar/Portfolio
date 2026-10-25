import Icon from "../icons.jsx";
import { profile } from "../profile.js";

// Big "download my resume" button.
const ResumeBox = () => (
  <div style={{ marginBottom: 32 }}>
    <a
      className="big-button"
      href={profile.resume}
      download={`${profile.name.replace(/\s+/g, "_")}_Resume.pdf`}
      style={{ textDecoration: "none" }}
    >
      <Icon name="document" style={{ width: 48, height: 48, flexShrink: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3>Looking for my resume?</h3>
        <p>Click here to download it!</p>
      </div>
    </a>
  </div>
);

export default ResumeBox;
