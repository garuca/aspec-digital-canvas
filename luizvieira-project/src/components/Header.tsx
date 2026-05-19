import { useState } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoLM from "@/assets/logo-lm.png";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { key: "nav_home", href: "/#inicio" },
  { key: "nav_about", href: "/#sobre" },
  { key: "nav_experiences", href: "/#experiencias" },
  { key: "nav_catalog", href: "/luizvieira/catalogo" },
  { key: "nav_blog", href: "/#blog" },
];

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="group relative font-heading text-xs tracking-luxury text-foreground/70 hover:text-primary transition-all duration-300 uppercase"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
  </a>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto flex items-center justify-between h-20 px-6 relative">
        <a href="/#inicio" className="relative group flex items-center">
          <span className="font-heading text-xl md:text-2xl tracking-luxury uppercase text-white relative z-10 transition-transform duration-500 group-hover:scale-105">LUIZ VIEIRA</span>
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>

        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {t(item.key)}
            </NavLink>
          ))}
          <div className="flex items-center gap-6">
            <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
              <button
                className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors font-heading text-xs tracking-widest px-2 py-1"
              >
                <Globe size={14} />
                <span>{language === 'pt' ? 'PT' : 'EN'}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-24 bg-background/95 backdrop-blur-md border border-primary/20 rounded shadow-xl overflow-hidden flex flex-col"
                  >
                    <button
                      onClick={() => { setLanguage('pt'); setLangOpen(false); }}
                      className={`px-4 py-3 text-xs font-heading tracking-widest text-left hover:bg-primary/10 transition-colors ${language === 'pt' ? 'text-primary' : 'text-foreground/70'}`}
                    >
                      PT-BR
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangOpen(false); }}
                      className={`px-4 py-3 text-xs font-heading tracking-widest text-left hover:bg-primary/10 transition-colors ${language === 'en' ? 'text-primary' : 'text-foreground/70'}`}
                    >
                      EN
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href="https://api.whatsapp.com/send/?phone=5562982343386&text=Olá+Luiz%2C+gostaria+de+falar+sobre+uma+consultoria+ou+experiência.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden group bg-gold-gradient text-primary-foreground font-heading text-xs tracking-luxury uppercase px-8 py-3 rounded-sm"
            >
              <span className="relative z-10">{t('nav_contact')}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </nav>

        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="relative">
            <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current mt-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current mt-1.5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-primary/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-heading text-sm tracking-luxury text-foreground/70 hover:text-primary transition-colors uppercase border-b border-primary/10 pb-3"
                >
                  {t(item.key)}
                </motion.a>
              ))}
              <div className="flex gap-4">
                <button
                  onClick={() => setLanguage('pt')}
                  className={`flex-1 border border-primary/20 font-heading text-xs tracking-widest py-3 rounded-sm ${language === 'pt' ? 'bg-primary/10 text-primary' : 'text-foreground/70'}`}
                >
                  PT-BR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 border border-primary/20 font-heading text-xs tracking-widest py-3 rounded-sm ${language === 'en' ? 'bg-primary/10 text-primary' : 'text-foreground/70'}`}
                >
                  EN
                </button>
              </div>
              <motion.a
                href="https://api.whatsapp.com/send/?phone=5562982343386&text=Olá+Luiz%2C+gostaria+de+falar+sobre+uma+consultoria+ou+experiência.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gold-gradient text-primary-foreground font-heading text-xs tracking-luxury uppercase px-6 py-4 rounded-sm text-center mt-2"
              >
                {t('nav_contact')}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
