import { useEffect, useState, useRef } from "react";
import { X, Bike, Zap, ChevronLeft, ChevronRight, Play, Download, Smartphone, CreditCard, Wallet, Home as HomeIcon, Lock, Star, Users, Gift, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AppMotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppMotoModal = ({ isOpen, onClose }: AppMotoModalProps) => {
  const { t } = useLanguage();
  const basePath = typeof window !== "undefined" && window.location.pathname.startsWith("/aspec-digital-canvas") ? "/aspec-digital-canvas" : "";

  const screens = {
    splash: [
      { name: t("modals.screen"), src: `${basePath}/portfolio/moto/Splash .png`, icon: Bike }
    ],
    onboarding: [
      { name: "Login", src: `${basePath}/portfolio/moto/Login - ativo.png`, icon: Lock },
      { name: t("modals.loginFlow"), src: `${basePath}/portfolio/moto/Confirme seu cadastro.png`, icon: Users },
      { name: t("modals.security"), src: `${basePath}/portfolio/moto/Validando informações.png`, icon: Lock },
    ],
    home: [
      { name: t("modals.yourAccount"), src: `${basePath}/portfolio/moto/Home.png`, icon: HomeIcon },
      { name: "PIX", src: `${basePath}/portfolio/moto/pix.png`, icon: Zap },
    ],
    features: [
      { name: "PIX", src: `${basePath}/portfolio/moto/PIX - envio.png`, icon: Zap },
      { name: t("modals.pixPayments"), src: `${basePath}/portfolio/moto/Pix - Bancos.png`, icon: Wallet },
      { name: t("modals.instantPix"), src: `${basePath}/portfolio/moto/Receber.png`, icon: Wallet },
      { name: t("modals.creditCard"), src: `${basePath}/portfolio/moto/Cartão.png`, icon: CreditCard },
      { name: t("modals.cardFinancing"), src: `${basePath}/portfolio/moto/Financiamento.png`, icon: Gift },
      { name: t("modals.excellence"), src: `${basePath}/portfolio/moto/Cursos.png`, icon: Star },
    ],
    account: [
      { name: t("modals.yourAccount"), src: `${basePath}/portfolio/moto/Minha conta.png`, icon: Users },
      { name: t("modals.mobileFirst"), src: `${basePath}/portfolio/moto/Configurações.png`, icon: Lock },
      { name: t("modals.excellence"), src: `${basePath}/portfolio/moto/Notificações.png`, icon: Star },
    ]
  };

  const [activeSection, setActiveSection] = useState<"hero" | "journey" | "features">("hero");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const allScreens = [
    ...screens.splash,
    ...screens.onboarding,
    ...screens.home,
    ...screens.features,
    ...screens.account
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const imagesToPreload = allScreens.map(s => s.src);
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
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
      if (e.key === "ArrowRight" && activeSection === "journey") {
        goToNext();
      }
      if (e.key === "ArrowLeft" && activeSection === "journey") {
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, activeSection, onClose]);

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(prev => (prev + 1) % allScreens.length);
      setIsTransitioning(false);
    }, 200);
  };

  const goToPrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(prev => (prev - 1 + allScreens.length) % allScreens.length);
      setIsTransitioning(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="moto-modal-overlay">
      <div className="moto-modal-backdrop" onClick={onClose} />

      <div className="moto-modal-container">
        {/* Header */}
        <div className="moto-modal-header">
          <div className="moto-header-content">
            <div className="moto-logo-badge">
              <Bike size={24} />
            </div>
            <div className="moto-header-text">
              <span className="font-exo font-bold text-xl" style={{ color: "#22C55E" }}>App Moto</span>
              <span className="text-white/50 font-exo text-sm ml-2">BANCO DIGITAL</span>
            </div>
          </div>
          <button onClick={onClose} className="moto-modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="moto-nav-tabs">
          <button
            onClick={() => setActiveSection("hero")}
            className={`moto-nav-tab ${activeSection === "hero" ? "active" : ""}`}
          >
            <Smartphone size={16} />
            {t("modals.overview")}
          </button>
          <button
            onClick={() => setActiveSection("journey")}
            className={`moto-nav-tab ${activeSection === "journey" ? "active" : ""}`}
          >
            <Play size={16} />
            {t("modals.tourApp")}
          </button>
          <button
            onClick={() => setActiveSection("features")}
            className={`moto-nav-tab ${activeSection === "features" ? "active" : ""}`}
          >
            <Zap size={16} />
            {t("modals.features")}
          </button>
        </div>

        {/* Content */}
        <div className="moto-modal-content">
          {activeSection === "hero" && (
            <div className="moto-hero">
              {/* Background */}
              <div className="moto-hero-bg">
                <div className="moto-bg-glow" />
                <div className="moto-bg-grid" />
              </div>

              <div className="moto-hero-content">
                {/* Phone Mockup */}
                <div className="moto-hero-phone">
                  <div className="moto-phone-frame">
                    <img 
                      src={`${basePath}/portfolio/moto/Home.png`} 
                      alt="App Moto Home" 
                      className="moto-phone-image"
                    />
                    <div className="moto-phone-notch" />
                  </div>
                  <div className="moto-phone-reflection" />
                </div>

                {/* Hero Text */}
                <div className="moto-hero-text">
                  <div className="moto-hero-badge">
                    <Bike size={14} />
                    <span>{t("modals.appMotoTitle")}</span>
                  </div>
                  
                  <h1 className="moto-hero-title">
                    <span className="moto-title-line">{t("modals.madeForRoad")}</span>
                    <span className="moto-title-accent">{t("modals.ridesRoad")}</span>
                  </h1>
                  
                  <p className="moto-hero-subtitle">
                    {t("modals.prototypeDesc")}
                  </p>

                  {/* Stats */}
                  <div className="moto-hero-stats">
                    {[
                      { value: "4.8", label: t("modals.stars"), suffix: "★" },
                      { value: "1M+", label: t("modals.riders") },
                      { value: "R$0", label: t("modals.annuity") },
                      { value: "24h", label: t("modals.opening") }
                    ].map((stat, index) => (
                      <div key={index} className="moto-hero-stat">
                        <span className="moto-stat-value">
                          {stat.value}
                          {stat.suffix && <span className="moto-stat-suffix">{stat.suffix}</span>}
                        </span>
                        <span className="moto-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="moto-hero-cta">
                    <button onClick={() => setActiveSection("journey")} className="moto-cta-primary">
                      <Play size={18} />
                      <span>{t("modals.seeFullTour")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "journey" && (
            <div className="moto-journey">
              {/* Main Device Mockup */}
              <div className="moto-device-showcase">
                {/* Background Glow */}
                <div className="moto-device-glow" />
                
                {/* Phone Frame */}
                <div className="moto-device-frame">
                  <div className="moto-device-notch" />
                  <div className="moto-device-camera" />
                  <div className="moto-device-screen-container">
                    <img 
                      src={allScreens[currentScreen].src} 
                      alt={allScreens[currentScreen].name}
                      className={`moto-device-screen ${isTransitioning ? "transitioning" : ""}`}
                    />
                    <div className="moto-device-reflection" />
                  </div>
                  <div className="moto-device-home" />
                </div>

                {/* Side Buttons */}
                <div className="moto-device-btn-top" />
                <div className="moto-device-btn-vol-up" />
                <div className="moto-device-btn-vol-down" />
              </div>

              {/* Navigation Controls */}
              <div className="moto-journey-controls">
                <button onClick={goToPrev} className="moto-ctrl-btn">
                  <ChevronLeft size={28} />
                </button>
                
                <div className="moto-journey-info">
                  <span className="moto-journey-name">{allScreens[currentScreen].name}</span>
                  <span className="moto-journey-counter">{currentScreen + 1} / {allScreens.length}</span>
                </div>
                
                <button onClick={goToNext} className="moto-ctrl-btn">
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Screen Indicators */}
              <div className="moto-journey-dots">
                {allScreens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentScreen(index);
                        setIsTransitioning(false);
                      }, 200);
                    }}
                    className={`moto-journey-dot ${currentScreen === index ? "active" : ""}`}
                  />
                ))}
              </div>

              {/* Thumbnail Strip */}
              <div className="moto-journey-strip">
                <div className="moto-strip-container">
                  {allScreens.map((screen, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentScreen(index);
                          setIsTransitioning(false);
                        }, 200);
                      }}
                      className={`moto-strip-item ${currentScreen === index ? "active" : ""}`}
                    >
                      <div className="moto-strip-phone">
                        <img src={screen.src} alt={screen.name} />
                      </div>
                      <span className="moto-strip-label">{screen.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom Button */}
              <button 
                onClick={() => setLightboxImage(allScreens[currentScreen].src)}
                className="moto-journey-zoom"
              >
                <Eye size={16} />
                <span>{t("modals.appMotoFullScreen")}</span>
              </button>
            </div>
          )}

          {activeSection === "features" && (
            <div className="moto-features">
              {/* Feature: Login Flow */}
              <div className="moto-feature-section">
                <div className="moto-feature-header">
                  <div className="moto-feature-icon">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3>{t("modals.loginFlow")}</h3>
                    <p>{t("modals.loginFlowDesc")}</p>
                  </div>
                </div>
                <div className="moto-feature-screens">
                  {screens.onboarding.map((screen, index) => (
                    <div key={index} className="moto-feature-screen">
                      <img src={screen.src} alt={screen.name} />
                      <span>{screen.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature: PIX */}
              <div className="moto-feature-section">
                <div className="moto-feature-header">
                  <div className="moto-feature-icon" style={{ background: "linear-gradient(135deg, #9333EA, #6366F1)" }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3>{t("modals.instantPix")}</h3>
                    <p>{t("modals.instantPixDesc")}</p>
                  </div>
                </div>
                <div className="moto-feature-screens">
                  {screens.features.filter(s => s.name.includes("PIX") || s.name.includes("Receber")).map((screen, index) => (
                    <div key={index} className="moto-feature-screen">
                      <img src={screen.src} alt={screen.name} />
                      <span>{screen.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature: Cartão & Financiamento */}
              <div className="moto-feature-section">
                <div className="moto-feature-header">
                  <div className="moto-feature-icon" style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h3>{t("modals.cardFinancing")}</h3>
                    <p>{t("modals.cardFinancingDesc")}</p>
                  </div>
                </div>
                <div className="moto-feature-screens">
                  {screens.features.filter(s => s.name.includes("Cartão") || s.name.includes("Financiamento")).map((screen, index) => (
                    <div key={index} className="moto-feature-screen">
                      <img src={screen.src} alt={screen.name} />
                      <span>{screen.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature: Conta */}
              <div className="moto-feature-section">
                <div className="moto-feature-header">
                  <div className="moto-feature-icon" style={{ background: "linear-gradient(135deg, #10B981, #06B6D4)" }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h3>{t("modals.yourAccount")}</h3>
                    <p>{t("modals.yourAccountDesc")}</p>
                  </div>
                </div>
                <div className="moto-feature-screens">
                  {screens.account.map((screen, index) => (
                    <div key={index} className="moto-feature-screen">
                      <img src={screen.src} alt={screen.name} />
                      <span>{screen.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lightbox */}
          {lightboxImage && (
            <div className="moto-lightbox" onClick={() => setLightboxImage(null)}>
              <button className="moto-lightbox-close">
                <X size={28} />
              </button>
              <img 
                src={lightboxImage} 
                alt={t("modals.fullScreen")}
                className="moto-lightbox-image"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .moto-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .moto-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(12px);
          animation: fadeIn 0.3s ease;
        }

        .moto-modal-container {
          position: relative;
          width: 100%;
          max-width: 1000px;
          max-height: 92vh;
          background: linear-gradient(180deg, #0a0f0a 0%, #111811 100%);
          border-radius: 24px;
          border: 1px solid rgba(34, 197, 94, 0.3);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.4s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 100px rgba(34, 197, 94, 0.15);
        }

        .moto-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(90deg, rgba(34, 197, 94, 0.15), transparent);
          border-bottom: 1px solid rgba(34, 197, 94, 0.2);
          flex-shrink: 0;
        }

        .moto-header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .moto-logo-badge {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #22C55E, #16A34A);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.4);
        }

        .moto-header-text {
          display: flex;
          flex-direction: column;
        }

        .moto-modal-close {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .moto-modal-close:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
        }

        .moto-nav-tabs {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
        }

        .moto-nav-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .moto-nav-tab:hover {
          background: rgba(34, 197, 94, 0.1);
          color: white;
        }

        .moto-nav-tab.active {
          background: linear-gradient(135deg, #22C55E, #16A34A);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }

        .moto-modal-content {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        /* Hero Section */
        .moto-hero {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .moto-hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .moto-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.15), transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .moto-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .moto-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 3rem;
          max-width: 900px;
        }

        .moto-hero-phone {
          position: relative;
          flex-shrink: 0;
        }

        .moto-phone-frame {
          width: 220px;
          height: 450px;
          background: #000;
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(34, 197, 94, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.1);
          transform: perspective(1000px) rotateY(-8deg) rotateX(5deg);
          transition: transform 0.5s ease;
        }

        .moto-phone-frame:hover {
          transform: perspective(1000px) rotateY(0) rotateX(0);
        }

        .moto-phone-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 28px;
        }

        .moto-phone-notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 24px;
          background: #000;
          border-radius: 20px;
        }

        .moto-phone-reflection {
          position: absolute;
          inset: -20px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
          border-radius: 50px;
          transform: translateZ(-1px);
          pointer-events: none;
        }

        .moto-hero-text {
          flex: 1;
        }

        .moto-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 100px;
          padding: 0.5rem 1rem;
          color: #22C55E;
          font-family: 'Exo 2', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .moto-hero-title {
          font-family: 'Exo 2', sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .moto-title-line {
          display: block;
          color: white;
        }

        .moto-title-accent {
          display: block;
          background: linear-gradient(135deg, #22C55E, #4ADE80);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .moto-hero-subtitle {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .moto-hero-stats {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .moto-hero-stat {
          display: flex;
          flex-direction: column;
        }

        .moto-stat-value {
          font-family: 'Exo 2', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .moto-stat-suffix {
          color: #F59E0B;
        }

        .moto-stat-label {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        .moto-hero-cta {
          display: flex;
          gap: 0.75rem;
        }

        .moto-cta-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.25rem;
          background: linear-gradient(135deg, #22C55E, #16A34A);
          border: none;
          border-radius: 12px;
          color: white;
          font-family: 'Exo 2', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }

        .moto-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.5);
        }

        /* Journey Section */
        .moto-journey {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
        }

        .moto-device-showcase {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .moto-device-glow {
          position: absolute;
          width: 300px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(34, 197, 94, 0.15), transparent 70%);
          filter: blur(40px);
          animation: device-pulse 3s ease-in-out infinite;
        }

        .moto-device-frame {
          position: relative;
          width: 240px;
          height: 500px;
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          border-radius: 40px;
          padding: 10px;
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .moto-device-notch {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 28px;
          background: #000;
          border-radius: 0 0 16px 16px;
          z-index: 10;
        }

        .moto-device-camera {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #1a1a2e, #0a0a0a);
          border-radius: 50%;
          z-index: 11;
          box-shadow: inset 0 0 3px rgba(34, 197, 94, 0.3);
        }

        .moto-device-screen-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 32px;
          overflow: hidden;
          background: #000;
        }

        .moto-device-screen {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .moto-device-screen.transitioning {
          opacity: 0;
          transform: scale(1.05);
        }

        .moto-device-reflection {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.02) 100%
          );
          pointer-events: none;
        }

        .moto-device-home {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .moto-device-btn-top {
          position: absolute;
          top: 120px;
          right: -3px;
          width: 3px;
          height: 30px;
          background: linear-gradient(180deg, #2a2a2a, #1a1a1a);
          border-radius: 0 2px 2px 0;
        }

        .moto-device-btn-vol-up {
          position: absolute;
          top: 80px;
          left: -3px;
          width: 3px;
          height: 40px;
          background: linear-gradient(180deg, #2a2a2a, #1a1a1a);
          border-radius: 2px 0 0 2px;
        }

        .moto-device-btn-vol-down {
          position: absolute;
          top: 130px;
          left: -3px;
          width: 3px;
          height: 40px;
          background: linear-gradient(180deg, #2a2a2a, #1a1a1a);
          border-radius: 2px 0 0 2px;
        }

        .moto-journey-controls {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 1rem;
        }

        .moto-ctrl-btn {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05));
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 16px;
          color: #22C55E;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .moto-ctrl-btn:hover {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(34, 197, 94, 0.15));
          border-color: rgba(34, 197, 94, 0.5);
          transform: scale(1.05);
        }

        .moto-journey-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          min-width: 200px;
        }

        .moto-journey-name {
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          color: white;
          font-size: 1rem;
        }

        .moto-journey-counter {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
        }

        .moto-journey-dots {
          display: flex;
          gap: 0.375rem;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 500px;
          margin-bottom: 1.5rem;
        }

        .moto-journey-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .moto-journey-dot:hover {
          background: rgba(34, 197, 94, 0.5);
        }

        .moto-journey-dot.active {
          width: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #22C55E, #16A34A);
          box-shadow: 0 2px 10px rgba(34, 197, 94, 0.4);
        }

        .moto-journey-zoom {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-family: 'Exo 2', sans-serif;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .moto-journey-zoom:hover {
          background: rgba(34, 197, 94, 0.2);
          border-color: rgba(34, 197, 94, 0.3);
          color: white;
        }

        .moto-journey-strip {
          width: 100%;
          overflow: hidden;
        }

        .moto-strip-container {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding: 1rem;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(34, 197, 94, 0.3) transparent;
        }

        .moto-strip-container::-webkit-scrollbar {
          height: 4px;
        }

        .moto-strip-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .moto-strip-container::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 2px;
        }

        .moto-strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .moto-strip-phone {
          width: 50px;
          height: 100px;
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          border-radius: 10px;
          padding: 3px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .moto-strip-item:hover .moto-strip-phone {
          border-color: rgba(34, 197, 94, 0.4);
        }

        .moto-strip-item.active .moto-strip-phone {
          border-color: #22C55E;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }

        .moto-strip-phone img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }

        .moto-strip-label {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.55rem;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          max-width: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .moto-strip-item.active .moto-strip-label {
          color: #22C55E;
        }

        /* Features Section */
        .moto-features {
          height: 100%;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .moto-feature-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.25rem;
        }

        .moto-feature-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .moto-feature-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #22C55E, #16A34A);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .moto-feature-header h3 {
          font-family: 'Exo 2', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.125rem;
        }

        .moto-feature-header p {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .moto-feature-screens {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .moto-feature-screen {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .moto-feature-screen img {
          width: 100px;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }

        .moto-feature-screen:hover img {
          transform: scale(1.05);
        }

        .moto-feature-screen span {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Lightbox */
        .moto-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }

        .moto-lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .moto-lightbox-close:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        .moto-lightbox-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes device-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .moto-hero-content {
            flex-direction: column;
            text-align: center;
          }

          .moto-hero-stats {
            justify-content: center;
          }

          .moto-hero-cta {
            justify-content: center;
          }

          .moto-phone-frame {
            width: 180px;
            height: 370px;
            transform: none;
          }

          .moto-hero-title {
            font-size: 1.75rem;
          }

          .moto-nav-tabs {
            padding: 0.75rem 1rem;
            overflow-x: auto;
          }

          .moto-feature-screens {
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </div>
  );
};

export default AppMotoModal;
