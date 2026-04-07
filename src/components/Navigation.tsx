import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Der Weg", href: "#weg" },
  { label: "Projekte", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Bildung", href: "#education" },
];

const Navigation = () => {
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
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-foreground"
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
                <a href="#" className="font-display text-2xl">
                  <span className="text-gradient italic">D</span>
                  <span className="text-foreground">L</span>
                </a>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

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
                  Kontakt aufnehmen
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
