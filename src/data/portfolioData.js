// The single profile everything reads: AtifOS, the SEO summary and the
// "Ask Atif" chat assistant (api/chat.js sends this to the model).
import { experience } from "./experience.js";
import { projects } from "./projects.js";
import { skillGroups, certifications } from "./skills.js";

export const portfolioData = {
  name: "Atif Afsar",
  role: "MarTech & Digital Growth Developer",
  // headline from the resume, primary role first
  specialties: ["MarTech & Digital Growth Developer", "Full Stack Web Engineer", "AI Creative Technologist"],
  location: "Aligarh, Uttar Pradesh, India",
  relocation: "Open to relocation",
  summary:
    "MarTech & Digital Growth Developer (B.Tech Computer Science, 2026) with hands-on agency experience building high-converting websites, marketing-driven landing pages, full-stack e-commerce platforms and AI-powered customer engagement tools. Combines strong full-stack engineering (React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS) and interactive UI animations (Framer Motion, GSAP, Lenis, Spline) with digital marketing execution, Google Business Profile optimization and AI-assisted creative/ad workflows. Currently working full-time onsite at a PR & Digital Marketing Agency delivering commercial client campaigns end to end. Seeking a MarTech / Digital Growth Developer role.",
  contact: {
    email: "atifafsar.dev@gmail.com",
    phone: "+91 93890 30329",
    whatsapp: "https://wa.me/919389030329",
  },
  links: {
    github: "https://github.com/atif-afsar",
    linkedin: "https://www.linkedin.com/in/atif-afsar-64903b33a/",
    portfolio: "https://portfolio-rgzt.vercel.app/",
    leetcode: "https://leetcode.com/u/Atif-Afsar/",
    namasteDev: "https://namastedev.com/atifafsar648",
  },
  skills: skillGroups,
  experience: experience.filter((e) => e.type !== "education"),
  education: experience.filter((e) => e.type === "education"),
  projects,
  certifications,
  hobbies: [
    "Building web applications",
    "Exploring new technologies and AI tools",
    "Contributing to open source",
    "Problem solving on LeetCode",
    "Gaming",
    "Reading tech blogs",
    "Playing guitar",
  ],
};
