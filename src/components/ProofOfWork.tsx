import { motion } from "framer-motion";
import { ExternalLink, Shield, Server, Github, Database, ScanSearch, ShieldCheck, Printer } from "lucide-react";

const featured = {
  title: "ciphra",
  subtitle: "Zero-knowledge health tracker — encrypted by design.",
  facets: [
    {
      label: "Decision",
      text: "Every key is derived in the browser. The server stores opaque blobs and cannot read health data — not under a court order, and not for me.",
    },
    {
      label: "Price",
      text: "A lost recovery code is a lost account. There is no reset. Anyone promising both safe and convenient is lying about one of them.",
    },
    {
      label: "Surprise",
      text: "A caregiver showed me that her three-minute evening check in a spreadsheet outperformed my form. Since then the benchmark is not the whitepaper — it is whatever that person would otherwise use.",
    },
  ],
  url: "https://ciphra.ch",
  repo: "https://github.com/danileau/ciphra",
  icon: Shield,
};

const fachprojekte = [
  {
    title: "Infrastruktur-Datenplattform",
    description:
      "Consolidates IT infrastructure data from a dozen sources into PostgreSQL and correlates it across app ID, IP, team and hostname. Cross-layer analysis, automated dependency detection, cloud-readiness assessment. Python/FastAPI, React.",
    icon: Database,
  },
  {
    title: "Repository-Analysator",
    description:
      "A CLI tool that detects the technology actually in use across code repositories — languages, frameworks, containers, IaC. Feeds the infrastructure platform. Python.",
    icon: ScanSearch,
  },
  {
    title: "SBOM- & Vulnerability-Analyse",
    description:
      "Analyses software bills of materials and container images for known vulnerabilities, wired into DefectDojo. Python/Bash.",
    icon: ShieldCheck,
  },
];

type Facet = { label: string; text: string };

const projects: {
  title: string;
  description?: string;
  facets?: Facet[];
  icon: typeof Shield;
  url: string | false;
}[] = [
  {
    title: "Pretty Please Print",
    facets: [
      {
        label: "Decision",
        text: "No public sign-up. An account cannot come into existence without an invitation — enforced in a single hook that every authentication method passes through.",
      },
      {
        label: "Price",
        text: "No multi-tenancy, no billing, no queue theory. Built for five people and one printer, and honest about it. AGPL, because the worry was reciprocity and not revenue.",
      },
      {
        label: "Surprise",
        text: "The restore procedure was written from reasoning, not from experience. The first real run — data destroyed in between, checked against a planted canary row — turned up three things that never surface in your head. Since then \"documented\" is not a status.",
      },
    ],
    icon: Printer,
    url: "https://github.com/danileau/prettypleaseprint",
  },
  {
    title: "Homelab",
    description:
      "Bookstack, Plex, Manyfold, a plant monitor on ESP32/MQTT, Pixoo-REST. Anyone preaching operations should also live there.",
    icon: Server,
    url: false,
  },
];

const otherWork = [
  { title: "SwissCovid & Covid Certificate", description: "Build, operations, on-call — federal administration, 2020/21" },
  { title: "epilepc.ch", description: "Seizure diary — HF thesis 2019, succeeded by ciphra" },
  { title: "Les Ateliers", description: "Web shop, Bern" },
  { title: "Couture Lui Luis", description: "Website & tools, Bern" },
  { title: "Musikgesellschaft Bern-Bümpliz", description: "Website" },
  { title: "Lulus Leckereien", description: "IT support & website" },
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
            What I build
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
            I test architecture decisions before I recommend them.
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
              <dl className="max-w-3xl mb-6 space-y-3">
                {featured.facets.map((facet) => (
                  <div key={facet.label} className="sm:flex sm:gap-6">
                    <dt className="font-body text-xs tracking-[0.2em] uppercase text-primary sm:w-32 sm:flex-shrink-0 sm:pt-1 mb-1 sm:mb-0">
                      {facet.label}
                    </dt>
                    <dd className="font-body text-foreground/80 leading-relaxed min-w-0">
                      {facet.text}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-xs text-foreground hover:text-primary transition-colors"
                >
                  ciphra.ch
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={featured.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  Source
                </a>
                <span className="px-2 py-0.5 bg-primary/10 text-primary font-body text-xs">
                  live
                </span>
                <span className="px-2 py-0.5 border border-border text-muted-foreground font-body text-xs">
                  AGPL-3.0
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional work */}
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6"
        >
          Professional
        </motion.h4>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {fachprojekte.map((project, index) => {
            const ProjectIcon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 sm:p-8 border border-border hover:border-primary/50 bg-card transition-all duration-300"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  <ProjectIcon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Open source & personal */}
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6"
        >
          Open source &amp; personal
        </motion.h4>
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
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        </a>
                      )}
                    </div>
                    {project.facets ? (
                      <dl className="space-y-2.5">
                        {project.facets.map((facet) => (
                          <div key={facet.label}>
                            <dt className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-primary mb-0.5">
                              {facet.label}
                            </dt>
                            <dd className="font-body text-sm text-muted-foreground leading-relaxed">
                              {facet.text}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <p className="font-body text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    )}
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
            Other work
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
