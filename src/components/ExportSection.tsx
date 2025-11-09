import { Button } from "@/components/ui/button";
import { useState } from "react";
const ExportSection = () => {
  const cadillacImages = ["/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png"];
  const [cadillacImageIndex, setCadillacImageIndex] = useState(0);
  const handleConsultation = () => {
    const message = "I need a consultation for vehicle export services. Please contact me.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  return <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl mb-6 text-white tracking-wider font-semibold md:text-xl">
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
        
        <Button onClick={handleConsultation} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300">
          REQUEST CONSULTATION
        </Button>
      </div>
      
      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
          <img src={cadillacImages[cadillacImageIndex]} alt="Luxury vehicle export - Cadillac Escalade" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>;
};
export default ExportSection;