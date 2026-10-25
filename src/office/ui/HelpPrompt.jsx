import { useEffect, useRef, useState } from "react";
import bus from "../../three/EventBus.js";

const HELP_TEXT = "Click anywhere to begin";

// Centred "Click anywhere to begin" prompt with a blinking cursor (port of the
// reference's HelpPrompt). Types itself with the typing SFX, then fades and
// drops away on the first click or when the monitor is entered.
const HelpPrompt = () => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(true);
  const visibleRef = useRef(true);

  useEffect(() => {
    let timer;
    const type = (i) => {
      if (i >= HELP_TEXT.length || !visibleRef.current) return;
      timer = setTimeout(() => {
        window.postMessage({ type: "keydown", key: `_AUTO_${HELP_TEXT[i]}` }, window.location.origin);
        setText(HELP_TEXT.slice(0, i + 1));
        type(i + 1);
      }, Math.random() * 120 + 50);
    };
    const start = setTimeout(() => type(0), 500);

    const hide = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    document.addEventListener("mousedown", hide);
    const offMonitor = bus.on("enterMonitor", hide);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
      document.removeEventListener("mousedown", hide);
      offMonitor();
    };
  }, []);

  if (!text) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 64,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          background: "black",
          padding: "4px 16px",
          color: "#fff",
          font: "16px monospace",
          letterSpacing: 0.8,
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 12}px)`,
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <p style={{ margin: 0 }}>{text}</p>
        <span className="bios-cursor" style={{ marginLeft: 8, marginBottom: 4 }} />
      </div>
    </div>
  );
};

export default HelpPrompt;
