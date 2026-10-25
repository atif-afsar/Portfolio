import { useEffect, useRef, useState } from "react";
import Icon from "../icons.jsx";

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const Toolbar = ({ apps, windows, activeKey, onTab, onOpen, onShutdown }) => {
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(formatTime);
  const startRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 5000);
    return () => clearInterval(id);
  }, []);

  // Close the Start menu on any press outside it
  useEffect(() => {
    if (!startOpen) return;
    const onDown = (e) => {
      if (!startRef.current?.contains(e.target)) setStartOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [startOpen]);

  const choose = (fn) => () => {
    setStartOpen(false);
    fn();
  };

  return (
    <div className="os-toolbar">
      <div ref={startRef} style={{ display: "flex" }}>
        {startOpen && (
          <div className="os-start-menu" role="menu">
            <div className="os-start-brand">
              <span>
                <b>Atif</b>OS
              </span>
            </div>
            <div className="os-start-items">
              {Object.entries(apps).map(([key, app]) => (
                <button key={key} className="os-start-item" role="menuitem" onClick={choose(() => onOpen(key))}>
                  <Icon name={app.icon} />
                  {app.name}
                </button>
              ))}
              <div className="os-start-sep" />
              <button className="os-start-item" role="menuitem" onClick={choose(onShutdown)}>
                <Icon name="shutdown" />
                <span>
                  Sh<u>u</u>t Down...
                </span>
              </button>
            </div>
          </div>
        )}
        <button
          className={`os-tab start${startOpen ? " pressed" : ""}`}
          aria-haspopup="menu"
          aria-expanded={startOpen}
          onClick={() => setStartOpen((o) => !o)}
        >
          <Icon name="start" />
          Start
        </button>
      </div>

      <div className="os-tabs">
        {windows.map(({ key, minimized }) => (
          <button
            key={key}
            className={`os-tab${key === activeKey && !minimized ? " pressed" : ""}`}
            onClick={() => onTab(key)}
          >
            <Icon name={apps[key].icon} />
            <span>{apps[key].name}</span>
          </button>
        ))}
      </div>

      <div className="os-tray">
        <Icon name="volume" className="os-tray-volume" />
        <span>{time}</span>
      </div>
    </div>
  );
};

export default Toolbar;
