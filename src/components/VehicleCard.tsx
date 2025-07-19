import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { MapPin, Calendar, Gauge, Fuel, Settings, Palette, Video } from "lucide-react";
import { VideoPlayer } from "@/components/ui/video-player";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface VehicleImage {
  id: string;
  image_url: string;
  caption: string | null;
  is_primary: boolean | null;
  display_order: number | null;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price?: number | null;
  condition?: string | null;
  transmission?: string | null;
  fuel_type?: string | null;
  exterior_color?: string | null;
  interior_color?: string | null;
  mileage?: number | null;
  description?: string | null;
  features?: string[] | null;
  status?: string | null;
  location?: string | null;
  currency?: string | null;
  videoUrl?: string | null;
  images?: VehicleImage[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fallback images if no images in database
  const fallbackImages = [
    "/lovable-uploads/32031a20-8ac8-43d6-b351-5d654dad669e.png",
    "/lovable-uploads/326ea060-ebc3-4094-94e1-3ba6182a6a85.png",
    "/lovable-uploads/e531db70-bf69-4ea7-89cd-ba92c7de4b79.png"
  ];

  const images = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images.map(img => img.image_url)
    : fallbackImages;

  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleInquiry = (vehicleName: string) => {
    const message = `I'm interested in the ${vehicleName}. Please provide more details and availability.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (price: number | null, currency: string | null = 'USD') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number | null) => {
    if (!mileage) return null;
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl hover:border-white transition-all duration-500 group">
      <div className="aspect-[4/3] overflow-hidden relative">
        {vehicle.videoUrl ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer relative">
                <img 
                  src={images[currentImageIndex]} 
                  alt={vehicleName}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Video size={48} className="text-white" />
                  <span className="ml-2 text-white font-medium">Watch Video</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-1 bg-black border-gray-800">
              <VideoPlayer src={vehicle.videoUrl} title={vehicleName} />
            </DialogContent>
          </Dialog>
        ) : (
          <img 
            src={images[currentImageIndex]} 
            alt={vehicleName}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
          />
        )}
        
        {images.length > 1 && (
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
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Condition Badge */}
        {vehicle.condition && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            {vehicle.condition.charAt(0).toUpperCase() + vehicle.condition.slice(1)}
          </Badge>
        )}


        {/* Price Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formatPrice(vehicle.price, vehicle.currency)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-light text-white mb-2 tracking-wide text-center">
          {vehicleName}
        </h3>

        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-300">
          {vehicle.mileage && (
            <div className="flex items-center gap-1">
              <Gauge className="w-3 h-3" />
              <span>{formatMileage(vehicle.mileage)} miles</span>
            </div>
          )}
          
          {vehicle.fuel_type && (
            <div className="flex items-center gap-1">
              <Fuel className="w-3 h-3" />
              <span>{vehicle.fuel_type}</span>
            </div>
          )}
          
          {vehicle.transmission && (
            <div className="flex items-center gap-1">
              <Settings className="w-3 h-3" />
              <span>{vehicle.transmission}</span>
            </div>
          )}
          
          {vehicle.exterior_color && (
            <div className="flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span>{vehicle.exterior_color}</span>
            </div>
          )}
          
          {vehicle.location && (
            <div className="flex items-center gap-1 col-span-2">
              <MapPin className="w-3 h-3" />
              <span>{vehicle.location}</span>
            </div>
          )}
        </div>
        
        {/* Features */}
        {vehicle.features && vehicle.features.length > 0 && (
          <div className="space-y-2 mb-6">
            {vehicle.features.slice(0, 4).map((feature, i) => (
              <p key={i} className="text-gray-300 text-center font-light text-sm">
                • {feature}
              </p>
            ))}
            {vehicle.features.length > 4 && (
              <p className="text-gray-400 text-center text-xs">
                +{vehicle.features.length - 4} more features
              </p>
            )}
          </div>
        )}

        {/* Description */}
        {vehicle.description && (
          <p className="text-gray-400 text-sm text-center mb-4 line-clamp-2">
            {vehicle.description}
          </p>
        )}
        
        <Button 
          onClick={() => handleInquiry(vehicleName)}
          className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300"
        >
          INQUIRE NOW
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;