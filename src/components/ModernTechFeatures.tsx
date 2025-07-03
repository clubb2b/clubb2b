
import { Button } from "@/components/ui/button";
import { Smartphone, Monitor, Zap, Shield, Globe, Bot } from "lucide-react";

const ModernTechFeatures = () => {
  const techFeatures = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Smart vehicle recommendations based on your preferences and requirements"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile-First Experience",
      description: "Seamless browsing and purchasing from any device, anywhere in the world"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Updates",
      description: "Live inventory tracking, shipping updates, and instant notifications"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Verification",
      description: "Secure vehicle history and authenticity verification using blockchain technology"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connected worldwide network for instant quotes and shipping coordination"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Virtual Showroom",
      description: "360° virtual tours and augmented reality vehicle previews"
    }
  ];

  const handleTechDemo = () => {
    const message = "I'm interested in seeing a demo of your technology features. Please provide more information.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            CUTTING-EDGE TECHNOLOGY
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
            Leveraging the latest technology to revolutionize luxury vehicle trading and global logistics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {techFeatures.map((feature, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center hover:border-white transition-all duration-300 group hover:scale-105">
              <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="text-black">
                    {feature.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-light text-white mb-4 tracking-wide">{feature.title}</h3>
              <p className="text-gray-300 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleTechDemo}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg font-light tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
          >
            EXPERIENCE THE TECHNOLOGY
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernTechFeatures;
