import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="card-aspec p-12 lg:p-16 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-aspec opacity-[0.06] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Transforme sua ideia em{" "}
              <span className="text-gradient-aspec">produto real</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto mb-8">
              Desenvolvemos soluções escaláveis que geram resultados. Do MVP ao produto completo, entregamos com qualidade e agilidade.
            </p>
            <Button variant="gradient" size="lg" className="gap-2 text-base px-8">
              Fale Conosco <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
