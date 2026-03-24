import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FaqSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    { qKey: "faq.q1", aKey: "faq.a1" },
    { qKey: "faq.q2", aKey: "faq.a2" },
    { qKey: "faq.q3", aKey: "faq.a3" },
    { qKey: "faq.q4", aKey: "faq.a4" },
    { qKey: "faq.q5", aKey: "faq.a5" },
    { qKey: "faq.q6", aKey: "faq.a6" },
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden light-section">
      <div className="dot-pattern opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-purple-600 uppercase tracking-wider mb-3">
            <HelpCircle size={12} />
            {t("faq.badge")}
          </span>
          <h2 className="font-exo font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            {t("faq.title")}
          </h2>
          <p className="font-exo text-gray-500 max-w-xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {faqData.map((faq, i) => (
            <div
              key={faq.qKey}
              className={`faq-item-two7 ${openIndex === i ? "active" : ""}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="faq-question-two7"
              >
                <div className="faq-number">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span className="faq-question-text">
                  {t(faq.qKey)}
                </span>
                <ChevronDown 
                  size={18} 
                  className={`faq-chevron ${openIndex === i ? "rotated" : ""}`}
                />
              </button>
              <div 
                className={`faq-answer-container ${
                  openIndex === i ? "open" : ""
                }`}
              >
                <div className="faq-answer-line" />
                <p className="faq-answer">
                  {t(faq.aKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-item-two7 {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item-two7:hover {
          border-color: #5B2EFF;
          box-shadow: 0 4px 15px rgba(91, 46, 255, 0.08);
        }

        .faq-item-two7.active {
          border-color: #5B2EFF;
          box-shadow: 0 8px 25px rgba(91, 46, 255, 0.12);
        }

        .faq-question-two7 {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .faq-question-two7:hover {
          background: #fafafa;
        }

        .faq-number {
          font-family: 'Exo', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #5B2EFF;
          background: rgba(91, 46, 255, 0.08);
          padding: 6px 10px;
          border-radius: 8px;
          min-width: 48px;
          text-align: center;
          flex-shrink: 0;
        }

        .faq-item-two7.active .faq-number {
          background: #5B2EFF;
          color: #ffffff;
        }

        .faq-question-text {
          font-family: 'Exo', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #1f2937;
          text-align: left;
          flex: 1;
          line-height: 1.4;
        }

        .faq-item-two7.active .faq-question-text {
          color: #5B2EFF;
        }

        .faq-chevron {
          color: #9ca3af;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .faq-chevron.rotated {
          color: #5B2EFF;
          transform: rotate(180deg);
        }

        .faq-answer-container {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
        }

        .faq-answer-container.open {
          max-height: 300px;
        }

        .faq-answer-line {
          height: 1px;
          background: #f3f4f6;
          margin: 0 20px;
        }

        .faq-answer {
          padding: 16px 20px 20px;
          font-family: 'Exo', sans-serif;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
        }

        @media (max-width: 640px) {
          .faq-question-two7 {
            padding: 14px 16px;
          }
          
          .faq-question-text {
            font-size: 14px;
          }
          
          .faq-number {
            font-size: 12px;
            padding: 5px 8px;
            min-width: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default FaqSection;
