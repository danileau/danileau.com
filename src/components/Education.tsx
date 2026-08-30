import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";

const GRADES = ["5.37", "5.0"];

const Education = () => {
  const { c } = useI18n();
  const entries = c.education.entries.map((e, i) => ({ ...e, grade: GRADES[i] }));

  return (
    <section id="education" className="py-8.8">
      <div className="container px-5.5">
        <div className="flex items-center gap-4.4 flex-wrap mb-2.2">
          <span className="font-mono text-xs tracking-widest uppercase text-ink-3">{c.education.kicker}</span>
          <span className="flex-1 min-w-10 h-1.5 bg-chrome border-y border-chrome-dk" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-2.2">{c.education.title}</h2>
        <p className="font-body text-ink-2 max-w-[58ch] mb-5.5">{c.education.note}</p>

        <div className="grid gap-5.5 md:grid-cols-2">
          {entries.map((edu, index) => (
            <motion.article
              key={edu.degree}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.18, delay: index * 0.05 }}
              className="shadow-stamp border-3 border-ink rounded-card bg-porcelain px-4.4 py-5.5"
            >
              <p className="font-mono text-xs text-ink-3 m-0">{edu.period}</p>
              <h3 className="font-display text-xl mt-2.2 mb-0.5">{edu.degree}</h3>
              <p className="font-body text-sm text-ink-2 mb-4.4">{edu.institution}</p>

              <div className="flex items-center gap-4.4 flex-wrap border-t-2 border-ink/20 pt-3.3">
                <span className="flex items-baseline gap-2.2">
                  <span className="font-display text-3xl text-cherry leading-none tabular-nums">{edu.grade}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-3">{c.education.grade}</span>
                </span>
                {edu.award && (
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border-2 border-ink rounded-chip bg-sun text-ink">
                    <Award className="w-3.5 h-3.5" />
                    {edu.award}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
