import { motion } from "framer-motion";
// Podemos reutilizar a imagem de fundo ou usar uma cor
import bgImage from "@/assets/luiz/dbed82d2-2cdc-40cb-9440-e1305f1c858a.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

const CatalogSection = () => {
  const { t } = useLanguage();

  return (
    <section id="catalogo-completo" className="relative py-32 overflow-hidden">
      <img
        src={bgImage}
        alt="Catálogo Premium"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
        loading="lazy"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/90" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="font-heading text-2xl md:text-3xl tracking-luxury uppercase text-gold-gradient">
            {t('cat_badge')}
          </h2>
          <div className="divider-gold w-48 mx-auto" />
          <p className="text-foreground font-light leading-relaxed text-lg">
            {t('cat_desc')}
          </p>
          <a
             href="/#catalogo-completo"
            className="inline-block border border-primary/40 text-primary font-heading text-sm tracking-luxury uppercase px-8 py-4 rounded hover:border-primary/70 hover:shadow-gold transition-all duration-500 mt-6"
          >
            {t('cat_btn')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogSection;
