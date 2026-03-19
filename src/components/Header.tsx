import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, Zap } from "lucide-react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Abordagem", href: "#abordagem" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Início");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-xl" />
      
      <div className="relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <a href="#inicio" className="relative group flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-purple-600/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Zap size={24} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-exo font-bold text-xl tracking-wide text-white">
                  ASPEC
                </span>
                <span className="font-exo text-[10px] tracking-[0.25em] text-white/40 uppercase -mt-1">
                  Digital Solutions
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className={`relative px-5 py-2.5 font-exo text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeItem === item.label
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeItem === item.label && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30" />
                  )}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                    activeItem === item.label ? "w-1/2" : "group-hover:w-1/2"
                  }`} />
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant="gradient" 
                size="sm" 
                className="gap-2 rounded-xl px-6 py-2.5 font-exo font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <Rocket size={16} />
                Conversar Agora
              </Button>
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
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.label);
                        setMobileOpen(false);
                      }}
                      className={`px-4 py-3 font-exo text-base font-medium rounded-xl transition-all duration-300 ${
                        activeItem === item.label
                          ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="w-full gap-2 rounded-xl font-exo font-semibold"
                  >
                    <Rocket size={18} />
                    Conversar Agora
                  </Button>
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
