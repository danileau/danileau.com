import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoIcon, Wordmark } from "@/components/Logo";
import { useI18n } from "@/i18n/use-i18n";

const Navigation = () => {
  const { c, lang, toggle } = useI18n();
  const navLinks = [
    { label: c.nav.path, href: "#weg" },
    { label: c.nav.work, href: "#work" },
    { label: c.nav.toolkit, href: "#skills" },
    { label: c.nav.education, href: "#education" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""
        }`}
      >
        <div className="container px-6 lg:px-12">
          <nav className="flex items-center justify-between h-20">
            {/* Desktop nav */}
            <a href="#" className="hidden md:flex items-center" aria-label={c.nav.home}>
              <Wordmark />
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <button
                onClick={toggle}
                aria-label={c.switchTo}
                title={c.switchTo}
                className="font-body text-xs tracking-[0.15em] text-muted-foreground hover:text-primary border border-border hover:border-primary px-2.5 py-1 transition-colors"
              >
                {lang === "en" ? "DE" : "EN"}
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label={c.nav.openMenu}
              className="md:hidden w-10 h-10 flex items-center justify-center text-foreground ml-auto"
            >
              <Menu className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="container px-6 py-6 pb-20">
              <div className="flex items-center justify-between mb-12">
                <a href="#" aria-label={c.nav.home}>
                  <LogoIcon size={34} />
                </a>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label={c.nav.closeMenu}
                  className="w-10 h-10 flex items-center justify-center text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={toggle}
                className="self-start font-body text-sm tracking-[0.15em] text-muted-foreground hover:text-primary border border-border px-3 py-1.5 mb-8 transition-colors"
              >
                {c.switchTo}
              </button>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileOpen(false)}
                    className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="mailto:main@danileau.com"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 inline-flex w-full sm:w-fit px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground font-body justify-center"
                >
                  {c.nav.contact}
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
