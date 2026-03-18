import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16" style={{ backgroundColor: "#030712" }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold text-gradient-aspec">ASPEC</span>
            <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
              Soluções em Tecnologia. Desenvolvimento de software sob medida para transformar seu negócio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2">
              {["Início", "Serviços", "Abordagem", "Tecnologias", "Contato"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contato">
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href="mailto:contato@aspec.com.br"
                className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={16} /> contato@aspec.com.br
              </a>
              <a
                href="tel:+5500000000000"
                className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone size={16} /> +55 (00) 00000-0000
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} ASPEC Soluções em Tecnologia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
