import { useEffect, useRef, useState } from "react";
import bus from "../../three/EventBus.js";
import "./office-ui.css";

const BRAND = "Afsar, Atif Inc.";
const SHOWCASE = "Atif Afsar Portfolio Showcase";

const pad = (name) => "\xa0".repeat(Math.max(1, 24 - name.length));

const today = () => {
  const d = new Date();
  const two = (n) => String(n).padStart(2, "0");
  return `${two(d.getMonth() + 1)}/${two(d.getDate())}/${d.getFullYear()}`;
};

// BIOS boot screen (port of the reference's LoadingScreen): logs each asset as
// it loads, then fades to a blinking cursor and pops up START. Clicking START
// dispatches `loadingScreenDone`, which starts the camera move and the audio.
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [counts, setCounts] = useState({ loaded: 0, toLoad: 0 });
  const [lines, setLines] = useState([]);
  const [textVisible, setTextVisible] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [gone, setGone] = useState(false);
  const startedRef = useRef(false);
  const [smallScreen, setSmallScreen] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const done = progress >= 1;

  useEffect(
    () =>
      bus.on("loadedSource", ({ sourceName, progress, loaded, toLoad }) => {
        setProgress(progress);
        setCounts({ loaded, toLoad });
        // each line keeps the progress at the moment that asset finished
        setLines((prev) =>
          [...prev, `Loaded ${sourceName}${pad(sourceName)} ... ${Math.round(progress * 100)}%`].slice(-8)
        );
      }),
    []
  );

  // Loaded → hold a beat → fade the log → blinking cursor → START popup
  useEffect(() => {
    if (!done) return;
    const t1 = setTimeout(() => setTextVisible(false), 1000);
    const t2 = setTimeout(() => setPopupVisible(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [done]);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setDismissed(true);
    bus.dispatch("loadingScreenDone", {});
    // unmount once the 0.2s fade-out has played
    setTimeout(() => setGone(true), 400);
  };

  // ?debug skips the boot screen once everything is loaded
  useEffect(() => {
    if (!done || !new URLSearchParams(window.location.search).has("debug")) return;
    const id = setTimeout(start, 0);
    return () => clearTimeout(id);
  }, [done]);

  // Enter starts too, once the popup is up
  useEffect(() => {
    if (!popupVisible) return;
    const onKey = (e) => e.key === "Enter" && start();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popupVisible]);

  if (gone) return null;

  return (
    <div className={`bios${dismissed ? " dismissed" : ""}`} aria-hidden={dismissed}>
      {!textVisible && !popupVisible && (
        <div style={{ position: "absolute", inset: 0, padding: 48 }}>
          <span className="bios-cursor" />
        </div>
      )}

      <div className="bios-text" style={{ opacity: textVisible ? 1 : 0 }}>
        <div className="bios-header">
          <p className="bios-green">
            <b>{BRAND}</b>
          </p>
          <div className="bios-header-info">
            <p>Released: 10/24/2026</p>
            <p>AABIOS (C)2026 {BRAND},</p>
          </div>
        </div>

        <div className="bios-body">
          <p>AAP S26 2022-2026 Special FS26</p>
          <div className="bios-spacer" />
          <p>AAP Showcase(tm) XX 2026</p>
          <p>Checking RAM : 16384 OK</p>
          <div className="bios-spacer" />
          <div className="bios-spacer" />
          {counts.toLoad === 0 ? (
            <p className="loading-dots">WAIT</p>
          ) : done ? (
            <p>FINISHED LOADING RESOURCES</p>
          ) : (
            <p className="loading-dots">
              LOADING RESOURCES ({counts.loaded}/{counts.toLoad})
            </p>
          )}
          <div className="bios-spacer" />
          <div className="bios-resources">
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="bios-spacer" />
          {done && (
            <p>
              All Content Loaded, launching <b className="bios-green">&apos;{SHOWCASE}&apos;</b> V1.0
            </p>
          )}
          <div className="bios-spacer" />
          <span className="bios-cursor" />
        </div>

        <div className="bios-footer">
          <p>
            Press <b>DEL</b> to enter SETUP , <b>ESC</b> to skip memory test
          </p>
          <p>{today()}</p>
        </div>
      </div>

      <div
        className="bios-popup-wrap"
        style={{ opacity: popupVisible ? 1 : 0, pointerEvents: popupVisible && !dismissed ? "auto" : "none" }}
      >
        <div className="bios-popup">
          <p>{SHOWCASE} 2026</p>
          <div className="bios-spacer" />
          {smallScreen && (
            <>
              <p style={{ color: "yellow" }}>
                <b>WARNING: This experience is best viewed on a desktop or laptop computer.</b>
              </p>
              <div className="bios-spacer" />
            </>
          )}
          <p style={{ display: "flex", alignItems: "flex-end" }}>
            Click start to begin{"\xa0"}
            <span className="bios-cursor" />
          </p>
          <button className="bios-start-button" onClick={start} autoFocus={popupVisible}>
            <span>START</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
