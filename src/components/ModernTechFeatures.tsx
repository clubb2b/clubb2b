
import { Button } from "@/components/ui/button";
import { Smartphone, Monitor, Zap, Shield, Globe, Bot, Eye, Cpu, Wifi, Camera, QrCode, Headphones } from "lucide-react";

const ModernTechFeatures = () => {
  const primaryTechFeatures = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Smart vehicle recommendations using machine learning algorithms and customer preference analysis"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Computer Vision Inspection",
      description: "Automated damage detection and quality assessment using advanced image recognition technology"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Predictive Analytics",
      description: "Market trend analysis and price forecasting powered by big data and neural networks"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Verification",
      description: "Immutable vehicle history and ownership records secured by distributed ledger technology"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "IoT Tracking Network",
      description: "Real-time GPS tracking and telemetry data from connected sensors throughout the supply chain"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Virtual Reality Showroom",
      description: "Immersive 360° virtual tours and augmented reality vehicle previews with haptic feedback"
    }
  ];

  const additionalTechFeatures = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Progressive Web App",
      description: "Mobile-first experience with offline capabilities and push notifications"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "5G Edge Computing",
      description: "Ultra-low latency processing for real-time vehicle diagnostics and streaming"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Drone Inspection",
      description: "Autonomous aerial photography and 3D mapping for comprehensive vehicle documentation"
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "Smart Contracts",
      description: "Automated payment processing and escrow services using blockchain technology"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Voice AI Assistant",
      description: "Natural language processing for hands-free vehicle search and customer support"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quantum Encryption",
      description: "Military-grade security for all transactions and customer data protection"
    }
  ];

  const handleTechDemo = () => {
    const message = "I'm interested in seeing a demo of your advanced technology features. Please provide more information.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            NEXT-GENERATION TECHNOLOGY
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
            Revolutionary technology stack powered by AI, blockchain, IoT, and quantum computing to transform luxury vehicle trading
          </p>
        </div>

        {/* Primary Technology Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {primaryTechFeatures.map((feature, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center hover:border-white transition-all duration-300 group hover:scale-105">
              <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-light text-white mb-4 tracking-wide">{feature.title}</h3>
              <p className="text-gray-300 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Technology Features */}
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-light text-white mb-8 text-center tracking-wide">
            Advanced Technology Stack
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalTechFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-4xl font-light text-white mb-2">99.9%</div>
            <div className="text-gray-400 text-sm">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-white mb-2">&lt;50ms</div>
            <div className="text-gray-400 text-sm">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-white mb-2">256-bit</div>
            <div className="text-gray-400 text-sm">Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-white mb-2">24/7</div>
            <div className="text-gray-400 text-sm">AI Monitoring</div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={handleTechDemo}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 px-12 py-4 text-lg font-light tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
          >
            EXPERIENCE THE FUTURE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernTechFeatures;
