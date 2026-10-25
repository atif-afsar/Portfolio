import { useState } from "react";
import Icon from "../icons.jsx";
import { profile } from "../profile.js";

const ext = { target: "_blank", rel: "noopener noreferrer" };

const SocialBox = ({ icon, href, label, newTab = true }) => (
  <a
    className="big-button"
    href={href}
    {...(newTab ? ext : {})}
    aria-label={label}
    style={{ width: "auto", padding: 16, textDecoration: "none" }}
  >
    <Icon name={icon} style={{ width: 40, height: 40 }} />
  </a>
);

// No backend for mail: the form composes a message in the visitor's email app.
const Contact = ({ openApp }) => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const valid = form.name.trim() && form.email.includes("@") && form.message.trim();
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const subject = `Portfolio contact from ${form.name}${form.company ? ` (${form.company})` : ""}`;
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <article>
      <h1>Contact</h1>
      <div style={{ display: "flex", gap: 16, margin: "24px 0", flexWrap: "wrap" }}>
        <SocialBox icon="github" href={profile.links.github} label="GitHub" />
        <SocialBox icon="linkedin" href={profile.links.linkedin} label="LinkedIn" />
        <SocialBox icon="mail" href={`mailto:${profile.email}`} label="Email" newTab={false} />
        <SocialBox icon="phone" href={profile.whatsapp} label="WhatsApp" />
        <SocialBox icon="document" href={profile.resume} label="Resume" />
      </div>
      <div className="text-block" style={{ marginTop: 0 }}>
        <p>
          I&apos;m looking for a <b>MarTech / Digital Growth Developer</b> role, I&apos;m happy to talk about full
          stack and freelance projects too, and I&apos;m <b>open to relocation</b>. The fastest ways to reach me:
        </p>
        <ul style={{ paddingLeft: 24, marginTop: 12 }}>
          <li>
            <p>
              Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </li>
          <li>
            <p>
              Phone / WhatsApp:{" "}
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</a> (
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
                message on WhatsApp
              </a>
              )
            </p>
          </li>
          <li>
            <p>
              Also on{" "}
              <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer">
                LeetCode
              </a>{" "}
              and{" "}
              <a href={profile.links.namasteDev} target="_blank" rel="noopener noreferrer">
                Namaste Dev
              </a>
            </p>
          </li>
        </ul>
        <p style={{ marginTop: 8 }}>
          Want a quick answer?{" "}
          <button
            className="site-button"
            style={{ fontSize: 16, padding: "1px 8px" }}
            onClick={() => openApp?.("ask")}
          >
            Ask Atif.exe
          </button>{" "}
          or send a message below.
        </p>
      </div>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <label style={{ flex: "1 1 220px" }}>
            <p>
              <b>Your name:</b>
            </p>
            <input value={form.name} onChange={set("name")} placeholder="Name" autoComplete="name" required />
          </label>
          <label style={{ flex: "1 1 220px" }}>
            <p>
              <b>Email:</b>
            </p>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="Email"
              autoComplete="email"
              required
            />
          </label>
        </div>
        <label>
          <p>Company (optional):</p>
          <input value={form.company} onChange={set("company")} placeholder="Company" autoComplete="organization" />
        </label>
        <label>
          <p>
            <b>Message:</b>
          </p>
          <textarea value={form.message} onChange={set("message")} placeholder="Message" required />
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="site-button" type="submit" disabled={!valid} style={{ minWidth: 180 }}>
            Send Email
          </button>
          <p style={{ fontSize: 14, color: "#555" }}>Opens your email app with the message filled in.</p>
        </div>
      </form>
    </article>
  );
};

export default Contact;
