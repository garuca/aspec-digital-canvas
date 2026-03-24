import { useState } from "react";
import { getBasePath } from "@/utils/basePath";

const ClientsSection = () => {
  const basePath = getBasePath();
  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const clientLogos = [
    { name: "Itaú", gray: `${basePath}/clientes/itau-cinza.png`, color: `${basePath}/clientes/itau-colorido.png` },
    { name: "Banco BV", gray: `${basePath}/clientes/bv-cinza_.png`, color: `${basePath}/clientes/bv-colorido.png` },
    { name: "FL Mandic", gray: `${basePath}/clientes/flmandic-cinza_.png`, color: `${basePath}/clientes/flmandic-colorido_.png` },
    { name: "Kovi", gray: `${basePath}/clientes/kovi-cinza.png`, color: `${basePath}/clientes/kovi-colorido.png` },
    { name: "Easy", gray: `${basePath}/clientes/easy-cinza.png`, color: `${basePath}/clientes/easy-colorido.png` },
    { name: "Appmax", gray: `${basePath}/clientes/appmax-cinza.png`, color: `${basePath}/clientes/appmax-colorido.png` },
    { name: "EstrelaBet", gray: `${basePath}/clientes/estrelabet-cinza.png`, color: `${basePath}/clientes/estrelabet-colorido.png` },
  ];

  const clients = [...clientLogos, ...clientLogos];

  return (
    <section id="clientes" className="py-16 overflow-hidden" style={{ backgroundColor: "#030712" }}>
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
