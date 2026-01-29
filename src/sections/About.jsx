import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-white text-black py-40 px-6 md:px-20">
      
      {/* Label */}
      <p className="text-xs tracking-widest text-yellow-500 mb-6">
        ABOUT / SYSTEM LOG
      </p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
      >
        Built from curiosity, <br />
        shaped by code, <br />
        refined through systems.
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-10 max-w-3xl text-lg text-black/80"
      >
        I’m a full-stack developer who enjoys turning ideas into interactive,
        scalable products. My work lives at the intersection of engineering
        and design — where clean architecture, smooth motion, and thoughtful
        user experience come together.
      </motion.p>

      {/* Highlighted Keywords */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex flex-wrap gap-4"
      >
        {["Full-Stack", "React", "Node.js", "Motion", "Systems"].map((word) => (
          <span
            key={word}
            className="border border-black px-4 py-2 text-sm"
          >
            {word}
          </span>
        ))}
      </motion.div>

    </section>
  );
};

export default About;
