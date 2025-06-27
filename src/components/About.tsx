
const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              OUR MISSION
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mb-8"></div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Club B2B Performance bridges the gap between luxury automotive markets across continents. 
              We specialize in connecting Canadian and African markets with premium vehicles and 
              exceptional service standards.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Operating from Canada and Kigali, we're expanding our network across Africa to bring 
              world-class automotive solutions to growing markets. Our commitment to excellence 
              drives every transaction.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-yellow-500 font-semibold">Global Network Access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-yellow-500 font-semibold">Premium Quality Assurance</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-yellow-500 font-semibold">VIP Customer Experience</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-400/10 p-8 rounded-2xl border border-yellow-600/30">
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-500 mb-2">2</div>
                <div className="text-yellow-400 font-semibold mb-4">CONTINENTS</div>
                <div className="text-gray-300">Canada & Africa</div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-yellow-600/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">100%</div>
                  <div className="text-yellow-400 font-semibold mb-2">COMMITMENT</div>
                  <div className="text-gray-300 text-sm">To Excellence & Trust</div>
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
