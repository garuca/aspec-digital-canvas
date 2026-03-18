import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CultureSection from "@/components/CultureSection";
import TechSection from "@/components/TechSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ServicesSection />
      <CultureSection />
      <TechSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
