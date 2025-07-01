
import BrandLogo from "./BrandLogo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LuxuryShowroom = () => {
  const [showroom360View, setShowroom360View] = useState(false);
  
  const rangeRoverImages = [
    "/lovable-uploads/fff53762-3684-45b6-9d76-33e606d6d578.png",
    "/lovable-uploads/65e689ae-1df4-49a9-a317-bb8251b3da02.png",
    "/lovable-uploads/a6a7948c-8536-4a96-a73c-31af4cc2938e.png",
    "/lovable-uploads/c00631e6-b2ff-4eb2-80a0-4ef009b23f74.png",
    "/lovable-uploads/ce65b3ce-1420-4e71-b62d-a69b21f316fb.png",
    "/lovable-uploads/a48ed54a-5f9b-401c-8e99-133d3def0999.png",
    "/lovable-uploads/0c3939cf-05d7-4a24-8e56-aa046293559e.png",
    "/lovable-uploads/9f32dd48-49ea-45e1-98cd-93c533d8ea6f.png",
    "/lovable-uploads/a5527b0b-0a3d-4db2-a234-bf367c715a14.png"
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
