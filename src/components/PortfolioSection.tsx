import { useEffect, useRef, useState, useMemo } from "react";
import { Brush, Code2, ExternalLink, Sparkles, Palette, Cpu, Database, Globe, Layout, Image, GraduationCap, Bot, Bike, Building2, Moon, CheckSquare, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBasePath } from "@/utils/basePath";
import ProjectModal from "./ProjectModal";
import SocialmediaModal from "./SocialmediaModal";
import SLMandicModal from "./SLMandicModal";
import BVModal from "./BVModal";
import ItauModal from "./ItauModal";
import AppMotoModal from "./AppMotoModal";

interface Project {
  titleKey: string;
  clientKey: string;
  descriptionKey: string;
  tagsKey: string;
  icon: React.ElementType;
  color: string;
  metricKey: string;
  images?: string[];
  isSocialmedia?: boolean;
  isSLMandic?: boolean;
  isBV?: boolean;
  isItau?: boolean;
  isAppMoto?: boolean;
  previewImage?: string;
  gradient?: string;
  accentColor?: string;
  designStyle?: "luna" | "socialmedia" | "taskmaster" | "virtus";
  type: "design" | "tech";
  weight: number;
}

const floatingElements = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: `${3 + Math.random() * 4}s`,
  delay: `${Math.random() * 3}s`,
}));

const portfolioStars = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 0.5,
  delay: `${Math.random() * 4}s`,
  duration: `${2 + Math.random() * 3}s`,
}));

const PortfolioSection = () => {
  const basePath = getBasePath();
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const allProjects: Project[] = [
    {
      titleKey: "portfolio.luna.title",
      clientKey: "portfolio.luna.client",
      descriptionKey: "portfolio.luna.description",
      tagsKey: "portfolio.luna.tags",
      icon: Moon,
      color: "#D946EF",
      metricKey: "portfolio.luna.metric",
      images: [
        `${basePath}/portfolio/luna/luna_projeto_aspec1.png`,
        `${basePath}/portfolio/luna/luna_projeto_aspec2.png`,
        `${basePath}/portfolio/luna/luna_projeto_aspec3.png`,
        `${basePath}/portfolio/luna/luna_projeto_aspec4.png`,
        `${basePath}/portfolio/luna/luna_projeto_aspec5.png`,
      ],
      previewImage: `${basePath}/portfolio/luna/luna_projeto_aspec1.png`,
      gradient: "from-pink-500/30 via-purple-500/20 to-fuchsia-500/30",
      accentColor: "#D946EF",
      designStyle: "luna",
      type: "design",
      weight: 7,
    },
    {
      titleKey: "portfolio.socialmedia.title",
      clientKey: "portfolio.socialmedia.client",
      descriptionKey: "portfolio.socialmedia.description",
      tagsKey: "portfolio.socialmedia.tags",
      icon: Image,
      color: "#5B2EFF",
      metricKey: "portfolio.socialmedia.metric",
      isSocialmedia: true,
      gradient: "from-indigo-600/30 via-blue-500/20 to-violet-500/30",
      accentColor: "#5B2EFF",
      designStyle: "socialmedia",
      type: "design",
      weight: 6,
    },
    {
      titleKey: "portfolio.taskmaster.title",
      clientKey: "portfolio.taskmaster.client",
      descriptionKey: "portfolio.taskmaster.description",
      tagsKey: "portfolio.taskmaster.tags",
      icon: CheckSquare,
      color: "#8B5CF6",
      metricKey: "portfolio.taskmaster.metric",
      images: [
        `${basePath}/portfolio/taskmaster/taskmaster_projeto_aspec1.png`,
        `${basePath}/portfolio/taskmaster/taskmaster_projeto_aspec2.png`,
        `${basePath}/portfolio/taskmaster/taskmaster_projeto_aspec3.png`,
        `${basePath}/portfolio/taskmaster/taskmaster_projeto_aspec4.png`,
      ],
      previewImage: `${basePath}/portfolio/taskmaster/taskmaster_projeto_aspec1.png`,
      gradient: "from-violet-600/30 via-purple-500/20 to-indigo-500/30",
      accentColor: "#8B5CF6",
      designStyle: "taskmaster",
      type: "design",
      weight: 5,
    },
    {
      titleKey: "portfolio.virtus.title",
      clientKey: "portfolio.virtus.client",
      descriptionKey: "portfolio.virtus.description",
      tagsKey: "portfolio.virtus.tags",
      icon: Heart,
      color: "#EC4899",
      metricKey: "portfolio.virtus.metric",
      images: [
        `${basePath}/portfolio/virtus/virtus_projeto_aspec1.png`,
        `${basePath}/portfolio/virtus/virtus_projeto_aspec2.png`,
        `${basePath}/portfolio/virtus/virtus_projeto_aspec3.png`,
        `${basePath}/portfolio/virtus/virtus_projeto_aspec4.png`,
      ],
      previewImage: `${basePath}/portfolio/virtus/virtus_projeto_aspec1.png`,
      gradient: "from-pink-600/30 via-rose-500/20 to-pink-500/30",
      accentColor: "#EC4899",
      designStyle: "virtus",
      type: "design",
      weight: 4,
    },
    {
      titleKey: "portfolio.slmandic.title",
      clientKey: "portfolio.slmandic.client",
      descriptionKey: "portfolio.slmandic.description",
      tagsKey: "portfolio.slmandic.tags",
      icon: GraduationCap,
      color: "#A855F7",
      metricKey: "portfolio.slmandic.metric",
      isSLMandic: true,
      previewImage: `${basePath}/portfolio/slmandic/unnamed.webp`,
      gradient: "from-purple-600/20 to-pink-600/20",
      accentColor: "#A855F7",
      type: "tech",
      weight: 8,
    },
    {
      titleKey: "portfolio.itau.title",
      clientKey: "portfolio.itau.client",
      descriptionKey: "portfolio.itau.description",
      tagsKey: "portfolio.itau.tags",
      icon: Bot,
      color: "#FF6B00",
      metricKey: "portfolio.itau.metric",
      isItau: true,
      previewImage: `${basePath}/portfolio/itau/itau-chat.svg`,
      gradient: "from-orange-600/20 to-yellow-600/20",
      accentColor: "#FF6B00",
      type: "tech",
      weight: 9,
    },
    {
      titleKey: "portfolio.appmoto.title",
      clientKey: "portfolio.appmoto.client",
      descriptionKey: "portfolio.appmoto.description",
      tagsKey: "portfolio.appmoto.tags",
      icon: Bike,
      color: "#22C55E",
      metricKey: "portfolio.appmoto.metric",
      isAppMoto: true,
      previewImage: `${basePath}/portfolio/moto/Home.png`,
      gradient: "from-green-600/20 to-emerald-600/20",
      accentColor: "#22C55E",
      type: "tech",
      weight: 6,
    },
    {
      titleKey: "portfolio.bv.title",
      clientKey: "portfolio.bv.client",
      descriptionKey: "portfolio.bv.description",
      tagsKey: "portfolio.bv.tags",
      icon: Building2,
      color: "#06B6D4",
      metricKey: "portfolio.bv.metric",
      isBV: true,
      previewImage: `${basePath}/portfolio/bv/bv_projeto_aspec3.webp`,
      gradient: "from-cyan-600/20 to-blue-600/20",
      accentColor: "#06B6D4",
      type: "tech",
      weight: 7,
    },
  ];

  const shuffledProjects = useMemo(() => {
    const withVariation = allProjects.map(p => ({
      ...p,
      sortWeight: p.weight + (Math.random() * 3 - 1.5)
    }));
    return withVariation.sort((a, b) => b.sortWeight - a.sortWeight);
  }, []);

  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{title: string; images: string[]} | null>(null);
  const [showSocialmediaModal, setShowSocialmediaModal] = useState(false);
  const [showSLMandicModal, setShowSLMandicModal] = useState(false);
  const [showBVModal, setShowBVModal] = useState(false);
  const [showItauModal, setShowItauModal] = useState(false);
  const [showAppMotoModal, setShowAppMotoModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="portfolio" ref={sectionRef} className="relative pt-8 pb-32 overflow-hidden scroll-mt-20">
        <div className="dark-grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-purple-950/20" />
        
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="galaxy-glow top-1/4 -left-48" />
          <div className="galaxy-glow bottom-1/4 -right-48" />
          
          <div className="orbit-ring orbit-ring-1" style={{ top: "20%", right: "5%" }} />
          <div className="orbit-ring" style={{ 
            width: "180px", 
            height: "180px", 
            top: "60%", 
            left: "3%", 
            border: "1px solid rgba(168, 85, 247, 0.06)",
            borderRadius: "50%",
            animation: "orbit-spin 50s linear infinite"
          }} />

          {portfolioStars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white animate-[twinkle_var(--dur)_ease-in-out_var(--delay)_infinite]"
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

          {floatingElements.map((el) => (
            <div
              key={el.id}
              className="absolute rounded-full animate-float opacity-30"
              style={{
                width: el.size,
                height: el.size,
                top: el.top,
                left: el.left,
                background: "linear-gradient(135deg, #A855F7, #5B2EFF)",
                animationDuration: el.duration,
                animationDelay: el.delay,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mt-16 mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-5 py-2 mb-6 border border-purple-500/30">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-sm font-medium text-purple-300">{t("portfolio.badge")}</span>
            </div>
            <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4 text-white">
              {t("portfolio.title")}
            </h2>
            <p className="font-exo text-lg text-gray-400 max-w-2xl mx-auto">
              {t("portfolio.subtitle")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="neon-bar neon-bar-design" />
              <span className="font-exo text-sm text-gray-400">
                {t("portfolio.design")} (4)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="neon-bar neon-bar-tech" />
              <span className="font-exo text-sm text-gray-400">
                {t("portfolio.technology")} (4)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shuffledProjects.map((project, index) => (
              <div
                key={`${project.type}-${index}`}
                className={`group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div
                  className="portfolio-card-hover relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer group"
                  style={{ 
                    background: project.type === "tech" 
                      ? `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`
                      : `linear-gradient(135deg, ${project.color}10 0%, ${project.color}05 100%)`,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="neon-strip neon-strip-design" style={{ 
                    '--neon-color': project.color,
                    background: `linear-gradient(180deg, ${project.color}, ${project.color}80, ${project.color}40)`,
                  } as React.CSSProperties} />
                  
                  <div className="neon-strip neon-strip-tech" style={{ 
                    '--neon-color': project.color,
                    background: `linear-gradient(180deg, ${project.color}, ${project.color}80, ${project.color}40)`,
                  } as React.CSSProperties} />

                  <div className="glow-effect absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20"
                    style={{ background: project.accentColor || project.color }} />

                  {project.type === "design" && project.designStyle === "luna" && (
                    <>
                      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #D946EF, transparent)", filter: "blur(20px)" }} />
                      <div className="absolute bottom-0 left-0 w-full h-32" style={{ background: "linear-gradient(to top, rgba(217, 70, 239, 0.1), transparent)" }} />
                      <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-pink-400/30 flex items-center justify-center">
                        <Moon size={24} className="text-pink-400/60" />
                      </div>
                    </>
                  )}
                  
                  {project.type === "design" && project.designStyle === "socialmedia" && (
                    <>
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#5B2EFF" strokeWidth="2" opacity="0.3"/>
                          <circle cx="50" cy="50" r="35" fill="none" stroke="#5B2EFF" strokeWidth="2" opacity="0.4"/>
                          <circle cx="50" cy="50" r="25" fill="none" stroke="#5B2EFF" strokeWidth="2" opacity="0.5"/>
                          <circle cx="50" cy="50" r="15" fill="#5B2EFF" opacity="0.6"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-4 left-4 flex gap-1">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-2 h-8 rounded-full" style={{ background: `linear-gradient(to top, ${project.color}, transparent)`, opacity: 0.4 }} />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {project.type === "design" && project.designStyle === "taskmaster" && (
                    <>
                      <div className="absolute top-6 right-6 flex flex-col gap-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2 flex items-center justify-center" style={{ borderColor: `${project.color}60` }}>
                              {i === 1 && <CheckSquare size={10} style={{ color: project.color }} />}
                            </div>
                            <div className="w-16 h-2 rounded" style={{ background: `${project.color}30` }} />
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                        <CheckSquare size={96} style={{ color: project.color }} />
                      </div>
                    </>
                  )}
                  
                  {project.type === "design" && project.designStyle === "virtus" && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-8 left-8 w-4 h-4 rounded-full" style={{ background: "#EC4899", opacity: 0.3 }} />
                        <div className="absolute top-16 left-20 w-3 h-3 rounded-full" style={{ background: "#F472B6", opacity: 0.4 }} />
                        <div className="absolute top-12 right-12 w-5 h-5 rounded-full" style={{ background: "#EC4899", opacity: 0.2 }} />
                        <svg className="absolute top-4 right-4 w-20 h-20" viewBox="0 0 100 100">
                          <path d="M50 20 C30 20, 20 35, 20 50 C20 70, 50 85, 50 85 C50 85, 80 70, 80 50 C80 35, 70 20, 50 20" fill="none" stroke="#EC4899" strokeWidth="2" opacity="0.3"/>
                          <circle cx="35" cy="40" r="4" fill="#EC4899" opacity="0.4"/>
                          <circle cx="65" cy="40" r="4" fill="#EC4899" opacity="0.4"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-1">
                        <Heart size={16} style={{ color: project.color }} />
                        <span className="text-xs" style={{ color: project.color, opacity: 0.6 }}>Connections</span>
                      </div>
                    </>
                  )}

                  <div className="relative p-8">
                    <div className="flex items-start gap-6">
                      {project.type === "tech" && project.previewImage ? (
                        <div className="tech-phone-mockup flex-shrink-0">
                          <div className="tech-phone-frame">
                            <img 
                              src={project.previewImage} 
                              alt={t(project.titleKey)}
                              className="tech-phone-screen"
                              onError={(e) => {
                                e.currentTarget.parentElement.innerHTML = `<div class="tech-phone-icon-fallback" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, ${project.color}, ${project.color}80);border-radius:14px;"><span style="color:white;font-size:24px;">${t(project.titleKey).charAt(0)}</span></div>`;
                              }}
                            />
                            <div className="tech-phone-notch" />
                          </div>
                          <div className="tech-phone-glow" style={{ background: project.accentColor || project.color }} />
                        </div>
                      ) : project.previewImage ? (
                        <div className="design-icon-showcase flex-shrink-0">
                          <img 
                            src={project.previewImage} 
                            alt={t(project.titleKey)}
                            className="w-20 h-20 rounded-2xl object-cover"
                            style={{ boxShadow: `0 8px 32px ${project.color}40` }}
                          />
                        </div>
                      ) : (
                        <div className="design-icon-showcase flex-shrink-0">
                          <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center"
                            style={{ 
                              background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                              boxShadow: `0 8px 32px ${project.color}40`
                            }}
                          >
                            <project.icon size={28} className="text-white" />
                          </div>
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{ 
                              background: `${project.accentColor || project.color}20`,
                              border: `1px solid ${project.accentColor || project.color}40`,
                              color: project.accentColor || project.color
                            }}
                          >
                            <project.icon size={12} />
                            <span>{t(project.clientKey)}</span>
                          </div>
                        </div>

                        <h3 
                          className="font-exo font-bold text-2xl mb-3 transition-all duration-300"
                          style={{ 
                            color: "white",
                            textShadow: project.type === "design" ? `0 0 30px ${project.color}40` : "none"
                          }}
                        >
                          {t(project.titleKey)}
                        </h3>

                        <p className="font-exo text-gray-400 text-sm leading-relaxed mb-4">
                          {t(project.descriptionKey)}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {t(project.tagsKey).split(", ").map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <div 
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ 
                              backgroundColor: project.accentColor || project.color,
                              boxShadow: `0 0 10px ${project.accentColor || project.color}`
                            }}
                          />
                          <span className="font-exo text-sm text-gray-400">{t(project.metricKey)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="portfolio-cta-footer px-4 pb-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.isSocialmedia) setShowSocialmediaModal(true);
                        else if (project.isSLMandic) setShowSLMandicModal(true);
                        else if (project.isBV) setShowBVModal(true);
                        else if (project.isItau) setShowItauModal(true);
                        else if (project.isAppMoto) setShowAppMotoModal(true);
                        else if (project.images && project.images.length > 0) {
                          setSelectedProject({ title: project.titleKey, images: project.images });
                        }
                      }}
                      className="portfolio-cta-btn w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-exo font-bold text-sm transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, ${project.accentColor || project.color}, ${project.accentColor || project.color}cc)`,
                        color: "white",
                        boxShadow: `0 4px 20px ${project.accentColor || project.color}40`
                      }}
                    >
                      <span>{t("portfolio.seeCase")}</span>
                      <ExternalLink size={16} className="portfolio-cta-icon transition-transform duration-300" />
                    </button>
                  </div>

                  <div 
                    className="portfolio-card-bottom-bar h-1 transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${project.accentColor || project.color}, transparent)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" 
          style={{ background: "#A855F7" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "#06B6D4" }} />
      </section>

      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject || { title: "", images: [] }}
      />

      <SocialmediaModal
        isOpen={showSocialmediaModal}
        onClose={() => setShowSocialmediaModal(false)}
      />

      <SLMandicModal
        isOpen={showSLMandicModal}
        onClose={() => setShowSLMandicModal(false)}
      />

      <BVModal
        isOpen={showBVModal}
        onClose={() => setShowBVModal(false)}
      />

      <ItauModal
        isOpen={showItauModal}
        onClose={() => setShowItauModal(false)}
      />

      <AppMotoModal
        isOpen={showAppMotoModal}
        onClose={() => setShowAppMotoModal(false)}
      />
    </>
  );
};

export default PortfolioSection;
