import { ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import heroTruck from "@/assets/levy-hero-truck.jpg";

export function LevyHero() {
  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroTruck}
          alt="Caminhão de mudanças Levy Transportes"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d] via-[#2B6CB0]/80 to-[#1a365d] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,transparent,rgba(0,0,0,0.4))]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8 pt-28 pb-20 md:py-32">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-medium border border-white/20">
            <ShieldCheck className="h-4 w-4 text-[#F69906]" />
            Mais de 10 anos cuidando do seu patrimônio
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
            Sua mudança e transporte de cargas com{" "}
            <span className="text-[#F69906]">segurança e agilidade</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl">
            Atendimento especializado para mudanças residenciais, comerciais e fretes em geral.
            Cuidamos do seu patrimônio como se fosse nosso.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#orcamento"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F69906] to-[#DD6B06] rounded-lg font-semibold text-white shadow-lg hover:scale-[1.03] transition-transform"
            >
              Solicitar Orçamento Agora
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              Conhecer Serviços
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-xl">
            {[
              { icon: ShieldCheck, label: "100% Seguro" },
              { icon: Clock, label: "Pontualidade" },
              { icon: Award, label: "Equipe Treinada" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-2">
                <f.icon className="h-6 w-6 text-[#F69906]" />
                <span className="text-sm md:text-base font-semibold text-white">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LevyHero;