import { motion } from "framer-motion";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section className="bg-white text-black py-40 px-6 md:px-20">

      {/* Label */}
      <p className="text-xs tracking-widest text-yellow-500 mb-12">
        PROJECTS / SELECTED SYSTEMS
      </p>

      <div className="space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-4xl md:text-5xl font-bold">
                <span className="text-yellow-500 mr-4">
                  {project.id}
                </span>
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="max-w-2xl text-lg text-black/70 mb-8">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 mb-10">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="border border-black px-3 py-1 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Projects;
