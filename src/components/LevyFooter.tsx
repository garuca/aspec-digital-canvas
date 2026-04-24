import { Truck, Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contato" className="bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-cta">
                <Truck className="h-5 w-5 text-accent-foreground" />
              </span>
              <span className="text-xl font-extrabold">
                Levy<span className="text-accent">Transportes</span>
              </span>
            </div>
            <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
              Especialistas em mudanças e transporte de cargas com segurança, agilidade
              e o cuidado que seu patrimônio merece.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Contato</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/85">
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-accent" /> WhatsApp: (11) 99999-9999</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> Telefone: (11) 4002-8922</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> contato@levytransportes.com.br</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Atendimento</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/85">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Seg a Sex: 8h às 18h</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Sábado: 8h às 13h</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Atendemos todo o Brasil</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Links rápidos</h4>
            <ul className="space-y-3 text-sm">
              {[
                { h: "#inicio", l: "Início" },
                { h: "#servicos", l: "Serviços" },
                { h: "#orcamento", l: "Orçamento" },
                { h: "#contato", l: "Contato" },
              ].map((i) => (
                <li key={i.h}>
                  <a href={i.h} className="text-primary-foreground/85 hover:text-accent transition-smooth">{i.l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 text-center text-sm text-primary-foreground/70">
          © {year} Levy Transportes. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
