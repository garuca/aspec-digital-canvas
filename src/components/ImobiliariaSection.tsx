import { useState } from "react";
import { Building2, Shield, CreditCard, TrendingDown, AlertTriangle, Home, Users, FileText, BarChart3, Wallet, Bell, CheckCircle, ArrowRight, Calculator, Sparkles, Percent, Clock, UserCheck, Lock, Search, FileCheck, BadgeCheck, KeyRound } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pains = [
  {
    icon: AlertTriangle,
    title: "Inadimplência de Locatários",
    stat: "25%",
    desc: "Dos imóveis no Brasil sofrem com atrasos superiores a 30 dias. Cada imóvel vazio custa em média 3 meses de aluguel.",
  },
  {
    icon: TrendingDown,
    title: "Vacância Prolongada",
    stat: "90 dias",
    desc: "É o tempo médio para relicar um imóvel. Enquanto isso, você paga IPTU, condomínio e manutenção.",
  },
  {
    icon: Users,
    title: "Seleção Falha",
    stat: "40%",
    desc: "Das causas de inadimplência poderiam ser evitadas com uma análise de crédito rigorosa no início.",
  },
];

const features = [
  {
    icon: Shield,
    title: "Análise de Crédito Avançada",
    desc: "Cruzamento de dados do Serasa, SPC e histórico de aluguéis anteriores. Score de risco personalizado.",
    color: "#0078D6",
  },
  {
    icon: Bell,
    title: "Alertas Antecipados",
    desc: "Detecção de sinais de risco 60 dias antes do atraso. Nossa IA identifica padrões que você não veria.",
    color: "#0078D6",
  },
  {
    icon: CreditCard,
    title: "Cobrança Automatizada",
    desc: "WhatsApp, SMS e e-mail com lembretes personalizados. Links de PIX prontos para pagamento instantâneo.",
    color: "#0078D6",
  },
  {
    icon: FileText,
    title: "Contratos Inteligentes",
    desc: "Modelos revisados por advogados, com cláusulas de proteção e garantias otimizadas para cada perfil.",
    color: "#0078D6",
  },
  {
    icon: BarChart3,
    title: "Dashboard em Tempo Real",
    desc: "Visualize inadimplência, vacância, receita e projeções. Decisões baseadas em dados, não em intuição.",
    color: "#0078D6",
  },
  {
    icon: Lock,
    title: "Seguro Garantia",
    desc: "Integração com seguradoras para oferecer alternativa à caução. Menos burocracia, mais segurança.",
    color: "#0078D6",
  },
];

const benefits = [
  { icon: Percent, title: "Redução de 60%", desc: "Na inadimplência nos primeiros 6 meses" },
  { icon: Clock, title: "Vacância -45%", desc: "Tempo médio de reposição de locatários" },
  { icon: UserCheck, title: "Seleção 100%", desc: "De locatários com análise de crédito" },
  { icon: Wallet, title: "ROI em 90 dias", desc: "Payback garantido ou seu dinheiro de volta" },
];

const plans = [
  {
    icon: Home,
    name: "Starter",
    price: "R$ 299",
    period: "por mês",
    desc: "Para pequenas imobiliárias com até 20 imóveis.",
    features: ["Análise de crédito básica", "Alertas de inadimplência", "Dashboard simples", "Até 20 unidades"],
  },
  {
    icon: Building2,
    name: "Professional",
    price: "R$ 599",
    period: "por mês",
    desc: "Para imobiliárias em crescimento, até 100 imóveis.",
    features: ["Análise de crédito completa", "Cobrança automatizada", "Dashboard avançado", "Contratos inteligentes", "Suporte prioritário"],
    highlight: true,
  },
  {
    icon: Sparkles,
    name: "Enterprise",
    price: "Sob consulta",
    period: "personalizado",
    desc: "Para grandes gestores patrimoniais.",
    features: ["Tudo do Professional", "Integração com sistemas", "Gerente de conta dedicado", "SLAs personalizados", "Relatórios customizados"],
  },
];

const ImobiliariaSection = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: painRef, isVisible: painVisible } = useScrollReveal();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollReveal();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollReveal();
  const { ref: calcRef, isVisible: calcVisible } = useScrollReveal();
  const { ref: pricingRef, isVisible: pricingVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const [imoveis, setImoveis] = useState(30);
  const [aluguelMedio, setAluguelMedio] = useState(2500);

  const receitaMensal = imoveis * aluguelMedio;
  const perdaInadimplencia = receitaMensal * 0.25;
  const custoMensal = Math.max(imoveis * 20, 299);
  const economia = perdaInadimplencia * 0.6;
  const roi = economia - custoMensal;
  const paybackMeses = roi > 0 ? Math.ceil(3000 / roi) : 0;

  return (
    <>
      {/* Hero - MBDS Style: Clean, Luxury, High Contrast */}
      <section 
        ref={heroRef} 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full" style={{ backgroundColor: "#0078D6" }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="w-1 h-8" style={{ backgroundColor: "#0078D6" }} />
              <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#767676", fontFamily: "'Inter', sans-serif" }}>
                Gestão Imobiliária Inteligente
              </span>
            </div>

            <h1 
              className={`font-exo font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ color: "#F8F8F8", transitionDelay: "0.2s" }}
            >
              Proteja seu
              <br />
              <span style={{ color: "#0078D6" }}>Patrimônio</span>
            </h1>

            <p 
              className={`text-lg md:text-xl mb-10 max-w-xl transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ color: "#767676", lineHeight: 1.6, fontFamily: "'Inter', sans-serif", transitionDelay: "0.4s" }}
            >
              Reduza em até 60% a inadimplência dos seus locatários com inteligência de dados e cobrança automatizada.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.6s" }}>
              <a
                href="#calculadora"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#0078D6", borderRadius: "2px", fontFamily: "'Inter', sans-serif" }}
              >
                Agendar Demonstração
                <ArrowRight size={18} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold transition-all duration-300 hover:opacity-80"
                style={{ border: "1px solid #767676", borderRadius: "2px", color: "#F8F8F8", fontFamily: "'Inter', sans-serif" }}
              >
                Ver Funcionalidades
              </a>
            </div>
          </div>

          <div className={`mt-16 transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex flex-wrap gap-12">
              {[
                { value: "-60%", label: "Redução inadimplência" },
                { value: "90 dias", label: "Payback garantido" },
                { value: "100%", label: "Análise de crédito" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-exo font-bold text-3xl" style={{ color: "#0078D6" }}>{stat.value}</div>
                  <div className="font-exo text-sm mt-1" style={{ color: "#767676" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "#767676", opacity: 0.2 }} />
      </section>

      {/* Pain Points - MBDS Style */}
      <section className="relative py-24" style={{ backgroundColor: "#F8F8F8" }}>
        <div ref={painRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className={`inline-flex items-center gap-2 mb-4 transition-all duration-700 ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="w-8 h-px" style={{ backgroundColor: "#0078D6" }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "#767676", fontFamily: "'Inter', sans-serif" }}>
                O Problema
              </span>
            </span>
            <h2 className={`font-exo font-bold text-4xl md:text-5xl leading-tight transition-all duration-700 ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#0D0D0D" }}>
              Sua imobiliária está
              <br />
              <span style={{ color: "#0078D6" }}>perdendo dinheiro</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pains.map((pain, i) => (
              <div
                key={pain.title}
                className={`relative p-8 transition-all duration-700 ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ 
                  transitionDelay: `${300 + i * 150}ms`,
                  borderTop: "2px solid #0078D6"
                }}
              >
                <div className="font-exo font-bold text-5xl mb-4" style={{ color: "#0078D6" }}>{pain.stat}</div>
                <h3 className="font-exo font-bold text-xl mb-3" style={{ color: "#0D0D0D" }}>{pain.title}</h3>
                <p className="font-exo leading-relaxed" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>{pain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - MBDS Style */}
      <section id="features" className="relative py-24" style={{ backgroundColor: "#0D0D0D" }}>
        <div ref={featuresRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className={`inline-flex items-center gap-2 mb-4 transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="w-8 h-px" style={{ backgroundColor: "#0078D6" }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "#767676", fontFamily: "'Inter', sans-serif" }}>
                A Solução
              </span>
            </span>
            <h2 className={`font-exo font-bold text-4xl md:text-5xl leading-tight transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#F8F8F8" }}>
              Tecnologia que
              <br />
              <span style={{ color: "#0078D6" }}>protege seu patrimônio</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#767676", opacity: 0.2 }}>
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className={`relative p-8 transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ 
                  backgroundColor: "#0D0D0D",
                  transitionDelay: `${300 + i * 100}ms`
                }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "#0078D6", borderRadius: "2px" }}>
                  <feat.icon size={24} className="text-white" />
                </div>
                <h3 className="font-exo font-bold text-lg mb-3" style={{ color: "#F8F8F8" }}>{feat.title}</h3>
                <p className="font-exo leading-relaxed" style={{ color: "#767676", fontFamily: "'Inter', sans-serif" }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - MBDS Style */}
      <section className="relative py-24" style={{ backgroundColor: "#F8F8F8" }}>
        <div ref={benefitsRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`font-exo font-bold text-4xl md:text-5xl transition-all duration-700 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#0D0D0D" }}>
              Resultados que
              <span style={{ color: "#0078D6" }}> transformam</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className={`relative text-center transition-all duration-700 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#0D0D0D", borderRadius: "2px" }}>
                  <benefit.icon size={28} style={{ color: "#0078D6" }} />
                </div>
                <h3 className="font-exo font-bold text-2xl mb-2" style={{ color: "#0078D6" }}>{benefit.title}</h3>
                <p className="font-exo text-sm" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator - MBDS Style */}
      <section id="calculadora" className="relative py-24" style={{ backgroundColor: "#0D0D0D" }}>
        <div ref={calcRef} className="max-w-[800px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className={`inline-flex items-center gap-2 mb-4 transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="w-8 h-px" style={{ backgroundColor: "#0078D6" }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "#767676", fontFamily: "'Inter', sans-serif" }}>
                Calculadora de ROI
              </span>
            </span>
            <h2 className={`font-exo font-bold text-4xl md:text-5xl transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#F8F8F8" }}>
              Veja o <span style={{ color: "#0078D6" }}>retorno real</span>
            </h2>
          </div>

          <div
            className={`relative p-10 transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ 
              backgroundColor: "#F8F8F8",
              borderRadius: "2px",
              transitionDelay: "300ms"
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Calculator size={24} style={{ color: "#0078D6" }} />
              <h3 className="font-exo font-bold text-xl" style={{ color: "#0D0D0D" }}>Simule seu cenário</h3>
            </div>

            <div className="space-y-8">
              <div>
                <label className="font-exo text-sm mb-3 block" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>
                  Número de imóveis geridos
                </label>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={imoveis}
                  onChange={(e) => setImoveis(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer"
                  style={{ backgroundColor: "#767676" }}
                />
                <div className="font-exo font-bold text-2xl mt-2" style={{ color: "#0D0D0D" }}>{imoveis} imóveis</div>
              </div>

              <div>
                <label className="font-exo text-sm mb-3 block" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>
                  Aluguel médio
                </label>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={aluguelMedio}
                  onChange={(e) => setAluguelMedio(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer"
                  style={{ backgroundColor: "#767676" }}
                />
                <div className="font-exo font-bold text-2xl mt-2" style={{ color: "#0D0D0D" }}>
                  R$ {aluguelMedio.toLocaleString("pt-BR")}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8" style={{ borderTop: "1px solid #E8E8E8" }}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-exo" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>Receita mensal potencial</span>
                <span className="font-exo font-bold" style={{ color: "#0D0D0D" }}>R$ {receitaMensal.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-exo" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>Perda com inadimplência (25%)</span>
                <span className="font-exo font-bold" style={{ color: "#D92121" }}>-R$ {perdaInadimplencia.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-exo" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>Custo da solução (R$ 20/unidade)</span>
                <span className="font-exo font-bold" style={{ color: "#696969" }}>-R$ {custoMensal.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid #E8E8E8" }}>
                <span className="font-exo font-semibold" style={{ color: "#0D0D0D" }}>Economia líquida / mês</span>
                <span className="font-exo font-bold text-2xl" style={{ color: "#0078D6" }}>+R$ {roi.toLocaleString("pt-BR")}</span>
              </div>
              <div className="text-center mt-6 p-6" style={{ backgroundColor: "#0D0D0D", borderRadius: "2px" }}>
                <div className="font-exo text-sm" style={{ color: "#767676" }}>Payback do investimento</div>
                <div className="font-exo font-bold text-4xl mt-1" style={{ color: "#0078D6" }}>
                  {paybackMeses} {paybackMeses === 1 ? "mês" : "meses"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - MBDS Style */}
      <section className="relative py-24" style={{ backgroundColor: "#F8F8F8" }}>
        <div ref={pricingRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-flex items-center gap-2 mb-4 transition-all duration-700 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="w-8 h-px" style={{ backgroundColor: "#0078D6" }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "#767676", fontFamily: "'Inter', sans-serif" }}>
                Investimento
              </span>
            </span>
            <h2 className={`font-exo font-bold text-4xl md:text-5xl transition-all duration-700 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#0D0D0D" }}>
              Planos <span style={{ color: "#0078D6" }}>transparentes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative p-8 transition-all duration-700 ${plan.highlight ? "scale-105" : ""} ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ 
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2px",
                  border: plan.highlight ? "2px solid #0078D6" : "1px solid #E8E8E8",
                  transitionDelay: `${300 + i * 150}ms`
                }}
              >
                {plan.highlight && (
                  <div 
                    className="absolute -top-3 left-8 px-4 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: "#0078D6", borderRadius: "2px" }}
                  >
                    Mais popular
                  </div>
                )}
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "#0D0D0D", borderRadius: "2px" }}>
                  <plan.icon size={24} style={{ color: "#0078D6" }} />
                </div>
                <h3 className="font-exo font-bold text-lg mb-2" style={{ color: "#0D0D0D" }}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-exo font-bold text-3xl" style={{ color: "#0078D6" }}>{plan.price}</span>
                  <span className="font-exo text-sm" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>/{plan.period}</span>
                </div>
                <p className="font-exo text-sm mb-6" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>{plan.desc}</p>
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "#0078D6" }} />
                      <span className="font-exo text-sm" style={{ color: "#696969", fontFamily: "'Inter', sans-serif" }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - MBDS Style */}
      <section className="relative py-24" style={{ backgroundColor: "#0D0D0D" }}>
        <div ref={ctaRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <h2 className={`font-exo font-bold text-4xl md:text-5xl mb-6 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#F8F8F8" }}>
            Proteja seu patrimônio
            <br />
            <span style={{ color: "#0078D6" }}>elimine a inadimplência</span>
          </h2>
          <p className={`font-exo text-lg mb-10 max-w-xl mx-auto transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#767676", fontFamily: "'Inter', sans-serif", transitionDelay: "0.2s" }}>
            Agende uma demonstração gratuita e descubra quanto sua imobiliária pode economizar.
          </p>
          <div className={`transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.4s" }}>
            <a
              href="#calculadora"
              className="inline-flex items-center gap-2 px-10 py-5 font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: "#0078D6", borderRadius: "2px" }}
            >
              Agendar Demonstração Gratuita
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImobiliariaSection;
