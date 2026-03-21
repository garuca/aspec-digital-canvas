import { useEffect, useState } from "react";

interface LogoTickerProps {
  logos: string[];
  speed?: number;
}

const LogoTicker = ({ logos, speed = 30 }: LogoTickerProps) => {
  const [duplicatedLogos, setDuplicatedLogos] = useState<string[]>([]);

  useEffect(() => {
    if (logos.length > 0) {
      setDuplicatedLogos([...logos, ...logos, ...logos]);
    }
  }, [logos]);

  if (duplicatedLogos.length === 0) return null;

  return (
    <div className="logo-ticker-container">
      <div 
        className="logo-ticker-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="logo-ticker-item">
            <img src={logo} alt={`Cliente ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoTicker;