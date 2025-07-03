
import Hero from "@/components/Hero";
import LuxuryInventory from "@/components/LuxuryInventory";
import Services from "@/components/Services";
import ImportExportServices from "@/components/ImportExportServices";
import CombinedFreightServices from "@/components/CombinedFreightServices";
import LuxuryShowroom from "@/components/LuxuryShowroom";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";
import AIChatbot from "@/components/AIChatbot";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import ExportTimeline from "@/components/ExportTimeline";
import BackToTop from "@/components/BackToTop";
import StickyNavigation from "@/components/StickyNavigation";
import ModernTechFeatures from "@/components/ModernTechFeatures";
import NativeFeaturesShowcase from "@/components/NativeFeaturesShowcase";
import AuthButton from "@/components/AuthButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed top-4 right-4 z-50">
        <AuthButton />
      </div>
      <LanguageSelector />
      <AIChatbot />
      <StickyNavigation />
      <Hero />
      <div className="max-w-7xl mx-auto px-6">
        <NativeFeaturesShowcase />
      </div>
      <LuxuryInventory />
      <AdvancedFeatures />
      <ImportExportServices />
      <ExportTimeline />
      <CombinedFreightServices />
      <ModernTechFeatures />
      <LuxuryShowroom />
      <Services />
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
