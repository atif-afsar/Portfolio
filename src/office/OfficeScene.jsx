import { useEffect, useRef, useState } from "react";
import OfficeEngine, { bus } from "../three/OfficeEngine.js";

// React 19 StrictMode mounts effects twice in dev. Guard with a ref so only
// one OfficeEngine instance (and one canvas) ever exists.
const OfficeScene = () => {
  const glRef = useRef(null);
  const cssRef = useRef(null);
  const overlayRef = useRef(null);
  const engineRef = useRef(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    // Feature-detect WebGL up front (mobile/low-end fallback hook)
    try {
      const c = document.createElement("canvas");
      if (!(c.getContext("webgl") || c.getContext("experimental-webgl"))) {
        setWebglOk(false);
        return;
      }
    } catch {
      setWebglOk(false);
      return;
    }

    if (engineRef.current) return; // re-entrant mount guard

    engineRef.current = new OfficeEngine({
      glEl: glRef.current,
      cssEl: cssRef.current,
      overlayEl: overlayRef.current,
    });
    const engine = engineRef.current;

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", overflow: "hidden" }}>
      <div ref={glRef} style={{ position: "absolute", inset: 0 }} />
      <div ref={cssRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {!webglOk && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            font: "16px/1.5 monospace",
            padding: 24,
            textAlign: "center",
          }}
        >
          WebGL isn't available in this browser, so the 3D office can't start.
        </div>
      )}
    </div>
  );
};

export default OfficeScene;
export { bus };
