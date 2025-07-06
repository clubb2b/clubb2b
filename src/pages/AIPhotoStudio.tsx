import AIPhotoStudio from "@/components/AIPhotoStudio";
import LanguageSelector from "@/components/LanguageSelector";
import AuthButton from "@/components/AuthButton";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import carShowPromo from "@/assets/car-show-promo.jpg";

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
      
      {/* Car Show Promotion Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
              LUXURY CAR SHOW 2025
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Showcase your vehicles with professional AI-enhanced photography
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-light text-white">
                CLUB B2B PERFORMANCE PRESENTS
              </h3>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg">
                <h4 className="text-2xl font-bold text-white mb-4">
                  📸 AI PHOTOGRAPHY SHOWCASE
                </h4>
                <div className="space-y-3 text-white">
                  <p className="flex items-center">
                    <span className="mr-3">🏆</span>
                    Professional background removal for pristine shots
                  </p>
                  <p className="flex items-center">
                    <span className="mr-3">✨</span>
                    AI-enhanced lighting and color correction
                  </p>
                  <p className="flex items-center">
                    <span className="mr-3">📱</span>
                    Optimized for social media and web galleries
                  </p>
                  <p className="flex items-center">
                    <span className="mr-3">🎯</span>
                    Increase sales potential by 300%
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700">
                <img 
                  src={carShowPromo}
                  alt="Luxury Car Show 2025 - AI Photography Showcase"
                  className="w-full h-auto rounded-lg mb-4"
                />
                <div className="text-center">
                  <h4 className="text-white font-semibold mb-2">LUXURY CAR SHOW 2025</h4>
                  <p className="text-gray-400 text-sm">AI-Enhanced Photography Showcase</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h4 className="text-white font-semibold mb-2">ONGOING SERVICE</h4>
                <p className="text-gray-300">Available 24/7 for all your photography needs</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h4 className="text-white font-semibold mb-2">GLOBAL REACH</h4>
                <p className="text-gray-300">Serving luxury car dealers worldwide</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="text-white font-semibold mb-2">PREMIUM QUALITY</h4>
                <p className="text-gray-300">Studio-grade results with AI precision</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-white mb-4">
                🚗 TRANSFORM YOUR VEHICLE PHOTOS TODAY
              </h3>
              <p className="text-xl text-white mb-6">
                Join thousands of dealers using AI photography to boost sales
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  START FREE TRIAL
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                  VIEW GALLERY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default AIPhotoStudioPage;