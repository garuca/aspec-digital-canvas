import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Sparkles, Rocket } from "lucide-react";

const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 0.5,
  delay: `${Math.random() * 4}s`,
  duration: `${2 + Math.random() * 3}s`,
}));

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dark-section"
    >
      <div className="dark-grid-pattern" />

      {/* Background layer - z-0 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Galaxy glow effects */}
        <div className="galaxy-glow top-1/4 -left-48" />
        <div className="galaxy-glow bottom-1/4 -right-48" />

        {/* Orbit ring with planet */}
        <div className="orbit-ring orbit-ring-1">
          <div className="orbit-planet" />
        </div>

        {/* Stars */}
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white animate-[twinkle_var(--dur)_ease-in-out_var(--delay)_infinite]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              "--delay": star.delay,
              "--dur": star.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content layer - z-10 */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col min-h-screen">
        
        {/* Spacer for header */}
        <div className="h-24" />
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {/* Badge centered */}
          <div className="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
            <span className="text-sm font-medium text-white/90 flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400" />
              Aceitando novos projetos
            </span>
          </div>

          <div className="relative">
            <div className="absolute -inset-20 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-purple-900/30 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-purple-600/20 blur-2xl rounded-full" />
            
            <h1 className="font-exo font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight text-center relative hero-title-glow">
              <span className="text-gradient-aspec">Soluções Digitais</span>
              <br />
              <span className="text-white">Que Funcionam</span>
            </h1>
            
            {/* Small floating particles around title */}
            <div className="absolute -top-4 -left-8 w-2 h-2 bg-purple-400/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute -bottom-2 -right-6 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
            <div className="absolute top-1/2 -left-12 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/4 -right-10 w-2 h-2 bg-purple-300/40 rounded-full animate-ping" style={{ animationDuration: '1.8s' }} />
          </div>

          <p className="font-exo text-lg text-white/60 max-w-xl text-center leading-relaxed">
            Transformamos ideias em experiências digitais extraordinárias
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button variant="gradient" size="lg" className="gap-2 text-base px-10 py-6 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
              <Rocket size={18} className="group-hover:-translate-y-1 transition-transform" />
              Conversar Agora
            </Button>
            <Button variant="hero" size="lg" className="gap-2 text-base px-10 py-6 rounded-xl border-white/20 hover:bg-white/10 transition-all duration-300">
              <span>Conhecer Serviços</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8">
          <div className="scroll-indicator flex flex-col items-center gap-3">
            <span className="text-xs font-medium text-white/40 tracking-[0.3em] uppercase">Descobrir</span>
            <div className="scroll-indicator-dot" />
            <ChevronDown size={16} className="text-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
