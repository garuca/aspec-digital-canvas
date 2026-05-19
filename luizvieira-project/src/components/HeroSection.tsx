import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import luizHero from "@/assets/luiz/da767694-2c18-420c-a3b6-d1fa31162aa8.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('hero_stat_tobacco'), value: "Premium" },
    { label: t('hero_stat_tasting'), value: "Exclusiva" },
    { label: t('hero_stat_consulting'), value: "Especializada" },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="font-heading text-xs tracking-luxury text-primary uppercase">
                {t('hero_badge')}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-wide uppercase">
              <span className="text-foreground">{t('hero_title_1')}</span>
              <br />
              <span className="text-gold-gradient">{t('hero_title_2')}</span>
              <br />
              <span className="text-foreground">{t('hero_title_3')}</span>
            </h1>

            <p className="text-foreground/70 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
               <a
                 href="/luizvieira/#experiencias"
                 className="group relative inline-flex items-center justify-center gap-3 bg-gold-gradient text-primary-foreground font-heading text-sm tracking-luxury uppercase px-10 py-5 overflow-hidden"
               >

                <span className="relative z-10">{t('hero_btn_experiences')}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </a>
               <a
                 href="/luizvieira/#catalogo-completo"
                 className="group inline-flex items-center justify-center gap-3 border border-primary/30 text-primary font-heading text-sm tracking-luxury uppercase px-10 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all duration-500"
               >

                <span>{t('hero_btn_catalog')}</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-8 h-[1px] bg-primary/40 mx-auto mb-4" />
                  <div className="font-heading text-2xl text-gold-gradient">{stat.value}</div>
                  <div className="text-foreground/50 text-xs tracking-wide mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full max-w-[480px] mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-sm blur-2xl" />
              <div className="relative border border-primary/20 p-3 bg-background/50 backdrop-blur-sm">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img
                    src={luizHero}
                    alt="Luiz Vieira"
                    className="w-full h-full object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent">
                    <div className="border-l-2 border-primary pl-4">
                      <p className="font-heading text-sm text-primary tracking-luxury uppercase mb-1">Cigar Concierge</p>
                      <p className="text-foreground/60 text-sm">Luiz Vieira</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/10 flex items-center justify-center">
                <div className="w-16 h-16 border border-primary/30 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rotate-45 border border-primary/60" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default HeroSection;
