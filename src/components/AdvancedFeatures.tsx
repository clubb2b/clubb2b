
import { Button } from "@/components/ui/button";
import { Shield, FileText, Calculator, Truck } from "lucide-react";

const AdvancedFeatures = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance & Protection",
      description: "Comprehensive coverage for your vehicle during transport",
      action: "Get Quote"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Documentation Services",
      description: "Complete paperwork handling for international shipping",
      action: "Learn More"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Price Calculator",
      description: "Get instant shipping estimates for your destination",
      action: "Calculate"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Tracking System",
      description: "Real-time updates on your vehicle's journey",
      action: "Track Now"
    }
  ];

  const handleFeatureAction = (title: string) => {
    const message = `I'm interested in ${title}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            Advanced Services
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Professional solutions for your automotive needs
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center hover:border-white transition-all duration-300 group">
              <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-light text-white mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-300 font-light mb-6 leading-relaxed">
                {feature.description}
              </p>
              <Button 
                onClick={() => handleFeatureAction(feature.title)}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 py-2 font-light tracking-wider transition-all duration-300"
              >
                {feature.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;
