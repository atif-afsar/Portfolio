import { useCallback, useRef, useState } from "react";
import Icon from "../icons.jsx";
import Window from "./Window.jsx";
import Toolbar from "./Toolbar.jsx";
import ShutdownSequence from "./ShutdownSequence.jsx";
import Showcase from "../apps/Showcase.jsx";
import ResumeViewer from "../apps/ResumeViewer.jsx";
import AskAtif from "../apps/AskAtif.jsx";
import Credits from "../apps/Credits.jsx";
import { profile } from "../profile.js";
import { TOOLBAR_HEIGHT } from "../useViewport.js";

const year = new Date().getFullYear();

// `frame(viewport)` gives each app's initial window geometry.
const APPS = {
  showcase: {
    name: "My Showcase",
    icon: "showcase",
    component: Showcase,
    title: `${profile.name} - Showcase ${year}`,
    status: `© Copyright ${year} ${profile.name}`,
    frame: (v) => ({
      x: 104,
      y: 24,
      width: Math.min(v.width - 136, 1200),
      height: v.height - TOOLBAR_HEIGHT - 48,
    }),
  },
  resume: {
    name: "Resume.pdf",
    icon: "document",
    component: ResumeViewer,
    title: `Resume - ${profile.name}`,
    status: "resume.pdf",
    frame: (v) => ({
      x: Math.max(16, v.width / 2 - 420),
      y: 24,
      width: Math.min(840, v.width - 32),
      height: v.height - TOOLBAR_HEIGHT - 48,
    }),
  },
  ask: {
    name: "Ask Atif.exe",
    icon: "chat",
    component: AskAtif,
    title: "Ask Atif - AI Assistant",
    status: "Answers come from an AI trained on my portfolio",
    frame: (v) => ({ x: v.width - 560, y: 80, width: 480, height: Math.min(600, v.height - 160), minWidth: 360 }),
  },
  github: { name: "GitHub", icon: "github", href: profile.links.github },
  linkedin: { name: "LinkedIn", icon: "linkedin", href: profile.links.linkedin },
  credits: {
    name: "Credits",
    icon: "credits",
    component: Credits,
    title: "Credits",
    status: "Thanks for visiting!",
    frame: (v) => ({ x: v.width / 2 - 260, y: 120, width: 520, height: Math.min(520, v.height - 200) }),
  },
};

const Desktop = ({ viewport }) => {
  // { [key]: { z, minimized } }, insertion order = taskbar order
  const [windows, setWindows] = useState(() => ({ showcase: { z: 1, minimized: false } }));
  const [selected, setSelected] = useState(null);
  const [shutdown, setShutdown] = useState(false);
  const zTop = useRef(1);

  const focus = useCallback((key) => {
    setWindows((w) => {
      if (!w[key]) return w;
      const top = Math.max(...Object.values(w).map((x) => x.z));
      if (w[key].z === top && !w[key].minimized) return w;
      zTop.current += 1;
      return { ...w, [key]: { z: zTop.current, minimized: false } };
    });
  }, []);

  const open = useCallback(
    (key) => {
      const app = APPS[key];
      if (app.href) {
        window.open(app.href, "_blank", "noopener,noreferrer");
        return;
      }
      zTop.current += 1;
      setWindows((w) => ({ ...w, [key]: { z: zTop.current, minimized: false } }));
    },
    []
  );

  const close = useCallback((key) => {
    setWindows((w) => {
      const next = { ...w };
      delete next[key];
      return next;
    });
  }, []);

  const minimize = useCallback((key) => {
    setWindows((w) => ({ ...w, [key]: { ...w[key], minimized: true } }));
  }, []);

  const visible = Object.entries(windows).filter(([, w]) => !w.minimized);
  const activeKey = visible.length ? visible.reduce((a, b) => (b[1].z > a[1].z ? b : a))[0] : null;

  // Taskbar: clicking the active window minimizes it; anything else focuses.
  const onTab = (key) => {
    if (key === activeKey) minimize(key);
    else focus(key);
  };

  const reboot = useCallback(() => {
    zTop.current = 1;
    setWindows({ showcase: { z: 1, minimized: false } });
    setShutdown(false);
  }, []);

  if (shutdown) return <ShutdownSequence onReboot={reboot} />;

  return (
    <div className="os-desktop" onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}>
      <nav className="os-shortcuts" aria-label="Desktop">
        {Object.entries(APPS).map(([key, app]) => (
          <button
            key={key}
            className={`os-shortcut${selected === key ? " selected" : ""}`}
            onClick={() => (viewport.compact ? open(key) : setSelected(key))}
            onDoubleClick={() => open(key)}
            onKeyDown={(e) => e.key === "Enter" && open(key)}
          >
            <Icon name={app.icon} />
            <span className="os-shortcut-label">{app.name}</span>
          </button>
        ))}
      </nav>

      {Object.entries(windows).map(([key, w]) => {
        const app = APPS[key];
        const App = app.component;
        return (
          <div
            key={key}
            className={`os-window-layer${w.minimized ? " minimized" : ""}`}
            style={{ zIndex: w.z }}
          >
            <Window
              {...app.frame(viewport)}
              title={app.title}
              icon={app.icon}
              statusText={app.status}
              viewport={viewport}
              active={key === activeKey}
              onInteract={() => focus(key)}
              onClose={() => close(key)}
              onMinimize={() => minimize(key)}
            >
              <App openApp={open} compact={viewport.compact} />
            </Window>
          </div>
        );
      })}

      <Toolbar
        apps={APPS}
        windows={Object.entries(windows).map(([key, w]) => ({ key, ...w }))}
        activeKey={activeKey}
        onTab={onTab}
        onOpen={open}
        onShutdown={() => setShutdown(true)}
      />
    </div>
  );
};

export default Desktop;
