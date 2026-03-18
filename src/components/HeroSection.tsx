import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  delay: `${Math.random() * 4}s`,
  duration: `${2 + Math.random() * 3}s`,
}));

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-foreground pointer-events-none animate-[twinkle_var(--dur)_ease-in-out_var(--delay)_infinite]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            "--delay": star.delay,
            "--dur": star.duration,
            opacity: 0,
          } as React.CSSProperties}
        />
      ))}

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-aspec-diagonal opacity-[0.08] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-body text-muted-foreground">Aceitando novos projetos</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Construímos Soluções Digitais Que{" "}
            <span className="text-gradient-aspec">Funcionam</span>
          </h1>

          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Desenvolvimento de software sob medida, focado em entregar valor real e transformação digital para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" className="gap-2 text-base px-8">
              Iniciar Projeto <ArrowRight size={18} />
            </Button>
            <Button variant="hero" size="lg" className="gap-2 text-base px-8">
              Conhecer Serviços <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
