
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CarsForSale = () => {
  const carsForSale = [
    {
      image: "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png",
      name: "2024 Cadillac Escalade",
      price: "$95,000",
      features: ["8 Pieces of luggage", "Up to 6 passengers", "Black interior"],
      status: "Available",
      location: "Canada"
    },
    {
      image: "/lovable-uploads/e31fe280-a6c2-40c4-96cb-3d9f0d9032f8.png",
      name: "2024 McLaren 720S",
      price: "$320,000",
      features: ["Twin-Turbo V8", "Butterfly Doors", "Carbon Fiber Monocoque"],
      status: "Available",
      location: "Canada"
    },
    {
      image: "/lovable-uploads/fe0d3397-d164-45b0-a302-c07afb31b3c1.png",
      name: "2024 Mercedes-AMG GLE 53",
      price: "$85,000",
      features: ["AMG Performance", "Red & Black Interior", "Premium Sound System"],
      status: "Available",
      location: "Canada"
    },
    {
      image: "/lovable-uploads/c20aeb80-5c8c-4f37-9bb9-0f7583e27158.png",
      name: "2024 Mercedes-AMG S580",
      price: "$130,000",
      features: ["Executive Luxury", "Massaging Seats", "Advanced Driver Assistance"],
      status: "Available",
      location: "Canada"
    }
  ];

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
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
            {carsForSale.map((car, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl hover:border-white transition-all duration-500 group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-light text-white tracking-wide">
                      {car.name}
                    </h3>
                    <span className="text-2xl font-light text-white">
                      {car.price}
                    </span>
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
                    <Button className="flex-1 bg-white text-black hover:bg-gray-200 font-light tracking-wider transition-all duration-300">
                      PURCHASE
                    </Button>
                    <Button className="flex-1 bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300">
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
