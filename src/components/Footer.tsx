
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-20 border-2 border-white bg-white flex items-center justify-center transform rotate-45 rounded-sm">
              <span className="text-black font-bold text-xl transform -rotate-45">P</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-light text-white mb-4 tracking-wider">
            CLUB B2B PERFORMANCE
          </h3>
          
          <p className="text-gray-300 text-lg font-light tracking-wide mb-8">
            EXCELLENCE IN AUTOMOTIVE EXPORT
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center space-y-2 mb-8">
          <p className="text-gray-400 text-sm">Professional Vehicle Export Services</p>
          <p className="text-gray-400 text-sm">Global Delivery • Quality Assurance • Complete Documentation</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-gray-300 text-lg font-light mb-2">
            DRIVEN BY EXCELLENCE.
          </p>
          <p className="text-gray-300 text-lg font-light mb-6">
            POWERED BY TRUST.
          </p>
          
          <div className="text-gray-400 text-sm">
            <p>&copy; 2024 Club B2B Performance. All rights reserved.</p>
            <p className="mt-2">Canada • Kigali • Global Export Services</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
