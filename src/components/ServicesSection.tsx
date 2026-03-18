import { Code, Zap, Smartphone, Database, Shield, Cloud } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Plataformas web modernas, rápidas e escaláveis com as melhores tecnologias do mercado.",
  },
  {
    icon: Zap,
    title: "Automação & APIs",
    description: "Integração de sistemas e automação de processos para otimizar seu fluxo de trabalho.",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e multiplataforma para iOS e Android com experiência premium.",
  },
  {
    icon: Database,
    title: "Arquitetura de Dados",
    description: "Modelagem e infraestrutura de dados robusta para decisões inteligentes.",
  },
  {
    icon: Shield,
    title: "Segurança Digital",
    description: "Proteção avançada, auditorias e conformidade para seu ambiente tecnológico.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infraestrutura escalável na nuvem com CI/CD e monitoramento contínuo.",
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
