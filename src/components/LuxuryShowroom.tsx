
import BrandLogo from "./BrandLogo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LuxuryShowroom = () => {
  const [showroom360View, setShowroom360View] = useState(false);
  
  const rangeRoverImages = [
    "/lovable-uploads/c7257e02-0bee-428c-96ed-aa62be0331a3.png",
    "/lovable-uploads/527d7368-7510-4039-a647-850a6054e780.png",
    "/lovable-uploads/e15c69f6-6d3b-4aa1-b7f2-85292123b295.png",
    "/lovable-uploads/1a0d54fe-3d0e-4693-b7dc-73554ed8c7a4.png",
    "/lovable-uploads/32031a20-8ac8-43d6-b351-5d654dad669e.png",
    "/lovable-uploads/554fc9ef-9529-4d80-963b-67be431b3bf2.png",
    "/lovable-uploads/747124d4-2310-4462-8d1b-fb1c45d466ed.png",
    "/lovable-uploads/74a5c922-b528-464a-b9db-da0f3ea7d193.png",
    "/lovable-uploads/4af3716b-3bd1-4e07-b6f3-95344e4311f2.png",
    "/lovable-uploads/212d5dcf-479c-4ff6-880b-322353e5f148.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % rangeRoverImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + rangeRoverImages.length) % rangeRoverImages.length);
  };

  const handleViewShowroom = () => {
    const message = "I would like to schedule a viewing of the luxury showroom. Please contact me with available times.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            LUXURY SHOWROOM
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
        </div>

        <div className="relative">
          <div className="aspect-[16/9] rounded-lg overflow-hidden border border-gray-700 relative">
            <img 
              src={rangeRoverImages[currentImageIndex]}
              alt="2025 Range Rover luxury showroom"
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              →
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {rangeRoverImages.length}
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-light text-white mb-4 tracking-wide">
                  2025 Range Rover Collection
                </h3>
                <p className="text-gray-300 text-lg font-light max-w-2xl mx-auto mb-6">
                  Experience the pinnacle of luxury automotive engineering in our exclusive showroom
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleViewShowroom}
                    className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-light tracking-wider transition-all duration-300"
                  >
                    SCHEDULE VIEWING
                  </Button>
                  <Button 
                    onClick={() => setShowroom360View(!showroom360View)}
                    className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300"
                  >
                    {showroom360View ? 'EXIT' : '360° VIEW'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 360 View Modal */}
          {showroom360View && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
              <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4">
                <button
                  onClick={() => setShowroom360View(false)}
                  className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded z-10"
                >
                  Close
                </button>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <img 
                      src={rangeRoverImages[currentImageIndex]}
                      alt="360 view"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      <button
                        onClick={prevImage}
                        className="bg-white text-black px-4 py-2 rounded"
                      >
                        ← Previous
                      </button>
                      <span className="bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                        {currentImageIndex + 1} / {rangeRoverImages.length}
                      </span>
                      <button
                        onClick={nextImage}
                        className="bg-white text-black px-4 py-2 rounded"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowroom;
