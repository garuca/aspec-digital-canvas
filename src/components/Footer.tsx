import { Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getBasePath } from "@/utils/basePath";
import { useState } from "react";

const Footer = () => {
  const { t } = useLanguage();

  const basePath = getBasePath();
  const [showWhatsAppTip, setShowWhatsAppTip] = useState(false);

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
              
              {/* WhatsApp com Badge IA - Design Criativo */}
              <div className="relative">
                <a
                  href="https://wa.me/556282412665"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm group"
                  onMouseEnter={() => setShowWhatsAppTip(true)}
                  onMouseLeave={() => setShowWhatsAppTip(false)}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 group-hover:scale-110">
                      <MessageCircle size={14} className="text-white" />
                    </div>
                    {/* Badge IA */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-[8px] font-bold text-white">IA</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-white/50 block">{t("footer.whatsappLabel")}</span>
                    <span className="text-white/80 font-medium">+55 62 8241-2665</span>
                    <span className="text-[10px] text-green-400 font-medium ml-1">→ {t("footer.whatsappAction")}</span>
                  </div>
                </a>
                
                {/* Tooltip Criativo */}
                <div className={`absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900/95 backdrop-blur-xl border border-green-500/30 rounded-xl shadow-xl shadow-green-500/10 transition-all duration-300 z-50 ${showWhatsAppTip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-sm">{t("footer.whatsappTipTitle")}</span>
                        <span className="px-1.5 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded text-[10px] text-cyan-400 font-bold">NEW</span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {t("footer.whatsappTipDesc")}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-6 -bottom-2 w-4 h-4 bg-gray-900/95 border-r border-b border-green-500/30 transform rotate-45" />
                </div>
              </div>
              
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
    </footer>
  );
};

export default Footer;
