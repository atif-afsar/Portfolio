import "./os.css";
import Desktop from "./components/Desktop.jsx";
import useViewport from "./useViewport.js";

// AtifOS root. Rendered inside the 3D monitor iframe (/os/), and inline on the
// main page when the 3D office can't run (phones, no WebGL).
const OsApp = () => {
  const viewport = useViewport();
  return (
    <div className={`os-root${viewport.compact ? " compact" : ""}`}>
      <Desktop viewport={viewport} />
    </div>
  );
};

export default OsApp;
