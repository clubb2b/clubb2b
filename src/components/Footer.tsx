
const Footer = () => {
  return (
    <footer className="bg-black border-t border-yellow-600/30 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-20 border-2 border-yellow-600 bg-gradient-to-b from-yellow-600 to-yellow-700 flex items-center justify-center transform rotate-45 rounded-sm">
              <span className="text-black font-bold text-xl transform -rotate-45">P</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
            CLUB B2B PERFORMANCE
          </h3>
          
          <p className="text-yellow-500 text-lg font-light tracking-wide mb-8">
            DRIVEN BY HUSTLE. POWERED BY TRUST.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="w-12 h-12 border-2 border-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-black transition-all duration-300 cursor-pointer">
            <span className="text-xl">📱</span>
          </div>
          <div className="w-12 h-12 border-2 border-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-black transition-all duration-300 cursor-pointer">
            <span className="text-xl">📸</span>
          </div>
          <div className="w-12 h-12 border-2 border-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-black transition-all duration-300 cursor-pointer">
            <span className="text-xl">✉️</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-yellow-500 text-lg font-light mb-2">
            DRIVEN BY HUSTLE.
          </p>
          <p className="text-yellow-500 text-lg font-light mb-6">
            POWERED BY TRUST.
          </p>
          
          <div className="text-gray-400 text-sm">
            <p>&copy; 2024 Club B2B Performance. All rights reserved.</p>
            <p className="mt-2">Canada • Kigali • Expanding Across Africa</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
