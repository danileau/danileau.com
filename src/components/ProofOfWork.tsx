import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";

/** Links, check numbers and the colour a ticket wears stay in code. The colour
 *  is the filament stripe: aqua for open source, sun for the professional work,
 *  chrome for what runs at home. */
const FEATURED = { url: "https://ciphra.ch", repo: "https://github.com/danileau/ciphra" };

const PROFESSIONAL = [
  { no: "07", strip: "bg-sun" },
  { no: "08", strip: "bg-sun" },
  { no: "09", strip: "bg-sun" },
];

const PERSONAL = [
  { no: "12", strip: "bg-aqua", url: "https://github.com/danileau/prettypleaseprint" as string | false },
  { no: "21", strip: "bg-chrome-dk", url: false as string | false },
];

const Rail = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4.4 flex-wrap mb-4.4 mt-8.8">
    <span className="font-mono text-xs tracking-widest uppercase text-ink-3">{label}</span>
    <span className="flex-1 min-w-10 h-1.5 bg-chrome border-y border-chrome-dk" />
  </div>
);

const Facets = ({ facets }: { facets: { label: string; text: string }[] }) => (
  <dl className="grid gap-3.3 mt-4.4">
    {facets.map((facet) => (
      <div key={facet.label} className="grid gap-0.5 md:grid-cols-[132px_minmax(0,1fr)] md:gap-4.4">
        <dt className="min-w-0 font-mono text-[11px] font-bold uppercase tracking-wider text-cherry-dk md:pt-0.5">
          {facet.label}
        </dt>
        <dd className="min-w-0 m-0 font-body text-sm text-ink-2 leading-relaxed">{facet.text}</dd>
      </div>
    ))}
  </dl>
);

const ProofOfWork = () => {
  const { c } = useI18n();
  const professional = c.work.professionalProjects.map((p, i) => ({ ...p, ...PROFESSIONAL[i] }));
  const personal = c.work.personalProjects.map((p, i) => ({ ...p, ...PERSONAL[i] }));

  return (
    <section id="work" className="py-8.8">
      <div className="container px-5.5">
        <div className="flex items-center gap-4.4 flex-wrap mb-2.2">
          <span className="font-mono text-xs tracking-widest uppercase text-ink-3">{c.work.kicker}</span>
          <span className="flex-1 min-w-10 h-1.5 bg-chrome border-y border-chrome-dk" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-2.2">{c.work.title}</h2>
        <p className="font-body text-ink-2 max-w-[58ch] mb-5.5">{c.work.note}</p>

        {/* the house special */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.18 }}
          className="ticket shadow-stamp-lg border-3 border-ink rounded-panel bg-porcelain px-4.4 pt-6.6 pb-5.5 sm:px-5.5"
        >
          <div className="flex gap-4.4 items-start flex-wrap">
            <div>
              <h3 className="font-script text-4xl sm:text-5xl text-cherry-dk leading-none">ciphra</h3>
              <p className="font-display text-sm sm:text-base mt-2.2">{c.work.featured.subtitle}</p>
            </div>
            <div className="flex gap-2.2 flex-wrap sm:ml-auto">
              <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border-2 border-ink rounded-chip bg-mint">
                {c.work.live}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border-2 border-ink rounded-chip bg-aqua">
                AGPL-3.0
              </span>
            </div>
          </div>

          <Facets facets={c.work.featured.facets} />

          <div className="flex gap-3.3 flex-wrap mt-5.5">
            <a
              href={FEATURED.url}
              target="_blank"
              rel="noopener noreferrer"
              className="stamp inline-flex items-center gap-2 px-4.4 py-2 border-3 border-ink rounded-chip bg-sun text-ink font-body font-bold text-[11px] tracking-widest uppercase"
            >
              ciphra.ch
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={FEATURED.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="stamp inline-flex items-center gap-2 px-4.4 py-2 border-3 border-ink rounded-chip bg-porcelain text-ink font-body font-bold text-[11px] tracking-widest uppercase"
            >
              <Github className="w-3.5 h-3.5" />
              {c.work.source}
            </a>
          </div>
        </motion.div>

        <Rail label={c.work.personal} />
        <div className="grid gap-5.5 md:grid-cols-2">
          {personal.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.18, delay: index * 0.05 }}
              className="ticket shadow-stamp border-3 border-ink rounded-card bg-porcelain px-4.4 pt-5.5 pb-4.4 flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-2.2 font-mono text-xs text-ink-3">
                <span className="font-bold text-ink">#{project.no}</span>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink hover:text-cherry-dk transition-colors"
                  >
                    {c.work.source}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <h3 className="font-display text-xl mt-3.3 mb-3.3">{project.title}</h3>

              {project.facets.length > 0 ? (
                <Facets facets={project.facets} />
              ) : (
                <p className="font-body text-sm text-ink-2 leading-relaxed">{project.description}</p>
              )}

              <div className="mt-auto pt-4.4">
                <div className={`ppp-extrude h-1.5 rounded-chip ${project.strip}`} />
              </div>
            </motion.article>
          ))}
        </div>

        <Rail label={c.work.professional} />
        <div className="grid gap-5.5 md:grid-cols-3">
          {professional.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.18, delay: index * 0.05 }}
              className="ticket shadow-stamp border-3 border-ink rounded-card bg-porcelain px-4.4 pt-5.5 pb-4.4 flex flex-col"
            >
              <div className="font-mono text-xs text-ink-3">
                <span className="font-bold text-ink">#{project.no}</span> · BIT
              </div>
              <h3 className="font-display text-lg mt-3.3 mb-2.2">{project.title}</h3>
              <p className="font-body text-sm text-ink-2 leading-relaxed">{project.description}</p>
              <div className="mt-auto pt-4.4">
                <div className={`ppp-extrude h-1.5 rounded-chip ${project.strip}`} />
              </div>
            </motion.article>
          ))}
        </div>

        {/* what else is on the board */}
        <div className="border-3 border-ink rounded-panel bg-cream-2 overflow-hidden mt-8.8">
          <div className="bg-ink text-cream px-4.4 py-3.3 font-mono text-xs tracking-widest uppercase">
            {c.work.other}
          </div>
          {c.work.otherWork.map((item) => (
            <div
              key={item.title}
              className="flex items-baseline gap-x-3.3 gap-y-1 flex-wrap px-4.4 py-3.3 border-b border-ink/20 last:border-b-0"
            >
              <b className="font-body font-bold text-sm min-w-0">{item.title}</b>
              <span className="flex-1 min-w-5 border-b-2 border-dotted border-ink-3 -translate-y-1" />
              <span className="min-w-0 break-words font-mono text-[11px] text-ink-2">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofOfWork;
