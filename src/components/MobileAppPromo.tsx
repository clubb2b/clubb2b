
import { Button } from "@/components/ui/button";
import { Smartphone, Download, Apple } from "lucide-react";

const MobileAppPromo = () => {
  const handleViewFeatures = () => {
    window.location.href = '/mobile-features';
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-8">
          <Smartphone className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-light text-white mb-4">
            Download Our Mobile App
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience enhanced features with camera integration, GPS tracking, 
            push notifications, and offline capabilities.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            onClick={handleViewFeatures}
            className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-light tracking-wider"
          >
            <Smartphone className="w-5 h-5 mr-2" />
            View Mobile Features
          </Button>
          
          <Button 
            disabled
            className="bg-gray-700 text-gray-300 px-8 py-3 text-lg font-light tracking-wider cursor-not-allowed"
          >
            <Apple className="w-5 h-5 mr-2" />
            Coming Soon - iOS
          </Button>
          
          <Button 
            disabled
            className="bg-gray-700 text-gray-300 px-8 py-3 text-lg font-light tracking-wider cursor-not-allowed"
          >
            <Download className="w-5 h-5 mr-2" />
            Coming Soon - Android
          </Button>
        </div>

        <div className="text-sm text-gray-400">
          <p>Mobile app currently in development. Web version includes all core features.</p>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromo;
