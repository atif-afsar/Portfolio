import { useEffect, useRef } from "react";
import OfficeEngine from "../three/OfficeEngine.js";

// React 19 StrictMode mounts, unmounts and re-mounts effects in dev. Building
// the engine twice would load every asset twice (duplicate BIOS lines, two
// audio graphs), so disposal is deferred a tick and cancelled if the same
// scene mounts straight back. A real unmount still disposes.
let engine = null;
let pendingDispose = null;

// OfficeApp checks for WebGL before rendering this.
const OfficeScene = () => {
  const glRef = useRef(null);
  const cssRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    clearTimeout(pendingDispose);
    pendingDispose = null;
    if (!engine) {
      engine = new OfficeEngine({
        glEl: glRef.current,
        cssEl: cssRef.current,
        overlayEl: overlayRef.current,
      });
      if (import.meta.env.DEV) window.__office = engine;
    }

    return () => {
      pendingDispose = setTimeout(() => {
        engine?.dispose();
        engine = null;
      }, 0);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", overflow: "hidden" }}>
      {/* Same stacking as the reference: the WebGL canvas draws on top but lets
          the pointer through to the CSS3D layer, so the monitor iframe gets
          real hover/clicks (the GL scene punches a see-through hole for it). */}
      <div ref={glRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div ref={cssRef} style={{ position: "absolute", inset: 0 }} />
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
    </div>
  );
};

export default OfficeScene;
