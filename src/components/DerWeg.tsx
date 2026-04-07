import { motion } from "framer-motion";
import { Code, Settings, Server, Building2 } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Development",
    subtitle: "Das Fundament",
    period: "2008 – 2015",
    description:
      "Mit 16 als Lehrling bei BIT angefangen. PHP, Symfony, MySQL — Webapplikationen in der Bundesverwaltung und in der Privatwirtschaft. Wer seinen eigenen Code in Produktion sieht, lernt schnell, was \"fertig\" wirklich heisst.",
    icon: Code,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    number: "02",
    title: "Engineering",
    subtitle: "Das Werkzeug",
    period: "2015 – 2021",
    description:
      "Docker, Kubernetes, OpenShift, Tekton, ArgoCD, Helm. CI/CD-Pipelines gebaut, nicht nur genutzt. DefectDojo mit SAST als Security-Baseline etabliert.",
    icon: Settings,
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    number: "03",
    title: "Operations",
    subtitle: "Die Realität",
    period: "2015 – 2021",
    description:
      "Parallel zum Engineering: 6 Jahre Betrieb bei BIT. Apache, Tomcat, WSO2, Linux. Pikett. SwissCovid in 7 Wochen live. Wenn die Architektur um 3 Uhr nachts hält, war sie gut.",
    icon: Server,
    color: "from-amber-500/20 to-amber-600/5",
  },
  {
    number: "04",
    title: "Architecture",
    subtitle: "Das Gesamtbild",
    period: "2021 – Aktuell",
    description:
      "Lösungen und Systeme entwerfen, die funktionieren — und die Governance respektieren. TOGAF, ArchiMate, BPMN, SAFe, HERMES sind dabei Mittel, nicht Zweck.",
    icon: Building2,
    color: "from-primary/20 to-primary/5",
  },
];

const DerWeg = () => {
  return (
    <section id="weg" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-1/3 h-96 bg-primary/5 blur-[120px] rounded-full" />

      <div className="container px-6 lg:px-12 relative">
        {/* Section header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4"
            >
              Vom Code zur Architektur
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl italic"
            >
              Der Weg
            </motion.h2>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:block font-display text-8xl text-muted/50"
          >
            16+
          </motion.span>
        </div>

        {/* Phases */}
        <div className="grid md:grid-cols-2 gap-8">
          {phases.map((phase, index) => {
            const PhaseIcon = phase.icon;
            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative border border-border bg-card/30 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="font-display text-6xl text-muted-foreground/20 group-hover:text-primary/30 transition-colors">
                        {phase.number}
                      </span>
                    </div>
                    <div className="p-3 bg-primary/10 text-primary">
                      <PhaseIcon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-1">
                    {phase.title}
                  </h3>
                  <p className="font-body text-sm text-primary mb-1">
                    {phase.subtitle}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mb-4">
                    {phase.period}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DerWeg;
