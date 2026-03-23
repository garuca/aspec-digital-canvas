import { useEffect, useState } from "react";
import { X, Clock, BookOpen, ChevronRight, Share2, Printer, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBasePath } from "@/utils/basePath";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategyNumber: string;
}

const ArticleModal = ({ isOpen, onClose, strategyNumber }: ArticleModalProps) => {
  const basePath = getBasePath();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);

  const articleMap: Record<string, {
    title: string;
    subtitle: string;
    readTime: string;
    sections: Array<{
      id: string;
      titleKey: string;
      contentKey: string;
      highlightKey?: string;
      stats?: Array<{ value: string; labelKey: string }>;
      image?: string;
      imageCaptionKey?: string;
      list?: string[];
    }>;
    takeaways: string[];
    cta: { titleKey: string; descKey: string; btnKey: string };
  }> = {
    "01": {
      title: t("art01.title"),
      subtitle: t("art01.subtitle"),
      readTime: "8 min",
      sections: [
        { id: "intro", titleKey: "art01.s1.title", contentKey: "art01.s1.content", highlightKey: "art01.s1.highlight", stats: [
          { value: t("art01.s1.stat1.value"), labelKey: "art01.s1.stat1.label" },
          { value: t("art01.s1.stat2.value"), labelKey: "art01.s1.stat2.label" },
          { value: t("art01.s1.stat3.value"), labelKey: "art01.s1.stat3.label" },
        ]},
        { id: "metodologia", titleKey: "art01.s2.title", contentKey: "art01.s2.content", image: `${basePath}/illustrations/diagnostico-metodologia.svg`, imageCaptionKey: "art01.s2.imageCaption", list: [
          t("art01.s2.list1"), t("art01.s2.list2"), t("art01.s2.list3"), t("art01.s2.list4"), t("art01.s2.list5")
        ]},
        { id: "casos", titleKey: "art01.s3.title", contentKey: "art01.s3.content", stats: [
          { value: t("art01.s3.stat1.value"), labelKey: "art01.s3.stat1.label" },
          { value: t("art01.s3.stat2.value"), labelKey: "art01.s3.stat2.label" },
          { value: t("art01.s3.stat3.value"), labelKey: "art01.s3.stat3.label" },
        ]},
        { id: "processo", titleKey: "art01.s4.title", contentKey: "art01.s4.content", image: "/illustrations/diagnostico-processo.svg", imageCaptionKey: "art01.s4.imageCaption" },
        { id: "investimento", titleKey: "art01.s5.title", contentKey: "art01.s5.content", highlightKey: "art01.s5.highlight" },
      ],
      takeaways: [t("art01.takeaway1"), t("art01.takeaway2"), t("art01.takeaway3"), t("art01.takeaway4"), t("art01.takeaway5")],
      cta: { titleKey: "art01.cta.title", descKey: "art01.cta.desc", btnKey: "art01.cta.btn" },
    },
    "02": {
      title: t("art02.title"),
      subtitle: t("art02.subtitle"),
      readTime: "10 min",
      sections: [
        { id: "problema", titleKey: "art02.s1.title", contentKey: "art02.s1.content", highlightKey: "art02.s1.highlight", stats: [
          { value: t("art02.s1.stat1.value"), labelKey: "art02.s1.stat1.label" },
          { value: t("art02.s1.stat2.value"), labelKey: "art02.s1.stat2.label" },
          { value: t("art02.s1.stat3.value"), labelKey: "art02.s1.stat3.label" },
        ]},
        { id: "solucao", titleKey: "art02.s2.title", contentKey: "art02.s2.content", list: [
          t("art02.s2.list1"), t("art02.s2.list2"), t("art02.s2.list3"), t("art02.s2.list4"), t("art02.s2.list5")
        ]},
        { id: "transformacao", titleKey: "art02.s3.title", contentKey: "art02.s3.content", stats: [
          { value: t("art02.s3.stat1.value"), labelKey: "art02.s3.stat1.label" },
          { value: t("art02.s3.stat2.value"), labelKey: "art02.s3.stat2.label" },
          { value: t("art02.s3.stat3.value"), labelKey: "art02.s3.stat3.label" },
        ]},
        { id: "cases", titleKey: "art02.s4.title", contentKey: "art02.s4.content", image: `${basePath}/illustrations/integracao-crescimento.svg`, imageCaptionKey: "art02.s4.imageCaption" },
      ],
      takeaways: [t("art02.takeaway1"), t("art02.takeaway2"), t("art02.takeaway3"), t("art02.takeaway4"), t("art02.takeaway5")],
      cta: { titleKey: "art02.cta.title", descKey: "art02.cta.desc", btnKey: "art02.cta.btn" },
    },
    "03": {
      title: t("art03.title"),
      subtitle: t("art03.subtitle"),
      readTime: "9 min",
      sections: [
        { id: "velocidade", titleKey: "art03.s1.title", contentKey: "art03.s1.content", highlightKey: "art03.s1.highlight", stats: [
          { value: t("art03.s1.stat1.value"), labelKey: "art03.s1.stat1.label" },
          { value: t("art03.s1.stat2.value"), labelKey: "art03.s1.stat2.label" },
          { value: t("art03.s1.stat3.value"), labelKey: "art03.s1.stat3.label" },
        ]},
        { id: "mvp", titleKey: "art03.s2.title", contentKey: "art03.s2.content", list: [
          t("art03.s2.list1"), t("art03.s2.list2"), t("art03.s2.list3"), t("art03.s2.list4"), t("art03.s2.list5")
        ]},
        { id: "cases", titleKey: "art03.s3.title", contentKey: "art03.s3.content", stats: [
          { value: t("art03.s3.stat1.value"), labelKey: "art03.s3.stat1.label" },
          { value: t("art03.s3.stat2.value"), labelKey: "art03.s3.stat2.label" },
          { value: t("art03.s3.stat3.value"), labelKey: "art03.s3.stat3.label" },
        ]},
        { id: "processo", titleKey: "art03.s4.title", contentKey: "art03.s4.content", image: `${basePath}/illustrations/mvp-process.svg`, imageCaptionKey: "art03.s4.imageCaption" },
      ],
      takeaways: [t("art03.takeaway1"), t("art03.takeaway2"), t("art03.takeaway3"), t("art03.takeaway4"), t("art03.takeaway5")],
      cta: { titleKey: "art03.cta.title", descKey: "art03.cta.desc", btnKey: "art03.cta.btn" },
    },
    "04": {
      title: t("art04.title"),
      subtitle: t("art04.subtitle"),
      readTime: "11 min",
      sections: [
        { id: "dados", titleKey: "art04.s1.title", contentKey: "art04.s1.content", highlightKey: "art04.s1.highlight", stats: [
          { value: t("art04.s1.stat1.value"), labelKey: "art04.s1.stat1.label" },
          { value: t("art04.s1.stat2.value"), labelKey: "art04.s1.stat2.label" },
          { value: t("art04.s1.stat3.value"), labelKey: "art04.s1.stat3.label" },
        ]},
        { id: "framework", titleKey: "art04.s2.title", contentKey: "art04.s2.content", list: [
          t("art04.s2.list1"), t("art04.s2.list2"), t("art04.s2.list3"), t("art04.s2.list4"), t("art04.s2.list5")
        ]},
        { id: "cases", titleKey: "art04.s3.title", contentKey: "art04.s3.content", stats: [
          { value: t("art04.s3.stat1.value"), labelKey: "art04.s3.stat1.label" },
          { value: t("art04.s3.stat2.value"), labelKey: "art04.s3.stat2.label" },
          { value: t("art04.s3.stat3.value"), labelKey: "art04.s3.stat3.label" },
        ]},
        { id: "implementacao", titleKey: "art04.s4.title", contentKey: "art04.s4.content", image: `${basePath}/illustrations/dashboard-metricas.svg`, imageCaptionKey: "art04.s4.imageCaption" },
        { id: "roi", titleKey: "art04.s5.title", contentKey: "art04.s5.content", highlightKey: "art04.s5.highlight" },
      ],
      takeaways: [t("art04.takeaway1"), t("art04.takeaway2"), t("art04.takeaway3"), t("art04.takeaway4"), t("art04.takeaway5")],
      cta: { titleKey: "art04.cta.title", descKey: "art04.cta.desc", btnKey: "art04.cta.btn" },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveSection(null);
      setReadProgress(0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setReadProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !articleMap[strategyNumber]) return null;

  const article = articleMap[strategyNumber];

  return (
    <div className="article-modal-overlay">
      <div className="article-progress-bar" style={{ width: `${readProgress}%` }} />
      
      <div className="article-modal-container">
        <header className="article-modal-header">
          <div className="article-header-content">
            <button className="article-back-btn" onClick={onClose}>
              <X size={20} />
              <span>{t("article.back")}</span>
            </button>
            
            <div className="article-header-meta">
              <span className="article-badge">{t("culture.strategy")} {strategyNumber}</span>
              <span className="article-read-time">
                <Clock size={14} />
                {article.readTime} {t("article.readTime")}
              </span>
            </div>
            
            <div className="article-header-actions">
              <button className="article-action-btn" title={t("article.share")}>
                <Share2 size={18} />
              </button>
              <button className="article-action-btn" title={t("article.print")}>
                <Printer size={18} />
              </button>
            </div>
          </div>
        </header>

        <main className="article-modal-content">
          <article className="article-body">
            <header className="article-hero">
              <h1 className="article-title">{article.title}</h1>
              <p className="article-subtitle">{article.subtitle}</p>
              
              <div className="article-author">
                <div className="article-author-avatar">
                  <BookOpen size={20} />
                </div>
                <div className="article-author-info">
                  <span className="article-author-name">ASPEC Digital Solutions</span>
                  <span className="article-author-date">Janeiro 2025</span>
                </div>
              </div>
            </header>

            <div className="article-sections">
              {article.sections.map((section) => (
                <section 
                  key={section.id} 
                  id={section.id}
                  className={`article-section ${activeSection === section.id ? "active" : ""}`}
                >
                  <h2 className="article-section-title">{t(section.titleKey)}</h2>
                  
                  {section.stats && (
                    <div className="article-stats-grid">
                      {section.stats.map((stat, i) => (
                        <div key={i} className="article-stat-card">
                          <span className="article-stat-value">{stat.value}</span>
                          <span className="article-stat-label">{t(stat.labelKey)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="article-section-content">
                    {t(section.contentKey).split('\n\n').map((paragraph, i) => (
                      paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                        <h3 key={i} className="article-paragraph-title">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      ) : (
                        <p key={i} className="article-paragraph">
                          {paragraph.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                          )}
                        </p>
                      )
                    ))}
                  </div>
                  
                  {section.highlightKey && (
                    <div className="article-highlight">
                      <div className="article-highlight-icon">
                        <CheckCircle size={24} />
                      </div>
                      <p>{t(section.highlightKey)}</p>
                    </div>
                  )}
                  
                  {section.list && (
                    <ul className="article-list">
                      {section.list.map((item, i) => (
                        <li key={i}>
                          <ChevronRight size={16} className="article-list-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.image && (
                    <figure className="article-figure">
                      <img src={section.image} alt={section.imageCaptionKey ? t(section.imageCaptionKey) : ""} />
                      {section.imageCaptionKey && (
                        <figcaption>{t(section.imageCaptionKey)}</figcaption>
                      )}
                    </figure>
                  )}
                </section>
              ))}
            </div>

            <aside className="article-sidebar">
              <div className="article-sidebar-section">
                <h3 className="article-sidebar-title">{t("article.conclusions")}</h3>
                <ul className="article-takeaways">
                  {article.takeaways.map((takeaway, i) => (
                    <li key={i}>
                      <span className="takeaway-number">{i + 1}</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="article-cta-box">
                <h3>{t(article.cta.titleKey)}</h3>
                <p>{t(article.cta.descKey)}</p>
                <button className="article-cta-btn">
                  <span>{t(article.cta.btnKey)}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </aside>
          </article>
        </main>
      </div>
    </div>
  );
};

export default ArticleModal;
