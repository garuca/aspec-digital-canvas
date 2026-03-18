import {
  Palette, FileText, Globe, Megaphone, PenTool, Search,
  BarChart3, Share2, CalendarDays, Code, Smartphone, Server,
  ShieldCheck, Cpu, Workflow
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Identidade Visual",
    description: "Criação e aplicação de identidade visual completa que traduz a essência da sua marca com impacto e consistência.",
    category: "marketing",
  },
  {
    icon: FileText,
    title: "Marketing de Conteúdo",
    description: "Narrativas inteligentes e estratégias de engajamento que conectam sua marca ao público-alvo e geram resultados mensuráveis.",
    category: "marketing",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Páginas de alta conversão com design responsivo e copywriting persuasivo para transformar visitantes em clientes.",
    category: "marketing",
  },
  {
    icon: Megaphone,
    title: "Tráfego Pago",
    description: "Configuração, segmentação avançada e otimização contínua de campanhas de anúncios para máximo retorno sobre investimento.",
    category: "marketing",
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textos persuasivos e estratégicos para redes sociais, sites e campanhas que capturam atenção e impulsionam ação.",
    category: "marketing",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Otimização para mecanismos de busca que aumenta a visibilidade orgânica e posiciona sua marca nas primeiras páginas.",
    category: "marketing",
  },
  {
    icon: Share2,
    title: "Gestão de Redes Sociais",
    description: "Gerenciamento completo de redes sociais com posts, stories, carrosséis semanais e monitoramento de engajamento.",
    category: "marketing",
  },
  {
    icon: BarChart3,
    title: "Relatórios & Analytics",
    description: "Análises detalhadas de desempenho, acompanhamento de conversões e relatórios de campanhas para decisões orientadas por dados.",
    category: "marketing",
  },
  {
    icon: CalendarDays,
    title: "Calendário Editorial",
    description: "Planejamento mensal estratégico de conteúdo com organização, agendamento e distribuição consistente nos seus canais.",
    category: "marketing",
  },
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Sites, portais e aplicações web sob medida com tecnologias modernas, design responsivo e foco em performance.",
    category: "tech",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e multiplataforma que entregam experiências fluidas e conectam seu negócio diretamente ao cliente.",
    category: "tech",
  },
  {
    icon: Server,
    title: "Sistemas & APIs",
    description: "Arquitetura de sistemas robustos, APIs escaláveis e integrações que automatizam processos e eliminam gargalos operacionais.",
    category: "tech",
  },
  {
    icon: Workflow,
    title: "Automação de Processos",
    description: "Fluxos automatizados que reduzem trabalho manual, aumentam a produtividade e minimizam erros no dia a dia da sua empresa.",
    category: "tech",
  },
  {
    icon: ShieldCheck,
    title: "Consultoria & Segurança",
    description: "Análise de infraestrutura, boas práticas de segurança digital e consultoria estratégica para decisões tecnológicas assertivas.",
    category: "tech",
  },
  {
    icon: Cpu,
    title: "Inteligência Artificial",
    description: "Soluções com IA aplicada: chatbots, análise preditiva, automação inteligente e ferramentas que potencializam seus resultados.",
    category: "tech",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Nossos <span className="text-gradient-aspec">Serviços</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Do marketing digital ao desenvolvimento de software — soluções completas para resolver problemas reais e transformar seu negócio com tecnologia.
          </p>
        </div>

        {/* Marketing */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-semibold mb-6 text-center">
            <span className="text-gradient-aspec">Marketing</span> & Design
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.category === "marketing")
              .map((service, i) => (
                <div
                  key={service.title}
                  className="card-aspec p-6 group cursor-pointer"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-aspec flex items-center justify-center mb-5">
                    <service.icon size={24} className="text-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Tecnologia */}
        <div>
          <h3 className="font-display text-xl font-semibold mb-6 text-center">
            <span className="text-gradient-aspec">Tecnologia</span> & Desenvolvimento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.category === "tech")
              .map((service, i) => (
                <div
                  key={service.title}
                  className="card-aspec p-6 group cursor-pointer"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-aspec flex items-center justify-center mb-5">
                    <service.icon size={24} className="text-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
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
