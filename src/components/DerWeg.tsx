import { motion } from "framer-motion";
import { useI18n } from "@/i18n/use-i18n";

/** Colour, order and number stay in code; every string comes from the dictionary.
 *  A short-order rail with dockets clipped along it is a status flow, and so is
 *  a career — which is why this section is the rail. */
const META = [
  { number: "01", title: "Development", strip: "bg-aqua", role: "bg-aqua-wash" },
  { number: "02", title: "Engineering", strip: "bg-mint", role: "bg-mint-wash" },
  { number: "03", title: "Operations", strip: "bg-sun", role: "bg-sun-wash" },
  { number: "04", title: "Architecture", strip: "bg-cherry", role: "bg-cherry-wash" },
];

const DerWeg = () => {
  const { c } = useI18n();
  const phases = META.map((m, i) => ({ ...m, ...c.path.phases[i] }));

  return (
    <section id="weg" className="py-8.8">
      <div className="container px-5.5">
        <div className="flex items-center gap-4.4 flex-wrap mb-2.2">
          <span className="font-mono text-xs tracking-widest uppercase text-ink-3">{c.path.kicker}</span>
          <span className="flex-1 min-w-10 h-1.5 bg-chrome border-y border-chrome-dk" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-5.5">{c.path.title}</h2>

        {/* the rail the dockets hang from */}
        <div className="relative pt-5.5">
          <div className="absolute top-0 inset-x-0 h-2 bg-chrome border-2 border-ink rounded-chip" />

          <div className="grid gap-5.5 md:grid-cols-2 xl:grid-cols-4">
            {phases.map((phase, index) => (
              <motion.article
                key={phase.number}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.18, delay: index * 0.05 }}
                className="ticket shadow-stamp border-3 border-ink rounded-card bg-porcelain px-4.4 pt-5.5 pb-4.4 flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-2.2 font-mono text-xs text-ink-3">
                  <span className="font-bold text-ink">#{phase.number}</span>
                  <span>{phase.period}</span>
                </div>

                <h3 className="font-display text-xl mt-3.3 mb-0.5">{phase.title}</h3>
                <span className={`self-start font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 border-2 border-ink rounded-chip mb-3.3 ${phase.role}`}>
                  {phase.subtitle}
                </span>

                <p className="font-body text-sm text-ink-2 leading-relaxed">{phase.description}</p>
                <div className={`ppp-extrude h-1.5 rounded-chip mt-4.4 ${phase.strip}`} />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DerWeg;
