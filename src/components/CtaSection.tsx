import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Rocket, Calculator, CheckCircle2, Loader2, Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CtaSection = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    servico: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-24 relative overflow-hidden light-section">
      <div className="dot-pattern" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-5 py-2 mb-6 border border-purple-200">
              <Calculator size={14} className="text-pink-600" />
              <span className="text-sm font-medium text-pink-700">{t("cta.badge")}</span>
            </div>
            
            <h2 className="font-exo font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 leading-tight">
              {t("cta.title")}
            </h2>
            <p className="font-exo text-lg text-gray-500 mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {t("cta.subtitle")}
            </p>

            {/* Urgency Banner */}
            <div className="urgency-badge mb-8 justify-center lg:justify-start">
              <AlertCircle size={18} className="text-red-500" />
              <div>
                <span className="font-exo font-bold text-red-600 text-sm">{t("cta.urgency")}</span>
                <span className="font-exo text-red-500 text-sm ml-1">{t("cta.urgency2")}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-purple-600" />
                </div>
                <span className="font-exo text-sm text-gray-700">{t("cta.analysis")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-pink-600" />
                </div>
                <span className="font-exo text-sm text-gray-700">{t("cta.free")}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-gray-200 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-500">{t("cta.response")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-purple-500" />
                <span className="text-sm text-gray-500">{t("cta.secure")}</span>
              </div>
            </div>
          </div>

          <div className="cta-light p-8 lg:p-10 rounded-2xl">
            <div className="cta-light-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h3 className="font-exo font-bold text-2xl text-gray-900 mb-3">{t("cta.success")}</h3>
                <p className="font-exo text-gray-500 mb-6">
                  {t("cta.successDesc")}
                </p>
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ nome: "", email: "", empresa: "", servico: "" });
                  }}
                >
                  {t("cta.sendAnother")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                <div>
                  <label className="font-exo text-sm text-gray-600 mb-2 block">{t("cta.name")}</label>
                  <Input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder={t("cta.name")}
                    required
                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-100 rounded-xl h-12"
                  />
                </div>
                <div>
                  <label className="font-exo text-sm text-gray-600 mb-2 block">{t("cta.email")}</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@empresa.com"
                    required
                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-100 rounded-xl h-12"
                  />
                </div>
                <div>
                  <label className="font-exo text-sm text-gray-600 mb-2 block">{t("cta.company")}</label>
                  <Input
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder={t("cta.company")}
                    required
                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-100 rounded-xl h-12"
                  />
                </div>
                <div>
                  <label className="font-exo text-sm text-gray-600 mb-2 block">{t("cta.projectType")}</label>
                  <select
                    name="servico"
                    value={formData.servico}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-exo text-base focus:border-purple-400 focus:ring-purple-100 outline-none transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '18px',
                    }}
                  >
                    <option value="" className="bg-white">{t("cta.selectOption")}</option>
                    <option value="website" className="bg-white">{t("cta.website")}</option>
                    <option value="ecommerce" className="bg-white">{t("cta.ecommerce")}</option>
                    <option value="aplicativo" className="bg-white">{t("cta.app")}</option>
                    <option value="sistema" className="bg-white">{t("cta.system")}</option>
                    <option value="marketing" className="bg-white">{t("cta.marketing")}</option>
                    <option value="outro" className="bg-white">{t("cta.other")}</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2 text-base py-6 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Rocket size={18} />
                      {t("cta.submit")}
                    </>
                  )}
                </Button>
                <p className="font-exo text-xs text-gray-400 text-center mt-4">
                  {t("cta.privacy")}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
