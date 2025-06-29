
import Hero from "@/components/Hero";
import LuxuryInventory from "@/components/LuxuryInventory";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import PremiumServices from "@/components/PremiumServices";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      <LuxuryInventory />
      <Services />
      <About />
      <Testimonials />
      <PremiumServices />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
