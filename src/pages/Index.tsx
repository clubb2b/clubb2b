
import Hero from "@/components/Hero";
import LuxuryInventory from "@/components/LuxuryInventory";
import Services from "@/components/Services";
import ImportExportServices from "@/components/ImportExportServices";
import MaritimeServices from "@/components/MaritimeServices";
import AirFreightServices from "@/components/AirFreightServices";
import VIPServices from "@/components/VIPServices";
import LuxuryShowroom from "@/components/LuxuryShowroom";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";
import AIChatbot from "@/components/AIChatbot";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import ExportTimeline from "@/components/ExportTimeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <LanguageSelector />
      <AIChatbot />
      <Hero />
      <LuxuryInventory />
      <AdvancedFeatures />
      <ImportExportServices />
      <ExportTimeline />
      <MaritimeServices />
      <AirFreightServices />
      <VIPServices />
      <LuxuryShowroom />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
