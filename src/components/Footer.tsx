const Footer = () => {
  return <footer className="bg-black border-t border-gray-700 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-20 border-2 border-white bg-white flex items-center justify-center transform rotate-45 rounded-sm">
              <span className="text-black font-bold text-xl transform -rotate-45">P</span>
            </div>
          </div>
          
          <h3 className="text-white mb-4 tracking-wider font-semibold text-lg">
            CLUB B2B PERFORMANCE
          </h3>
          
          <p className="text-gray-300 tracking-wide mb-8 font-semibold text-base">
            EXCELLENCE IN AUTOMOTIVE EXPORT
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-8">
          <div>
            <h4 className="text-white font-medium mb-3">Follow Us</h4>
            <p className="text-gray-300">📸 @CLUB_B2B</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">WhatsApp</h4>
            <p className="text-gray-300">📱 +1 518-507-7243</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <p className="text-gray-300">📧 CLUB2B2@GMAIL.COM</p>
            <p className="text-gray-300">📞 +1 438-925-7679</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Website</h4>
            <p className="text-gray-300">🌐 CLUBB2B.ORG</p>
          </div>
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
    </footer>;
};
export default Footer;