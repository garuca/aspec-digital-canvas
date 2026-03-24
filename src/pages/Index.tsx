import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import ClientsSection from "@/components/ClientsSection";
import CultureSection from "@/components/CultureSection";
import PortfolioSection from "@/components/PortfolioSection";
import SchoolNavigatorSection from "@/components/SchoolNavigatorSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import ResultsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ClientsSection />
      <CultureSection />
      <PortfolioSection />
      <SchoolNavigatorSection />
      <DifferentialsSection />
      <ServicesSection />
      <TeamSection />
      <ResultsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
