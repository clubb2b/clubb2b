
const PremiumServices = () => {
  const services = [
    {
      title: "Luxury Fashion & Accessories",
      description: "Designer collections and exclusive luxury items",
      status: "Get Notified",
      bgColor: "from-gray-100 to-gray-50"
    },
    {
      title: "Premium Real Estate", 
      description: "Exclusive properties in prime locations",
      status: "Coming Soon",
      bgColor: "from-gray-50 to-white"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-800 tracking-wider">
            EXPANDING HORIZONS
          </h2>
          <p className="text-xl text-gray-600 font-light mb-8">
            Future luxury services in development
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${service.bgColor} border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300`}
            >
              <h3 className="text-2xl md:text-3xl font-light mb-4 text-gray-800 tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-600 text-lg font-light mb-8 leading-relaxed">
                {service.description}
              </p>
              <button className="bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 font-light tracking-wider transition-all duration-300 rounded">
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
