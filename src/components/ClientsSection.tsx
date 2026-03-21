import { useState } from "react";

const clientLogos = [
  { name: "Itaú", gray: "/clientes/itau-cinza.png", color: "/clientes/itau-colorido.png" },
  { name: "Banco BV", gray: "/clientes/bv-cinza_.png", color: "/clientes/bv-colorido.png" },
  { name: "FL Mandic", gray: "/clientes/flmandic-cinza_.png", color: "/clientes/flmandic-colorido_.png" },
  { name: "Kovi", gray: "/clientes/kovi-cinza.png", color: "/clientes/kovi-colorido.png" },
  { name: "Easy", gray: "/clientes/easy-cinza.png", color: "/clientes/easy-colorido.png" },
  { name: "Appmax", gray: "/clientes/appmax-cinza.png", color: "/clientes/appmax-colorido.png" },
  { name: "EstrelaBet", gray: "/clientes/estrelabet-cinza.png", color: "/clientes/estrelabet-colorido.png" },
];

const ClientsSection = () => {
  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const clients = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 overflow-hidden" style={{ backgroundColor: "#030712" }}>
      <div className="relative">
        <div 
          className="flex gap-16 animate-marquee"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ 
            animationPlayState: paused ? "paused" : "running",
            width: "max-content"
          }}
        >
          {clients.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 client-logo-wrapper"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={hoveredIndex === i ? client.color : client.gray}
                alt={client.name}
                className="h-16 w-auto object-contain transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
