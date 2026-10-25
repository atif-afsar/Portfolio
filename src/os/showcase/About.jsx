import NavLink from "./NavLink.jsx";
import ResumeBox from "./ResumeBox.jsx";
import { profile, skillGroups, certifications } from "../profile.js";

const SkillList = ({ title, items }) => (
  <div style={{ flex: "1 1 220px" }}>
    <h4 style={{ marginBottom: 8 }}>{title}</h4>
    <ul style={{ paddingLeft: 20 }}>
      {items.map((s) => (
        <li key={s} style={{ marginBottom: 2, fontSize: 16 }}>
          {s}
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <article>
    <h1>Welcome</h1>
    <h3>I&apos;m {profile.firstName}!</h3>

    <div className="text-block">
      <p>
        I&apos;m a <b>MarTech &amp; Digital Growth Developer</b>, a <b>Full Stack Web Engineer</b> and an{" "}
        <b>AI Creative Technologist</b>. I build high-converting websites, marketing-driven landing pages, full-stack
        e-commerce platforms and AI-powered customer engagement tools, and I pair that engineering with digital
        marketing execution: Google Business Profile optimization and AI-assisted creative and ad workflows.
      </p>
      <br />
      <p>
        Right now I work full-time onsite as a Full Stack Web Developer at The BrandsWay, a PR &amp; digital marketing
        agency, delivering commercial client campaigns end to end. I&apos;m based in {profile.location} and{" "}
        <b>open to relocation</b>.
      </p>
      <br />
      <p>
        Thank you for taking the time to check out my portfolio. If you have any questions or want to work together,
        reach out through the <NavLink to="/contact" text="contact page" inline style={{ display: "inline-flex" }} />{" "}
        or email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
      </p>
    </div>

    <ResumeBox />

    <figure className="captioned-image" style={{ maxWidth: 360, alignSelf: "center", margin: "0 auto 32px" }}>
      <img src={profile.photo} alt={`${profile.name}, ${profile.role}`} width="360" height="339" loading="lazy" />
      <p>
        <sub>
          <b>Figure 1:</b> me, probably thinking about a bug
        </sub>
      </p>
    </figure>

    <h3>What I bring to a team</h3>
    <div className="text-block">
      <ul style={{ paddingLeft: 24 }}>
        <li>
          <p>
            <b>Websites that convert.</b> Conversion-focused landing pages, lead-generation funnels and campaign
            microsites built with design, marketing and PR teams, tuned for Core Web Vitals and campaign conversion
            rates.
          </p>
        </li>
        <li>
          <p>
            <b>Digital growth.</b> Google Business Profile optimization for local search visibility and organic leads,
            e-commerce storefronts with Razorpay checkout, and automated email and inquiry pipelines.
          </p>
        </li>
        <li>
          <p>
            <b>Full stack engineering.</b> React.js, Next.js, Node.js, Express.js and MongoDB, from client websites to
            a D2C e-commerce platform with an admin panel and an educational ERP.
          </p>
        </li>
        <li>
          <p>
            <b>AI &amp; creative automation.</b> AI lead-support chatbots on Groq, OpenAI and Gemini, a
            persistent-memory AI agent with Pinecone, and AI ad, video and graphic workflows, plus interactive motion
            with Framer Motion, GSAP, Lenis and Spline.
          </p>
        </li>
      </ul>
    </div>

    <h3>How I got here</h3>
    <div className="text-block">
      <p>
        I started with plain HTML, CSS and JavaScript and moved to React and Node.js once I wanted my projects to
        actually <i>do</i> things. My first professional role was a full stack development internship at InLighnX
        Global, building React apps with Redux Toolkit and Vite, including Foodify, a grocery e-commerce app.
      </p>
      <br />
      <p>
        In November 2025 I joined The BrandsWay as a web developer intern, building campaign landing pages and lead
        generation forms for clients in healthcare, education, retail and services, and in February 2026 I moved
        into my current Full Stack Web Developer role. Along the way I completed my B.Tech in Computer Science
        Engineering at Dr. APJ Abdul Kalam Technical University (2022 – 2026).
      </p>
    </div>

    <h3>My Skills</h3>
    <div className="text-block" style={{ flexDirection: "row", flexWrap: "wrap", gap: "16px 24px", textAlign: "left" }}>
      {skillGroups.map((g) => (
        <SkillList key={g.title} title={g.title} items={g.items} />
      ))}
    </div>

    <h3>Certifications</h3>
    <div className="text-block">
      <ul style={{ paddingLeft: 20 }}>
        {certifications.map((c) => (
          <li key={c.name}>
            <p>
              <b>{c.name}</b> – {c.issuer}
            </p>
          </li>
        ))}
      </ul>
      <p>
        I also practise problem solving on{" "}
        <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer">
          LeetCode
        </a>{" "}
        and{" "}
        <a href={profile.links.namasteDev} target="_blank" rel="noopener noreferrer">
          Namaste Dev
        </a>
        .
      </p>
    </div>

    <h3>Outside of work</h3>
    <div className="text-block">
      <p>
        Beyond coding, I enjoy {profile.hobbies.slice(0, -1).map((h) => h.toLowerCase()).join(", ")} and{" "}
        {profile.hobbies.at(-1).toLowerCase()}.
      </p>
      <br />
      <p>
        Thanks for reading about me! If you&apos;re hiring for a MarTech, digital growth or full stack role, the{" "}
        <NavLink to="/contact" text="contact page" inline style={{ display: "inline-flex" }} /> is the fastest way to
        reach me.
      </p>
    </div>
  </article>
);

export default About;
