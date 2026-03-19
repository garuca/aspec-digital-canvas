import { useEffect, useRef, useState } from "react";
import { Brush, Code2, ExternalLink, ArrowRight, Layers, Sparkles, Palette, Cpu, Database, Globe, Layout, Maximize2, Minimize2 } from "lucide-react";

const designProjects = [
  {
    title: "Rebranding Completo",
    client: "Startup Tech",
    description: "Identidade visual do zero: logo, paleta, tipografia e guidelines de marca.",
    tags: ["Brand", "UI/UX", "Guidelines"],
    icon: Palette,
    color: "#D946EF",
    metric: "200+ horas de design",
  },
  {
    title: "E-commerce Premium",
    client: "Fashion Brand",
    description: "Website de alto impacto com experiência de compra imersiva e checkout otimizado.",
    tags: ["Web Design", "E-commerce", "Conversion"],
    icon: Layout,
    color: "#A855F7",
    metric: "45% aumento em conversão",
  },
  {
    title: "Dashboard Analytics",
    client: "SaaS B2B",
    description: "Interface de dados complexos transformada em visualização intuitiva e elegante.",
    tags: ["Dashboard", "Data Viz", "UI Design"],
    icon: Layers,
    color: "#8B5CF6",
    metric: "Métricas em tempo real",
  },
  {
    title: "App Mobile",
    client: "Health Tech",
    description: "Experiência mobile fluida para monitoramento de saúde e bem-estar.",
    tags: ["Mobile", "UI/UX", "Prototyping"],
    icon: Sparkles,
    color: "#5B2EFF",
    metric: "4.8★ na App Store",
  },
];

const techProjects = [
  {
    title: "API Gateway",
    client: "Fintech",
    description: "Sistema de processamento de pagamentos com alta disponibilidade e segurança.",
    tags: ["Backend", "Security", "Scalability"],
    icon: Cpu,
    color: "#06B6D4",
    metric: "99.99% uptime",
  },
  {
    title: "Plataforma E-learning",
    client: "EdTech",
    description: "Ambiente de ensino online com lives, quizzes e tracking de progresso.",
    tags: ["Full Stack", "Real-time", "Analytics"],
    icon: Globe,
    color: "#0891B2",
    metric: "50k+ usuários ativos",
  },
  {
    title: "App Delivery",
    client: "Restaurant Group",
    description: "Sistema completo com app cliente, driver e painel admin integrados.",
    tags: ["Mobile", "Backend", "Logistics"],
    icon: Database,
    color: "#0EA5E9",
    metric: "10k+ pedidos/dia",
  },
  {
    title: "Automação Marketing",
    client: "E-commerce",
    description: "Pipeline de automação com CRM integrado e análise preditiva.",
    tags: ["Automation", "CRM", "AI/ML"],
    icon: Sparkles,
    color: "#38BDF8",
    metric: "300% ROI em 6 meses",
  },
];

const floatingElements = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: `${3 + Math.random() * 4}s`,
  delay: `${Math.random() * 3}s`,
}));

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"DESIGN" | "TECHNOLOGY">("DESIGN");
  const [visible, setVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

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

  const currentProjects = activeTab === "DESIGN" ? designProjects : techProjects;

  return (
    <>
      <div className="geometric-divider" />

      <section id="portfolio" ref={sectionRef} className="relative pt-0 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-purple-950/20" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingElements.map((el) => (
            <div
              key={el.id}
              className="absolute rounded-full animate-float opacity-40"
              style={{
                width: el.size,
                height: el.size,
                top: el.top,
                left: el.left,
                background: activeTab === "DESIGN" 
                  ? "linear-gradient(135deg, #D946EF, #5B2EFF)"
                  : "linear-gradient(135deg, #06B6D4, #0891B2)",
                animationDuration: el.duration,
                animationDelay: el.delay,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-5 py-2 mb-6 border border-purple-500/30">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Nossos Projetos</span>
            </div>
            <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4 text-white">
              Portfólio
            </h2>
            <p className="font-exo text-lg text-gray-400 max-w-2xl mx-auto">
              Cases que transformaram negócios e criaram experiências memoráveis.
            </p>
          </div>

          <div className={`flex justify-center mb-16 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex bg-purple-950/50 rounded-2xl p-1.5 border border-purple-500/20 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("DESIGN")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-exo font-semibold text-sm transition-all duration-300 ${
                  activeTab === "DESIGN"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Brush size={18} />
                Design
              </button>
              <button
                onClick={() => setActiveTab("TECHNOLOGY")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-exo font-semibold text-sm transition-all duration-300 ${
                  activeTab === "TECHNOLOGY"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Code2 size={18} />
                Tecnologia
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <div
                key={`${activeTab}-${index}`}
                className={`group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div
                  className={`relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer ${
                    expandedProject === index ? "ring-2 ring-purple-500/50" : ""
                  }`}
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${project.color}40, transparent 70%)`,
                    }}
                  />
                  
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%, ${project.color}05 100%)`,
                    }}
                  />

                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}80)` }}
                      >
                        <project.icon size={24} className="text-white" />
                      </div>
                      
                      <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100">
                        {expandedProject === index ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                      </button>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: project.color }}>
                        {project.client}
                      </p>
                      <h3 className="font-exo font-bold text-2xl text-white mb-2 group-hover:text-gradient-aspec transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <p className="font-exo text-gray-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex items-center justify-between pt-6 border-t border-white/5 transition-all duration-500 overflow-hidden"
                      style={{
                        maxHeight: expandedProject === index ? "100px" : "0",
                        opacity: expandedProject === index ? 1 : 0,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="font-exo text-sm text-gray-300">{project.metric}</span>
                      </div>
                      
                      <button className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3" style={{ color: project.color }}>
                        <span>Ver Case</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                      style={{
                        width: expandedProject === index ? "100%" : "0%",
                        background: `linear-gradient(90deg, ${project.color}, transparent)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-exo font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              <span>Ver Todos os Projetos</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" 
          style={{ background: activeTab === "DESIGN" ? "#D946EF" : "#06B6D4" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: activeTab === "TECHNOLOGY" ? "#06B6D4" : "#A855F7" }} />
      </section>

      <div className="geometric-divider-end" />
    </>
  );
};

export default PortfolioSection;
