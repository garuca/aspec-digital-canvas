import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Image, ExternalLink, Layers, Maximize2, ZoomIn } from "lucide-react";
import { getBasePath } from "@/utils/basePath";

interface CarrosselGroup {
  id: string;
  name: string;
  images: string[];
}

interface SocialmediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialmediaModal = ({ isOpen, onClose }: SocialmediaModalProps) => {
  const basePath = getBasePath();

  const carrosselGroups: CarrosselGroup[] = [
    {
      id: "carrossel-1",
      name: "Banco 7Pay - Carrossel 1",
      images: [
        `${basePath}/portfolio/socialmedia/banco7pay/1_carrossel1_banco7pay_aspec.png`,
      ],
    },
    {
      id: "carrossel-2",
      name: "Banco 7Pay - Carrossel 2",
      images: [
        `${basePath}/portfolio/socialmedia/banco7pay/5_carrossel2a_banco7pay_aspec.png`,
        `${basePath}/portfolio/socialmedia/banco7pay/6_carrossel2b_banco7pay_aspec..png`,
        `${basePath}/portfolio/socialmedia/banco7pay/7_carrossel2c_banco7pay_aspec..png`,
        `${basePath}/portfolio/socialmedia/banco7pay/8_carrossel2d_banco7pay_aspec..png`,
        `${basePath}/portfolio/socialmedia/banco7pay/9_carrossel2e_banco7pay_aspec..png`,
        `${basePath}/portfolio/socialmedia/banco7pay/10_carrossel2f_banco7pay_aspec..png`,
        `${basePath}/portfolio/socialmedia/banco7pay/11_carrossel2g_banco7pay_aspec..png`,
        `${basePath}/portfolio/socialmedia/banco7pay/12_carrossel2h_banco7pay_aspec..png`,
        `${basePath}/portfolio/socialmedia/banco7pay/13_carrossel2i_banco7pay_aspec..png`,
      ],
    },
    {
      id: "carrossel-3",
      name: "Cconserttus - Carrossel 1",
      images: [
        `${basePath}/portfolio/socialmedia/cconserttus/28_carrossel1a_cconserttus_aspec.png`,
        `${basePath}/portfolio/socialmedia/cconserttus/29_carrossel1b_cconserttus_aspec.png.png`,
        `${basePath}/portfolio/socialmedia/cconserttus/30_carrossel1c_cconserttus_aspec.png.png`,
        `${basePath}/portfolio/socialmedia/cconserttus/31_carrossel1d_cconserttus_aspec.png.png`,
        `${basePath}/portfolio/socialmedia/cconserttus/32_carrossel1e_cconserttus_aspec.png.png`,
        `${basePath}/portfolio/socialmedia/cconserttus/33_carrossel1f_cconserttus_aspec.png.png`,
      ],
    },
    {
      id: "carrossel-4",
      name: "Savanna - Logo",
      images: [
        `${basePath}/portfolio/socialmedia/savanna/34_logo_savanna_aspec.png`,
      ],
    },
    {
      id: "carrossel-5",
      name: "Savanna - Embalagens",
      images: [
        `${basePath}/portfolio/socialmedia/savanna/35_embalagem_savanna_aspec.png.png`,
        `${basePath}/portfolio/socialmedia/savanna/38_embalagem1_savanna_aspec.png.png`,
        `${basePath}/portfolio/socialmedia/savanna/39_embalagem2_savanna_aspec.png.png.png`,
        `${basePath}/portfolio/socialmedia/savanna/40_embalagem3_savanna_aspec.png.png.png`,
      ],
    },
    {
      id: "carrossel-6",
      name: "Savanna - Branding",
      images: [
        `${basePath}/portfolio/socialmedia/savanna/36_branding_savanna_aspec.png.png`,
      ],
    },
    {
      id: "carrossel-7",
      name: "SmartImports - Cartão",
      images: [
        `${basePath}/portfolio/socialmedia/smartimports/37_cartao_smartimports.png.png`,
      ],
    },
    {
      id: "carrossel-8",
      name: "Don Luiz - Logo Carrossel",
      images: [
        `${basePath}/portfolio/socialmedia/donluiz/41_don_luiz_logo_carrossel__01.png`,
        `${basePath}/portfolio/socialmedia/donluiz/42_don_luiz_logo_carrossel__02.png`,
        `${basePath}/portfolio/socialmedia/donluiz/43_don_luiz_logo_carrossel__03.png`,
        `${basePath}/portfolio/socialmedia/donluiz/44_don_luiz_logo_carrossel__04.png`,
        `${basePath}/portfolio/socialmedia/donluiz/45_don_luiz_logo_carrossel__05.png`,
      ],
    },
    {
      id: "carrossel-9",
      name: "Charutaria - Carrossel",
      images: [
        `${basePath}/portfolio/socialmedia/charutaria/46_carrossel1_charutaria.png`,
        `${basePath}/portfolio/socialmedia/charutaria/47_carrossel2_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/48_carrossel3_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/49_carrossel4_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/50_carrossel5_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/51_carrossel6_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/52_carrossel7_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/53_carrossel8_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/54_carrossel9_charutaria.png.png`,
        `${basePath}/portfolio/socialmedia/charutaria/55_carrossel10_charutaria.png.png`,
      ],
    },
    {
      id: "carrossel-10",
      name: "Central Gráfica - Carrossel 1",
      images: [
        `${basePath}/portfolio/socialmedia/centralgrafica/15_carrossel1a_centralgrafica_aspec.png`,
        `${basePath}/portfolio/socialmedia/centralgrafica/16_carrossel1b_centralgrafica_aspec.png`,
        `${basePath}/portfolio/socialmedia/centralgrafica/17_carrossel1c_centralgrafica_aspec.png`,
      ],
    },
    {
      id: "carrossel-11",
      name: "Central Gráfica - Carrossel 2",
      images: [
        `${basePath}/portfolio/socialmedia/centralgrafica/24_carrossel2a_centralgrafica_aspec.png`,
        `${basePath}/portfolio/socialmedia/centralgrafica/25_carrossel2b_centralgrafica_aspec.png`,
        `${basePath}/portfolio/socialmedia/centralgrafica/26_carrossel2c_centralgrafica_aspec.png`,
        `${basePath}/portfolio/socialmedia/centralgrafica/27_carrossel2d_centralgrafica_aspec.png`,
      ],
    },
  ];

  const bannerImages = [
    // Banco 7Pay
    `${basePath}/portfolio/socialmedia/banco7pay/2_banner1_banco7pay_aspec.png`,
    `${basePath}/portfolio/socialmedia/banco7pay/3_banner2_banco7pay_aspec.png`,
    `${basePath}/portfolio/socialmedia/banco7pay/4_banner3_banco7pay_aspec.png`,
    // Central Gráfica
    `${basePath}/portfolio/socialmedia/centralgrafica/18_banner1_centralgrafica_aspec.png`,
    `${basePath}/portfolio/socialmedia/centralgrafica/19_banner2_centralgrafica_aspec.png`,
    `${basePath}/portfolio/socialmedia/centralgrafica/20_banner3_centralgrafica_aspec.png`,
    `${basePath}/portfolio/socialmedia/centralgrafica/21_banner4_centralgrafica_aspec.png`,
    `${basePath}/portfolio/socialmedia/centralgrafica/22_banner5_centralgrafica_aspec.png`,
    `${basePath}/portfolio/socialmedia/centralgrafica/23_banner6_centralgrafica_aspec.png`,
  ];
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"carrossel" | "banner">("carrossel");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setLoadedImages(new Set());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (lightboxImage) {
        document.body.style.overflow = "hidden";
      }
    };
  }, [lightboxImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
      if (lightboxImage) {
        if (e.key === "ArrowLeft") {
          handleLightboxPrev();
        }
        if (e.key === "ArrowRight") {
          handleLightboxNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, lightboxIndex, lightboxImages]);

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => new Set([...prev, src]));
  };

  const scrollLeft = (index: number) => {
    const track = trackRefs.current[index];
    if (track) {
      const slideWidth = 320 + 12;
      track.scrollBy({ left: -slideWidth, behavior: "smooth" });
    }
  };

  const scrollRight = (index: number) => {
    const track = trackRefs.current[index];
    if (track) {
      const slideWidth = 320 + 12;
      track.scrollBy({ left: slideWidth, behavior: "smooth" });
    }
  };

  const openLightbox = (src: string, images: string[], index: number) => {
    setLightboxImage(src);
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const handleLightboxPrev = () => {
    const newIndex = lightboxIndex > 0 ? lightboxIndex - 1 : lightboxImages.length - 1;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  const handleLightboxNext = () => {
    const newIndex = lightboxIndex < lightboxImages.length - 1 ? lightboxIndex + 1 : 0;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="socialmedia-modal-overlay">
        <div className="socialmedia-modal-backdrop" onClick={onClose} />

        <div className="socialmedia-modal-container">
          {/* Header */}
          <div className="socialmedia-modal-header">
            <div className="socialmedia-modal-title-section">
              <span className="text-gradient-aspec font-exo font-bold text-lg">Socialmedia</span>
              <span className="text-white/40 font-exo text-sm ml-2">— Design Publicitário</span>
            </div>
            <button onClick={onClose} className="socialmedia-modal-close">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="socialmedia-modal-tabs">
            <button
              onClick={() => setActiveTab("carrossel")}
              className={`socialmedia-modal-tab ${activeTab === "carrossel" ? "active" : ""}`}
            >
              <Layers size={16} />
              <span>Carrosséis</span>
              <span className="socialmedia-modal-tab-count">{carrosselGroups.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("banner")}
              className={`socialmedia-modal-tab ${activeTab === "banner" ? "active" : ""}`}
            >
              <Image size={16} />
              <span>Banners</span>
              <span className="socialmedia-modal-tab-count">{bannerImages.length}</span>
            </button>
          </div>

          {/* Content */}
          <div className="socialmedia-modal-scroll-area">
            <div className="socialmedia-modal-content">
              {activeTab === "carrossel" && (
                <div className="socialmedia-carrossel-container">
                  {carrosselGroups.map((group, groupIndex) => (
                    <div key={group.id} className="socialmedia-carrossel-group">
                      <div className="socialmedia-carrossel-wrapper">
                        <button 
                          className="socialmedia-carrossel-arrow socialmedia-carrossel-arrow-left"
                          onClick={() => scrollLeft(groupIndex)}
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <div 
                          className="socialmedia-carrossel-track"
                          ref={(el) => { trackRefs.current[groupIndex] = el; }}
                        >
                          {group.images.map((src, imgIndex) => (
                            <div key={src} className="socialmedia-carrossel-slide">
                              {!loadedImages.has(src) && (
                                <div className="socialmedia-image-skeleton">
                                  <div className="skeleton-shimmer" />
                                </div>
                              )}
                              <img
                                src={src}
                                alt={`${group.name} - Slide ${imgIndex + 1}`}
                                onLoad={() => handleImageLoad(src)}
                                className={`socialmedia-image ${loadedImages.has(src) ? "loaded" : ""}`}
                                onClick={() => openLightbox(src, group.images, imgIndex)}
                              />
                              <div className="socialmedia-slide-indicator">
                                <span className="font-exo text-xs">
                                  {imgIndex + 1}/{group.images.length}
                                </span>
                              </div>
                              <button 
                                className="socialmedia-zoom-btn"
                                onClick={() => openLightbox(src, group.images, imgIndex)}
                              >
                                <ZoomIn size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button 
                          className="socialmedia-carrossel-arrow socialmedia-carrossel-arrow-right"
                          onClick={() => scrollRight(groupIndex)}
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "banner" && (
                <div className="socialmedia-banner-container">
                  <div className="socialmedia-section-label">
                    <Image size={14} />
                    <span>Banners Promocionais</span>
                  </div>
                  <div className="socialmedia-banner-grid">
                    {bannerImages.map((src, index) => (
                      <div 
                        key={src} 
                        className="socialmedia-banner-item"
                        onClick={() => openLightbox(src, bannerImages, index)}
                      >
                        {!loadedImages.has(src) && (
                          <div className="socialmedia-image-skeleton">
                            <div className="skeleton-shimmer" />
                          </div>
                        )}
                        <img
                          src={src}
                          alt={`Banner ${index + 1}`}
                          onLoad={() => handleImageLoad(src)}
                          className={`socialmedia-image ${loadedImages.has(src) ? "loaded" : ""}`}
                        />
                        <button 
                          className="socialmedia-zoom-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(src, bannerImages, index);
                          }}
                        >
                          <ZoomIn size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attribution */}
              <div className="socialmedia-attribution">
                <ExternalLink size={12} />
                <span>ASPEC Soluções Digitais</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="socialmedia-lightbox-overlay" onClick={closeLightbox}>
          <div className="socialmedia-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="socialmedia-lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            <button className="socialmedia-lightbox-nav socialmedia-lightbox-prev" onClick={handleLightboxPrev}>
              <ChevronLeft size={32} />
            </button>
            <div className="socialmedia-lightbox-image-wrapper">
              <img src={lightboxImage} alt="Visualização" className="socialmedia-lightbox-image" />
            </div>
            <button className="socialmedia-lightbox-nav socialmedia-lightbox-next" onClick={handleLightboxNext}>
              <ChevronRight size={32} />
            </button>
            <div className="socialmedia-lightbox-counter">
              <span className="font-exo text-sm">{lightboxIndex + 1} / {lightboxImages.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialmediaModal;
