import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" data-section="contact" className="relative z-20 bg-black text-white py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-20 text-center overflow-hidden">
      
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Label */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-widest text-yellow-400 mb-4 sm:mb-6 md:mb-10 uppercase"
        >
          CONTACT / LET'S CONNECT
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight"
        >
          Ready to build the<br className="hidden sm:block" /> future together?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-white/60 mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0"
        >
          From Wahid Nagar, Aligarh to the world — I'm passionate about creating 
          innovative solutions that make a difference. Let's connect and build something extraordinary.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center flex-wrap"
        >
          <a
            href="mailto:atifafsar648@gmail.com"
            className="w-full xs:w-auto border border-yellow-400 px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold text-xs sm:text-sm md:text-base rounded-sm hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          >
            Email Me
          </a>

          <a
            href="https://www.linkedin.com/in/atif-afsar-64903b33a?originalSubdomain=in"
            target="_blank"
            rel="noreferrer"
            className="w-full xs:w-auto border border-white/30 px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 font-bold text-xs sm:text-sm md:text-base rounded-sm hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/atif-afsar"
            target="_blank"
            rel="noreferrer"
            className="w-full xs:w-auto border border-white/30 px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 font-bold text-xs sm:text-sm md:text-base rounded-sm hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]"
          >
            GitHub
          </a>

          <a
            href="tel:+919389030329"
            className="w-full xs:w-auto border border-white/30 px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 font-bold text-xs sm:text-sm md:text-base rounded-sm hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]"
          >
            Call Me
          </a>

          <a
            href="https://wa.me/919389030329"
            target="_blank"
            rel="noreferrer"
            className="w-full xs:w-auto border border-white/30 px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 font-bold text-xs sm:text-sm md:text-base rounded-sm hover:shadow-[0_0_20px_rgba(250,204,21,0.2)] flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={16} />
            WhatsApp
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default Contact;