import { Phone, Mail, Menu, X, Truck } from "lucide-react";
import { useState } from "react";
import LevyHero from "@/components/LevyHero";
import LevyServices from "@/components/LevyServices";
import LevyQuoteForm from "@/components/LevyQuoteForm";

const LevyFooter = () => (
  <footer className="bg-[#1a365d] text-white py-12">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Truck size={32} className="text-[#F69906]" />
            <span className="font-bold text-xl">Levy Transportes</span>
          </div>
          <p className="text-white/70 max-w-md">
            Mais de 10 anos de experiência em mudanças e transportes.
            Cuidamos do seu patrimônio como se fosse nosso.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="tel:+550000000000" className="flex items-center gap-2 text-white/70 hover:text-[#F69906]">
              <Phone size={18} /> (00) 00000-0000
            </a>
            <a href="mailto:contato@levy.com.br" className="flex items-center gap-2 text-white/70 hover:text-[#F69906]">
              <Mail size={18} /> contato@levy.com.br
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4">Links Rápidos</h4>
          <ul className="space-y-2 text-white/70">
            <li><a href="#inicio" className="hover:text-[#F69906]">Início</a></li>
            <li><a href="#servicos" className="hover:text-[#F69906]">Serviços</a></li>
            <li><a href="#orcamento" className="hover:text-[#F69906]">Orçamento</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Serviços</h4>
          <ul className="space-y-2 text-white/70">
            <li>Mudanças Residenciais</li>
            <li>Mudanças Comerciais</li>
            <li>Transporte de Cargas</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
        <p>© {new Date().getFullYear()} Levy Transportes. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

const LevyPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-exo">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a365d]/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Truck size={32} className="text-[#F69906]" />
              <span className="font-bold text-xl text-white">Levy</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Início", "Serviços", "Orçamento"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/80 hover:text-[#F69906] font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <a
              href="#orcamento"
              className="hidden md:inline-flex px-5 py-2 bg-[#F69906] text-white font-semibold rounded-lg hover:bg-[#DD6B06] transition-colors"
            >
              Solicitar Orçamento
            </a>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <nav className="flex flex-col gap-4">
              {["Início", "Serviços", "Orçamento"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="pt-16">
        <LevyHero />
        
        <section id="servicos">
          <LevyServices />
        </section>

        <section id="orcamento" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="text-sm font-semibold text-[#F69906] uppercase tracking-widest">
                Orçamento Online
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-[#1a365d]">
                Solicite seu orçamento gratuito
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                Preencha os dados abaixo. Nossa equipe retornará em até 2 horas úteis.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <LevyQuoteForm />
            </div>
          </div>
        </section>
      </main>

      <LevyFooter />
    </div>
  );
};

export default LevyPage;