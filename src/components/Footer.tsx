import { Mail, MapPin, Github as GithubIcon } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";

const Footer = () => {
  const { c } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="checker h-4 border-y-3 border-ink" />

      <footer id="kontakt" className="bg-cream-2 py-6.6">
        <div className="container px-5.5">
          <p className="font-script text-cherry-dk text-xl sm:text-2xl lg:text-3xl leading-snug max-w-[26ch] mb-6.6">
            {c.footer.quote}
          </p>

          <div className="grid gap-5.5 md:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-3.3">
                Danilo Alessio Licitra
              </h4>
              <p className="font-body text-sm text-ink-2 leading-relaxed">{c.footer.blurb}</p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-3.3">
                {c.footer.contact}
              </h4>
              <p className="mb-1.5">
                <a
                  href="mailto:main@danileau.com"
                  className="inline-flex items-center gap-2 font-body text-sm text-ink border-b-2 border-sun hover:border-cherry transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  main@danileau.com
                </a>
              </p>
              <p className="inline-flex items-center gap-2 font-body text-sm text-ink-2">
                <MapPin className="w-4 h-4" />
                {c.footer.location}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-3.3">
                {c.footer.links}
              </h4>
              <p className="mb-1.5">
                <a
                  href="https://github.com/danileau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-ink border-b-2 border-sun hover:border-cherry transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  github.com/danileau
                </a>
              </p>
              <p>
                <a
                  href="https://ciphra.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink border-b-2 border-sun hover:border-cherry transition-colors"
                >
                  ciphra.ch
                </a>
              </p>
            </div>
          </div>

          <div className="mt-6.6 pt-4.4 border-t border-ink/20 flex justify-between gap-3.3 flex-wrap font-mono text-[11px] text-ink-3">
            <span>&copy; {currentYear} Danilo Alessio Licitra. {c.footer.rights}</span>
            <nav className="flex gap-4.4">
              <a href="#weg" className="hover:text-cherry-dk transition-colors">{c.nav.path}</a>
              <a href="#work" className="hover:text-cherry-dk transition-colors">{c.nav.work}</a>
              <a href="#education" className="hover:text-cherry-dk transition-colors">{c.nav.education}</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
