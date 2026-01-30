import { motion } from "framer-motion";

const About = () => {

  // Statistics data
  const stats = [
    { number: "2+", label: "YEARS EXPERIENCE", color: "text-yellow-400" },
    { number: "10+", label: "PROJECTS DONE", color: "text-yellow-400" },
    { number: "5+", label: "HAPPY CLIENTS", color: "text-yellow-400" },
    { number: "50+", label: "GITHUB REPOS", color: "text-yellow-400" },
  ];

  // Services/What I Do
  const services = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "FRONTEND DEVELOPMENT",
      description: "Building responsive, interactive user interfaces with React, Tailwind CSS, and modern web technologies.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "BACKEND DEVELOPMENT",
      description: "Creating scalable server-side applications with Node.js, Express, MongoDB, and RESTful APIs.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      title: "FULL-STACK SOLUTIONS",
      description: "End-to-end development from concept to deployment, ensuring seamless integration and optimal performance.",
    },
  ];

  return (
    <section data-section="about" className="relative min-h-screen bg-white z-20">
      <div className="w-full min-h-screen">
        {/* Main Content */}
        <div className="ml-16 px-6 md:px-12 lg:px-20 xl:px-24 py-12 md:py-20 max-w-6xl">
            {/* About Me Title with Dotted Lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="border-t-2 border-dotted border-gray-300 mb-4"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                ABOUT ME
              </h1>
              <div className="border-b-2 border-dotted border-gray-300"></div>
            </motion.div>

            {/* Name and Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              I'm <span className="font-bold text-black">Atif Afsar</span>, Full-Stack Developer / Software Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Enthusiastic Full-Stack Developer with a passion for creating interactive, scalable, and visually polished digital experiences. 
              I specialize in React, Node.js, and JavaScript, focusing on building user-centric applications with clean architecture, 
              smooth animations, and thoughtful user experience. My work combines engineering excellence with modern design principles.
            </motion.p>

            {/* Statistics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="bg-black p-6 md:p-8 hover:scale-105 transition-transform duration-300"
                >
                  <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.color}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {stat.number}
                  </div>
                  <div className="text-white text-xs md:text-sm font-semibold uppercase tracking-wide leading-tight" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* What I Do Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                What I Do?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className="flex flex-col gap-4 p-6 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                  >
                    <div className="text-gray-800 text-3xl">{service.icon}</div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
