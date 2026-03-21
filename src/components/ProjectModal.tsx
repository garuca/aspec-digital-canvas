import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    images: string[];
  };
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  const scrollToImage = (index: number) => {
    const element = document.getElementById(`project-image-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="project-modal-overlay">
      {/* Background blur overlay */}
      <div className="project-modal-backdrop" onClick={onClose} />
      
      {/* Modal container */}
      <div className="project-modal-container" ref={containerRef}>
        {/* Header */}
        <div className="project-modal-header">
          <div className="project-modal-title">
            <span className="text-gradient-aspec font-exo font-bold text-lg">{project.title}</span>
            <span className="text-white/40 font-exo text-sm ml-2">— Case de Projeto</span>
          </div>
          <button onClick={onClose} className="project-modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Thumbnail navigation */}
        <div className="project-modal-thumbnails">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              className="project-modal-thumb"
            >
              <span className="font-exo text-xs">{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Main scroll area */}
        <div className="project-modal-scroll-area">
          <div className="project-modal-content">
            {project.images.map((image, index) => (
              <div
                key={index}
                id={`project-image-${index}`}
                className="project-image-wrapper"
              >
                <div className="project-image-container">
                  {!loadedImages.has(index) && (
                    <div className="project-image-skeleton">
                      <div className="skeleton-shimmer" />
                    </div>
                  )}
                  <img
                    src={image}
                    alt={`${project.title} - Imagem ${index + 1}`}
                    onLoad={() => handleImageLoad(index)}
                    className={`project-image ${loadedImages.has(index) ? "loaded" : ""}`}
                  />
                </div>
                <div className="project-image-indicator">
                  <span className="font-exo text-xs text-white/30">
                    {String(index + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="project-modal-scroll-hint">
          <ChevronDown size={16} className="animate-bounce text-white/30" />
          <span className="font-exo text-xs text-white/30">Role para explorar</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
