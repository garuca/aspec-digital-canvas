import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ExperiencesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { t } = useLanguage();

  const experiences = [
    {
      title: t('exp_1_title'),
      tagline: t('exp_1_tag'),
      items: [
        { label: t('exp_1_label1'), desc: t('exp_1_desc1') },
        { label: t('exp_1_label2'), desc: t('exp_1_desc2') },
      ],
    },
    {
      title: t('exp_2_title'),
      tagline: t('exp_2_tag'),
      items: [
        { label: t('exp_2_label1'), desc: t('exp_2_desc1') },
        { label: t('exp_2_label2'), desc: t('exp_2_desc2') },
      ],
    },
    {
      title: t('exp_3_title'),
      tagline: t('exp_3_tag'),
      items: [
        { label: t('exp_3_label1'), desc: t('exp_3_desc1') },
        { label: t('exp_3_label2'), desc: t('exp_3_desc2') },
      ],
    },
    {
      title: t('exp_4_title'),
      tagline: t('exp_4_tag'),
      items: [
        { label: t('exp_4_label1'), desc: t('exp_4_desc1') },
      ],
    },
  ];

  return (
    <section id="experiencias" className="py-28">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl tracking-luxury uppercase text-gold-gradient mb-4">
            {t('exp_title')}
          </h2>
          <div className="divider-gold w-48 mx-auto mb-6" />
          <p className="text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
            {t('exp_subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, i) => {
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="group bg-card border border-primary/10 rounded p-6 hover:border-primary/40 hover:shadow-gold transition-all duration-500 cursor-pointer"
              >
                <div className="w-8 h-[1px] bg-primary/40 mb-5" />
                <h3 className="font-heading text-sm tracking-wide text-foreground mb-1">{exp.title}</h3>
                <p className="text-primary/70 text-xs font-light italic mb-3">{exp.tagline}</p>

                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-2 border-t border-primary/10">
                    {exp.items.map((item) => (
                      <div key={item.label} className="pt-2">
                        <p className="text-foreground text-xs font-medium mb-0.5">{item.label}</p>
                        <p className="text-muted-foreground text-xs font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <p className="text-primary/50 text-[10px] uppercase tracking-luxury mt-3 group-hover:text-primary/80 transition-colors">
                  {isExpanded ? t('exp_btn_less') : t('exp_btn_more')}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
