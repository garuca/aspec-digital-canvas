import { useEffect, useState } from "react";
import { X, ExternalLink, Building2, Download, Play, Car, Wallet, CreditCard, Smartphone, Shield, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBasePath } from "@/utils/basePath";

interface BVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BVModal = ({ isOpen, onClose }: BVModalProps) => {
  const { t } = useLanguage();
  const basePath = getBasePath();
  const [activeSection, setActiveSection] = useState<"overview" | "features" | "about">("overview");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const appImages = [
    `${basePath}/portfolio/bv/bv_projeto_aspec1.webp`,
    `${basePath}/portfolio/bv/bv_projeto_aspec2.webp`,
    `${basePath}/portfolio/bv/bv_projeto_aspec3.webp`,
    `${basePath}/portfolio/bv/bv_projeto_aspec4.webp`,
    `${basePath}/portfolio/bv/bv_projeto_aspec5.webp`
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
    <div className="bv-modal-overlay">
      <div className="bv-modal-backdrop" onClick={onClose} />

      <div className="bv-modal-container">
        {/* Header */}
        <div className="bv-modal-header">
          <div className="bv-header-content">
            <div className="bv-logo-badge">
              <Building2 size={24} />
            </div>
            <div className="bv-header-text">
              <span className="text-gradient-aspec font-exo font-bold text-xl">Banco BV</span>
              <span className="text-white/50 font-exo text-sm ml-2">APP FULL</span>
            </div>
          </div>
          <button onClick={onClose} className="bv-modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="bv-nav-tabs">
          <button
            onClick={() => setActiveSection("overview")}
            className={`bv-nav-tab ${activeSection === "overview" ? "active" : ""}`}
          >
            {t("modals.overview")}
          </button>
          <button
            onClick={() => setActiveSection("features")}
            className={`bv-nav-tab ${activeSection === "features" ? "active" : ""}`}
          >
            {t("modals.bvProducts")}
          </button>
          <button
            onClick={() => setActiveSection("about")}
            className={`bv-nav-tab ${activeSection === "about" ? "active" : ""}`}
          >
            {t("modals.bvAbout")}
          </button>
        </div>

        {/* Content */}
        <div className="bv-modal-content">
          {activeSection === "overview" && (
            <div className="bv-overview">
              {/* Stats */}
              <div className="bv-stats">
                {[
                  { value: "4.2", label: t("modals.stars"), suffix: "★" },
                  { value: "10M+", label: t("modals.downloads"), suffix: "" },
                  { value: "378K", label: t("modals.reviews"), suffix: "" },
                  { value: "100%", label: t("modals.bvDigital"), suffix: "grátis" }
                ].map((stat, index) => (
                  <div key={index} className="bv-stat-card">
                    <div className="bv-stat-value">
                      <span className="font-exo font-bold text-2xl">{stat.value}</span>
                      <span className="font-exo text-sm text-cyan-300">{stat.suffix}</span>
                    </div>
                    <span className="font-exo text-xs text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* App Preview - Creative Gallery */}
              <div className="bv-gallery">
                <div className="bv-gallery-grid">
                  {appImages.map((img, index) => (
                    <div 
                      key={index} 
                      className="bv-gallery-item"
                      onClick={() => setLightboxImage(img)}
                    >
                      <div className="bv-gallery-phone-frame">
                        <img src={img} alt={`${t("modals.screen")} ${index + 1}`} className="bv-gallery-image" />
                        <div className="bv-gallery-overlay">
                          <Play size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bv-cta">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.votorantim.bvpd&hl=pt_BR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bv-cta-button"
                >
                  <Download size={20} />
                  <span>{t("modals.downloadGooglePlay")}</span>
                </a>
                <a 
                  href="https://www.bv.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bv-cta-secondary"
                >
                  <ExternalLink size={16} />
                  <span>{t("modals.visitSite")}</span>
                </a>
              </div>
            </div>
          )}

          {activeSection === "features" && (
            <div className="bv-features">
              <div className="bv-features-header">
                <h3 className="font-exo font-bold text-2xl text-white mb-2">{t("modals.bvProductsTitle")}</h3>
                <p className="font-exo text-white/60">{t("modals.bvProductsDesc")}</p>
              </div>
              
              <div className="bv-features-grid">
                {[
                  { icon: Car, title: t("modals.vehicleFinancing"), desc: t("modals.vehicleFinancingDesc") },
                  { icon: Wallet, title: t("modals.personalLoan"), desc: t("modals.personalLoanDesc") },
                  { icon: CreditCard, title: t("modals.creditCard"), desc: t("modals.creditCardDesc") },
                  { icon: Smartphone, title: t("modals.freeDigitalAccount"), desc: t("modals.freeDigitalAccountDesc") },
                  { icon: Shield, title: t("modals.securedLoan"), desc: t("modals.securedLoanDesc") },
                  { icon: Sun, title: t("modals.solarEnergy"), desc: t("modals.solarEnergyDesc") }
                ].map((feature, index) => (
                  <div key={index} className="bv-feature-card">
                    <div className="bv-feature-icon">
                      <feature.icon size={24} />
                    </div>
                    <div className="bv-feature-content">
                      <h4 className="font-exo font-semibold text-white">{feature.title}</h4>
                      <p className="font-exo text-sm text-white/50">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "about" && (
            <div className="bv-about">
              <div className="bv-about-hero">
                <div className="bv-about-badge">
                  <Building2 size={32} />
                </div>
                <h3 className="font-exo font-bold text-3xl text-white mb-4">Banco Votorantim</h3>
                <p className="font-exo text-white/60 text-lg max-w-2xl mx-auto">
                  {t("modals.bvProductsDesc")}
                </p>
              </div>

              <div className="bv-about-grid">
                <div className="bv-about-card">
                  <div className="bv-about-card-number">40+</div>
                  <div className="bv-about-card-label">{t("modals.bvYears")}</div>
                </div>
                <div className="bv-about-card">
                  <div className="bv-about-card-number">10M+</div>
                  <div className="bv-about-card-label">{t("modals.bvClients")}</div>
                </div>
                <div className="bv-about-card">
                  <div className="bv-about-card-number">#1</div>
                  <div className="bv-about-card-label">{t("modals.bvVehicleFinancing")}</div>
                </div>
                <div className="bv-about-card">
                  <div className="bv-about-card-number">24/7</div>
                  <div className="bv-about-card-label">{t("modals.bvSupport")}</div>
                </div>
              </div>

              <div className="bv-about-info">
                <div className="bv-about-info-item">
                  <ExternalLink size={18} />
                  <a href="https://www.bv.com.br" target="_blank" rel="noopener noreferrer">
                    bv.com.br
                  </a>
                </div>
              </div>

              <div className="bv-about-cta">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.votorantim.bvpd&hl=pt_BR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bv-cta-button"
                >
                  <Download size={20} />
                  <span>{t("modals.downloadApp")}</span>
                </a>
              </div>
            </div>
          )}

          {/* Lightbox */}
          {lightboxImage && (
            <div className="bv-lightbox" onClick={() => setLightboxImage(null)}>
              <button className="bv-lightbox-close">
                <X size={24} />
              </button>
              <img 
                src={lightboxImage} 
                alt={t("modals.fullScreen")} 
                className="bv-lightbox-image"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BVModal;
