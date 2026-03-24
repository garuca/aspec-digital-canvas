import { useState } from "react";
import { Sparkles, AlertTriangle, TrendingDown, DollarSign, Smartphone, Brain, MessageSquare, BarChart3, Star, Shield, Zap, Bell, CreditCard, MessageCircle, Calendar, TrendingUp, QrCode, Calculator, Check, ArrowRight } from "lucide-react";
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

const floatingIcons = [
  { icon: Star, className: "top-[15%] left-[5%] animate-float-slow" },
  { icon: Shield, className: "top-[25%] right-[8%] animate-float-slow" },
  { icon: Zap, className: "bottom-[20%] left-[12%] animate-float-slow" },
  { icon: Star, className: "bottom-[30%] right-[5%] animate-float-slow" },
];

const pains = [
  {
    icon: AlertTriangle,
    title: "Inadimplência crônica",
    stat: "10%",
    desc: "A taxa média de inadimplência em colégios corrói sua receita mês a mês.",
  },
  {
    icon: TrendingDown,
    title: "Evasão silenciosa",
    stat: "R$ 18.000",
    desc: "É o custo médio anual de perder um único aluno. Multiplique pelas desistências.",
  },
  {
    icon: DollarSign,
    title: "Gestão reativa",
    stat: "67%",
    desc: "Dos diretores só descobrem que um aluno vai sair quando o pedido chega.",
  },
];

const features = [
  {
    icon: Smartphone,
    title: "App Nativo para Pais e Alunos",
    desc: "Acompanhamento de desempenho em tempo real, frequência e comunicação direta.",
  },
  {
    icon: Brain,
    title: "Algoritmo de Previsão de Evasão",
    desc: "IA que detecta alunos em risco antes que a família decida sair.",
  },
  {
    icon: MessageSquare,
    title: "Cobrança Automática via WhatsApp e PIX",
    desc: "Régua de cobrança inteligente que envia lembretes personalizados.",
  },
  {
    icon: BarChart3,
    title: "Dashboard de Saúde Financeira",
    desc: "Visão completa da receita, inadimplência e projeções.",
  },
];

const parentBenefits = [
  { icon: Bell, title: "Notificações em Tempo Real", desc: "Saber exatamente quando o aluno entra e sai.", badge: "Segurança" },
  { icon: CreditCard, title: "Pagamento em um Clique", desc: "Integração com PIX e Boleto para reduzir inadimplência.", badge: "Financeiro" },
  { icon: MessageCircle, title: "Comunicação Sem Ruídos", desc: "Canal direto com a coordenação.", badge: "Retenção" },
];

const studentBenefits = [
  { icon: Calendar, title: "Agenda Inteligente", desc: "Provas, trabalhos e materiais centralizados.", badge: "Organização" },
  { icon: TrendingUp, title: "Dashboard de Desempenho", desc: "Gráficos de evolução pedagógica.", badge: "Performance" },
  { icon: QrCode, title: "Carteirinha Digital", desc: "Acesso modernizado via QR Code.", badge: "Identidade" },
];

const plans = [
  {
    icon: Zap,
    name: "Setup de Implementação",
    price: "R$ 7.000",
    period: "pagamento único",
    desc: "Configuração completa, treinamento e personalização.",
    features: ["Configuração completa", "Treinamento presencial", "Personalização", "Suporte 30 dias"],
  },
  {
    icon: Calculator,
    name: "Migração de Dados",
    price: "R$ 8.099",
    period: "pagamento único",
    desc: "Transferência profissional com garantia de integridade.",
    features: ["Migração histórico", "Importação financeira", "Validação completa", "Garantia"],
  },
  {
    icon: CreditCard,
    name: "Licenciamento Mensal",
    price: "R$ 14,99",
    period: "por aluno / mês",
    desc: "Acesso completo com todas as funcionalidades.",
    features: ["Todas funcionalidades", "App nativo", "IA preditiva", "Cobrança automática"],
    highlight: true,
  },
];

const SchoolNavigatorSection = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: painRef, isVisible: painVisible } = useScrollReveal();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollReveal();
  const { ref: experienceRef, isVisible: experienceVisible } = useScrollReveal();
  const { ref: calcRef, isVisible: calcVisible } = useScrollReveal();
  const { ref: pricingRef, isVisible: pricingVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const [alunos, setAlunos] = useState(500);
  const [mensalidade, setMensalidade] = useState(1200);

  const receitaMensal = alunos * mensalidade;
  const perdaInadimplencia = receitaMensal * 0.1;
  const perdaEvasao = (alunos * 0.05 * mensalidade * 12) / 12;
  const custoMensal = Math.max(alunos * 14.99, 1500);
  const economiaRecuperada = perdaInadimplencia * 0.6 + perdaEvasao * 0.4;
  const roi = economiaRecuperada - custoMensal;
  const paybackMeses = roi > 0 ? Math.ceil(10000 / roi) : 0;

  return (
    <>
      <div className="geometric-divider" />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#030014" }}>
        <StarField count={50} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-aspec-purple-deep/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-aspec-pink/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <div className={`inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Sparkles size={14} className="text-aspec-purple-medium" />
            <span className="text-sm font-medium text-aspec-text-secondary font-exo">Caso de Sucesso</span>
          </div>

          <h1 className={`font-exo font-extrabold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-6 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
            <span className="text-gradient-aspec">ASPEC School Navigator</span>
            <br />
            <span className="text-white">Gestão Escolar Inteligente</span>
          </h1>

          <p className={`font-exo text-lg md:text-xl text-aspec-text-secondary max-w-2xl mx-auto mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.4s", lineHeight: 1.6 }}>
            Aumente a retenção de alunos e recupere sua receita com inteligência de dados.
            <br className="hidden md:block" />
            Payback em menos de 2 meses.
          </p>

          <div className={`flex flex-col md:flex-row items-center justify-center gap-8 mt-12 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.6s" }}>
            {[
              { value: "94%", label: "Redução na inadimplência" },
              { value: "<2 meses", label: "Payback médio" },
              { value: "+27%", label: "Retenção de alunos" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-exo font-bold text-2xl text-gradient-aspec">{stat.value}</div>
                <div className="font-exo text-sm text-aspec-text-muted mt-1">{stat.label}</div>
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
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-aspec-text-secondary font-exo mb-4 transition-all duration-700 ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              O problema
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Sua escola está <span className="text-gradient-aspec">perdendo dinheiro</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pains.map((pain, i) => (
              <div
                key={pain.title}
                className={`relative p-8 bg-gradient-to-br from-purple-950/50 to-pink-950/30 rounded-3xl border border-aspec-purple-deep/20 backdrop-blur-sm hover:border-aspec-purple-deep/40 transition-all duration-500 group ${painVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aspec-purple-deep to-aspec-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <pain.icon className="text-white" size={24} />
                </div>
                <div className="font-exo font-bold text-3xl text-gradient-aspec mb-2">{pain.stat}</div>
                <h3 className="font-exo font-bold text-xl text-white mb-3">{pain.title}</h3>
                <p className="font-exo text-aspec-text-secondary leading-relaxed">{pain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #030014 0%, #1A1033 50%, #030014 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-aspec-purple-deep/10 blur-[200px] pointer-events-none" />

        <div ref={featuresRef} className="relative max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-aspec-text-secondary font-exo mb-4 transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              A solução
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Tecnologia que <span className="text-gradient-aspec">protege sua receita</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className={`relative p-8 bg-gradient-to-br from-purple-950/50 to-pink-950/30 rounded-3xl border border-aspec-purple-deep/20 backdrop-blur-sm hover:border-aspec-purple-deep/40 transition-all duration-500 group ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aspec-purple-deep to-aspec-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feat.icon className="text-white" size={24} />
                </div>
                <h3 className="font-exo font-bold text-xl text-white mb-3">{feat.title}</h3>
                <p className="font-exo text-aspec-text-secondary leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Experience */}
      <section className="relative py-24 overflow-hidden" style={{ background: "#030014" }}>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-aspec-purple-deep/20 blur-[250px] pointer-events-none" />
        
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.className}`}
            style={{ animationDelay: `${i * 1.5}s` }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
              <item.icon className="text-aspec-purple-medium" size={18} />
            </div>
          </div>
        ))}

        <div ref={experienceRef} className="relative max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-aspec-text-secondary font-exo mb-4 transition-all duration-700 ${experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Experiência Digital
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] transition-all duration-700 ${experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              O Futuro da Educação <span className="text-gradient-aspec">na Palma da Mão</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aspec-purple-deep to-aspec-pink flex items-center justify-center">
                  <Shield className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="font-exo font-bold text-2xl text-white">Para os Pais</h3>
                  <p className="font-exo text-aspec-text-secondary text-sm">O Foco no ROI</p>
                </div>
              </div>
              <div className="space-y-4">
                {parentBenefits.map((benefit, i) => (
                  <div
                    key={benefit.title}
                    className={`relative p-6 bg-gradient-to-br from-purple-950/50 to-pink-950/30 rounded-2xl border border-aspec-purple-deep/20 backdrop-blur-sm hover:border-aspec-purple-deep/40 hover:scale-105 transition-all duration-500 group ${experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                  >
                    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-aspec-purple-deep/20 text-aspec-purple-light font-exo mb-3">
                      {benefit.badge}
                    </span>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-aspec-purple-deep/30 to-aspec-pink/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="text-aspec-purple-light" size={20} />
                      </div>
                      <div>
                        <h4 className="font-exo font-semibold text-white mb-1">{benefit.title}</h4>
                        <p className="font-exo text-sm text-aspec-text-secondary leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aspec-cyan to-aspec-purple-medium flex items-center justify-center">
                  <Zap className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="font-exo font-bold text-2xl text-white">Para os Alunos</h3>
                  <p className="font-exo text-aspec-text-secondary text-sm">Engajamento</p>
                </div>
              </div>
              <div className="space-y-4">
                {studentBenefits.map((benefit, i) => (
                  <div
                    key={benefit.title}
                    className={`relative p-6 bg-gradient-to-br from-purple-950/50 to-pink-950/30 rounded-2xl border border-aspec-purple-deep/20 backdrop-blur-sm hover:border-aspec-purple-deep/40 hover:scale-105 transition-all duration-500 group ${experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                  >
                    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-aspec-cyan/20 text-aspec-cyan font-exo mb-3">
                      {benefit.badge}
                    </span>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-aspec-cyan/30 to-aspec-purple-medium/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="text-aspec-cyan" size={20} />
                      </div>
                      <div>
                        <h4 className="font-exo font-semibold text-white mb-1">{benefit.title}</h4>
                        <p className="font-exo text-sm text-aspec-text-secondary leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`relative p-10 bg-gradient-to-br from-purple-950/60 to-pink-950/40 rounded-3xl border border-aspec-purple-deep/30 backdrop-blur-xl hover:border-aspec-purple-deep/50 hover:scale-[1.02] transition-all duration-500 text-center ${experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aspec-purple-deep to-aspec-pink flex items-center justify-center shadow-lg shadow-aspec-purple-deep/30">
                <Brain className="text-white" size={28} />
              </div>
            </div>
            <span className="inline-block text-xs font-medium px-4 py-1 rounded-full bg-aspec-pink/20 text-aspec-pink font-exo mb-6">
              Destaque Premium
            </span>
            <h3 className="font-exo font-bold text-2xl md:text-3xl text-white mb-4">
              Algoritmo de Previsão de Evasão
            </h3>
            <p className="font-exo text-aspec-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Nossa inteligência detecta padrões de risco (notas + faltas) e alerta a gestão antes que o aluno saia da escola.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="font-exo text-sm text-aspec-text-secondary">Análise de</p>
                <p className="font-exo font-bold text-white">Frequência</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="font-exo text-sm text-aspec-text-secondary">Cruzamento de</p>
                <p className="font-exo font-bold text-white">Notas</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="font-exo text-sm text-aspec-text-secondary">Alertas</p>
                <p className="font-exo font-bold text-white">Proativos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculadora" className="relative py-24" style={{ backgroundColor: "#030014" }}>
        <div ref={calcRef} className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-aspec-text-secondary font-exo mb-4 transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Calculadora de ROI
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Veja o <span className="text-gradient-aspec">retorno real</span> para sua escola
            </h2>
          </div>

          <div
            className={`max-w-2xl mx-auto relative p-8 md:p-10 bg-gradient-to-br from-purple-950/50 to-pink-950/30 rounded-3xl border border-aspec-purple-deep/20 backdrop-blur-sm transition-all duration-700 ${calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aspec-purple-deep to-aspec-pink flex items-center justify-center">
                <Calculator className="text-white" size={22} />
              </div>
              <h3 className="font-exo font-bold text-xl text-white">Simule seu cenário</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="font-exo text-sm text-aspec-text-secondary mb-2 block">
                  Número de alunos matriculados
                </label>
                <input
                  type="range"
                  min={100}
                  max={3000}
                  step={50}
                  value={alunos}
                  onChange={(e) => setAlunos(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-aspec-purple-deep [&::-webkit-slider-thumb]:to-aspec-pink"
                />
                <div className="font-exo font-bold text-2xl text-white mt-2">{alunos.toLocaleString("pt-BR")} alunos</div>
              </div>

              <div>
                <label className="font-exo text-sm text-aspec-text-secondary mb-2 block">
                  Mensalidade média
                </label>
                <input
                  type="range"
                  min={300}
                  max={4000}
                  step={100}
                  value={mensalidade}
                  onChange={(e) => setMensalidade(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-aspec-purple-deep [&::-webkit-slider-thumb]:to-aspec-pink"
                />
                <div className="font-exo font-bold text-2xl text-white mt-2">
                  R$ {mensalidade.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-exo text-aspec-text-secondary">Receita mensal atual</span>
                <span className="font-exo font-bold text-white">
                  R$ {receitaMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-exo text-aspec-text-secondary">Perda com inadimplência (10%)</span>
                <span className="font-exo font-bold text-red-400">
                  -R$ {perdaInadimplencia.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-exo text-aspec-text-secondary">Custo ASPEC / mês (R$ 14,99/aluno)</span>
                <span className="font-exo font-bold text-aspec-text-secondary">
                  -R$ {custoMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="font-exo font-semibold text-white">Economia líquida / mês</span>
                <span className="font-exo font-bold text-2xl text-gradient-aspec">
                  +R$ {roi.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-center mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-exo text-sm text-aspec-text-secondary">Payback do investimento inicial</div>
                <div className="font-exo font-extrabold text-3xl text-gradient-aspec mt-1">
                  {paybackMeses} {paybackMeses === 1 ? "mês" : "meses"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-24" style={{ background: "linear-gradient(180deg, #030014 0%, #1A1033 50%, #030014 100%)" }}>
        <div ref={pricingRef} className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-aspec-text-secondary font-exo mb-4 transition-all duration-700 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Investimento
            </span>
            <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white transition-all duration-700 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Preços <span className="text-gradient-aspec">transparentes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 group ${plan.highlight ? "bg-gradient-to-br from-aspec-purple-deep/30 to-aspec-pink/20 border-aspec-purple-deep/40 shadow-lg shadow-aspec-purple-deep/10" : "bg-gradient-to-br from-purple-950/50 to-pink-950/30 border-aspec-purple-deep/20 hover:border-aspec-purple-deep/40"} ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-aspec-purple-deep to-aspec-pink rounded-full text-xs font-exo font-semibold text-white">
                    Mais popular
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aspec-purple-deep to-aspec-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <plan.icon className="text-white" size={22} />
                </div>
                <h3 className="font-exo font-bold text-lg text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-exo font-extrabold text-3xl text-gradient-aspec">{plan.price}</span>
                  <span className="font-exo text-sm text-aspec-text-muted">/{plan.period}</span>
                </div>
                <p className="font-exo text-sm text-aspec-text-secondary mb-6">{plan.desc}</p>
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check size={16} className="text-aspec-purple-medium mt-0.5 shrink-0" />
                      <span className="font-exo text-sm text-aspec-text-secondary">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#030014" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-aspec-purple-deep/20 to-aspec-pink/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-aspec-purple-deep/15 blur-[150px] pointer-events-none" />

        <div ref={ctaRef} className="relative max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <h2 className={`font-exo font-bold text-3xl md:text-[2.5rem] leading-[1.2] text-white mb-6 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Pronto para transformar
            <br />
            <span className="text-gradient-aspec">a gestão da sua escola?</span>
          </h2>
          <p className={`font-exo text-lg text-aspec-text-secondary max-w-lg mx-auto mb-10 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
            Agende um diagnóstico gratuito e descubra quanto dinheiro sua escola pode recuperar no primeiro mês.
          </p>
          <div className={`transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.4s" }}>
            <a
              href="#calculadora"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-aspec-purple-deep to-aspec-pink rounded-xl font-exo font-semibold text-white text-lg hover:shadow-lg hover:shadow-aspec-purple-deep/30 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
            >
              Agendar Diagnóstico Gratuito
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <div className="geometric-divider-end" />
    </>
  );
};

export default SchoolNavigatorSection;
