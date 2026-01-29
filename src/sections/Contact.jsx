import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="bg-black text-white py-40 px-6 md:px-20 text-center">

      {/* Label */}
      <p className="text-xs tracking-widest text-yellow-400 mb-10">
        CONTACT / OPEN CHANNEL
      </p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold mb-8"
      >
        Let’s build something real.
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-xl mx-auto text-white/70 mb-16 text-lg"
      >
        Whether it’s a product, a system, or an idea —
        I’m always open to meaningful collaboration.
      </motion.p>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <a
          href="mailto:your.email@example.com"
          className="border border-yellow-400 px-10 py-4 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
        >
          Email Me
        </a>

        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="border border-white/30 px-10 py-4 hover:border-yellow-400 transition"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="border border-white/30 px-10 py-4 hover:border-yellow-400 transition"
        >
          GitHub
        </a>
      </div>

    </section>
  );
};

export default Contact;
