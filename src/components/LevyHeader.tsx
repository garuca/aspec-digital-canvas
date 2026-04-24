import { Truck, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#orcamento", label: "Orçamento" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "bg-background/85 backdrop-blur-lg shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-elegant transition-smooth group-hover:scale-105`}>
            <Truck className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className={`text-lg md:text-xl font-extrabold tracking-tight ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            Levy<span className="text-accent">Transportes</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-smooth hover:text-accent ${
                scrolled ? "text-foreground" : "text-primary-foreground/90"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="lg" className="bg-gradient-cta text-accent-foreground shadow-cta hover:opacity-95 hover:scale-[1.02] transition-smooth border-0">
            <a href="#orcamento">Pedir Orçamento</a>
          </Button>
        </div>

        <button
          className={`md:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border shadow-card animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground font-medium"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="bg-gradient-cta text-accent-foreground shadow-cta border-0">
              <a href="#orcamento" onClick={() => setOpen(false)}>Pedir Orçamento</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
