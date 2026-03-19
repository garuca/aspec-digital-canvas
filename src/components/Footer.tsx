import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
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
              <span className="font-exo font-bold text-2xl text-gradient-aspec">ASPEC</span>
              <span className="text-white/30 text-sm block -mt-1">Digital Solutions</span>
            </div>
            <p className="font-exo text-sm text-white/50 mb-6 leading-relaxed max-w-sm">
              Transformamos ideias em experiências digitais extraordinárias. Desenvolvimento de software sob medida para transformar seu negócio.
            </p>
            <div className="flex gap-3">
              <Button variant="gradient" size="sm" className="gap-2 rounded-lg">
                Fale Conosco <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-exo font-bold text-sm text-white mb-6">Navegação</h4>
            <ul className="space-y-3">
              {["Início", "Serviços", "Abordagem", "Contato"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="font-exo text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-500 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-exo font-bold text-sm text-white mb-6">Contato</h4>
            <div className="space-y-4">
              <a
                href="mailto:contato@aspec.com.br"
                className="flex items-start gap-3 text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Mail size={14} className="text-purple-400" />
                </div>
                <div>
                  <span className="text-white/50 block">Email</span>
                  <span className="text-white/80 font-medium">contato@aspec.com.br</span>
                </div>
              </a>
              <a
                href="tel:+5500000000000"
                className="flex items-start gap-3 text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Phone size={14} className="text-purple-400" />
                </div>
                <div>
                  <span className="text-white/50 block">Telefone</span>
                  <span className="text-white/80 font-medium">+55 (00) 00000-0000</span>
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
              © {new Date().getFullYear()} ASPEC Soluções em Tecnologia. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-exo text-xs text-white/40">Sistema operacional</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
