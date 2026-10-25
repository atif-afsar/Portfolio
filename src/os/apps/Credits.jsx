import { profile } from "../profile.js";

const ext = { target: "_blank", rel: "noopener noreferrer" };

const Row = ({ title, children }) => (
  <section style={{ marginBottom: 24 }}>
    <h4 style={{ marginBottom: 4 }}>{title}</h4>
    {children}
  </section>
);

const Credits = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      overflowY: "auto",
      background: "#000",
      color: "#fff",
      padding: "32px 24px",
      textAlign: "center",
    }}
  >
    <h2 style={{ marginBottom: 32 }}>Credits</h2>
    <Row title="Design & Development">
      <p>{profile.name}</p>
    </Row>
    <Row title="Inspiration">
      <p>
        Heavily inspired by{" "}
        <a href="https://henryheffernan.com" {...ext} style={{ color: "#8cf" }}>
          Henry Heffernan&apos;s portfolio
        </a>
        .
      </p>
    </Row>
    <Row title="3D Office, Baked Lighting & Sound Effects">
      <p>
        © 2024 Henry Heffernan, used under the{" "}
        <a href="/office/REFERENCE_LICENSE.md" {...ext} style={{ color: "#8cf" }}>
          MIT License
        </a>
        .
      </p>
    </Row>
    <Row title="Built With">
      <p>React · Three.js · Vite · tween.js</p>
    </Row>
    <Row title="Fonts">
      <p>DM Serif Display · Tinos · VT323 (Google Fonts, SIL Open Font License)</p>
    </Row>
    <p style={{ marginTop: 32, color: "#aaa" }}>Thanks for stopping by!</p>
  </div>
);

export default Credits;
