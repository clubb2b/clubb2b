
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LuxuryInventory = () => {
  const vehicles = [
    {
      images: ["/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png"],
      name: "2024 Cadillac Escalade",
      features: ["8 Pieces of luggage", "Up to 6 passengers", "Black interior"]
    },
    {
      images: ["/lovable-uploads/e31fe280-a6c2-40c4-96cb-3d9f0d9032f8.png"],
      name: "2024 McLaren 720S",
      features: ["Twin-Turbo V8", "Butterfly Doors", "Carbon Fiber Monocoque"]
    },
    {
      images: ["/lovable-uploads/fe0d3397-d164-45b0-a302-c07afb31b3c1.png"],
      name: "2024 Mercedes-AMG GLE 53",
      features: ["AMG Performance", "Red & Black Interior", "Premium Sound System"]
    },
    {
      images: ["/lovable-uploads/c20aeb80-5c8c-4f37-9bb9-0f7583e27158.png"],
      name: "2024 Mercedes-AMG S580",
      features: ["Executive Luxury", "Massaging Seats", "Advanced Driver Assistance"]
    },
    {
      images: [
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
      ],
      name: "2025 Range Rover",
      features: ["Luxury Interior", "Advanced Technology", "Premium Performance"]
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
      features: ["Twin-Turbo V8", "Quattro AWD", "Sport Interior", "Premium Technology"]
    }
  ];

  const [currentImageIndices, setCurrentImageIndices] = useState(
    vehicles.map(() => 0)
  );

  const nextImage = (vehicleIndex: number) => {
    setCurrentImageIndices(prev => {
      const newIndices = [...prev];
      newIndices[vehicleIndex] = (newIndices[vehicleIndex] + 1) % vehicles[vehicleIndex].images.length;
      return newIndices;
    });
  };

  const prevImage = (vehicleIndex: number) => {
    setCurrentImageIndices(prev => {
      const newIndices = [...prev];
      newIndices[vehicleIndex] = (newIndices[vehicleIndex] - 1 + vehicles[vehicleIndex].images.length) % vehicles[vehicleIndex].images.length;
      return newIndices;
    });
  };

  const handleInquiry = (vehicleName: string) => {
    const message = `I'm interested in the ${vehicleName}. Please provide more details and availability.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Cadillac images for the export section
  const cadillacImages = [
    "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png"
  ];

  const [cadillacImageIndex, setCadillacImageIndex] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            Elite Collection
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Exquisite automobiles curated for discerning clients
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl hover:border-white transition-all duration-500 group">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={vehicle.images[currentImageIndices[index]]} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={() => prevImage(index)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => nextImage(index)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      →
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      {currentImageIndices[index] + 1} / {vehicle.images.length}
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
          ))}
        </div>

        {/* Export Services Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-light mb-6 text-white tracking-wider">
              Global Export
              <br />
              Excellence
            </h3>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
              Professional vehicle export services with comprehensive logistics support.
            </p>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
              CLUB B2B PERFORMANCE ensures seamless international delivery with full documentation and legal compliance.
            </p>
            
            <Button 
              onClick={() => {
                const message = "I need a consultation for vehicle export services. Please contact me.";
                const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300"
            >
              REQUEST CONSULTATION
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
              <img 
                src={cadillacImages[cadillacImageIndex]}
                alt="Luxury vehicle export - Cadillac Escalade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryInventory;
