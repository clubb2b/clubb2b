import { Button } from "@/components/ui/button";
const About = () => {
  const handleWhatsApp = () => {
    const message = "I'd like to learn more about CLUB B2B PERFORMANCE services.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  return <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl mb-8 text-white tracking-wider font-semibold md:text-xl">
              Excellence
              <br />
              Redefined
            </h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
              CLUB B2B PERFORMANCE represents the pinnacle of luxury automotive services, 
              connecting discerning clients with exceptional vehicles worldwide.
            </p>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
              Our expertise spans premium vehicle sourcing, international export logistics, 
              and comprehensive automotive solutions tailored for the most demanding clientele.
            </p>
            <Button onClick={handleWhatsApp} className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-light tracking-wider transition-all duration-300">
              DISCOVER MORE
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
              <img src="/lovable-uploads/a48ed54a-5f9b-401c-8e99-133d3def0999.png" alt="Luxury automotive showroom" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;