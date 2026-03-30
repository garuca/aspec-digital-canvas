import { Phone, Mail, Menu, X, Building2 } from "lucide-react";
import { useState } from "react";
import ImobiliariaSection from "@/components/ImobiliariaSection";

const ImobiliariaPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-exo" style={{ backgroundColor: "#0D0D0D" }}>
      {/* Header - MBDS Style */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "#0D0D0D", borderBottom: "1px solid rgba(118, 118, 118, 0.2)" }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "#0078D6", borderRadius: "2px" }}>
                <Building2 size={24} className="text-white" />
              </div>
              <span className="font-exo font-bold text-xl" style={{ color: "#F8F8F8" }}>
                ASPEC
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Início", "Funcionalidades", "Preços", "Contato"].map((item) => (
                <a
                  key={item}
                  href={item === "Início" ? "#" : `#${item.toLowerCase()}`}
                  className="font-exo text-sm font-medium transition-colors hover:opacity-70"
                  style={{ color: "#F8F8F8" }}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-6">
              <a
                href="tel:+550000000000"
                className="flex items-center gap-2 font-exo text-sm"
                style={{ color: "#767676" }}
              >
                <Phone size={16} style={{ color: "#0078D6" }} />
                Contato
              </a>
              <a
                href="#calculadora"
                className="px-5 py-2 font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0078D6", borderRadius: "2px" }}
              >
                Demonstração
              </a>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: "#F8F8F8" }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4">
            <nav className="flex flex-col gap-4">
              {["Início", "Funcionalidades", "Preços", "Contato"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-exo text-sm font-medium py-2"
                  style={{ color: "#F8F8F8" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#calculadora"
                className="mt-2 px-5 py-3 font-semibold text-white text-center"
                style={{ backgroundColor: "#0078D6", borderRadius: "2px" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Demonstração
              </a>
            </nav>
          </div>
        )}
      </header>

      <div className="pt-16">
        <ImobiliariaSection />
      </div>

      {/* Footer - MBDS Style */}
      <footer className="py-8" style={{ backgroundColor: "#0D0D0D", borderTop: "1px solid rgba(118, 118, 118, 0.2)" }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: "#0078D6", borderRadius: "2px" }}>
                <Building2 size={18} className="text-white" />
              </div>
              <span className="font-exo font-bold" style={{ color: "#F8F8F8" }}>ASPEC</span>
            </div>
            <p className="font-exo text-sm" style={{ color: "#767676" }}>
              © {new Date().getFullYear()} ASPEC Digital Solutions. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="font-exo text-sm transition-colors hover:opacity-70" style={{ color: "#767676" }}>
                Privacidade
              </a>
              <a href="#" className="font-exo text-sm transition-colors hover:opacity-70" style={{ color: "#767676" }}>
                Termos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImobiliariaPage;
