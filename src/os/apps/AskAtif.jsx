import { useEffect, useRef, useState } from "react";
import { useChat } from "../../hooks/useChat.js";

const SUGGESTIONS = ["What does Atif do?", "Which projects has he built?", "How can I contact him?"];

// Old-school messenger front end for the existing /api/chat assistant.
const AskAtif = () => {
  const { messages, loading, sendMessage } = useChat();
  const [draft, setDraft] = useState("");
  const logRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [messages, loading]);

  const send = (text) => {
    if (!text.trim() || loading) return;
    sendMessage(text.trim());
    setDraft("");
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: "#c3c6ca",
        padding: 8,
        gap: 8,
      }}
    >
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#fff",
          boxShadow: "var(--border-field)",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <p>
          <b style={{ color: "#a00" }}>Atif-bot:</b> Hi! I&apos;m an AI assistant that knows about Atif&apos;s work,
          projects and skills. Ask me anything.
        </p>
        {messages.map((m, i) => (
          <p key={i} style={{ whiteSpace: "pre-wrap" }}>
            <b style={{ color: m.type === "user" ? "#0000a3" : "#a00" }}>
              {m.type === "user" ? "You:" : "Atif-bot:"}
            </b>{" "}
            {m.content}
          </p>
        ))}
        {loading && (
          <p>
            <b style={{ color: "#a00" }}>Atif-bot:</b> <span className="loading-dots">typing</span>
          </p>
        )}
      </div>

      {messages.length === 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SUGGESTIONS.map((s) => (
            <button key={s} className="site-button" style={{ fontSize: 14, padding: "2px 8px" }} onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        style={{ display: "flex", gap: 8 }}
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          aria-label="Message"
        />
        <button className="site-button" type="submit" disabled={!draft.trim() || loading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AskAtif;
