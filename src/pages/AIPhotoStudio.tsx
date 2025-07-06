import AIPhotoStudio from "@/components/AIPhotoStudio";
import LanguageSelector from "@/components/LanguageSelector";
import AuthButton from "@/components/AuthButton";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

const AIPhotoStudioPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-4 right-4 z-50">
        <AuthButton />
      </div>
      <LanguageSelector />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wider">
            AI PHOTOGRAPHY STUDIO
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Professional vehicle photography enhancement for maximum sales impact
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </div>

      <AIPhotoStudio />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AIPhotoStudioPage;