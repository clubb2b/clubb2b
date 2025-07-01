
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CarsForSale = () => {
  const carsForSale = [
    {
      images: ["/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png"],
      name: "2024 Cadillac Escalade",
      features: ["8 Pieces of luggage", "Up to 6 passengers", "Black interior"],
      status: "Available",
      location: "Canada"
    },
    {
      images: ["/lovable-uploads/e31fe280-a6c2-40c4-96cb-3d9f0d9032f8.png"],
      name: "2024 McLaren 720S",
      features: ["Twin-Turbo V8", "Butterfly Doors", "Carbon Fiber Monocoque"],
      status: "Available",
      location: "Canada"
    },
    {
      images: ["/lovable-uploads/fe0d3397-d164-45b0-a302-c07afb31b3c1.png"],
      name: "2024 Mercedes-AMG GLE 53",
      features: ["AMG Performance", "Red & Black Interior", "Premium Sound System"],
      status: "Available",
      location: "Canada"
    },
    {
      images: ["/lovable-uploads/c20aeb80-5c8c-4f37-9bb9-0f7583e27158.png"],
      name: "2024 Mercedes-AMG S580",
      features: ["Executive Luxury", "Massaging Seats", "Advanced Driver Assistance"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/fff53762-3684-45b6-9d76-33e606d6d578.png",
        "/lovable-uploads/65e689ae-1df4-49a9-a317-bb8251b3da02.png",
        "/lovable-uploads/a6a7948c-8536-4a96-a73c-31af4cc2938e.png",
        "/lovable-uploads/c00631e6-b2ff-4eb2-80a0-4ef009b23f74.png",
        "/lovable-uploads/ce65b3ce-1420-4e71-b62d-a69b21f316fb.png",
        "/lovable-uploads/a48ed54a-5f9b-401c-8e99-133d3def0999.png",
        "/lovable-uploads/0c3939cf-05d7-4a24-8e56-aa046293559e.png",
        "/lovable-uploads/9f32dd48-49ea-45e1-98cd-93c533d8ea6f.png",
        "/lovable-uploads/a5527b0b-0a3d-4db2-a234-bf367c715a14.png"
      ],
      name: "2025 Range Rover",
      features: ["Luxury Interior", "Advanced Technology", "Premium Performance"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/65e689ae-1df4-49a9-a317-bb8251b3da02.png",
        "/lovable-uploads/a6a7948c-8536-4a96-a73c-31af4cc2938e.png",
        "/lovable-uploads/c00631e6-b2ff-4eb2-80a0-4ef009b23f74.png",
        "/lovable-uploads/ce65b3ce-1420-4e71-b62d-a69b21f316fb.png",
        "/lovable-uploads/a48ed54a-5f9b-401c-8e99-133d3def0999.png",
        "/lovable-uploads/0c3939cf-05d7-4a24-8e56-aa046293559e.png",
        "/lovable-uploads/9f32dd48-49ea-45e1-98cd-93c533d8ea6f.png",
        "/lovable-uploads/a5527b0b-0a3d-4db2-a234-bf367c715a14.png"
      ],
      name: "2024 Audi RS Q8 TFSI Quattro",
      features: ["Twin-Turbo V8", "Quattro AWD", "Sport Interior", "Premium Technology"],
      status: "Available",
      location: "Canada"
    }
  ];

  const [currentImageIndices, setCurrentImageIndices] = useState(
    carsForSale.map(() => 0)
  );

  const nextImage = (carIndex: number) => {
    setCurrentImageIndices(prev => {
      const newIndices = [...prev];
      newIndices[carIndex] = (newIndices[carIndex] + 1) % carsForSale[carIndex].images.length;
      return newIndices;
    });
  };

  const prevImage = (carIndex: number) => {
    setCurrentImageIndices(prev => {
      const newIndices = [...prev];
      newIndices[carIndex] = (newIndices[carIndex] - 1 + carsForSale[carIndex].images.length) % carsForSale[carIndex].images.length;
      return newIndices;
    });
  };

  const handleInquiry = (carName: string) => {
    const message = `I'm interested in the ${carName}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePurchase = (carName: string) => {
    const message = `I would like to purchase the ${carName}. Please contact me with purchase details.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-white tracking-wider">
              CARS FOR SALE
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 font-light">
              Premium vehicles available for immediate purchase
            </p>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsForSale.map((car, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl hover:border-white transition-all duration-500 group">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={car.images[currentImageIndices[index]]} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(index)}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => nextImage(index)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                      >
                        →
                      </button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {currentImageIndices[index] + 1} / {car.images.length}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-light text-white tracking-wide">
                      {car.name}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 bg-white text-black text-sm font-light rounded">
                      {car.status}
                    </span>
                    <span className="text-gray-300 text-sm">
                      📍 {car.location}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    {car.features.map((feature, i) => (
                      <p key={i} className="text-gray-300 font-light text-sm">
                        • {feature}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      onClick={() => handlePurchase(car.name)}
                      className="flex-1 bg-white text-black hover:bg-gray-200 font-light tracking-wider transition-all duration-300"
                    >
                      PURCHASE
                    </Button>
                    <Button 
                      onClick={() => handleInquiry(car.name)}
                      className="flex-1 bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300"
                    >
                      INQUIRE
                    </Button>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                      WhatsApp: +1 518-507-7243
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsForSale;
