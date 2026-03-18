import { Palette, FileText, Globe, Megaphone, PenTool, Search, BarChart3, Share2, CalendarDays } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Identidade Visual",
    description: "Criação e aplicação de identidade visual completa que traduz a essência da sua marca com impacto e consistência.",
  },
  {
    icon: FileText,
    title: "Marketing de Conteúdo",
    description: "Narrativas inteligentes e estratégias de engajamento que conectam sua marca ao público-alvo e geram resultados mensuráveis.",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Páginas de alta conversão com design responsivo e copywriting persuasivo para transformar visitantes em clientes.",
  },
  {
    icon: Megaphone,
    title: "Tráfego Pago",
    description: "Configuração, segmentação avançada e otimização contínua de campanhas de anúncios para máximo retorno sobre investimento.",
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textos persuasivos e estratégicos para redes sociais, sites e campanhas que capturam atenção e impulsionam ação.",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Otimização para mecanismos de busca que aumenta a visibilidade orgânica e posiciona sua marca nas primeiras páginas.",
  },
  {
    icon: Share2,
    title: "Gestão de Redes Sociais",
    description: "Gerenciamento completo de redes sociais com posts, stories, carrosséis semanais e monitoramento de engajamento.",
  },
  {
    icon: BarChart3,
    title: "Relatórios & Analytics",
    description: "Análises detalhadas de desempenho, acompanhamento de conversões e relatórios de campanhas para decisões orientadas por dados.",
  },
  {
    icon: CalendarDays,
    title: "Calendário Editorial",
    description: "Planejamento mensal estratégico de conteúdo com organização, agendamento e distribuição consistente nos seus canais.",
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
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Soluções sob medida para transformar seu negócio digital com tecnologia de ponta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="card-aspec p-6 group cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
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
    </section>
  );
};

export default ServicesSection;
