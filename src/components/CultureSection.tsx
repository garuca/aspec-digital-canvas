import { useEffect, useRef, useState } from "react";
import { Target, Lightbulb, Rocket, RefreshCw, Sparkles, Zap, TrendingUp, BarChart3 } from "lucide-react";
import cultureImg1 from "@/assets/culture-1.jpg";
import cultureImg2 from "@/assets/culture-2.jpg";

const pillars = [
  {
    icon: Target,
    title: "Diagnóstico Preciso",
    description: "Analisamos cada detalhe do seu negócio para encontrar a solução exata que gera resultado.",
    floatClass: "animate-float",
    accent: "#5B2EFF",
  },
  {
    icon: Lightbulb,
    title: "Solução Sob Medida",
    description: "Nada de soluções genéricas. Criamos exatamente o que seu negócio precisa para crescer.",
    floatClass: "animate-float-slow",
    accent: "#8B5CF6",
  },
  {
    icon: Rocket,
    title: "Execução Veloz",
    description: "Do zero ao mercado em tempo recorde. Sem enrolação, sem desculpas, só resultado.",
    floatClass: "animate-drift-sideways",
    accent: "#A855F7",
  },
  {
    icon: RefreshCw,
    title: "Evolução Constante",
    description: "Seus resultados não param de crescer. A gente monitora, otimiza e escala com você.",
    floatClass: "animate-float-drift",
    accent: "#D946EF",
  },
];

const blocks = [
  {
    number: "01",
    title: "Entendemos Seu Problema Antes de Criar Qualquer Solução",
    description:
      "Mapeamos seus processos, identificamos gargalos e encontramos exatamente onde a tecnologia pode gerar impacto. Seja +40% em vendas, redução de 60% em tarefas manuais ou conquistar novos mercados. Só então desenhamos a solução.",
    image: cultureImg1,
    reverse: false,
    icon: Sparkles,
    stats: ["Análise profunda", "Diagnóstico preciso", "Plano de ação"],
  },
  {
    number: "02",
    title: "Construímos o Caminho Completo: da Ideia ao Resultado",
    description:
      "Marketing estratégico + Engenharia de software em um único time. Cada pixel, cada linha de código e cada palavra é pensada para converter. Menos teoria, mais resultado mensurável no seu negócio.",
    image: cultureImg2,
    reverse: true,
    icon: TrendingUp,
    stats: ["Design que converte", "Código que performa", "Estratégia que vende"],
  },
  {
    number: "03",
    title: "Lançamos Rápido, Aprendemos Rápido, Crescemos Rápido",
    description:
      "Não esperamos meses para ver resultados. MVP em semanas, feedback real em dias. Cada lançamento é uma oportunidade de aprender o que funciona e descartar o que não funciona. Seu projeto evolui com dados reais, não com suposições.",
    image: cultureImg1,
    reverse: false,
    icon: Rocket,
    stats: ["MVP em semanas", "Feedback em dias", "Iteração contínua"],
  },
  {
    number: "04",
    title: "Seus Números Disparam. Você Só Acompanha o Crescimento.",
    description:
      "Implementamos analytics, dashboards e métricas que mostram cada clique, cada conversão, cada real investido. Você toma decisões baseadas em dados, não em intuição. E quando os resultados aparecem, a gente escala junto com você.",
    image: cultureImg2,
    reverse: true,
    icon: BarChart3,
    stats: ["Dashboards em tempo real", "ROI comprovado", "Escala juntos"],
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

  return (
    <>
      <div ref={sectionRef}>
        <div className="geometric-divider" />
        
        <section id="abordagem" className="py-24 relative overflow-hidden light-section">
          <div className="dot-pattern" />
          
          <div className="orb orb-1" />
          <div className="orb orb-2" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className={`text-center mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-5 py-2 mb-6">
                <Zap size={14} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Nossa Metodologia</span>
              </div>
              <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4 text-gray-900">
                Como <span className="text-gradient-aspec">Transformamos</span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-purple-700 to-pink-600 bg-clip-text text-transparent">Ideias em Resultados</span>
              </h2>
              <p className="font-exo text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Um processo estruturado que combina estratégia, design e tecnologia para entregar soluções que realmente funcionam.
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
                  key={pillar.title}
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
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="font-exo text-sm text-gray-500 leading-relaxed relative z-10">
                    {pillar.description}
                  </p>
                  
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${pillar.accent}, transparent)` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-16">
              {blocks.map((block, i) => (
                <div
                  key={block.title}
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
                            alt={block.title}
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
                          <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Estratégia {block.number}</span>
                        </div>
                        <h3 className="font-exo font-bold text-3xl mb-4 text-gray-900 leading-tight">
                          {block.title}
                        </h3>
                        <p className="font-exo text-gray-600 leading-relaxed text-base mb-6">
                          {block.description}
                        </p>
                        
                        {/* Stats/Benefits */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          {block.stats.map((stat, idx) => (
                            <div key={idx} className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full px-4 py-2 border border-purple-100">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                              <span className="text-sm font-medium text-gray-700">{stat}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm group cursor-pointer">
                          <span>Ver Mapa Mental</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
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

        <div className="geometric-divider-end" />
      </div>
    </>
  );
};

export default CultureSection;
