
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Vehicle {
  images: string[];
  name: string;
  features: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard = ({ vehicle, index }: VehicleCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const handleInquiry = (vehicleName: string) => {
    const message = `I'm interested in the ${vehicleName}. Please provide more details and availability.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl hover:border-white transition-all duration-500 group">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={vehicle.images[currentImageIndex]} 
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {vehicle.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
            >
              →
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {currentImageIndex + 1} / {vehicle.images.length}
            </div>
          </>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-light text-white mb-4 tracking-wide text-center">
          {vehicle.name}
        </h3>
        
        <div className="space-y-2 mb-6">
          {vehicle.features.map((feature, i) => (
            <p key={i} className="text-gray-300 text-center font-light text-sm">
              • {feature}
            </p>
          ))}
        </div>
        
        <Button 
          onClick={() => handleInquiry(vehicle.name)}
          className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300"
        >
          INQUIRE NOW
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
