
const PremiumServices = () => {
  const services = [
    {
      title: "Luxury Fashion & Accessories",
      description: "Designer collections and exclusive luxury items",
      status: "Get Notified",
      bgColor: "from-gray-800 to-gray-900"
    },
    {
      title: "Premium Real Estate", 
      description: "Exclusive properties in prime locations",
      status: "Coming Soon",
      bgColor: "from-gray-900 to-black"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            EXPANDING HORIZONS
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Future luxury services in development
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${service.bgColor} border border-gray-700 rounded-lg p-8 text-center hover:shadow-2xl transition-all duration-300`}
            >
              <h3 className="text-2xl md:text-3xl font-light mb-4 text-white tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-300 text-lg font-light mb-8 leading-relaxed">
                {service.description}
              </p>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300 rounded">
                {service.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;
