import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("HOME");

  // Scroll functions
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("HOME");
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('[data-section="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
      setActiveSection("ABOUT ME");
    }
  };

  const scrollToResume = () => {
    // Add resume section scroll or download
    console.log("Resume clicked");
    setActiveSection("RESUME");
  };

  const scrollToPortfolio = () => {
    const projectsSection = document.querySelector('[data-section="projects"]');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
      setActiveSection("PORTFOLIO");
    }
  };

  const scrollToTestimonials = () => {
    // Add testimonials section scroll
    console.log("Testimonials clicked");
    setActiveSection("TESTIMONIALS");
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setActiveSection("CONTACT");
    }
  };

  // Navigation items
  const navItems = [
    { label: "HOME", onClick: scrollToHome, section: "HOME" },
    { label: "ABOUT ME", onClick: scrollToAbout, section: "ABOUT ME" },
    { label: "RESUME", onClick: scrollToResume, section: "RESUME" },
    { label: "PORTFOLIO", onClick: scrollToPortfolio, section: "PORTFOLIO" },
    { label: "TESTIMONIALS", onClick: scrollToTestimonials, section: "TESTIMONIALS" },
    { label: "CONTACT", onClick: scrollToContact, section: "CONTACT" },
  ];

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[data-section]");
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("data-section");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (sectionId === "about") setActiveSection("ABOUT ME");
          else if (sectionId === "projects") setActiveSection("PORTFOLIO");
          else if (sectionId === "contact") setActiveSection("CONTACT");
        }
      });

      // Check if at top (HOME)
      if (window.scrollY < 100) {
        setActiveSection("HOME");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-yellow-400 flex flex-col items-center z-50">
      <div className="flex flex-col items-center gap-1 py-4 h-full justify-center">
        {navItems.map((item, index) => (
          <div key={item.label} className="flex flex-col items-center flex-shrink-0">
            <motion.button
              onClick={item.onClick}
              className={`text-xs font-bold uppercase tracking-wider px-2 py-1 transition-colors whitespace-nowrap ${
                activeSection === item.section ? "text-black" : "text-gray-700 hover:text-black"
              }`}
              whileHover={{ scale: 1.1 }}
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {item.label}
            </motion.button>
            {index < navItems.length - 1 && (
              <div className="h-6 w-0.5 border-l-2 border-dashed border-gray-400 my-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
