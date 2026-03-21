import { useEffect, useState } from "react";
import { X, GraduationCap, BookOpen, Users, Globe, Shield, Smartphone, Award, MapPin, Star, Download } from "lucide-react";

interface SLMandicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  {
    icon: BookOpen,
    title: "Gestão Acadêmica",
    description: "Controle completo de matrículas, disciplinas e progresso dos alunos em Medicina e Odontologia."
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Conexão direta entre alunos, professores e colaboradores da instituição."
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Dados criptografados e protegidos com padrões internacionais de segurança."
  },
  {
    icon: Globe,
    title: "Multi-Campus",
    description: "Acesso unificado para unidades em Campinas, São Paulo e outras localidades."
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Experiência otimizada para dispositivos móveis com interface intuitiva."
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Nota máxima do MEC há 15 anos, referência em educação médica e odontológica."
  }
];

const stats = [
  { value: "4.6", label: "Estrelas", icon: Star, suffix: "★" },
  { value: "1M+", label: "Downloads", icon: Download, suffix: "" },
  { value: "18", label: "Avaliações", icon: Users, suffix: "" },
  { value: "15", label: "Anos nota máxima", icon: Award, suffix: " anos" }
];

const SLMandicModal = ({ isOpen, onClose }: SLMandicModalProps) => {
  const [activeSection, setActiveSection] = useState<"overview" | "features" | "about">("overview");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const appImages = [
    "/portfolio/slmandic/unnamed.webp",
    "/portfolio/slmandic/unnamed (1).webp",
    "/portfolio/slmandic/unnamed (2).webp",
    "/portfolio/slmandic/unnamed (3).webp",
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, onClose]);

  if (!isOpen) return null;

  return (
    <div className="slmandic-modal-overlay">
      <div className="slmandic-modal-backdrop" onClick={onClose} />

      <div className="slmandic-modal-container">
        {/* Header */}
        <div className="slmandic-modal-header">
          <div className="slmandic-header-content">
            <div className="slmandic-logo-badge">
              <GraduationCap size={24} />
            </div>
            <div className="slmandic-header-text">
              <span className="text-gradient-aspec font-exo font-bold text-xl">SL Mandic</span>
              <span className="text-white/50 font-exo text-sm ml-2">APP FULL</span>
            </div>
          </div>
          <button onClick={onClose} className="slmandic-modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="slmandic-nav-tabs">
          <button
            onClick={() => setActiveSection("overview")}
            className={`slmandic-nav-tab ${activeSection === "overview" ? "active" : ""}`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveSection("features")}
            className={`slmandic-nav-tab ${activeSection === "features" ? "active" : ""}`}
          >
            Funcionalidades
          </button>
          <button
            onClick={() => setActiveSection("about")}
            className={`slmandic-nav-tab ${activeSection === "about" ? "active" : ""}`}
          >
            Sobre a Instituição
          </button>
        </div>

        {/* Content */}
        <div className="slmandic-modal-content">
          {activeSection === "overview" && (
            <div className="slmandic-overview">
              {/* Stats */}
              <div className="slmandic-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="slmandic-stat-card">
                    <stat.icon size={20} className="text-purple-400" />
                    <div className="slmandic-stat-value">
                      <span className="font-exo font-bold text-2xl">{stat.value}</span>
                      <span className="font-exo text-sm text-purple-300">{stat.suffix}</span>
                    </div>
                    <span className="font-exo text-xs text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* App Preview - Creative Gallery */}
              <div className="slmandic-gallery">
                <div className="slmandic-gallery-grid">
                  {appImages.map((img, index) => (
                    <div 
                      key={index} 
                      className="slmandic-gallery-item"
                      onClick={() => setLightboxImage(img)}
                    >
                      <div className="slmandic-gallery-phone-frame">
                        <div className="slmandic-gallery-phone-notch" />
                        <img src={img} alt={`Tela ${index + 1}`} className="slmandic-gallery-image" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="slmandic-cta">
                <a 
                  href="https://play.google.com/store/apps/details?id=br.edu.slmandic.app&hl=pt_BR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="slmandic-cta-button"
                >
                  <Download size={20} />
                  <span>Baixar na Google Play</span>
                </a>
                <a 
                  href="https://slmandic.edu.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="slmandic-cta-secondary"
                >
                  <Globe size={16} />
                  <span>Visite o Site</span>
                </a>
              </div>
            </div>
          )}

          {activeSection === "features" && (
            <div className="slmandic-features">
              <div className="slmandic-features-header">
                <h3 className="font-exo font-bold text-2xl text-white mb-2">Funcionalidades do Aplicativo</h3>
                <p className="font-exo text-white/60">Soluções completas para gestão acadêmica de Medicina e Odontologia</p>
              </div>
              
              <div className="slmandic-features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="slmandic-feature-card">
                    <div className="slmandic-feature-icon">
                      <feature.icon size={24} />
                    </div>
                    <div className="slmandic-feature-content">
                      <h4 className="font-exo font-semibold text-white">{feature.title}</h4>
                      <p className="font-exo text-sm text-white/50">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "about" && (
            <div className="slmandic-about">
              <div className="slmandic-about-hero">
                <div className="slmandic-about-badge">
                  <GraduationCap size={32} />
                </div>
                <h3 className="font-exo font-bold text-3xl text-white mb-4">Faculdade São Leopoldo Mandic</h3>
                <p className="font-exo text-white/60 text-lg max-w-2xl mx-auto">
                  Referência nacional em educação médica e odontológica há mais de 30 anos
                </p>
              </div>

              <div className="slmandic-about-grid">
                <div className="slmandic-about-card">
                  <div className="slmandic-about-card-number">15</div>
                  <div className="slmandic-about-card-label">Anos com nota máxima do MEC</div>
                </div>
                <div className="slmandic-about-card">
                  <div className="slmandic-about-card-number">12</div>
                  <div className="slmandic-about-card-label">Unidades no Brasil</div>
                </div>
                <div className="slmandic-about-card">
                  <div className="slmandic-about-card-number">30K+</div>
                  <div className="slmandic-about-card-label">Profissionais especializados</div>
                </div>
                <div className="slmandic-about-card">
                  <div className="slmandic-about-card-number">1ª</div>
                  <div className="slmandic-about-card-label">IES no Scimago Rankings</div>
                </div>
              </div>

              <div className="slmandic-about-info">
                <div className="slmandic-about-info-item">
                  <MapPin size={18} />
                  <span>Rua da Abolição, 1827 - Campinas, SP</span>
                </div>
                <div className="slmandic-about-info-item">
                  <Globe size={18} />
                  <a href="https://slmandic.edu.br/" target="_blank" rel="noopener noreferrer">
                    slmandic.edu.br
                  </a>
                </div>
              </div>

              <div className="slmandic-about-cta">
                <a 
                  href="https://play.google.com/store/apps/details?id=br.edu.slmandic.app&hl=pt_BR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="slmandic-cta-button"
                >
                  <Download size={20} />
                  <span>Baixar Aplicativo</span>
                </a>
              </div>
            </div>
          )}

          {/* Lightbox */}
          {lightboxImage && (
            <div className="slmandic-lightbox" onClick={() => setLightboxImage(null)}>
              <button className="slmandic-lightbox-close">
                <X size={24} />
              </button>
              <img 
                src={lightboxImage} 
                alt="Tela do app em tamanho completo" 
                className="slmandic-lightbox-image"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SLMandicModal;
