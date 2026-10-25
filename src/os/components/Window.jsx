import { useRef, useState } from "react";
import Icon from "../icons.jsx";
import { TOOLBAR_HEIGHT } from "../useViewport.js";

const MIN_VISIBLE = 80; // px of titlebar that must stay on-screen

// A Win95 window. Dragging/resizing shows a dotted outline and only commits on
// release, like "show window contents while dragging" turned off. A shield
// covers the desktop meanwhile so embedded iframes can't swallow the pointer.
const Window = ({
  title,
  icon,
  x,
  y,
  width,
  height,
  minWidth = 320,
  minHeight = 200,
  viewport,
  active,
  onInteract,
  onClose,
  onMinimize,
  statusText,
  children,
}) => {
  const [rect, setRect] = useState({ x, y, w: width, h: height });
  const [maximized, setMaximized] = useState(false);
  const [outline, setOutline] = useState(null);
  const gesture = useRef(null);

  const isMax = maximized || viewport.compact;
  const shown = isMax ? { x: 0, y: 0, w: viewport.width, h: viewport.height - TOOLBAR_HEIGHT } : rect;

  const clamp = (r) => ({
    ...r,
    x: Math.min(Math.max(r.x, MIN_VISIBLE - r.w), viewport.width - MIN_VISIBLE),
    y: Math.min(Math.max(r.y, 0), viewport.height - TOOLBAR_HEIGHT - 24),
  });

  const begin = (e, kind) => {
    if (isMax || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    onInteract();
    gesture.current = { kind, px: e.clientX, py: e.clientY, start: rect, next: rect };

    const move = (ev) => {
      const g = gesture.current;
      const dx = ev.clientX - g.px;
      const dy = ev.clientY - g.py;
      g.next =
        g.kind === "drag"
          ? clamp({ ...g.start, x: g.start.x + dx, y: g.start.y + dy })
          : {
              ...g.start,
              w: Math.max(minWidth, g.start.w + dx),
              h: Math.max(minHeight, g.start.h + dy),
            };
      setOutline({ ...g.next, cursor: g.kind === "drag" ? "move" : "nwse-resize" });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      setRect(gesture.current.next);
      setOutline(null);
      gesture.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const stop = (e) => e.stopPropagation();

  return (
    <>
      <section
        className={`win${active ? "" : " inactive"}`}
        style={{ left: shown.x, top: shown.y, width: shown.w, height: shown.h }}
        onPointerDown={onInteract}
        aria-label={title}
      >
        <div className="win-inner">
          <div className="win-titlebar">
            <div
              className="win-title"
              onPointerDown={(e) => begin(e, "drag")}
              onDoubleClick={() => !viewport.compact && setMaximized((m) => !m)}
            >
              {icon && <Icon name={icon} />}
              <span>{title}</span>
            </div>
            <div className="win-buttons">
              <button className="os-btn" aria-label="Minimize" onPointerDown={stop} onClick={onMinimize}>
                <Icon name="minimize" />
              </button>
              {!viewport.compact && (
                <button
                  className="os-btn"
                  aria-label={maximized ? "Restore" : "Maximize"}
                  onPointerDown={stop}
                  onClick={() => setMaximized((m) => !m)}
                >
                  <Icon name="maximize" />
                </button>
              )}
              <button className="os-btn close" aria-label="Close" onPointerDown={stop} onClick={onClose}>
                <Icon name="close" />
              </button>
            </div>
          </div>

          <div className="win-body">
            <div className="win-body-inner">
              <div className="win-content">{children}</div>
            </div>
          </div>

          <div className="win-statusbar">
            <div className="win-status-cell grow">{statusText}</div>
            <div className="win-status-cell spacer" />
            <div className="win-status-cell spacer" />
            <div className="win-status-cell resize" onPointerDown={(e) => begin(e, "resize")}>
              {!isMax && <Icon name="resize" />}
            </div>
          </div>
        </div>
      </section>

      {outline && (
        <>
          <div className="win-interaction-shield" style={{ cursor: outline.cursor }} />
          <div
            className="win-outline"
            style={{ left: outline.x, top: outline.y, width: outline.w, height: outline.h }}
          />
        </>
      )}
    </>
  );
};

export default Window;
