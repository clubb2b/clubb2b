
const PremiumServices = () => {
  const services = [
    {
      title: "Luxury Fashion & Accessories",
      description: "Designer shoes, glasses, and exclusive wear",
      status: "Get Notified",
      bgColor: "from-yellow-900/30 to-yellow-800/20"
    },
    {
      title: "Luxury Real Estate Investments", 
      description: "Canada, Kigali & Bamako",
      status: "Coming Soon",
      bgColor: "from-gray-800/50 to-gray-900/30"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${service.bgColor} border border-yellow-400/20 rounded-lg p-8 text-center hover:border-yellow-400/50 transition-all duration-300`}
            >
              <h3 className="text-2xl md:text-3xl font-light mb-4 text-yellow-400 tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-300 text-lg font-light mb-8 leading-relaxed">
                {service.description}
              </p>
              <button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300 rounded">
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
