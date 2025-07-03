import ModernTechFeatures from "@/components/ModernTechFeatures";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const TechFeatures = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20">
        <ModernTechFeatures />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default TechFeatures;