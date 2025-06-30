
const Services = () => {
  const services = [
    {
      icon: "🌍",
      title: "GLOBAL EXPORT SERVICES",
      description: "Comprehensive international vehicle export with complete documentation and logistics management for worldwide delivery.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: "🏆", 
      title: "PREMIUM VEHICLE SOURCING",
      description: "Curated selection of luxury and performance vehicles with verified provenance and quality assurance.",
      image: "/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png"
    },
    {
      icon: "💎",
      title: "CONCIERGE SERVICES",
      description: "White-glove client service including inspection, preparation, and personalized consultation throughout the process.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: "📋",
      title: "COMPLIANCE & DOCUMENTATION",
      description: "Complete handling of all legal requirements, customs documentation, and regulatory compliance for international sales.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            OUR SERVICES
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Comprehensive solutions for luxury vehicle export
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-lg border border-gray-700 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 overflow-hidden group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8">
                <div className="text-4xl mb-6 text-center">{service.icon}</div>
                <h3 className="text-white font-light text-lg mb-4 text-center leading-tight tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
