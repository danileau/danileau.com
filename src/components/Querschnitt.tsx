import { useI18n } from "@/i18n/use-i18n";

const Querschnitt = () => {
  const { c } = useI18n();

  return (
    <section id="skills" className="py-8.8">
      <div className="container px-5.5">
        <div className="flex items-center gap-4.4 flex-wrap mb-2.2">
          <span className="font-mono text-xs tracking-widest uppercase text-ink-3">{c.toolbox.kicker}</span>
          <span className="flex-1 min-w-10 h-1.5 bg-chrome border-y border-chrome-dk" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-5.5">{c.toolbox.title}</h2>

        <div className="border-3 border-ink rounded-panel bg-cream-2 overflow-hidden">
          <div className="bg-ink text-cream px-4.4 py-3.3 font-mono text-xs tracking-widest uppercase">
            {c.toolbox.sides}
          </div>
          <dl className="m-0">
            {c.toolbox.categories.map((category) => (
              <div
                key={category.title}
                className="grid md:grid-cols-[150px_minmax(0,1fr)] border-b border-ink/20 last:border-b-0"
              >
                <dt className="min-w-0 break-words font-mono text-[11px] font-bold uppercase tracking-wider text-cherry-dk px-4.4 pt-3.3 pb-0.5 md:py-3.3 md:border-r md:border-ink/20 md:bg-cream-3">
                  {category.title}
                </dt>
                <dd className="min-w-0 break-words m-0 px-4.4 pb-3.3 md:py-3.3 font-body text-sm text-ink-2 leading-relaxed">
                  {category.items}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Querschnitt;
