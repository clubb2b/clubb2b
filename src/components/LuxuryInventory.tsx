
import { Button } from "@/components/ui/button";

const LuxuryInventory = () => {
  const vehicles = [
    {
      image: "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png",
      name: "2024 Cadillac Escalade",
      features: ["8 Pieces of luggage", "Up to 6 passengers", "Black interior"]
    },
    {
      image: "/lovable-uploads/fe0d3397-d164-45b0-a302-c07afb31b3c1.png",
      name: "2024 Mercedes-AMG GLE 53",
      features: ["AMG Performance", "Red & Black Interior", "Premium Sound System"]
    },
    {
      image: "/lovable-uploads/c20aeb80-5c8c-4f37-9bb9-0f7583e27158.png",
      name: "2024 Mercedes-AMG S580",
      features: ["Executive Luxury", "Massaging Seats", "Advanced Driver Assistance"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            Premium Collection
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Exquisite automobiles curated for discerning clients
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                
                <Button className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300">
                  INQUIRE
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
            
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300">
              REQUEST CONSULTATION
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
              <img 
                src="/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png"
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
