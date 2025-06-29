
const Services = () => {
  const services = [
    {
      icon: "🌍",
      title: "GLOBAL LUXURY IMPORTS",
      description: "Exclusive access to premium vehicles from international markets with complete import handling and concierge service."
    },
    {
      icon: "🏆", 
      title: "CURATED LOCAL COLLECTION",
      description: "Hand-selected premium vehicles with verified provenance and performance guarantees for discerning collectors."
    },
    {
      icon: "💎",
      title: "VIP MEMBERSHIP CLUB",
      description: "Exclusive membership providing priority access to rare vehicles, private viewings, and luxury dealer networks."
    },
    {
      icon: "🚗",
      title: "LUXURY CONCIERGE RENTALS",
      description: "Premium rental experiences across Canada and Africa with white-glove service and bespoke arrangements."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-yellow-400 tracking-wider">
            ELITE SERVICES
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-900/50 to-black/50 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="text-4xl mb-6 text-center">{service.icon}</div>
              <h3 className="text-yellow-400 font-light text-lg mb-4 text-center leading-tight tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-300 text-center leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
