import { useEffect, useState } from "react";

const LINES = [
  "Saving your settings...",
  "Closing Showcase ............ OK",
  "Parking hard drive heads .... OK",
  "",
  "It's now safe to turn off your computer.",
  "",
  "...just kidding. Rebooting AtifOS",
];

// DOS-style shutdown screen that types itself out, then reboots the desktop.
const ShutdownSequence = ({ onReboot }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const full = LINES.join("\n");
    let i = 0;
    let timer;
    const tick = () => {
      i++;
      setText(full.slice(0, i));
      if (i < full.length) {
        // pause a little longer at line ends
        timer = setTimeout(tick, full[i - 1] === "\n" ? 400 : 35);
      } else {
        timer = setTimeout(onReboot, 2200);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [onReboot]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#1d2e2f",
        color: "#fff",
        padding: 48,
        fontFamily: "var(--font-terminal)",
        fontSize: 28,
        lineHeight: 1.2,
        whiteSpace: "pre-wrap",
      }}
      role="status"
    >
      {text}
      <span className="blinking-cursor" />
    </div>
  );
};

export default ShutdownSequence;
