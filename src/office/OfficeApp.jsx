import { lazy, Suspense, useEffect, useState } from "react";
import OfficeScene from "./OfficeScene.jsx";
import bus from "../three/EventBus.js";
import LoadingScreen from "./ui/LoadingScreen.jsx";
import InfoOverlay from "./ui/InfoOverlay.jsx";
import HelpPrompt from "./ui/HelpPrompt.jsx";
import SeoSummary from "./ui/SeoSummary.jsx";

const OsApp = lazy(() => import("../os/OsApp.jsx"));

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

// Root of the experience: 3D office + BIOS loader + overlay UI, with the
// monitor running AtifOS (/os/) in an iframe. Like the reference it runs on
// every screen size; only browsers without WebGL get AtifOS directly.
const OfficeApp = () => {
  const [webgl] = useState(hasWebGL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => bus.on("loadingScreenDone", () => setLoaded(true)), []);

  if (!webgl) {
    return (
      <>
        <SeoSummary />
        <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "#3e9697" }} />}>
          <OsApp />
        </Suspense>
      </>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", overflow: "hidden" }}>
      <SeoSummary />
      <OfficeScene />
      <LoadingScreen />
      {loaded && <Interface />}
      {loaded && <HelpPrompt />}
    </div>
  );
};

// Name / title / clock + toggles (port of the reference's InterfaceUI): appears
// on the first click after START, slides away while you're using the monitor
// and comes back when you leave it.
const Interface = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    document.addEventListener("mousedown", show, { once: true });
    const offEnter = bus.on("enterMonitor", () => setVisible(false));
    const offLeave = bus.on("leftMonitor", () => setVisible(true));
    return () => {
      document.removeEventListener("mousedown", show);
      offEnter();
      offLeave();
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: "0 0 auto 0",
        zIndex: 30,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transform: `translateX(${visible ? 0 : -32}px)`,
        transition: visible
          ? "opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s"
          : "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <InfoOverlay visible={visible} />
    </div>
  );
};

export default OfficeApp;
