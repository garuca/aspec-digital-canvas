import { Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getBasePath } from "@/utils/basePath";

const Footer = () => {
  const { t } = useLanguage();

  const basePath = getBasePath();

  const navItems = [
    { label: "nav.inicio", href: "#inicio" },
    { label: "nav.servicos", href: "#servicos" },
    { label: "nav.abordagem", href: "#abordagem" },
    { label: "nav.quemSomos", href: "#team" },
  ];

  return (
    <footer className="relative py-20 overflow-hidden" style={{ backgroundColor: "#030712" }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="mb-6">
              <img 
                src={`${basePath}/logo_aspec.png`} 
                alt="Aspec Logo" 
                className="h-12 w-auto object-contain mb-2"
              />
            </div>
            <p className="font-exo text-sm text-white/50 mb-6 leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              <Button variant="gradient" size="sm" className="gap-2 rounded-lg">
                {t("nav.conversar")} <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-exo font-bold text-sm text-white mb-6">{t("footer.navigation")}</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-exo text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-500 transition-colors" />
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-exo font-bold text-sm text-white mb-6">{t("footer.contact")}</h4>
            <div className="space-y-4">
              <a
                href="mailto:contato@aspec.ia.br"
                className="flex items-start gap-3 text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Mail size={14} className="text-purple-400" />
                </div>
                <div>
                  <span className="text-white/50 block">Email</span>
                  <span className="text-white/80 font-medium">contato@aspec.ia.br</span>
                </div>
              </a>
              
              {/* Botão WhatsApp Criativo - ASPEC + WhatsApp */}
              <a
                href="https://wa.me/556282412665"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-full py-4 px-6 rounded-xl overflow-hidden"
              >
                {/* Background gradiente animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-green-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Efeito de brilho deslizante */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -inset-full top-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine" />
                </div>
                
                {/* Partículas decorativas */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full animate-ping" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
                
                {/* Conteúdo do botão */}
                <div className="relative z-10 flex items-center gap-3">
                  {/* Ícone WhatsApp estilizado */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <MessageCircle size={22} className="text-white" fill="white" />
                    </div>
                    {/* Halo effect */}
                    <div className="absolute inset-0 w-10 h-10 bg-green-400/30 rounded-full blur-md animate-pulse" />
                  </div>
                  
                  {/* Texto */}
                  <div className="flex flex-col items-start">
                    <span className="font-exo font-bold text-white text-base leading-tight">{t("footer.whatsappAction")}</span>
                    <span className="font-exo text-white/70 text-xs">{t("footer.whatsappSubtitle")}</span>
                  </div>
                  
                  {/* Seta animada */}
                  <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
                
                {/* Borda brilhante */}
                <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
              </a>
              
              <div className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-purple-400" />
                </div>
                <div>
                  <span className="text-white/50 block">Localização</span>
                  <span className="text-white/80 font-medium">Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-exo text-xs text-white/40">
              © {new Date().getFullYear()} ASPEC Soluções em Tecnologia. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-exo text-xs text-white/40">{t("footer.operational")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
