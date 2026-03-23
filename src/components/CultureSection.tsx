import { useEffect, useRef, useState } from "react";
import { Target, Lightbulb, Rocket, RefreshCw, Sparkles, Zap, TrendingUp, BarChart3 } from "lucide-react";
import ArticleModal from "./ArticleModal";
import { useLanguage } from "@/context/LanguageContext";
import { getBasePath } from "@/utils/basePath";

const pillars = [
  {
    icon: Target,
    titleKey: "pillar1.title",
    descKey: "pillar1.desc",
    floatClass: "animate-float",
    accent: "#5B2EFF",
  },
  {
    icon: Lightbulb,
    titleKey: "pillar2.title",
    descKey: "pillar2.desc",
    floatClass: "animate-float-slow",
    accent: "#8B5CF6",
  },
  {
    icon: Rocket,
    titleKey: "pillar3.title",
    descKey: "pillar3.desc",
    floatClass: "animate-drift-sideways",
    accent: "#A855F7",
  },
  {
    icon: RefreshCw,
    titleKey: "pillar4.title",
    descKey: "pillar4.desc",
    floatClass: "animate-float-drift",
    accent: "#D946EF",
  },
];

const lightStars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: `${Math.random() * 4}s`,
  duration: `${2 + Math.random() * 3}s`,
}));

const floatingShapes = [
  { size: 60, top: "15%", left: "5%", delay: 0 },
  { size: 40, top: "60%", left: "8%", delay: 2 },
  { size: 80, top: "70%", right: "5%", delay: 1 },
  { size: 50, top: "30%", right: "10%", delay: 3 },
];

const CultureSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const basePath = getBasePath();

  const blocksWithPath = [
    {
      number: "01",
      titleKey: "block1.title",
      descKey: "block1.desc",
      image: `${basePath}/illustrations/estrategia-01.svg`,
      reverse: true,
      icon: Sparkles,
    },
    {
      number: "02",
      titleKey: "block2.title",
      descKey: "block2.desc",
      image: `${basePath}/illustrations/estrategia-02.svg`,
      reverse: true,
      icon: TrendingUp,
    },
    {
      number: "03",
      titleKey: "block3.title",
      descKey: "block3.desc",
      image: `${basePath}/illustrations/estrategia-03.svg`,
      reverse: true,
      icon: Rocket,
    },
    {
      number: "04",
      titleKey: "block4.title",
      descKey: "block4.desc",
      image: `${basePath}/illustrations/estrategia-04.svg`,
      reverse: true,
      icon: BarChart3,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sectionRef}>
        <section id="abordagem" className="py-24 relative overflow-hidden light-section">
          <div className="dot-pattern" />
          
          <div className="orb orb-1" />
          <div className="orb orb-2" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className={`text-center mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-5 py-2 mb-6">
                <Zap size={14} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-700">{t("culture.badge")}</span>
              </div>
              <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4 text-gray-900">
                {t("culture.title")}
              </h2>
              <p className="font-exo text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                {t("culture.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 relative">
              {floatingShapes.map((shape, i) => (
                <div
                  key={i}
                  className="floating-shape floating-shape-gradient animate-float-slow opacity-30"
                  style={{
                    width: shape.size,
                    height: shape.size,
                    top: shape.top,
                    left: shape.left,
                    animationDelay: `${shape.delay}s`,
                  }}
                />
              ))}
              
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.titleKey}
                  data-animate-item={i}
                  className={`pillar-card scroll-animate ${pillar.floatClass} ${
                    visible ? "visible" : ""
                  }`}
                  style={{
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  <div className="pillar-icon">
                    <pillar.icon size={32} className="text-white" />
                  </div>
                  <div className="relative">
                    <span 
                      className="absolute -top-4 -left-2 text-5xl font-bold opacity-10"
                      style={{ color: pillar.accent }}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-exo font-bold text-xl mb-3 text-gray-900 relative z-10">
                      {t(pillar.titleKey)}
                    </h3>
                  </div>
                  <p className="font-exo text-sm text-gray-500 leading-relaxed relative z-10">
                    {t(pillar.descKey)}
                  </p>
                  
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${pillar.accent}, transparent)` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-16">
              {blocksWithPath.map((block, i) => (
                <div
                  key={block.titleKey}
                  data-animate-item={i}
                  className={`scroll-animate ${visible ? "visible" : ""}`}
                  style={{ transitionDelay: `${(i + pillars.length) * 0.15}s` }}
                >
                  <div className={`content-block ${block.reverse ? "lg:pl-20" : "lg:pr-20"}`}>
                    <span className="content-block-number">{block.number}</span>
                    
                    <div className={`flex flex-col ${block.reverse ? "lg:flex-row-reverse" : ""} items-center gap-10`}>
                      <div className="flex-1 relative">
                        <div className="relative group">
                          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                          <img
                            src={block.image}
                            alt={t(block.titleKey)}
                            className={`rounded-2xl w-full object-cover max-h-[380px] relative z-10 ${block.reverse ? "animate-float" : "animate-float-slow"}`}
                            loading="lazy"
                          />
                          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg z-20">
                            <block.icon size={24} className="text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                            <block.icon size={18} className="text-purple-600" />
                          </div>
                          <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">{t("culture.strategy")} {block.number}</span>
                        </div>
                        <h3 className="font-exo font-bold text-3xl mb-4 text-gray-900 leading-tight">
                          {t(block.titleKey)}
                        </h3>
                        <p className="font-exo text-gray-600 leading-relaxed text-base mb-6">
                          {t(block.descKey)}
                        </p>
                        
                        <button 
                          onClick={() => setSelectedArticle(block.number)}
                          className="flex items-center gap-2 text-purple-600 font-semibold text-sm group cursor-pointer hover:text-purple-700 transition-colors"
                        >
                          <span>{t("culture.deepDive")}</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none stars-light">
            {lightStars.map((star) => (
              <span
                key={star.id}
                className="absolute rounded-full animate-[twinkle-light_var(--dur)_ease-in-out_var(--delay)_infinite]"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  "--delay": star.delay,
                  "--dur": star.duration,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </section>
      </div>

      <ArticleModal
        isOpen={selectedArticle !== null}
        onClose={() => setSelectedArticle(null)}
        strategyNumber={selectedArticle || ""}
      />
    </>
  );
};

export default CultureSection;
