import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import CatalogSection from "@/components/CatalogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <CatalogSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
