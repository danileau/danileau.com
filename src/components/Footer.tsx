import { motion } from "framer-motion";
import { Mail, MapPin, Github as GithubIcon } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";

const Footer = () => {
  const { c } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 border-t border-border">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container px-6 lg:px-12 relative">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="font-display text-xl sm:text-2xl md:text-3xl italic text-foreground/80 leading-relaxed">
            {c.footer.quote}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl sm:text-3xl mb-4">
              <span className="text-gradient italic">Danilo</span> Licitra
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs">
              {c.footer.blurb}
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">{c.footer.contact}</h4>
            <div className="space-y-4">
              <a
                href="mailto:main@danileau.com"
                className="flex items-center gap-3 font-body text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                main@danileau.com
              </a>
              <div className="flex items-center gap-3 font-body text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {c.footer.location}
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">{c.footer.links}</h4>
            <div className="flex gap-2 md:gap-4">
              <a
                href="https://github.com/danileau"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <p className="font-body text-xs text-muted-foreground">
            &copy; {currentYear} Danilo Alessio Licitra. {c.footer.rights}
          </p>
          <nav className="flex gap-6">
            <a href="#weg" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              {c.nav.path}
            </a>
            <a href="#work" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              {c.nav.work}
            </a>
            <a href="#education" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              {c.nav.education}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
