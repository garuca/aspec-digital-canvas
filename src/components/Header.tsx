import { useState } from "react";
import { Menu, X, MessageCircle, ArrowRight } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { getBasePath } from "@/utils/basePath";

const WhatsAppButton = ({ text }: { text: string }) => (
  <a
    href="https://wa.me/556282412665"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center justify-center gap-2 py-2 px-4 rounded-xl overflow-hidden border border-purple-500/30 hover:border-green-500/50 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_100%] opacity-80 group-hover:opacity-0 transition-opacity duration-300" />
    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute -inset-full top-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine" />
    </div>
    <div className="relative z-10 flex items-center gap-2">
      <div className="relative flex-shrink-0">
        <div className="w-7 h-7 bg-purple-500/30 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
          <MessageCircle size={14} className="text-purple-400 group-hover:text-white transition-colors duration-300" fill="currentColor" />
        </div>
        <div className="absolute inset-0 w-7 h-7 bg-purple-500/20 rounded-lg blur-sm group-hover:bg-green-400/40 group-hover:blur-md transition-all duration-300" />
      </div>
      <span className="font-exo font-bold text-white text-xs">{text}</span>
      <ArrowRight size={12} className="text-white transform group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </a>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, language } = useLanguage();

  const basePath = getBasePath();

  const getNavItems = () => [
    { key: "nav.inicio", href: "#inicio" },
    { key: "nav.clientes", href: "#clientes" },
    { key: "nav.portfolio", href: "#portfolio" },
    { key: "nav.servicos", href: "#servicos" },
    { key: "nav.resultados", href: "#resultados" },
    { key: "nav.faq", href: "#faq" },
  ];

  const getActiveItem = () => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash || "#inicio";
      const item = getNavItems().find(item => item.href === hash);
      return item ? item.key : "nav.inicio";
    }
    return "nav.inicio";
  };

  const [activeItem, setActiveItem] = useState(getActiveItem);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/40 backdrop-blur-xl" />
      
      <div className="relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <a href="#inicio" className="relative group flex items-center">
              <img 
                src={`${basePath}/logo_aspec.png`} 
                alt="Aspec Logo" 
                className="h-10 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {getNavItems().map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveItem(item.key)}
                  className={`relative px-5 py-2.5 font-exo text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeItem === item.key
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {t(item.key)}
                  {activeItem === item.key && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30" />
                  )}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                    activeItem === item.key ? "w-1/2" : "group-hover:w-1/2"
                  }`} />
                </a>
              ))}
            </nav>

            {/* Language Selector + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSelector />
              <WhatsAppButton text={t("nav.conversar")} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-2 group"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="absolute -inset-4 bg-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                {mobileOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Menu size={24} className="text-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0">
            <div className="bg-black/95 backdrop-blur-xl border-t border-purple-500/20">
              <div className="container mx-auto px-4 py-6">
                <div className="flex justify-end mb-4">
                  <LanguageSelector />
                </div>
                <nav className="flex flex-col gap-2">
                  {getNavItems().map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.key);
                        setMobileOpen(false);
                      }}
                      className={`px-4 py-3 font-exo text-base font-medium rounded-xl transition-all duration-300 ${
                        activeItem === item.key
                          ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {t(item.key)}
                    </a>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <WhatsAppButton text={t("nav.conversar")} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </header>
  );
};

export default Header;
