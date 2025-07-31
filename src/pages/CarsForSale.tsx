
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CarsForSale = () => {
  const carsForSale = [
    {
      images: [
        "/lovable-uploads/232a13f0-e68d-4874-806c-0c6bdf94008c.png",
        "/lovable-uploads/e49ec679-cd55-4452-8d42-6d5b23efc8f4.png",
        "/lovable-uploads/ea6e633f-31a5-4496-92ca-7fdecbb544cf.png",
        "/lovable-uploads/65fbf4f2-5a57-49e2-b01d-3cc72f439e8f.png",
        "/lovable-uploads/d0d7e2e5-0cb3-46f9-8555-da0a58f9251d.png",
        "/lovable-uploads/9bbb7d4e-26de-4d51-89b0-19f15ba4cb39.png"
      ],
      name: "2024 Cadillac Escalade",
      features: ["Premium Platinum Package", "Super Cruise Technology", "OLED Displays", "AKG Premium Audio System"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/20ea0960-3c5f-4707-b1aa-767f704c9323.png",
        "/lovable-uploads/69964ad9-ab08-4c57-821f-1701d9cf1e0b.png",
        "/lovable-uploads/dfd6f4a9-d41c-4aa7-b581-94a64d4e4e56.png",
        "/lovable-uploads/45669357-148f-4fee-a7df-a38290bef43e.png",
        "/lovable-uploads/bfb62425-608b-4dcb-ab10-22dda9a7e46c.png",
        "/lovable-uploads/397e6a08-7ff6-49ee-94e9-ec92db8e6e19.png",
        "/lovable-uploads/0ab77332-1a39-478c-be56-54324b76f289.png",
        "/lovable-uploads/fe103580-0077-4002-bfc1-2dc7b2e9427c.png",
        "/lovable-uploads/114e4aa4-ba2f-4c60-92ea-9b52891b9317.png",
        "/lovable-uploads/b93c1bfb-2ccc-43d2-93aa-91170efcdf34.png"
      ],
      name: "2023 Mercedes-Benz AMG S580",
      features: ["AMG Line Package", "MBUX Hyperscreen", "Burmester 4D Sound", "Active Body Control"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/494e1c6f-c7bb-41e8-91c2-4ebf59d5330a.png",
        "/lovable-uploads/776a2181-f2a3-48fc-a9fa-c7dd66c400ab.png",
        "/lovable-uploads/5f2c8b47-ddd3-4aa8-9318-87f508177619.png",
        "/lovable-uploads/6ac99e6c-b851-4d65-860e-71bd3d47ce19.png",
        "/lovable-uploads/e23f2138-f0c9-4889-83e0-e827e3a2efa8.png",
        "/lovable-uploads/5e783fa2-f884-4b9f-b558-16e37ba595f1.png",
        "/lovable-uploads/bd5a2209-1a4f-4bb4-aa44-bdd6da96ed04.png",
        "/lovable-uploads/c34460f2-dd43-4191-abda-680105e0ce78.png",
        "/lovable-uploads/5cb41c82-67f5-40ec-bc9f-649c565ba848.png",
        "/lovable-uploads/b35f23c3-8e80-4592-a442-34d7fe74f10f.png"
      ],
      name: "2022 Mercedes-Benz AMG GLE 53",
      features: ["AMG Panamericana Grille", "429 Horsepower", "4MATIC All-Wheel Drive", "Premium AMG Interior"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/eee3b934-1e80-4770-8a3d-7282c7402e1e.png",
        "/lovable-uploads/5840dfde-2f36-45c9-a531-27d4e0b575c8.png",
        "/lovable-uploads/f94a680c-7cda-489e-905a-9f3d0038a07a.png",
        "/lovable-uploads/e31c381f-42ea-4429-9232-686cb7ee4ea0.png",
        "/lovable-uploads/3ed236d0-fafd-4b91-aba3-b2d44d1acd32.png",
        "/lovable-uploads/8cd00401-b84a-4ad6-9faf-308c26c12b7e.png",
        "/lovable-uploads/dd92bddf-3f23-4cb8-a0a7-aaf87c9de5ad.png",
        "/lovable-uploads/b7dd8199-f926-4019-b13a-c1857aa2f953.png",
        "/lovable-uploads/0747cd8f-f291-4a38-a877-aaa9b69c4982.png"
      ],
      name: "2022 Dodge Durango GT AWD",
      features: ["5.7L HEMI V8 Engine", "All-Wheel Drive", "Uconnect 4C NAV System", "Premium Sound System"],
      status: "Available",
      location: "Canada"
    },
    {
      images: ["/lovable-uploads/559fc082-dda3-4fb2-915c-a104e6830322.png"],
      name: "2024 McLaren 720S",
      features: ["710 Horsepower", "Carbon Fiber Monocoque", "Butterfly Doors", "Track Telemetry System"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/dfef9aa3-0fc4-4c1f-b418-b63015bdbe2a.png",
        "/lovable-uploads/57907b7c-a0e8-4f8f-918a-c6729e9e0894.png",
        "/lovable-uploads/a388b99d-efa8-418d-b71d-77581b323df9.png",
        "/lovable-uploads/a151fa8d-8073-4a61-b3a9-633e5deeac7d.png",
        "/lovable-uploads/4364b345-baff-48a8-900e-462967541b24.png"
      ],
      name: "2024 Mercedes-AMG GLE 53",
      features: ["AMG Panamericana Grille", "429 Horsepower", "AMG Performance Exhaust", "21-inch AMG Wheels"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/072c049b-dc6c-45e5-a227-e7d741c35528.png",
        "/lovable-uploads/8a969a91-6f24-4565-9dcd-b0813370e586.png",
        "/lovable-uploads/4e2687f3-6659-476f-b8ca-e624a094f893.png"
      ],
      name: "2024 Mercedes-AMG S580",
      features: ["493 Horsepower", "MBUX Hyperscreen", "Burmester 4D Surround Sound", "Executive Rear Seats"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/c7257e02-0bee-428c-96ed-aa62be0331a3.png",
        "/lovable-uploads/527d7368-7510-4039-a647-850a6054e780.png",
        "/lovable-uploads/e15c69f6-6d3b-4aa1-b7f2-85292123b295.png",
        "/lovable-uploads/1a0d54fe-3d0e-4693-b7dc-73554ed8c7a4.png",
        "/lovable-uploads/32031a20-8ac8-43d6-b351-5d654dad669e.png"
      ],
      name: "2025 Range Rover Autobiography",
      features: ["518 Horsepower", "Electronic Air Suspension", "Meridian™ Signature Sound", "Hot Stone Massage"],
      status: "Available",
      location: "Canada"
    },
    {
      images: [
        "/lovable-uploads/65e689ae-1df4-49a9-a317-bb8251b3da02.png",
        "/lovable-uploads/a6a7948c-8536-4a96-a73c-31af4cc2938e.png",
        "/lovable-uploads/c00631e6-b2ff-4eb2-80a0-4ef009b23f74.png",
        "/lovable-uploads/f901eb9b-d0f8-47c2-bd92-82e39cbbb3b2.png",
        "/lovable-uploads/fb5b4401-9790-4c9b-a13e-6b7861649cdd.png",
        "/lovable-uploads/05105e45-f845-4b0c-9ecc-038198730dd6.png",
        "/lovable-uploads/9789d1ca-4816-4541-a17d-df2d08aeee74.png",
        "/lovable-uploads/b9105ab2-5cea-4296-8450-c36bd1785d39.png"
      ],
      name: "2024 Audi RS Q8 TFSI Quattro",
      features: ["591 Horsepower", "Quattro All-Wheel Drive", "Carbon Ceramic Brakes", "Bang & Olufsen 3D Sound"],
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
