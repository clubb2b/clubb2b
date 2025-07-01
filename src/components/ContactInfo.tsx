
import { Instagram } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
      <h3 className="text-2xl font-light text-white mb-6 tracking-wide">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">
            📍
          </div>
          <div>
            <h4 className="text-white font-light mb-1 tracking-wide">Our Locations</h4>
            <p className="text-gray-300">Canada & Kigali, Rwanda</p>
            <p className="text-gray-400 text-sm">Expanding across Africa</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">
            📱
          </div>
          <div>
            <h4 className="text-white font-light mb-1 tracking-wide">WhatsApp Store</h4>
            <p className="text-gray-300">+1 518-507-7243</p>
            <p className="text-gray-400 text-sm">Available 24/7</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Instagram className="w-6 h-6 text-black" />
          </div>
          <div>
            <h4 className="text-white font-light mb-1 tracking-wide">Follow Us</h4>
            <p className="text-gray-300">@CLUB_B2B</p>
            <p className="text-gray-400 text-sm">Latest arrivals & updates</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">
            ⏰
          </div>
          <div>
            <h4 className="text-white font-light mb-1 tracking-wide">Business Hours</h4>
            <p className="text-gray-300">Mon - Fri: 9:00 AM - 8:00 PM</p>
            <p className="text-gray-300">Sat - Sun: 10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
