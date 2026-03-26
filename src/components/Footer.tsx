import { Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
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
            <p className="font-exo text-sm text-white/50 leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
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
              
              <a
                href="https://wa.me/556282412665"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 py-2 px-4 rounded-xl border border-purple-500/30 hover:border-green-500/50 transition-all duration-300 w-fit"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_100%] opacity-80 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center gap-2">
                  <div className="w-7 h-7 bg-purple-500/30 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300">
                    <MessageCircle size={14} className="text-purple-400 group-hover:text-white" fill="currentColor" />
                  </div>
                  <span className="font-exo font-bold text-white text-sm">{t("footer.whatsappAction")}</span>
                  <ArrowRight size={14} className="text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
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
    </footer>
  );
};

export default Footer;
