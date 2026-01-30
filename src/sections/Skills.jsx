import { motion } from "framer-motion";

const stacks = [
  {
    title: "Frontend",
    items: ["React", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "MongoDB", "REST APIs", "Firebase"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Vite", "Postman", "EmailJS"],
  },
];

const TechStack = () => {
  return (
    <section className="relative z-20 bg-black text-white py-40 px-6 md:px-20 ml-16">
      
      {/* Label */}
      <p className="text-xs tracking-widest text-yellow-400 mb-12">
        TECH STACK / SYSTEM MODULES
      </p>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {stacks.map((stack, index) => (
          <motion.div
            key={stack.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -8 }}
            className="border border-white/20 p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">
              {stack.title}
            </h3>

            <ul className="space-y-3 text-white/70">
              {stack.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default TechStack;
