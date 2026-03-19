import { useEffect, useRef, useState } from "react";
import {
  Palette, FileText, Globe, Megaphone, PenTool, Search,
  BarChart3, Share2, CalendarDays, Code, Smartphone, Server,
  ShieldCheck, Cpu, Workflow, Sparkles, Cpu as CpuIcon
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Identidade Visual",
    description: "Criação e aplicação de identidade visual completa que traduz a essência da sua marca.",
    category: "marketing",
    floatClass: "animate-float",
  },
  {
    icon: FileText,
    title: "Marketing de Conteúdo",
    description: "Narrativas inteligentes que conectam sua marca ao público-alvo e geram resultados.",
    category: "marketing",
    floatClass: "animate-float-slow",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Páginas de alta conversão com design responsivo para transformar visitantes em clientes.",
    category: "marketing",
    floatClass: "animate-drift-sideways",
  },
  {
    icon: Megaphone,
    title: "Tráfego Pago",
    description: "Configuração e otimização de campanhas para máximo retorno sobre investimento.",
    category: "marketing",
    floatClass: "animate-float-drift",
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textos persuasivos para redes sociais, sites e campanhas que impulsionam ação.",
    category: "marketing",
    floatClass: "animate-float",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Otimização para mecanismos de busca que aumenta a visibilidade orgânica.",
    category: "marketing",
    floatClass: "animate-float-slow",
  },
  {
    icon: Share2,
    title: "Gestão de Redes",
    description: "Gerenciamento completo com posts, stories e monitoramento de engajamento.",
    category: "marketing",
    floatClass: "animate-drift-sideways",
  },
  {
    icon: BarChart3,
    title: "Relatórios & Analytics",
    description: "Análises detalhadas e relatórios para decisões orientadas por dados.",
    category: "marketing",
    floatClass: "animate-float-drift",
  },
  {
    icon: CalendarDays,
    title: "Calendário Editorial",
    description: "Planejamento mensal estratégico de conteúdo com distribuição consistente.",
    category: "marketing",
    floatClass: "animate-float",
  },
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Sites e aplicações web sob medida com tecnologias modernas e foco em performance.",
    category: "tech",
    floatClass: "animate-float-slow",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e multiplataforma que conectam seu negócio ao cliente.",
    category: "tech",
    floatClass: "animate-drift-sideways",
  },
  {
    icon: Server,
    title: "Sistemas & APIs",
    description: "Arquitetura robusta e integrações que automatizam processos operacionais.",
    category: "tech",
    floatClass: "animate-float",
  },
  {
    icon: Workflow,
    title: "Automação",
    description: "Fluxos automatizados que aumentam produtividade e minimizam erros.",
    category: "tech",
    floatClass: "animate-float-drift",
  },
  {
    icon: ShieldCheck,
    title: "Consultoria & Segurança",
    description: "Análise de infraestrutura e consultoria estratégica tecnológica.",
    category: "tech",
    floatClass: "animate-float-slow",
  },
  {
    icon: Cpu,
    title: "Inteligência Artificial",
    description: "Soluções com IA: chatbots, análise preditiva e automação inteligente.",
    category: "tech",
    floatClass: "animate-drift-sideways",
  },
];

const floatingShapes = [
  { size: 80, top: "10%", right: "5%", delay: 0 },
  { size: 60, bottom: "20%", left: "3%", delay: 2 },
  { size: 40, top: "50%", left: "8%", delay: 1 },
];

const ServicesSection = () => {
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
    <section id="servicos" ref={sectionRef} className="py-24 relative overflow-hidden dark-section">
      <div className="dark-grid-pattern" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl animate-float-slow"
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
        <div className={`text-center mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-5 py-2 mb-6 border border-purple-500/20">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-sm font-medium text-purple-300">O que fazemos</span>
          </div>
          <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4">
            Nossos <span className="text-gradient-aspec">Serviços</span>
          </h2>
          <p className="font-exo text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Soluções completas para transformar seu negócio<br />
            <span className="text-white/70">com tecnologia e marketing digital.</span>
          </p>
        </div>

        <div className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-purple-500/50" />
            <span className="category-badge category-badge-marketing">
              <Palette size={16} />
              Marketing & Design
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingServices.map((service, i) => (
              <div
                key={service.title}
                data-animate-item={i}
                className={`service-card-dark scroll-animate ${service.floatClass} ${
                  visible ? "visible" : ""
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div className="service-icon-dark mb-6">
                  <service.icon size={24} className="text-purple-400" />
                </div>
                <h3 className="font-exo font-bold text-lg mb-3 text-white">
                  {service.title}
                </h3>
                <p className="font-exo text-sm text-white/50 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-purple-500/50" />
            <span className="category-badge category-badge-tech">
              <CpuIcon size={16} />
              Tecnologia & Desenvolvimento
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techServices.map((service, i) => (
              <div
                key={service.title}
                data-animate-item={i + marketingServices.length}
                className={`service-card-dark scroll-animate ${service.floatClass} ${
                  visible ? "visible" : ""
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transitionDelay: `${(i + marketingServices.length) * 0.08}s`,
                }}
              >
                <div className="service-icon-dark mb-6">
                  <service.icon size={24} className="text-purple-400" />
                </div>
                <h3 className="font-exo font-bold text-lg mb-3 text-white">
                  {service.title}
                </h3>
                <p className="font-exo text-sm text-white/50 leading-relaxed">
                  {service.description}
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
