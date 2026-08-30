import { motion } from "framer-motion";

const categories = [
  {
    title: "Methods",
    items: "TOGAF ABB/SBB · ArchiMate 3.2 · BPMN 2.0 · UML 2.5 · SAFe (10+ yrs) · HERMES (16 yrs)",
  },
  {
    title: "Security",
    items: "DefectDojo · SAST/DAST · Trivy · Argon2id · AES-256-GCM · Keycloak · Zero-Knowledge",
  },
  {
    title: "Stack",
    items: "Python/FastAPI · SvelteKit · React/TypeScript · PHP/Symfony · PostgreSQL · Docker · OpenShift · Helm · GitOps",
  },
  {
    title: "IoT",
    items: "ESP32 · Arduino · MQTT · sensors · 3D printing",
  },
  {
    title: "Languages",
    items: "German (native) · Italiano (madrelingua — also for swearing, it scales better) · English (C2) · Français (basics)",
  },
];

const Querschnitt = () => {
  return (
    <section id="skills" className="py-32 relative">
      <div className="container px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4"
          >
            Cross-section
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl italic mb-16"
          >
            The Toolbox
          </motion.h2>

          <div className="space-y-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row sm:gap-8"
              >
                <h3 className="font-body text-xs tracking-[0.2em] uppercase text-primary w-28 flex-shrink-0 mb-2 sm:mb-0 sm:pt-0.5">
                  {category.title}
                </h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  {category.items}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Querschnitt;
