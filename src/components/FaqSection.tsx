import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FaqSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    { qKey: "faq.q1", aKey: "faq.a1" },
    { qKey: "faq.q2", aKey: "faq.a2" },
    { qKey: "faq.q3", aKey: "faq.a3" },
    { qKey: "faq.q4", aKey: "faq.a4" },
    { qKey: "faq.q5", aKey: "faq.a5" },
    { qKey: "faq.q6", aKey: "faq.a6" },
  ];

  return (
    <section className="py-24 relative overflow-hidden light-section">
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

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, i) => (
            <div
              key={faq.qKey}
              className="faq-item"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="faq-question"
              >
                <span className="font-exo font-semibold text-gray-900 text-left">
                  {t(faq.qKey)}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-purple-500 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="faq-answer">
                  {t(faq.aKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
