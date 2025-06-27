
const Services = () => {
  const services = [
    {
      icon: "🌍",
      title: "IMPORT LUXURY CARS GLOBALLY",
      description: "Access to premium vehicles from international markets with full import handling and documentation."
    },
    {
      icon: "🏆",
      title: "SELL HIGH-QUALITY LOCAL CARS",
      description: "Premium local inventory with verified quality and performance guarantees for discerning buyers."
    },
    {
      icon: "💎",
      title: "VIP DEALER CLUB & BUYER ACCESS",
      description: "Exclusive membership program providing priority access to rare vehicles and dealer networks."
    },
    {
      icon: "🚗",
      title: "LUXURY CAR RENTALS",
      description: "Premium rental services across Canada and Africa for business and luxury experiences."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            WHAT WE DO
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-yellow-500 font-bold text-lg mb-4 text-center leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
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
