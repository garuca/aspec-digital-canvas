import { useState } from "react";
import { Building2, Shield, CreditCard, TrendingDown, AlertTriangle, Home, Users, FileText, BarChart3, Wallet, Bell, CheckCircle, ArrowRight, Calculator, Sparkles, Percent, Clock, UserCheck, Lock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const StarField = ({ count = 50 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[2px] h-[2px] rounded-full bg-white animate-twinkle"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${2 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
);

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
    desc: " Cruzamento de dados do Serasa, SPC e histórico de aluguéis anteriores. Score de risco personalizado.",
    color: "#06B6D4",
  },
  {
    icon: Bell,
    title: "Alertas Antecipados",
    desc: "Detecção de sinais de risco 60 dias antes do atraso. Nossa IA identifica padrões que você não veria.",
    color: "#8B5CF6",
  },
  {
    icon: CreditCard,
    title: "Cobrança Automatizada",
    desc: "WhatsApp, SMS e e-mail com lembretes personalizados. Links de PIX prontos para pagamento instantâneo.",
    color: "#D946EF",
  },
  {
    icon: FileText,
    title: "Contratos Inteligentes",
    desc: "Modelos revisados por advogados, com cláusulas de proteção e garantias otimizadas para cada perfil.",
    color: "#5B2EFF",
  },
  {
    icon: BarChart3,
    title: "Dashboard em Tempo Real",
    desc: "Visualize inadimplência, vacância, receita e projeções. Decisões baseadas em dados, não em intuição.",
    color: "#A855F7",
  },
  {
    icon: Lock,
    title: "Seguro Garantia",
    desc: "Integração com seguradoras para oferecer alternativa à caução. Menos burocracia, mais segurança.",
    color: "#06B6D4",
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
      <div className="geometric-divider" />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#030014" }}>
        <StarField count={50} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <div className={`inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Building2 size={14} className="text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300 font-exo">Gestão Imobiliária Inteligente</span>
          </div>

          <h1 className={`font-exo font-extrabold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-6 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Proteja seu Patrimônio</span>
            <br />
            <span className="text-white">Elimine a Inadimplência</span>
          </h1>

          <p className={`font-exo text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.4s", lineHeight: 1.6 }}>
            Reduza em até 60% a inadimplência dos seus locatários com inteligência de dados e cobrança automatizada.
            <br className="hidden md:block" />
            Seu patrimônio, protegido e crescendo.
          </p>

          <div className={`flex flex-col md:flex-row items-center justify-center gap-8 mt-12 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.6s" }}>
            {[
              { value: "-60%", label: "Redução inadimplência" },
              { value: "90 dias", label: "Payback garantido" },
              { value: "100%", label: "Análise de crédito" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-exo font-bold text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="font-exo text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent" />
      </section>

      {/* Pain Points */}
      <section className="relative py-24" style={{ backgroundColor: "#030014" }}>
        <div ref={painRef} className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-exo mb-4 transition-all duration-700 ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              O problema
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Sua imobiliária está <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">perdendo dinheiro</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pains.map((pain, i) => (
              <div
                key={pain.title}
                className={`relative p-8 bg-gradient-to-br from-cyan-950/50 to-purple-950/30 rounded-3xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-500 group ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <pain.icon className="text-white" size={24} />
                </div>
                <div className="font-exo font-bold text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">{pain.stat}</div>
                <h3 className="font-exo font-bold text-xl text-white mb-3">{pain.title}</h3>
                <p className="font-exo text-gray-400 leading-relaxed">{pain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #030014 0%, #1A1033 50%, #030014 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[200px] pointer-events-none" />

        <div ref={featuresRef} className="relative max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-exo mb-4 transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              A solução
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Tecnologia que <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">protege seu patrimônio</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className={`relative p-8 bg-gradient-to-br from-cyan-950/30 to-purple-950/20 rounded-3xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-500 group ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `linear-gradient(135deg, ${feat.color}, ${feat.color}80)` }}
                >
                  <feat.icon className="text-white" size={24} />
                </div>
                <h3 className="font-exo font-bold text-xl text-white mb-3">{feat.title}</h3>
                <p className="font-exo text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-24" style={{ background: "#030014" }}>
        <div ref={benefitsRef} className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-exo mb-4 transition-all duration-700 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Resultados
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Números que <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">transformam</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className={`relative p-8 text-center bg-gradient-to-br from-cyan-950/30 to-purple-950/20 rounded-3xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 hover:scale-105 transition-all duration-500 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-white" size={28} />
                </div>
                <h3 className="font-exo font-bold text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">{benefit.title}</h3>
                <p className="font-exo text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculadora" className="relative py-24" style={{ background: "linear-gradient(180deg, #030014 0%, #1A1033 50%, #030014 100%)" }}>
        <div ref={calcRef} className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-exo mb-4 transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Calculadora de ROI
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Veja o <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">retorno real</span>
            </h2>
          </div>

          <div
            className={`max-w-2xl mx-auto relative p-8 md:p-10 bg-gradient-to-br from-cyan-950/50 to-purple-950/30 rounded-3xl border border-cyan-500/20 backdrop-blur-sm transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Calculator className="text-white" size={22} />
              </div>
              <h3 className="font-exo font-bold text-xl text-white">Simule seu cenário</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="font-exo text-sm text-gray-400 mb-2 block">
                  Número de imóveis geridos
                </label>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={imoveis}
                  onChange={(e) => setImoveis(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-purple-500"
                />
                <div className="font-exo font-bold text-2xl text-white mt-2">{imoveis} imóveis</div>
              </div>

              <div>
                <label className="font-exo text-sm text-gray-400 mb-2 block">
                  Aluguel médio
                </label>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={aluguelMedio}
                  onChange={(e) => setAluguelMedio(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-purple-500"
                />
                <div className="font-exo font-bold text-2xl text-white mt-2">
                  R$ {aluguelMedio.toLocaleString("pt-BR")}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-exo text-gray-400">Receita mensal potencial</span>
                <span className="font-exo font-bold text-white">
                  R$ {receitaMensal.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-exo text-gray-400">Perda com inadimplência (25%)</span>
                <span className="font-exo font-bold text-red-400">
                  -R$ {perdaInadimplencia.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-exo text-gray-400">Custo da solução (R$ 20/unidade)</span>
                <span className="font-exo font-bold text-gray-400">
                  -R$ {custoMensal.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="font-exo font-semibold text-white">Economia líquida / mês</span>
                <span className="font-exo font-bold text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  +R$ {roi.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="text-center mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-exo text-sm text-gray-400">Payback do investimento</div>
                <div className="font-exo font-extrabold text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mt-1">
                  {paybackMeses} {paybackMeses === 1 ? "mês" : "meses"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-24" style={{ background: "#030014" }}>
        <div ref={pricingRef} className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-exo mb-4 transition-all duration-700 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Investimento
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Planos <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">transparentes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 group ${plan.highlight ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/10" : "bg-gradient-to-br from-cyan-950/30 to-purple-950/20 border-cyan-500/20 hover:border-cyan-500/40"} ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-exo font-semibold text-white">
                    Mais popular
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <plan.icon className="text-white" size={22} />
                </div>
                <h3 className="font-exo font-bold text-lg text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-exo font-extrabold text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{plan.price}</span>
                  <span className="font-exo text-sm text-gray-500">/{plan.period}</span>
                </div>
                <p className="font-exo text-sm text-gray-400 mb-6">{plan.desc}</p>
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                      <span className="font-exo text-sm text-gray-400">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #030014 0%, #1A1033 50%, #030014 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

        <div ref={ctaRef} className="relative max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white mb-6 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Proteja seu patrimônio
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">elimine a inadimplência</span>
          </h2>
          <p className={`font-exo text-lg text-gray-400 max-w-lg mx-auto mb-10 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
            Agende uma demonstração gratuita e descubra quanto sua imobiliária pode economizar.
          </p>
          <div className={`transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.4s" }}>
            <a
              href="#calculadora"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-exo font-semibold text-white text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
            >
              Agendar Demonstração Gratuita
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <div className="geometric-divider-end" />
    </>
  );
};

export default ImobiliariaSection;
