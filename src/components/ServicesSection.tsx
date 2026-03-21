import { useEffect, useRef, useState } from "react";
import {
  Palette, FileText, Globe, Megaphone, PenTool, Search,
  BarChart3, Share2, CalendarDays, Code, Smartphone, Server,
  ShieldCheck, Cpu, Workflow, Sparkles, Cpu as CpuIcon
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  { icon: Palette, titleKey: "service.identidade", descKey: "service.identidadeDesc", category: "marketing", floatClass: "animate-float" },
  { icon: FileText, titleKey: "service.marketing", descKey: "service.marketingDesc", category: "marketing", floatClass: "animate-float-slow" },
  { icon: Globe, titleKey: "service.landing", descKey: "service.landingDesc", category: "marketing", floatClass: "animate-drift-sideways" },
  { icon: Megaphone, titleKey: "service.trafego", descKey: "service.trafegoDesc", category: "marketing", floatClass: "animate-float-drift" },
  { icon: PenTool, titleKey: "service.copywriting", descKey: "service.copywritingDesc", category: "marketing", floatClass: "animate-float" },
  { icon: Search, titleKey: "service.seo", descKey: "service.seoDesc", category: "marketing", floatClass: "animate-float-slow" },
  { icon: Share2, titleKey: "service.redes", descKey: "service.redesDesc", category: "marketing", floatClass: "animate-drift-sideways" },
  { icon: BarChart3, titleKey: "service.analytics", descKey: "service.analyticsDesc", category: "marketing", floatClass: "animate-float-drift" },
  { icon: CalendarDays, titleKey: "service.calendario", descKey: "service.calendarioDesc", category: "marketing", floatClass: "animate-float" },
  { icon: Code, titleKey: "service.web", descKey: "service.webDesc", category: "tech", floatClass: "animate-float-slow" },
  { icon: Smartphone, titleKey: "service.mobile", descKey: "service.mobileDesc", category: "tech", floatClass: "animate-drift-sideways" },
  { icon: Server, titleKey: "service.apis", descKey: "service.apisDesc", category: "tech", floatClass: "animate-float" },
  { icon: Workflow, titleKey: "service.automacao", descKey: "service.automacaoDesc", category: "tech", floatClass: "animate-float-drift" },
  { icon: ShieldCheck, titleKey: "service.consultoria", descKey: "service.consultoriaDesc", category: "tech", floatClass: "animate-float-slow" },
  { icon: Cpu, titleKey: "service.ia", descKey: "service.iaDesc", category: "tech", floatClass: "animate-drift-sideways" },
];

const floatingShapes = [
  { size: 80, top: "10%", right: "5%", delay: 0 },
  { size: 60, bottom: "20%", left: "3%", delay: 2 },
  { size: 40, top: "50%", left: "8%", delay: 1 },
];

const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  const marketingServices = services.filter((s) => s.category === "marketing");
  const techServices = services.filter((s) => s.category === "tech");

  return (
    <section id="servicos" ref={sectionRef} className="py-24 relative overflow-hidden light-section">
      <div className="dot-pattern" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-2xl animate-float-slow"
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
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-5 py-2 mb-6 border border-purple-500/20">
            <Sparkles size={14} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-700">{t("services.badge")}</span>
          </div>
          <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4 text-gray-900">
            {t("services.title")}
          </h2>
          <p className="font-exo text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-purple-400/50" />
            <span className="category-badge-light category-badge-marketing">
              <Palette size={16} />
              {t("services.marketing")}
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-purple-400/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingServices.map((service, i) => (
              <div
                key={service.titleKey}
                data-animate-item={i}
                className={`service-card-light scroll-animate ${service.floatClass} ${
                  visible ? "visible" : ""
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div className="service-icon-light mb-6">
                  <service.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="font-exo font-bold text-lg mb-3 text-gray-900">
                  {t(service.titleKey)}
                </h3>
                <p className="font-exo text-sm text-gray-500 leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-purple-400/50" />
            <span className="category-badge-light category-badge-tech">
              <CpuIcon size={16} />
              {t("services.tech")}
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-purple-400/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techServices.map((service, i) => (
              <div
                key={service.titleKey}
                data-animate-item={i + marketingServices.length}
                className={`service-card-light scroll-animate ${service.floatClass} ${
                  visible ? "visible" : ""
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transitionDelay: `${(i + marketingServices.length) * 0.08}s`,
                }}
              >
                <div className="service-icon-light mb-6">
                  <service.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="font-exo font-bold text-lg mb-3 text-gray-900">
                  {t(service.titleKey)}
                </h3>
                <p className="font-exo text-sm text-gray-500 leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
