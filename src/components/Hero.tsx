import { ArrowDown, Mail } from "lucide-react";
import { careerYears } from "@/lib/facts";
import { useI18n, t } from "@/i18n/use-i18n";

const Hero = () => {
  const { c } = useI18n();
  const years = careerYears();

  return (
    <>
      <section className="relative overflow-hidden py-8.8">
        <div className="starburst absolute -inset-x-10 -top-1/3 h-[130%] pointer-events-none" aria-hidden="true" />

        <div className="container px-5.5 relative">
          <div className="grid gap-6.6 lg:grid-cols-[1.5fr_0.9fr] items-center">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-ink-3 mb-2.2">
                {c.hero.role}
              </p>

              <h1 className="font-script text-cherry-dk leading-[1.02] text-5xl sm:text-6xl lg:text-8xl ppp-neon">
                Danilo Licitra
              </h1>

              <p className="font-display text-base sm:text-xl lg:text-2xl mt-3.3 leading-tight">
                {c.hero.eyebrow}
              </p>

              <p className="font-body text-base lg:text-lg text-ink-2 mt-4.4 max-w-[46ch] leading-relaxed">
                {t(c.hero.lede1, { years })}{" "}
                <b className="font-bold text-ink">{c.hero.lede2}</b>{" "}
                {c.hero.lede3}{" "}
                <span className="text-cherry-dk">{c.hero.lede4}</span>
              </p>

              <div className="flex flex-wrap gap-3.3 mt-5.5">
                <a
                  href="#work"
                  className="stamp inline-flex items-center gap-2.2 px-5.5 py-3 border-3 border-ink rounded-chip bg-cherry-dk text-cream font-body font-bold text-xs tracking-widest uppercase"
                >
                  {c.hero.ctaWork}
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="mailto:main@danileau.com"
                  className="stamp inline-flex items-center gap-2.2 px-5.5 py-3 border-3 border-ink rounded-chip bg-sun text-ink font-body font-bold text-xs tracking-widest uppercase"
                >
                  <Mail className="w-4 h-4" />
                  {c.hero.ctaContact}
                </a>
              </div>
            </div>

            {/* The plaque on the counter. */}
            <div className="shadow-stamp-lg border-3 border-ink rounded-panel bg-porcelain p-5.5 text-center">
              <span className="font-display text-6xl text-cherry leading-none tabular-nums block">
                {years}
              </span>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-2 mt-3.3 leading-snug whitespace-pre-line">
                {c.hero.plaque}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="checker h-4 border-y-3 border-ink" />
    </>
  );
};

export default Hero;
