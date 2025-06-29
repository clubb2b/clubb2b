
import { Button } from "@/components/ui/button";

const LuxuryInventory = () => {
  const vehicles = [
    {
      image: "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png",
      name: "2024 Cadillac Escalade",
      features: ["8 Pieces of luggage", "Up to 6 passengers", "Black interior"]
    },
    {
      image: "/lovable-uploads/cf0a5fd5-f1f6-41aa-bbd2-ae3e8b45e312.png",
      name: "2023 Range Rover Sport", 
      features: ["Premium leather", "Panoramic roof", "Advanced tech"]
    },
    {
      image: "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png",
      name: "2024 BMW X7",
      features: ["Executive package", "Massage seats", "Premium sound"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-800 tracking-wider">
            Premium Collection
          </h2>
          <p className="text-xl text-gray-600 font-light mb-8">
            Exquisite automobiles curated for discerning clients
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {vehicles.map((vehicle, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-light text-gray-800 mb-4 tracking-wide">
                  {vehicle.name}
                </h3>
                
                <div className="space-y-2 mb-6">
                  {vehicle.features.map((feature, i) => (
                    <p key={i} className="text-gray-600 text-sm font-light">
                      • {feature}
                    </p>
                  ))}
                </div>
                
                <Button className="w-full bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-light tracking-wider transition-all duration-300">
                  INQUIRE
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Export Services Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-light mb-6 text-gray-800 tracking-wider">
              Global Export
              <br />
              Excellence
            </h3>
            <p className="text-gray-600 text-lg font-light leading-relaxed mb-6">
              Professional vehicle export services with comprehensive logistics support.
            </p>
            <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">
              CLUB B2B PERFORMANCE ensures seamless international delivery with full documentation and legal compliance.
            </p>
            
            <Button className="bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 font-light tracking-wider transition-all duration-300">
              REQUEST CONSULTATION
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
              <img 
                src="/lovable-uploads/cf0a5fd5-f1f6-41aa-bbd2-ae3e8b45e312.png"
                alt="Luxury vehicle export"
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
