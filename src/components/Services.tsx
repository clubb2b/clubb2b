
const Services = () => {
  const services = [
    {
      icon: "🌍",
      title: "GLOBAL EXPORT SERVICES",
      description: "Comprehensive international vehicle export with complete documentation and logistics management for worldwide delivery."
    },
    {
      icon: "🏆", 
      title: "PREMIUM VEHICLE SOURCING",
      description: "Curated selection of luxury and performance vehicles with verified provenance and quality assurance."
    },
    {
      icon: "💎",
      title: "CONCIERGE SERVICES",
      description: "White-glove client service including inspection, preparation, and personalized consultation throughout the process."
    },
    {
      icon: "📋",
      title: "COMPLIANCE & DOCUMENTATION",
      description: "Complete handling of all legal requirements, customs documentation, and regulatory compliance for international sales."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-800 tracking-wider">
            OUR SERVICES
          </h2>
          <p className="text-xl text-gray-600 font-light mb-8">
            Comprehensive solutions for luxury vehicle export
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-6 text-center">{service.icon}</div>
              <h3 className="text-gray-800 font-light text-lg mb-4 text-center leading-tight tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed font-light">
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
