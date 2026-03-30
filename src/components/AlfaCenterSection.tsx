import { useState } from "react";
import { Building2, Home, Search, FileCheck, Shield, Award, Handshake, Clock, MapPin, Phone, ArrowRight, ChevronDown, Menu, X, Star, Bed, Bath, Square, Car, Check, Heart, Eye } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import alfaLogo from "@/assets/logo-alfa-center.png";

const AlfaCenterSection = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollReveal();
  const { ref: diffRef, isVisible: diffVisible } = useScrollReveal();
  const { ref: propsRef, isVisible: propsVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const stats = [
    { value: "40+", label: "Anos de experiência" },
    { value: "800+", label: "Imóveis administrados" },
    { value: "5.000+", label: "Famílias atendidas" },
    { value: "98%", label: "Satisfação" },
  ];

  const services = [
    {
      icon: Search,
      title: "Compra e Venda",
      desc: "Assessoria completa na aquisição e comercialização de imóveis residenciais e comerciais.",
    },
    {
      icon: Home,
      title: "Locação",
      desc: "Gestão profissional de aluguéis com emissão de contratos e acompanhamento total.",
    },
    {
      icon: FileCheck,
      title: "Administração",
      desc: "Administração patrimonial com controle de receitas, despesas e inadimplência.",
    },
    {
      icon: Award,
      title: "Avaliação",
      desc: "Laudos de avaliação patrimonial com metodologia profissional de mercado.",
    },
  ];

  const differentials = [
    {
      icon: Shield,
      title: "Transparência Total",
      desc: "Comunique-se diretamente com WhatsApp e acompanhe cada etapa do seu negócio.",
    },
    {
      icon: Handshake,
      title: "Ética e Seriedade",
      desc: "Praticamos uma política séria de transparência e ética em todos os negócios.",
    },
    {
      icon: Clock,
      title: "Atendimento Ágil",
      desc: "Horário estendido de segunda a sexta e sábado pela manhã.",
    },
    {
      icon: Award,
      title: "Experiência Comprovada",
      desc: "40 anos de mercado goiano com histórico de crescimento e credibilidade.",
    },
  ];

  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      title: "Apartamento Premium",
      location: "Setor Bueno, Goiânia",
      price: "R$ 480.000",
      type: "venda",
      features: { beds: 3, baths: 2, area: 70 },
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      title: "Casa de Alto Padrão",
      location: "Jardim Goiás, Goiânia",
      price: "R$ 1.250.000",
      type: "venda",
      features: { beds: 4, baths: 3, area: 180 },
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
      title: "Apartamento Moderno",
      location: "Setor Marista, Goiânia",
      price: "R$ 2.800",
      type: "aluguel",
      features: { beds: 2, baths: 1, area: 55 },
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
      title: "Cobertura Duplex",
      location: "Alphaville, Goiânia",
      price: "R$ 890.000",
      type: "venda",
      features: { beds: 3, baths: 2, area: 120 },
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      title: "Casa com Piscina",
      location: "Parque Amazônia, Goiânia",
      price: "R$ 4.500",
      type: "aluguel",
      features: { beds: 4, baths: 3, area: 200 },
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
      title: "Studio Completo",
      location: "Setor Oeste, Goiânia",
      price: "R$ 1.500",
      type: "aluguel",
      features: { beds: 1, baths: 1, area: 32 },
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  return (
    <>
      {/* Header */}
      <header style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img 
                src={alfaLogo} 
                alt="Alfa Center Imóveis" 
                className="h-12 w-auto"
              />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Início", "Imóveis", "Serviços", "Sobre", "Contato"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-montserrat text-sm font-semibold transition-colors hover:opacity-70"
                  style={{ color: item === "Início" ? "#F6931E" : "#333333" }}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+556232366111"
                className="flex items-center gap-2 font-montserrat text-sm font-semibold"
                style={{ color: "#1B365D" }}
              >
                <Phone size={16} />
                (62) 3236-6111
              </a>
              <a
                href="https://wa.me/556232366111"
                className="px-5 py-2 rounded-[5px] font-montserrat text-sm font-bold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: "#F6931E" }}
              >
                WhatsApp
              </a>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: "#1B365D" }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <nav className="flex flex-col gap-4">
              {["Início", "Imóveis", "Serviços", "Sobre", "Contato"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-montserrat text-sm font-semibold py-2"
                  style={{ color: "#333333" }}
                >
                  {item}
                </a>
              ))}
              <a
                href="https://wa.me/556232366111"
                className="mt-2 px-5 py-3 rounded-[5px] font-montserrat text-sm font-bold text-white text-center"
                style={{ backgroundColor: "#F6931E" }}
              >
                WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section 
        ref={heroRef} 
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: "#F4F7F6" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ backgroundColor: "#1B365D" }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="inline-flex items-center gap-2 mb-6">
                <Award size={16} style={{ color: "#F6931E" }} />
                <span className="font-montserrat text-sm font-semibold" style={{ color: "#666666" }}>
                  Desde 1985 em Goiânia
                </span>
              </div>

              <h1 className="font-montserrat font-bold text-4xl md:text-5xl leading-tight mb-6" style={{ color: "#1B365D" }}>
                Alfa Center
                <br />
                <span style={{ color: "#F6931E" }}>Imóveis</span>
              </h1>

              <p className="font-montserrat text-lg mb-8 leading-relaxed max-w-lg" style={{ color: "#333333" }}>
                Há mais de 40 anos construindo confiança no mercado imobiliário goiano. 
                Somos referência em transparência, ética e resultados para famílias e investidores.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="#imoveis"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[5px] font-montserrat font-bold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#F6931E" }}
                >
                  Ver Imóveis
                  <ArrowRight size={18} />
                </a>
                <a
                  href="https://wa.me/556232366111"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[5px] font-montserrat font-bold border-2 transition-all"
                  style={{ borderColor: "#1B365D", color: "#1B365D" }}
                >
                  <Phone size={18} />
                  Falar no WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-6" style={{ color: "#666666" }}>
                <div className="flex items-center gap-2">
                  <MapPin size={16} style={{ color: "#F6931E" }} />
                  <span className="font-montserrat text-sm">Goiânia, Goiás</span>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div 
                className="rounded-[8px] overflow-hidden shadow-hover"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop"
                  alt="Imóvel premium"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10" style={{ backgroundColor: "#1B365D" }}>
        <div ref={statsRef} className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-montserrat font-bold text-3xl md:text-4xl mb-1" style={{ color: "#F6931E" }}>
                  {stat.value}
                </div>
                <div className="font-montserrat text-sm" style={{ color: "#FFFFFF", opacity: 0.8 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-[60px]" style={{ backgroundColor: "#FFFFFF" }}>
        <div ref={servicesRef} className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`font-montserrat font-bold text-3xl md:text-[28px] mb-4 transition-all duration-700 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#1B365D" }}>
              Nossos Serviços
            </h2>
            <p className={`font-montserrat text-base max-w-2xl mx-auto transition-all duration-700 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#666666" }}>
              Oferecemos uma gama completa de serviços imobiliários para atender todas as suas necessidades.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group p-6 rounded-[8px] border transition-all duration-500 hover:shadow-lg cursor-pointer ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ 
                  borderColor: "#E5E7EB",
                  transitionDelay: `${300 + i * 100}ms`
                }}
              >
                <div 
                  className="w-14 h-14 rounded-[8px] flex items-center justify-center mb-5 transition-colors group-hover:text-white"
                  style={{ backgroundColor: "#F4F7F6" }}
                >
                  <service.icon size={24} className="transition-colors" style={{ color: "#1B365D" }} />
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2" style={{ color: "#1B365D" }}>
                  {service.title}
                </h3>
                <p className="font-montserrat text-sm leading-relaxed" style={{ color: "#666666" }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="imoveis" className="py-16 md:py-[60px]" style={{ backgroundColor: "#F4F7F6" }}>
        <div ref={propsRef} className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`font-montserrat font-bold text-3xl md:text-[28px] mb-4 transition-all duration-700 ${propsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#1B365D" }}>
              Imóveis em Destaque
            </h2>
            <p className={`font-montserrat text-base max-w-2xl mx-auto transition-all duration-700 ${propsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#666666" }}>
              Confira algumas das melhores opções disponíveis no mercado goiano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <div
                key={property.id}
                className={`group bg-white rounded-[8px] overflow-hidden transition-all duration-500 hover:shadow-lg ${propsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transitionDelay: `${300 + i * 100}ms`
                }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <span 
                    className="absolute top-3 left-3 px-3 py-1 rounded-[5px] font-montserrat text-xs font-bold text-white"
                    style={{ backgroundColor: property.type === "venda" ? "#1B365D" : "#00A8E1" }}
                  >
                    {property.type === "venda" ? "VENDA" : "ALUGUEL"}
                  </span>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-all hover:scale-110"
                    >
                      <Heart 
                        size={16} 
                        className={favorites.includes(property.id) ? "fill-red-500" : ""}
                        style={{ color: favorites.includes(property.id) ? "#EF4444" : "#666666" }}
                      />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-all hover:scale-110">
                      <Eye size={16} style={{ color: "#666666" }} />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-montserrat font-bold text-lg mb-1" style={{ color: "#1B365D" }}>
                    {property.title}
                  </h3>
                  <p className="font-montserrat text-sm mb-3 flex items-center gap-1" style={{ color: "#666666" }}>
                    <MapPin size={14} />
                    {property.location}
                  </p>

                  <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <div className="flex items-center gap-1" style={{ color: "#666666" }}>
                      <Bed size={16} />
                      <span className="font-montserrat text-sm">{property.features.beds}</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: "#666666" }}>
                      <Bath size={16} />
                      <span className="font-montserrat text-sm">{property.features.baths}</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: "#666666" }}>
                      <Square size={16} />
                      <span className="font-montserrat text-sm">{property.features.area}m²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-montserrat font-bold text-xl" style={{ color: "#F6931E" }}>
                      {property.price}
                    </div>
                    <button 
                      className="px-4 py-2 rounded-[5px] font-montserrat text-sm font-bold text-white transition-all hover:shadow-md"
                      style={{ backgroundColor: "#1B365D" }}
                    >
                      Ver Mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-10 transition-all duration-700 ${propsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "700ms" }}>
            <a
              href="https://www.alfacenter.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[5px] font-montserrat font-bold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: "#F6931E" }}
            >
              Ver Todos os Imóveis
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-16 md:py-[60px]" style={{ backgroundColor: "#FFFFFF" }}>
        <div ref={diffRef} className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`font-montserrat font-bold text-3xl md:text-[28px] mb-4 transition-all duration-700 ${diffVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#1B365D" }}>
                Por que escolher
                <br />
                <span style={{ color: "#F6931E" }}>a Alfa Center?</span>
              </h2>
              <p className={`font-montserrat text-base mb-8 leading-relaxed transition-all duration-700 ${diffVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#333333" }}>
                Nossa missão é proporcionar a melhor experiência no mercado imobiliário goiano, 
                com atendimento personalizado e resultados que superam expectativas.
              </p>

              <div className="space-y-5">
                {differentials.map((diff, i) => (
                  <div
                    key={diff.title}
                    className={`flex gap-4 transition-all duration-700 ${diffVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                  >
                    <div 
                      className="w-12 h-12 rounded-[8px] flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#F4F7F6" }}
                    >
                      <diff.icon size={22} style={{ color: "#1B365D" }} />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-base mb-1" style={{ color: "#1B365D" }}>
                        {diff.title}
                      </h3>
                      <p className="font-montserrat text-sm" style={{ color: "#666666" }}>
                        {diff.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${diffVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div 
                className="rounded-[8px] p-8"
                style={{ 
                  backgroundColor: "#F4F7F6",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)" 
                }}
              >
                <div className="text-center mb-6">
                  <div 
                    className="w-16 h-16 rounded-[8px] flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#1B365D" }}
                  >
                    <Building2 size={32} className="text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-2xl mb-1" style={{ color: "#1B365D" }}>
                    Alfa Center
                  </h3>
                  <p className="font-montserrat text-sm" style={{ color: "#666666" }}>
                    Sua imobiliária em Goiânia
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-[8px]">
                    <MapPin size={18} style={{ color: "#F6931E" }} />
                    <div>
                      <p className="font-montserrat text-sm font-semibold" style={{ color: "#333333" }}>
                        R. 134, 50 - St. Sul
                      </p>
                      <p className="font-montserrat text-xs" style={{ color: "#666666" }}>
                        Goiânia - GO, 74080-015
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-[8px]">
                    <Phone size={18} style={{ color: "#F6931E" }} />
                    <div>
                      <p className="font-montserrat text-sm font-semibold" style={{ color: "#333333" }}>
                        (62) 3236-6111
                      </p>
                      <p className="font-montserrat text-xs" style={{ color: "#666666" }}>
                        Seg-Sex: 08h às 18h | Sáb: 08h às 12h
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/556232366111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-[5px] font-montserrat font-bold text-white text-center transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#25D366" }}
                >
                  Chamar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-[60px] relative overflow-hidden" style={{ backgroundColor: "#1B365D" }}>
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
            style={{ backgroundColor: "#F6931E" }}
          />
        </div>

        <div ref={ctaRef} className="relative max-w-[1200px] mx-auto px-4 text-center">
          <h2 className={`font-montserrat font-bold text-3xl md:text-[28px] mb-4 text-white transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Encontre o imóvel dos seus sonhos
          </h2>
          <p className={`font-montserrat text-base max-w-xl mx-auto mb-8 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ color: "#FFFFFF", opacity: 0.8 }}>
            Agende uma visita ou converse com nossos especialistas. 
            Estamos prontos para ajudar você.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
            <a
              href="https://www.alfacenter.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[5px] font-montserrat font-bold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: "#F6931E" }}
            >
              Acessar Site Completo
              <ArrowRight size={18} />
            </a>
            <a
              href="tel:+556232366111"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[5px] font-montserrat font-bold border-2 transition-all hover:bg-white/10"
              style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
            >
              <Phone size={18} />
              Ligar Agora
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#0F2137" }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={alfaLogo} 
                alt="Alfa Center Imóveis" 
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="font-montserrat text-sm" style={{ color: "#FFFFFF", opacity: 0.6 }}>
              © {new Date().getFullYear()} Alfa Center Imóveis. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="font-montserrat text-sm hover:underline" style={{ color: "#FFFFFF", opacity: 0.6 }}>
                Privacidade
              </a>
              <a href="#" className="font-montserrat text-sm hover:underline" style={{ color: "#FFFFFF", opacity: 0.6 }}>
                Termos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AlfaCenterSection;
