
import { Button } from "@/components/ui/button";

const LuxuryInventory = () => {
  const vehicles = [
    {
      image: "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png",
      name: "2024 Cadillac Escalade",
      price: "$125,000 CAD",
      features: ["8 Pieces of luggage", "Up to 6 passengers", "Black interior"]
    },
    {
      image: "/lovable-uploads/cf0a5fd5-f1f6-41aa-bbd2-ae3e8b45e312.png",
      name: "2023 Range Rover Sport",
      price: "$95,000 CAD", 
      features: ["Premium leather", "Panoramic roof", "Advanced tech"]
    },
    {
      image: "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png",
      name: "2024 BMW X7",
      price: "$110,000 CAD",
      features: ["Executive package", "Massage seats", "Premium sound"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-yellow-400 tracking-wider">
            Buy Luxury. Drive Prestige.
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto"></div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {vehicles.map((vehicle, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-900 to-black border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all duration-500 group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-light text-white mb-2 tracking-wide">
                  {vehicle.name}
                </h3>
                <p className="text-yellow-400 font-light text-lg mb-4">
                  {vehicle.price}
                </p>
                
                <div className="space-y-2 mb-6">
                  {vehicle.features.map((feature, i) => (
                    <p key={i} className="text-gray-400 text-sm font-light">
                      • {feature}
                    </p>
                  ))}
                </div>
                
                <Button className="w-full bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-light tracking-wider transition-all duration-300">
                  INQUIRE NOW
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Import Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-light mb-6 text-yellow-400 tracking-wider">
              Import Anything.
              <br />
              Anywhere.
            </h3>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
              Cars, electronics, furniture, and more.
            </p>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
              CLUB B2B handles global logistics with legal precision from Canada to Africa.
            </p>
            
            <Button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300">
              REQUEST A CUSTOM QUOTE
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/cf0a5fd5-f1f6-41aa-bbd2-ae3e8b45e312.png"
                alt="Luxury car import"
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
