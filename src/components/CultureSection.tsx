import cultureImg1 from "@/assets/culture-1.jpg";
import cultureImg2 from "@/assets/culture-2.jpg";

const blocks = [
  {
    title: "Desenvolvimento Ágil",
    description:
      "Entregas rápidas e incrementais com feedback contínuo. Nosso processo garante transparência total e adaptação constante às necessidades do seu projeto.",
    image: cultureImg1,
    reverse: false,
  },
  {
    title: "Código Limpo & Performance",
    description:
      "Seguimos os mais altos padrões de qualidade: testes automatizados, documentação completa e arquitetura escalável para garantir a evolução contínua do seu produto.",
    image: cultureImg2,
    reverse: true,
  },
];

const CultureSection = () => {
  return (
    <section id="abordagem" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Nossa <span className="text-gradient-aspec">Abordagem</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Expertise comprovada, processos ágeis e resultados que transformam negócios.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {blocks.map((block) => (
            <div
              key={block.title}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                block.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <img
                  src={block.image}
                  alt={block.title}
                  className="rounded-lg w-full object-cover max-h-[400px] border border-border"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">
                  {block.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {block.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
