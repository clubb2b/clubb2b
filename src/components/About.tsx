
const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
              OUR MISSION
            </h2>
            <div className="w-24 h-px bg-white mb-8"></div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Club B2B Performance specializes in the exportation of high-quality automobiles worldwide. 
              We bridge international markets with premium vehicles and exceptional service standards.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
              Operating with a commitment to excellence, we source, inspect, and deliver luxury vehicles 
              to discerning clients across the globe. Our expertise ensures seamless transactions and 
              complete customer satisfaction.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-gray-200 font-medium">Global Network Access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-gray-200 font-medium">Premium Quality Assurance</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-gray-200 font-medium">Exceptional Client Service</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
              <div className="text-center">
                <div className="text-6xl font-light text-white mb-2">2</div>
                <div className="text-gray-300 font-medium mb-4">CONTINENTS</div>
                <div className="text-gray-400">Canada & Africa</div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-light text-white mb-2">100%</div>
                  <div className="text-gray-300 font-medium mb-2">COMMITMENT</div>
                  <div className="text-gray-400 text-sm">To Excellence & Trust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
