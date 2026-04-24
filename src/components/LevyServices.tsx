import { Home, Building2, Truck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Mudanças Residenciais",
    desc: "Cuidado total com seus móveis e pertences. Embalamos, transportamos e organizamos sua nova casa.",
  },
  {
    icon: Building2,
    title: "Mudanças Comerciais",
    desc: "Transição rápida e planejada para sua empresa não parar. Trabalhamos em horários flexíveis.",
  },
  {
    icon: Truck,
    title: "Transporte de Cargas",
    desc: "Fretes seguros e pontuais para diversas regiões, com veículos adaptados para cada demanda.",
  },
];

export function LevyServices() {
  return (
    <section id="servicos" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-[#F69906] uppercase tracking-widest">
            Nossos Serviços
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-[#1a365d]">
            Soluções completas em transporte
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Da pequena entrega à grande mudança, atendemos cada cliente com atenção
            personalizada e segurança total.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#2B6CB0] mb-6 group-hover:scale-110 transition-transform">
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1a365d]">{s.title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{s.desc}</p>
              <a
                href="#orcamento"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2B6CB0] hover:text-[#F69906] transition-colors"
              >
                Solicitar este serviço
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LevyServices;