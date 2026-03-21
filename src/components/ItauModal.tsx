import { useEffect, useState } from "react";
import { X, ExternalLink, Bot, MessageCircle, Shield, Clock, Zap, CreditCard, Wallet, RefreshCw, HelpCircle, ChevronRight, CheckCircle, Smartphone, TrendingUp, Users, Globe, Lock, Volume2, Send, Sparkles } from "lucide-react";

interface ItauModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const capabilities = [
  {
    icon: Wallet,
    title: "Consulta de Saldo",
    description: "Consulte saldo e extrato em segundos",
    color: "#EC7000"
  },
  {
    icon: CreditCard,
    title: "Gestão de Cartões",
    description: "Segunda via, limites e fatura",
    color: "#FF8C00"
  },
  {
    icon: RefreshCw,
    title: "Renegociação",
    description: "Negocie dívidas de forma fácil",
    color: "#FF6B00"
  },
  {
    icon: TrendingUp,
    title: "Empréstimos",
    description: "Simule e contrate rapidamente",
    color: "#E65100"
  },
  {
    icon: HelpCircle,
    title: "Tire Dúvidas",
    description: "Respostas instantâneas 24h",
    color: "#FF7F00"
  },
  {
    icon: Zap,
    title: "Pix no WhatsApp",
    description: "Pagamentos pelo mensageiro",
    color: "#FF9000"
  }
];

const stats = [
  { value: "70M+", label: "Clientes", icon: Users },
  { value: "24/7", label: "Disponível", icon: Clock },
  { value: "35%", label: "Mais Rápido", icon: Zap },
  { value: "100%", label: "Seguro", icon: Shield }
];

const conversationDemo = [
  { type: "user", text: "Quero fazer um Pix de R$ 50" },
  { type: "bot", text: "Claro! Para quem você quer enviar?" },
  { type: "user", text: "Para Maria, chave CPF" },
  { type: "bot", text: "Encontrei Maria. Confirme: R$ 50,00 para Maria Silva. Posso procesar?" },
  { type: "user", text: "Sim!" },
  { type: "bot", text: "✅ Pix realizado com sucesso! R$ 50,00 enviado para Maria Silva. Comprovante enviado para seu e-mail." }
];

const ItauModal = ({ isOpen, onClose }: ItauModalProps) => {
  const [activeSection, setActiveSection] = useState<"overview" | "capabilities" | "demo">("overview");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

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
    if (activeSection === "demo" && isOpen) {
      setMessageIndex(0);
      setVisibleMessages([]);
      
      conversationDemo.forEach((_, index) => {
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, index]);
        }, 500 + index * 1500);
      });
    }
  }, [activeSection, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="itau-modal-overlay">
      <div className="itau-modal-backdrop" onClick={onClose} />

      <div className="itau-modal-container">
        {/* Header */}
        <div className="itau-modal-header">
          <div className="itau-header-content">
            <div className="itau-logo-badge">
              <Bot size={24} />
            </div>
            <div className="itau-header-text">
              <span className="font-exo font-bold text-xl" style={{ color: "#FF6B00" }}>Assistente Virtual Itaú</span>
              <span className="text-white/50 font-exo text-sm ml-2">CHATBOT COM IA</span>
            </div>
          </div>
          <button onClick={onClose} className="itau-modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="itau-nav-tabs">
          <button
            onClick={() => setActiveSection("overview")}
            className={`itau-nav-tab ${activeSection === "overview" ? "active" : ""}`}
          >
            <Sparkles size={16} />
            Visão Geral
          </button>
          <button
            onClick={() => setActiveSection("capabilities")}
            className={`itau-nav-tab ${activeSection === "capabilities" ? "active" : ""}`}
          >
            <MessageCircle size={16} />
            Funcionalidades
          </button>
          <button
            onClick={() => setActiveSection("demo")}
            className={`itau-nav-tab ${activeSection === "demo" ? "active" : ""}`}
          >
            <Volume2 size={16} />
            Demo
          </button>
        </div>

        {/* Content */}
        <div className="itau-modal-content">
          {activeSection === "overview" && (
            <div className="itau-overview">
              {/* Hero Stats */}
              <div className="itau-hero-section">
                <div className="itau-hero-badge">
                  <Globe size={14} />
                  <span>O maior banco digital da América Latina</span>
                </div>
                <h2 className="itau-hero-title">
                  Inteligência artificial que revoluciona o atendimento bancário
                </h2>
                <p className="itau-hero-subtitle">
                  O Assistente Virtual Itaú utiliza IA generativa para oferecer um atendimento hiperpersonalizado, disponível 24 horas por dia, 7 dias por semana. Comaprendendo e evoluindo a cada interação.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="itau-stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="itau-stat-card">
                    <div className="itau-stat-icon">
                      <stat.icon size={20} />
                    </div>
                    <div className="itau-stat-value">{stat.value}</div>
                    <div className="itau-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div className="itau-features-preview">
                <h3 className="itau-section-title">O que o assistente faz por você</h3>
                <div className="itau-features-list">
                  {capabilities.slice(0, 4).map((cap, index) => (
                    <div key={index} className="itau-feature-item">
                      <div className="itau-feature-check">
                        <CheckCircle size={16} />
                      </div>
                      <span>{cap.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="itau-cta-section">
                <a 
                  href="https://www.itau.com.br/atendimento-itau/para-voce/assistente-virtual-itau" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="itau-cta-button"
                >
                  <ExternalLink size={18} />
                  <span>Conhecer o Assistente</span>
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.itau&hl=pt_BR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="itau-cta-secondary"
                >
                  <Smartphone size={16} />
                  <span>Baixar App</span>
                </a>
              </div>
            </div>
          )}

          {activeSection === "capabilities" && (
            <div className="itau-capabilities">
              <div className="itau-capabilities-header">
                <h3 className="font-exo font-bold text-2xl text-white mb-2">Funcionalidades Completas</h3>
                <p className="font-exo text-white/60">Tudo que você pode fazer com a Inteligência Itaú</p>
              </div>

              <div className="itau-capabilities-grid">
                {capabilities.map((cap, index) => (
                  <div key={index} className="itau-capability-card">
                    <div 
                      className="itau-capability-icon"
                      style={{ background: `linear-gradient(135deg, ${cap.color}, ${cap.color}80)` }}
                    >
                      <cap.icon size={24} />
                    </div>
                    <div className="itau-capability-content">
                      <h4 className="font-exo font-semibold text-white">{cap.title}</h4>
                      <p className="font-exo text-sm text-white/60">{cap.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="itau-security-section">
                <div className="itau-security-badge">
                  <Lock size={20} />
                  <span>Segurança Itaú</span>
                </div>
                <div className="itau-security-features">
                  <div className="itau-security-item">
                    <Shield size={16} />
                    <span>Autenticação biométrica</span>
                  </div>
                  <div className="itau-security-item">
                    <Shield size={16} />
                    <span>Proteção contra fraudes</span>
                  </div>
                  <div className="itau-security-item">
                    <Shield size={16} />
                    <span>Transferência para humanos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "demo" && (
            <div className="itau-demo">
              <div className="itau-demo-header">
                <h3 className="font-exo font-bold text-2xl text-white mb-2">
                  <span style={{ color: "#FF6B00" }}>Inteligência</span> Itaú em ação
                </h3>
                <p className="font-exo text-white/60">Veja como é simples resolver suas necessidades</p>
              </div>

              {/* Chat Demo */}
              <div className="itau-chat-container">
                <div className="itau-chat-header">
                  <div className="itau-chat-avatar">
                    <Bot size={20} />
                  </div>
                  <div className="itau-chat-info">
                    <span className="itau-chat-name">Inteligência Itaú</span>
                    <span className="itau-chat-status">
                      <span className="itau-status-dot" />
                      Online
                    </span>
                  </div>
                </div>

                <div className="itau-chat-messages">
                  {conversationDemo.map((msg, index) => (
                    <div 
                      key={index}
                      className={`itau-message ${msg.type} ${visibleMessages.includes(index) ? "visible" : ""}`}
                    >
                      <div className="itau-message-bubble">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="itau-chat-input">
                  <input 
                    type="text" 
                    placeholder="Digite sua mensagem..." 
                    disabled 
                    className="itau-input-field"
                  />
                  <button className="itau-send-button" disabled>
                    <Send size={18} />
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="itau-demo-highlights">
                <div className="itau-demo-highlight">
                  <div className="itau-demo-highlight-icon">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4>Respostas instantâneas</h4>
                    <p>Menos de 2 segundos</p>
                  </div>
                </div>
                <div className="itau-demo-highlight">
                  <div className="itau-demo-highlight-icon">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4>Voice & Text</h4>
                    <p>Fale ou digite</p>
                  </div>
                </div>
                <div className="itau-demo-highlight">
                  <div className="itau-demo-highlight-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4>Pix no WhatsApp</h4>
                    <p>Pagamentos rápidos</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .itau-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .itau-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease;
        }

        .itau-modal-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 24px;
          border: 1px solid rgba(255, 107, 0, 0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.4s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 107, 0, 0.1);
        }

        .itau-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          background: linear-gradient(90deg, rgba(255, 107, 0, 0.1), transparent);
          border-bottom: 1px solid rgba(255, 107, 0, 0.2);
        }

        .itau-header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .itau-logo-badge {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
        }

        .itau-header-text {
          display: flex;
          flex-direction: column;
        }

        .itau-modal-close {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .itau-modal-close:hover {
          background: rgba(255, 107, 0, 0.2);
          border-color: rgba(255, 107, 0, 0.5);
        }

        .itau-nav-tabs {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .itau-nav-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .itau-nav-tab:hover {
          background: rgba(255, 107, 0, 0.1);
          color: white;
        }

        .itau-nav-tab.active {
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
        }

        .itau-modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        /* Overview Section */
        .itau-overview {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .itau-hero-section {
          text-align: center;
          padding: 1rem 0;
        }

        .itau-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: 100px;
          padding: 0.5rem 1rem;
          color: #FF6B00;
          font-family: 'Exo 2', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .itau-hero-title {
          font-family: 'Exo 2', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          line-height: 1.3;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, white, rgba(255, 107, 0, 0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .itau-hero-subtitle {
          font-family: 'Exo 2', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .itau-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .itau-stat-card {
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(255, 107, 0, 0.05));
          border: 1px solid rgba(255, 107, 0, 0.2);
          border-radius: 16px;
          padding: 1.25rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .itau-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.2);
        }

        .itau-stat-icon {
          width: 40px;
          height: 40px;
          margin: 0 auto 0.75rem;
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .itau-stat-value {
          font-family: 'Exo 2', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .itau-stat-label {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .itau-features-preview {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .itau-section-title {
          font-family: 'Exo 2', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }

        .itau-features-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .itau-feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Exo 2', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .itau-feature-check {
          color: #FF6B00;
        }

        .itau-cta-section {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .itau-cta-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          border-radius: 12px;
          color: white;
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
        }

        .itau-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 0, 0.4);
        }

        .itau-cta-secondary {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .itau-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 107, 0, 0.3);
        }

        /* Capabilities Section */
        .itau-capabilities {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .itau-capabilities-header {
          text-align: center;
        }

        .itau-capabilities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .itau-capability-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.25rem;
          transition: all 0.3s ease;
        }

        .itau-capability-card:hover {
          background: rgba(255, 107, 0, 0.05);
          border-color: rgba(255, 107, 0, 0.2);
          transform: translateX(4px);
        }

        .itau-capability-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .itau-capability-content h4 {
          margin-bottom: 0.25rem;
        }

        .itau-security-section {
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(255, 107, 0, 0.05));
          border: 1px solid rgba(255, 107, 0, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .itau-security-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #FF6B00;
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .itau-security-features {
          display: flex;
          gap: 2rem;
        }

        .itau-security-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Exo 2', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .itau-security-item svg {
          color: #FF6B00;
        }

        /* Demo Section */
        .itau-demo {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .itau-demo-header {
          text-align: center;
        }

        .itau-chat-container {
          background: #0d1117;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .itau-chat-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 107, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .itau-chat-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .itau-chat-info {
          display: flex;
          flex-direction: column;
        }

        .itau-chat-name {
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          color: white;
        }

        .itau-chat-status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-family: 'Exo 2', sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .itau-status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .itau-chat-messages {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-height: 280px;
        }

        .itau-message {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .itau-message.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .itau-message.user {
          align-self: flex-end;
        }

        .itau-message.bot {
          align-self: flex-start;
        }

        .itau-message-bubble {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          font-family: 'Exo 2', sans-serif;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .itau-message.user .itau-message-bubble {
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .itau-message.bot .itau-message-bubble {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-bottom-left-radius: 4px;
        }

        .itau-chat-input {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .itau-input-field {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: white;
          font-family: 'Exo 2', sans-serif;
          font-size: 0.875rem;
        }

        .itau-input-field::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .itau-send-button {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          border: none;
          border-radius: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .itau-demo-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .itau-demo-highlight {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1rem;
        }

        .itau-demo-highlight-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 107, 0, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF6B00;
        }

        .itau-demo-highlight h4 {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.125rem;
        }

        .itau-demo-highlight p {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 640px) {
          .itau-modal-container {
            max-height: 95vh;
            border-radius: 16px;
          }
          
          .itau-nav-tabs {
            padding: 0.75rem 1rem;
            overflow-x: auto;
          }
          
          .itau-nav-tab {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
            white-space: nowrap;
          }
          
          .itau-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .itau-features-list {
            grid-template-columns: 1fr;
          }
          
          .itau-capabilities-grid {
            grid-template-columns: 1fr;
          }
          
          .itau-security-features {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .itau-cta-section {
            flex-direction: column;
          }
          
          .itau-demo-highlights {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ItauModal;
