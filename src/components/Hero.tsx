import { ArrowDown, Mail } from "lucide-react";
import { motion } from "framer-motion";
import profile from "@/assets/profile.png";
import { careerYears } from "@/lib/facts";
import { useI18n, t } from "@/i18n/use-i18n";

const Hero = () => {
  const { c } = useI18n();
  const years = careerYears();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow stagger-2" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block flex-shrink-0"
          >
            <div className="relative w-64 h-64 xl:w-80 xl:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
              <img 
                src={profile} 
                alt="Danilo Alessio Licitra" 
                className="relative w-full h-full object-cover rounded-full border-2 border-border bg-card"
              />
            </div>
          </motion.div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-6"
            >
              {c.hero.eyebrow}
            </motion.p>

            {/* Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-normal leading-[0.9] mb-8"
            >
              <span className="text-foreground">Danilo</span>
              <br />
              <span className="text-gradient italic">Alessio</span>
              <br />
              <span className="text-foreground">Licitra</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-body text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12"
            >
              {t(c.hero.lede1, { years })} <span className="text-foreground">{c.hero.lede2}</span>
              {" "}{c.hero.lede3}
              <span className="text-foreground italic"> {c.hero.lede4}</span>
            </motion.p>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="mailto:main@danileau.com"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 font-body font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto"
              >
                <Mail className="w-5 h-5" />
                {c.hero.ctaContact}
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-3 border border-border text-foreground px-6 py-3 md:px-8 md:py-4 font-body font-medium tracking-wide hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto"
              >
                {c.hero.ctaWork}
                <ArrowDown className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 hidden md:flex"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">{c.hero.scroll}</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
