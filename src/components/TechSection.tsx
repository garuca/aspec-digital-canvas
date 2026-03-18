const techs = [
  "React", "Node.js", "TypeScript", "Python", "Java", "Spring Boot",
  ".NET", "Flutter", "Swift", "Golang", "PostgreSQL", "AWS",
  "Docker", "Kubernetes", "GraphQL", "Next.js",
];

const TechSection = () => {
  return (
    <section id="tecnologias" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Tecnologias que <span className="text-gradient-aspec">Dominamos</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Stack moderno e robusto para entregar aplicações de alta performance.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 rounded-full border border-border text-sm font-body text-muted-foreground hover:text-foreground hover:border-accent transition-colors duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
