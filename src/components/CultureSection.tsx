import { Target, Lightbulb, Rocket, RefreshCw } from "lucide-react";
import cultureImg1 from "@/assets/culture-1.jpg";
import cultureImg2 from "@/assets/culture-2.jpg";

const pillars = [
  {
    icon: Target,
    title: "Diagnóstico Preciso",
    description: "Antes de qualquer linha de código ou peça de design, mergulhamos no seu negócio para entender o problema real. Mapeamos processos, identificamos gargalos e encontramos onde a tecnologia pode gerar o maior impacto.",
  },
  {
    icon: Lightbulb,
    title: "Soluções Sob Medida",
    description: "Cada empresa tem desafios únicos. Criamos estratégias e ferramentas personalizadas — desde automações simples até sistemas complexos — sempre com foco em resolver problemas concretos e não apenas entregar funcionalidades.",
  },
  {
    icon: Rocket,
    title: "Execução Ágil",
    description: "Entregas rápidas, incrementais e com feedback contínuo. Nosso processo garante transparência total e adaptação constante, para que sua solução evolua junto com as necessidades do mercado.",
  },
  {
    icon: RefreshCw,
    title: "Evolução Contínua",
    description: "Tecnologia não é um projeto com fim — é um ciclo. Monitoramos resultados, otimizamos performance e escalamos soluções para que seu negócio esteja sempre um passo à frente da concorrência.",
  },
];

const blocks = [
  {
    title: "Tecnologia que Resolve Problemas Reais",
    description:
      "Não acreditamos em tecnologia por tecnologia. Nossa abordagem começa entendendo profundamente o seu desafio — seja aumentar vendas, automatizar operações, reduzir custos ou conquistar novos mercados. A partir daí, desenhamos soluções digitais que geram impacto mensurável no seu resultado.",
    image: cultureImg1,
    reverse: false,
  },
  {
    title: "Do Conceito ao Resultado",
    description:
      "Unimos marketing estratégico e engenharia de software em um único time. Isso significa que cada landing page, campanha ou sistema que entregamos é pensado de ponta a ponta: da atração do cliente à conversão, da interface ao servidor. Menos retrabalho, mais resultado.",
    image: cultureImg2,
    reverse: true,
  },
];

const CultureSection = () => {
  return (
    <section id="abordagem" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Nossa <span className="text-gradient-aspec">Abordagem</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Resolvemos problemas de negócio com tecnologia. Não vendemos ferramentas — entregamos resultados que transformam a forma como sua empresa opera e cresce.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="card-aspec p-6 text-center group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-aspec flex items-center justify-center mx-auto mb-5">
                <pillar.icon size={26} className="text-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Alternating blocks */}
        <div className="flex flex-col gap-20">
          {blocks.map((block) => (
            <div
              key={block.title}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                block.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <img
                  src={block.image}
                  alt={block.title}
                  className="rounded-xl w-full object-cover max-h-[420px] border border-border"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">
                  {block.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed text-base">
                  {block.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
