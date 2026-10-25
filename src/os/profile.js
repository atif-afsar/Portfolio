// Everything the OS shows comes from src/data so the OS, the SEO summary and
// the chat assistant never drift apart.
import { portfolioData } from "../data/portfolioData.js";
import { experience } from "../data/experience.js";
import { projects } from "../data/projects.js";
import { skillGroups, certifications } from "../data/skills.js";

export const profile = {
  name: portfolioData.name,
  firstName: portfolioData.name.split(" ")[0],
  lastName: portfolioData.name.split(" ").slice(1).join(" "),
  role: portfolioData.role,
  specialties: portfolioData.specialties,
  location: "Aligarh, India",
  relocation: portfolioData.relocation,
  summary: portfolioData.summary,
  email: portfolioData.contact.email,
  phone: portfolioData.contact.phone,
  whatsapp: portfolioData.contact.whatsapp,
  photo: "/hero.webp",
  resume: "/resume.pdf",
  links: portfolioData.links,
  hobbies: portfolioData.hobbies,
};

export const work = experience.filter((e) => e.type !== "education");
export const education = experience.filter((e) => e.type === "education");

export const projectCategories = [
  {
    slug: "client",
    title: "Client",
    subtitle: "WORK",
    category: "Client Work",
    blurb: "Commercial agency and live client projects, led by EduNexus, my school & coaching ERP, plus e-commerce, agency, healthcare, education and fashion brand websites.",
  },
  {
    slug: "ai",
    title: "AI &",
    subtitle: "INTERACTIVE MEDIA",
    category: "AI & Interactive Media",
    blurb: "A persistent-memory AI agent, an emotion-driven media app and a mission control dashboard.",
  },
  {
    slug: "internship",
    title: "Internship",
    subtitle: "BUILDS",
    category: "Internship Builds",
    blurb: "Apps I built during my full stack internship at InLighnX Global.",
  },
].map((c) => ({ ...c, projects: projects.filter((p) => p.category === c.category) }));

// "/ims.png" -> "/projects/ims.webp" (compressed copies made for the OS);
// images already under /projects/ are used as-is.
export const projectImage = (project) => {
  if (!project.image) return null;
  if (project.image.startsWith("/projects/")) return project.image;
  return `/projects/${project.image.replace(/^\//, "").replace(/\.\w+$/, "")}.webp`;
};

export const hostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export { skillGroups, certifications, projects };
