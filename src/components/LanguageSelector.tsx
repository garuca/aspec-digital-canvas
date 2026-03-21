import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const flags = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

const flagLabels = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "pt" as const, flag: flags.pt },
    { code: "en" as const, flag: flags.en },
    { code: "es" as const, flag: flags.es },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
      >
        <span className="text-lg">{flags[language]}</span>
        <ChevronDown 
          size={14} 
          className={`text-white/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-purple-500/20 rounded-xl shadow-2xl shadow-purple-500/10 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-purple-500/10 ${
                language === lang.code 
                  ? "bg-purple-500/20 text-white" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-exo text-sm font-medium">{flagLabels[lang.code]}</span>
              {language === lang.code && (
                <div className="ml-auto w-2 h-2 rounded-full bg-purple-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
