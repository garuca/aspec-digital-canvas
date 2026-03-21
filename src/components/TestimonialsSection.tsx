import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Download, GraduationCap, Zap, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const reasons = [
  { icon: Zap, titleKey: "results.why1", descKey: "results.why1" },
  { icon: Target, titleKey: "results.why2", descKey: "results.why2" },
  { icon: Award, titleKey: "results.why3", descKey: "results.why3" },
];

const floatingShapes = [
  { size: 100, top: "5%", right: "5%", delay: 0 },
  { size: 70, bottom: "15%", left: "3%", delay: 2 },
];

const ResultsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const projectResults = [
    {
      client: "Banco Itaú",
      projectKey: "results.itau.project",
      icon: Users,
      color: "#FF6B00",
      metric: "70M+",
      metricLabelKey: "results.itau.metricLabel",
      descKey: "results.itau.desc",
      tags: ["IA Generativa", "NLP", "Automação"],
    },
    {
      client: "Banco BV",
      projectKey: "results.bv.project",
      icon: Download,
      color: "#06B6D4",
      metric: "10M+",
      metricLabelKey: "results.bv.metricLabel",
      descKey: "results.bv.desc",
      tags: ["Mobile", "React Native", "UX"],
    },
    {
      client: "FL Mandic",
      projectKey: "results.mandic.project",
      icon: GraduationCap,
      color: "#A855F7",
      metric: "100%",
      metricLabelKey: "results.mandic.metricLabel",
      descKey: "results.mandic.desc",
      tags: ["Web App", "Gestão", "Educação"],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden dark-section">
      <div className="dark-grid-pattern" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-2xl animate-float-slow"
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              right: shape.right,
              bottom: shape.bottom,
              left: shape.left,
              animationDelay: `${shape.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-5 py-2 mb-6 border border-cyan-500/30">
            <TrendingUp size={14} className="text-cyan-400" />
            <span className="text-sm font-medium text-white/80">{t("results.badge")}</span>
          </div>
          <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4 text-white">
            {t("results.title")}
          </h2>
          <p className="font-exo text-lg text-white/50 max-w-2xl mx-auto">
            {t("results.subtitle")}
          </p>
        </div>

        {/* Global Stats */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { value: "150+", labelKey: "results.projects" },
            { value: "50+", labelKey: "results.clients" },
            { value: "10+", labelKey: "team.exp" },
            { value: "98%", labelKey: "results.satisfaction" },
          ].map((stat, i) => (
            <div
              key={stat.labelKey}
              className="global-stat-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-white font-exo mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 font-exo">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>

        {/* Project Results */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {projectResults.map((project, i) => (
            <div
              key={project.client}
              className="result-card"
              style={{ 
                transitionDelay: `${300 + i * 100}ms`,
                '--accent': project.color 
              } as React.CSSProperties}
            >
              <div className="result-card-header">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${project.color}20` }}
                >
                  <project.icon size={28} style={{ color: project.color }} />
                </div>
                <div className="flex-1">
                  <div className="font-exo text-xs text-white/40 uppercase tracking-wider">
                    {project.client}
                  </div>
                  <div className="font-exo font-bold text-white">
                    {t(project.projectKey)}
                  </div>
                </div>
              </div>

              <div className="result-metric my-6">
                <span className="text-5xl lg:text-6xl font-bold font-exo" style={{ color: project.color }}>
                  {project.metric}
                </span>
                <span className="block text-lg text-white/60 font-exo mt-1">
                  {t(project.metricLabelKey)}
                </span>
              </div>

              <p className="font-exo text-sm text-white/50 leading-relaxed mb-4">
                {t(project.descKey)}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div 
                className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                style={{ 
                  width: visible ? "100%" : "0%",
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className={`transition-all duration-1000 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="font-exo font-bold text-2xl text-white text-center mb-8">
            {t("results.whyTitle")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {reasons.map((reason, i) => (
              <div
                key={reason.titleKey}
                className="reason-card text-center"
                style={{ transitionDelay: `${500 + i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <reason.icon size={24} className="text-purple-400" />
                </div>
                <h4 className="font-exo font-bold text-white mb-2">{t(reason.titleKey)}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-exo text-white/50 mb-6">
            Comece a construir seus próprios números
          </p>
          <Button variant="gradient" size="lg" className="gap-2 px-10 py-6 rounded-xl shadow-lg shadow-purple-500/30">
            {t("results.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
