import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoIcon, Wordmark } from "@/components/Logo";
import { useI18n } from "@/i18n/use-i18n";

const Navigation = () => {
  const { c, lang, toggle } = useI18n();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: c.nav.path, href: "#weg" },
    { label: c.nav.work, href: "#work" },
    { label: c.nav.toolkit, href: "#skills" },
    { label: c.nav.education, href: "#education" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* The chrome fascia above the counter. */}
      <div className="h-3.5 bg-chrome layers border-b-3 border-ink" />

      <header className="sticky top-0 z-50 bg-cream-2 border-b-3 border-ink">
        <div className="container px-5.5">
          <nav className="flex items-center gap-2.2 min-h-[56px] flex-wrap">
            <a href="#" aria-label={c.nav.home} className="mr-auto">
              <Wordmark />
            </a>

            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs tracking-wider uppercase text-ink-2 px-2.5 py-1.5 rounded-chip hover:bg-cream-3 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggle}
                aria-label={c.switchTo}
                title={c.switchTo}
                className="ml-2 font-mono text-xs tracking-wider uppercase text-ink px-3 py-1.5 rounded-chip border-2 border-ink bg-porcelain hover:bg-sun transition-colors"
              >
                {lang === "en" ? "DE" : "EN"}
              </button>
            </div>

            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label={c.nav.openMenu}
              className="md:hidden w-10 h-10 flex items-center justify-center text-ink"
            >
              <Menu className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-cream plate md:hidden overflow-y-auto"
          >
            <div className="container px-5.5 py-5.5">
              <div className="flex items-center justify-between mb-8.8">
                <a href="#" aria-label={c.nav.home} onClick={() => setIsMobileOpen(false)}>
                  <LogoIcon size={38} />
                </a>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label={c.nav.closeMenu}
                  className="w-10 h-10 flex items-center justify-center text-ink border-2 border-ink rounded-chip bg-porcelain"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={toggle}
                className="stamp font-body font-bold text-xs tracking-widest uppercase px-4 py-2.5 border-3 border-ink rounded-chip bg-sun text-ink mb-6.6"
              >
                {c.switchTo}
              </button>

              <nav className="flex flex-col gap-3.3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="font-display text-2xl sm:text-3xl text-ink hover:text-cherry-dk transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="mailto:main@danileau.com"
                  className="stamp mt-4.4 inline-flex w-fit px-5.5 py-3.3 border-3 border-ink rounded-chip bg-cherry-dk text-cream font-body font-bold text-xs tracking-widest uppercase"
                >
                  {c.nav.contact}
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
