import { motion } from "framer-motion";
import { experience } from "../data/experience";

const Experience = () => {
  return (
    <section className="relative z-20 bg-white text-black py-40 px-6 md:px-20">

      {/* Label */}
      <p className="text-xs tracking-widest text-yellow-500 mb-16">
        EXPERIENCE / REAL WORLD WORK
      </p>

      <div className="space-y-16">
        {experience.map((item, index) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-black/20 p-10"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-2xl font-semibold">
                {item.role}
              </h3>
              <span className="text-sm text-black/60">
                {item.duration}
              </span>
            </div>

            <p className="text-yellow-500 mb-6">
              {item.company}
            </p>

            {/* Points */}
            <ul className="space-y-3 text-black/80">
              {item.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="w-2 h-2 bg-yellow-500 mt-2" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Experience;
