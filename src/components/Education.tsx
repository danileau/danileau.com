import { useI18n } from "@/i18n/use-i18n";
import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

const ICONS = [Award, GraduationCap];
const GRADES = ["5.37", "5"];

const Education = () => {
  const { c } = useI18n();
  const education = c.education.entries.map((e, i) => ({
    ...e,
    grade: GRADES[i],
    icon: ICONS[i],
  }));

  return (
    <section id="education" className="py-32 relative">
      {/* Decorative element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      
      <div className="container px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-24">
          {/* Left column - Header */}
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4"
            >
              {c.education.kicker}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl italic mb-8"
            >
              {c.education.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-muted-foreground leading-relaxed"
            >
              {c.education.note}
            </motion.p>
          </div>

          {/* Right column - Cards */}
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative p-8 border border-border hover:border-primary/50 bg-card transition-all duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                    <edu.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="font-body text-sm text-primary tracking-wide">{edu.period}</span>
                    <h3 className="font-display text-2xl mt-1 mb-2">{edu.degree}</h3>
                    <p className="font-body text-muted-foreground text-sm mb-4">{edu.institution}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-body text-xs text-muted-foreground uppercase tracking-wide">{c.education.grade}</span>
                        <span className="font-display text-2xl text-primary">{edu.grade}</span>
                      </div>
                      {edu.award && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10">
                          <Award className="w-4 h-4 text-primary" />
                          <span className="font-body text-xs text-primary">{edu.award}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
