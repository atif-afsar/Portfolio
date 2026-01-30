import { motion } from "framer-motion";
import { caseStudies } from "../data/caseStudies";

const Block = ({ title, children }) => (
  <div className="border border-white/20 p-6">
    <h4 className="text-yellow-400 mb-3 text-sm tracking-widest">
      {title}
    </h4>
    <div className="text-white/80 text-base leading-relaxed">
      {children}
    </div>
  </div>
);

const CaseStudies = () => {
  return (
    <section className="relative z-20 bg-black text-white py-40 px-6 md:px-20">

      {/* Label */}
      <p className="text-xs tracking-widest text-yellow-400 mb-16">
        CASE STUDIES / SYSTEM BREAKDOWN
      </p>

      <div className="space-y-24">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Title */}
            <h3 className="text-4xl md:text-5xl font-bold mb-12">
              {study.title}
            </h3>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-10">
              <Block title="PROBLEM">
                {study.problem}
              </Block>

              <Block title="APPROACH">
                {study.approach}
              </Block>

              <Block title="SYSTEM ARCHITECTURE">
                <ul className="list-disc ml-5 space-y-2">
                  {study.architecture.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>

              <Block title="OUTCOME">
                {study.outcome}
              </Block>
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-3 mt-10">
              {study.tech.map((t) => (
                <span
                  key={t}
                  className="border border-yellow-400 px-3 py-1 text-sm text-yellow-400"
                >
                  {t}
                </span>
              ))}
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default CaseStudies;
