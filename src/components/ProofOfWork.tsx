import { motion } from "framer-motion";
import { ExternalLink, Shield, Server, Brain, Layers } from "lucide-react";

const featured = {
  title: "ciphra",
  subtitle: "Privacy-first Health Tracker — encrypted by design.",
  description:
    "Nachfolger meiner HF-Diplomarbeit epilepc.ch. E2E-verschlüsselt mit Argon2id + AES-256-GCM. SvelteKit, Flask, PostgreSQL. Blueprint-System für Epilepsie, ADHS, Diabetes, Migräne, Burnout. Eine Betreuerin hat mir gezeigt, dass ihr Excel-Abendcheck in 3 Minuten mehr leistet als mein Formular-Ansatz — also hab ich das UX-Konzept von Grund auf neu gedacht.",
  url: "https://ciphra.ch",
  comingSoon: true,
  icon: Shield,
};

const projects = [
  {
    title: "archimate-js",
    description:
      "ArchiMate-Modeler auf Basis von bpmn.io. Weil die bestehenden Tools nicht reichen.",
    icon: Layers,
    url: "https://github.com/danileau/archimate-js",
  },
  {
    title: "secret-notes",
    description:
      "Zero-Knowledge Auth mit SRP-Protokoll. Demonstration, dass der Server nie das Passwort sehen muss.",
    icon: Shield,
    url: false,
  },
  {
    title: "SwissCovid App & Covid-Zertifikat",
    description:
      "Projektmitarbeit Bundesverwaltung: Aufbau, Betrieb, Pikett. 7 Wochen von Null auf Live.",
    icon: Brain,
    url: false,
  },
  {
    title: "Homelab",
    description:
      "Bookstack, Plex, Manyfold, Plant-Monitor (ESP32/MQTT), Pixoo-REST. Wer Betrieb predigt, sollte ihn auch leben.",
    icon: Server,
    url: false,
  },
];

const otherWork = [
  { title: "epilepc.ch", description: "Anfallstagebuch — HF-Diplomarbeit 2019" },
  { title: "Les Ateliers", description: "Webshop, Bern" },
  { title: "Couture Lui Luis", description: "Webpage, Bern" },
  { title: "Musikgesellschaft Bern-Bümpliz", description: "Webpage" },
  { title: "Lulus Leckereien", description: "IT-Support & Webpage" },
];

const ProofOfWork = () => {
  return (
    <section id="work" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container px-6 lg:px-12 relative">
        {/* Section header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4"
          >
            Was ich baue
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl italic mb-4"
          >
            Proof of Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-muted-foreground max-w-lg leading-relaxed"
          >
            Architekturentscheide teste ich, bevor ich sie empfehle.
          </motion.p>
        </div>

        {/* Featured project — ciphra */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group block mb-16"
        >
          <div className="relative p-6 sm:p-8 lg:p-12 card-gradient border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-primary/10 text-primary">
                  <featured.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="font-body text-sm text-primary italic">
                    {featured.subtitle}
                  </p>
                </div>
              </div>
              <p className="font-body text-foreground/80 leading-relaxed max-w-3xl mb-6">
                {featured.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs text-muted-foreground tracking-wide">
                  ciphra.ch
                </span>
                <span className="px-2 py-0.5 bg-primary/10 text-primary font-body text-xs">
                  coming soon
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary project grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {projects.map((project, index) => {
            const ProjectIcon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 sm:p-8 border border-border hover:border-primary/50 bg-card transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                    <ProjectIcon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.url && (
                        <a
                          href={project.url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        </a>
                      )}
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Other work — compact list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8"
        >
          <h4 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Weitere Arbeiten
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {otherWork.map((item, index) => (
              <span key={index} className="font-body text-sm text-foreground/60">
                {item.title}
                <span className="text-muted-foreground"> — {item.description}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofOfWork;
