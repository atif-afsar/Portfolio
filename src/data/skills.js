// Skill groups exactly as on the current resume (MarTech & Digital Growth
// Developer). Used by AtifOS, the SEO summary and the chat assistant.
export const skillGroups = [
  {
    title: "High-Conversion Web & Frontend",
    items: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Redux Toolkit", "Responsive Landing Page Design"],
  },
  {
    title: "Interactive UI, Motion & 3D Web",
    items: ["Framer Motion", "GSAP", "Lenis", "Spline (Interactive 3D & Smooth-Scroll Experiences)"],
  },
  {
    title: "MarTech, Lead-Gen & Digital Growth",
    items: [
      "Conversion-Focused Landing Pages",
      "Lead-Generation Funnels",
      "Google Business Profile (GBP) Optimization",
      "E-Commerce Storefronts",
      "Razorpay Payment Gateway",
      "Web3Forms",
      "NodeMailer Email Automation",
      "ImageKit Media Optimization",
    ],
  },
  {
    title: "AI Marketing & Creative Automation",
    items: [
      "Groq API",
      "OpenAI API",
      "Gemini API",
      "AI Lead-Support Chatbots",
      "ChatGPT",
      "Claude",
      "Cursor AI",
      "Kiro",
      "Trae",
      "Antigravity",
      "AI Ad/Video/Graphic Workflows",
    ],
  },
  {
    title: "Backend, Databases & Cloud Deploy",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "MongoDB",
      "Supabase",
      "Firebase",
      "SQL",
      "Redis",
      "Pinecone",
      "Vercel",
      "Netlify",
      "Render",
      "GoDaddy DNS",
    ],
  },
];

// Leveled lists used by the classic scrolling site's skill bars.
export const skills = {
  frontend: [
    { name: "JavaScript", level: 95, category: "Language" },
    { name: "React", level: 90, category: "Framework" },
    { name: "Next.js", level: 80, category: "Framework" },
    { name: "Tailwind CSS", level: 90, category: "Styling" },
    { name: "Redux Toolkit", level: 80, category: "State" },
    { name: "Framer Motion / GSAP", level: 85, category: "Animation" },
    { name: "Responsive Design", level: 90, category: "Design" },
  ],
  backend: [
    { name: "Node.js", level: 85, category: "Runtime" },
    { name: "Express.js", level: 85, category: "Framework" },
    { name: "MongoDB", level: 80, category: "Database" },
    { name: "REST APIs", level: 85, category: "Architecture" },
    { name: "Supabase / Firebase", level: 75, category: "BaaS" },
  ],
  tools: [
    { name: "OpenAI / Gemini / Groq APIs", level: 80, category: "AI" },
    { name: "Pinecone / RAG", level: 75, category: "AI" },
    { name: "Git & GitHub", level: 85, category: "Version Control" },
    { name: "Vercel / Netlify / Render", level: 80, category: "Deploy" },
    { name: "Postman", level: 80, category: "API Testing" },
  ],
};

export const certifications = [
  { name: "Namaste React", issuer: "Namaste Dev (Akshay Saini)", category: "Frontend Development" },
  { name: "Full Stack Development Training", issuer: "Sheriyans Coding School", category: "Full Stack Development" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", category: "Web Design" },
  { name: "Web Development Fundamentals", issuer: "IBM", category: "Web Development" },
];
