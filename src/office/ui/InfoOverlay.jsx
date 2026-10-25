import { useEffect, useRef, useState } from "react";
import bus from "../../three/EventBus.js";

const NAME_TEXT = "Atif Afsar";
const TITLE_TEXT = "MarTech & Digital Growth Developer";

// Types out name → title → live clock, then reveals Mute + Free-Cam toggles.
// Ports the reference's InfoOverlay typing effect (posts `_AUTO_` keydowns
// so the OS plays the type SFX).
const InfoOverlay = ({ visible }) => {
  const [nameText, setNameText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString());
  const [togglesOn, setTogglesOn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [freeCam, setFreeCam] = useState(false);
  const clockRef = useRef(clock);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;
  clockRef.current = clock;

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  const typeText = (i, cur, text, setText, done) => {
    if (i < text.length) {
      setTimeout(() => {
        if (visibleRef.current) {
          window.postMessage({ type: "keydown", key: `_AUTO_${text[i]}` }, "*");
        }
        setText(cur + text[i]);
        typeText(i + 1, cur + text[i], text, setText, done);
      }, Math.random() * 50 + 50);
    } else {
      done();
    }
  };

  useEffect(() => {
    if (visible && nameText === "") {
      setTimeout(() => {
        typeText(0, "", NAME_TEXT, setNameText, () => {
          typeText(0, "", TITLE_TEXT, setTitleText, () => {
            typeText(0, "", clockRef.current, setTimeText, () => {
              window.postMessage({ type: "keydown", key: "_AUTO_" }, "*");
              setTimeout(() => setTogglesOn(true), 250);
            }, clockRef);
          });
        });
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Keep the clock bar live once typing finished
  useEffect(() => {
    if (togglesOn) setTimeText(clock);
  }, [clock, togglesOn]);

  const style = {
    background: "black",
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: "center",
    display: "flex",
    marginBottom: 4,
    boxSizing: "border-box",
    font: "16px monospace",
    color: "#fff",
    letterSpacing: 0.8,
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // only the chips take the pointer; clicks elsewhere reach the scene
        pointerEvents: "none",
      }}
    >
      {nameText !== "" && <div style={style}><p>{nameText}</p></div>}
      {titleText !== "" && <div style={style}><p>{titleText}</p></div>}
      {timeText !== "" && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={style}><p>{timeText}</p></div>
          {togglesOn && (
            <>
              <div
                data-prevent-click
                style={{ ...style, cursor: "pointer", pointerEvents: visible ? "auto" : "none" }}
                onClick={() => {
                  bus.dispatch("muteToggle", !muted);
                  setMuted(!muted);
                }}
                title={muted ? "Unmute" : "Mute"}
              >
                <p>{muted ? "🔇" : "🔊"}</p>
              </div>
              <div
                data-prevent-click
                style={{ ...style, cursor: "pointer", pointerEvents: visible ? "auto" : "none" }}
                onClick={() => {
                  bus.dispatch("freeCamToggle", !freeCam);
                  setFreeCam(!freeCam);
                }}
                title={freeCam ? "Exit free cam" : "Free cam"}
              >
                <p>{freeCam ? "🖱️" : "📷"}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoOverlay;
