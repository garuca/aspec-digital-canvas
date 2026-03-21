import { useState } from "react";
import { Zap, Users, Palette, Code2, TrendingUp, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const differentials = [
  {
    icon: Users,
    titleKey: "diff.team",
    descKey: "diff.teamDesc",
    color: "#D946EF",
  },
  {
    icon: TrendingUp,
    titleKey: "diff.result",
    descKey: "diff.resultDesc",
    color: "#22C55E",
  },
  {
    icon: Zap,
    titleKey: "diff.speed",
    descKey: "diff.speedDesc",
    color: "#F59E0B",
  },
  {
    icon: CheckCircle2,
    titleKey: "diff.transparency",
    descKey: "diff.transparencyDesc",
    color: "#06B6D4",
  },
];

const DifferentialsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden dark-section">
      <div className="dark-grid-pattern" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-exo font-bold text-3xl sm:text-4xl text-white mb-4">
            {t("diff.title")}
          </h2>
          <p className="font-exo text-white/50 max-w-xl mx-auto">
            {t("diff.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {differentials.map((item, i) => (
            <div
              key={item.titleKey}
              className="differential-card"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${item.color}20` }}
              >
                <item.icon size={28} style={{ color: item.color }} />
              </div>
              <h3 className="font-exo font-bold text-lg text-white mb-2">
                {t(item.titleKey)}
              </h3>
              <p className="font-exo text-sm text-white/50 leading-relaxed">
                {t(item.descKey)}
              </p>
              <div 
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
