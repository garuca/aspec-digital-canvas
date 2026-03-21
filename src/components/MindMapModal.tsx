import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

interface MindMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategyNumber: string;
  strategyTitle: string;
  mindMapImage: string;
}

const MindMapModal = ({ isOpen, onClose, strategyNumber, strategyTitle, mindMapImage }: MindMapModalProps) => {
  const [loaded, setLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLoaded(false);
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
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mindmap-modal-overlay">
      <div 
        className="mindmap-modal-backdrop" 
        onClick={onClose}
      />
      
      <div className="mindmap-modal-container" ref={modalRef}>
        <div className="mindmap-modal-header">
          <div className="mindmap-modal-title">
            <div className="mindmap-modal-badge">
              <span className="text-gradient-aspec font-bold">Estratégia {strategyNumber}</span>
            </div>
            <div className="mindmap-modal-title-text">
              <span className="text-white/90 text-lg font-semibold">{strategyTitle}</span>
            </div>
          </div>
          
          <div className="mindmap-modal-actions">
            <button className="mindmap-modal-action-btn" title="Download">
              <Download size={18} />
            </button>
            <button className="mindmap-modal-action-btn" title="Compartilhar">
              <Share2 size={18} />
            </button>
            <button 
              className="mindmap-modal-close" 
              onClick={onClose}
              title="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="mindmap-modal-content">
          <div className="mindmap-image-wrapper">
            <div className="mindmap-image-container">
              {!loaded && (
                <div className="mindmap-image-skeleton">
                  <div className="mindmap-skeleton-shimmer" />
                </div>
              )}
              <img
                src={mindMapImage}
                alt={`Mapa Mental - ${strategyTitle}`}
                className={`mindmap-image ${loaded ? "loaded" : ""}`}
                onLoad={() => setLoaded(true)}
              />
            </div>
            
            <div className="mindmap-scroll-hint">
              <ChevronLeft size={16} className="opacity-60" />
              <span className="text-sm text-white/60">Role para explorar</span>
              <ChevronRight size={16} className="opacity-60" />
            </div>
          </div>
        </div>
        
        <div className="mindmap-modal-footer">
          <div className="mindmap-footer-content">
            <div className="mindmap-footer-indicator">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
              <span className="text-white/40 text-sm font-medium">ASPEC Digital Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMapModal;