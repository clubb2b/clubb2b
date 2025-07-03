
import Hero from "@/components/Hero";
import LuxuryInventory from "@/components/LuxuryInventory";
import Services from "@/components/Services";
import ImportExportServices from "@/components/ImportExportServices";
import CombinedFreightServices from "@/components/CombinedFreightServices";
import VIPServices from "@/components/VIPServices";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <LanguageSelector />
      <AIChatbot />
      <StickyNavigation />
      <Hero />
      <LuxuryInventory />
      <AdvancedFeatures />
      <ImportExportServices />
      <ExportTimeline />
      <CombinedFreightServices />
      <ModernTechFeatures />
      <VIPServices />
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
