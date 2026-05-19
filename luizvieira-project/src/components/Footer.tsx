import { Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contato" className="py-20 border-t border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="space-y-4">
            <span className="font-heading text-xl md:text-2xl tracking-luxury uppercase text-white">LUIZ VIEIRA</span>
            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xs mt-2">
              {t('footer_desc')}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-sm tracking-luxury uppercase text-primary">{t('footer_nav')}</h4>
            {[
              { key: "nav_about", href: "/#sobre" },
              { key: "nav_experiences", href: "/#experiencias" },
              { key: "nav_catalog", href: "/luizvieira/catalogo" },
              { key: "nav_blog", href: "/#blog" }
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
              >
                {t(item.key)}
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-sm tracking-luxury uppercase text-primary">{t('footer_social')}</h4>
            <p className="text-muted-foreground text-sm">{t('footer_social_desc')}</p>
            <p className="text-muted-foreground text-sm"><a href="mailto:contact@luizvieira.com" className="hover:text-primary transition-colors">contact@luizvieira.com</a></p>
            
            <div className="flex items-center gap-4 pt-4">
              <a href="https://www.instagram.com/donluizvieira/" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 border border-primary/20 rounded flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5562982343386&text=Olá+Luiz%2C+gostaria+de+falar+sobre+uma+consultoria+ou+experiência.&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 border border-primary/20 rounded flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="divider-gold mt-16 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © {new Date().getFullYear()} Luiz Vieira & Co. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-xs text-center md:text-right">
            {t('footer_dev_by')} <a href="https://www.instagram.com/aspec.ia.br/" target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80 transition-colors">{t('footer_agency')}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
