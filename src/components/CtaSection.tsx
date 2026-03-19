import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Rocket } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dark-section" />
      <div className="dark-grid-pattern" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="cta-dark p-8 lg:p-16 text-center">
          <div className="cta-dark-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-5 py-2 mb-8 border border-purple-500/30 backdrop-blur-sm">
              <Zap size={14} className="text-pink-400" />
              <span className="text-sm font-medium text-white/80">Próximo passo</span>
            </div>
            
            <h2 className="font-exo font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-white">
              Transforme sua ideia em{" "}
              <span className="text-gradient-aspec">produto real</span>
            </h2>
            <p className="font-exo text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
              Desenvolvemos soluções escaláveis que geram resultados. Do MVP ao produto completo, entregamos com qualidade e agilidade.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" size="lg" className="gap-2 text-base px-10 py-6 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                <Rocket size={18} className="group-hover:-translate-y-1 transition-transform" />
                Fale Conosco
              </Button>
              <Button variant="ghost" size="lg" className="gap-2 text-base px-10 py-6 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10">
                Agendar Reunião
                <ArrowRight size={18} />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-white/50">Resposta em até 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-sm text-white/50">Consulta gratuita</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
