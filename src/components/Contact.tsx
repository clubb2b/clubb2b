
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            GET IN TOUCH
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to join the exclusive world of luxury automotive excellence? Contact us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-yellow-600/20">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500"
                  required
                />
              </div>
              
              <Input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500"
              />
              
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:border-yellow-500 focus:outline-none"
                required
              >
                <option value="">Select Service Interest</option>
                <option value="import">Import Luxury Cars</option>
                <option value="local-sales">Local Car Sales</option>
                <option value="vip-club">VIP Club Membership</option>
                <option value="rentals">Luxury Car Rentals</option>
                <option value="other">Other</option>
              </select>
              
              <Textarea
                name="message"
                placeholder="Tell us about your requirements..."
                value={formData.message}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 min-h-[120px]"
                required
              />
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-black hover:from-yellow-500 hover:to-yellow-600 py-3 text-lg font-semibold transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-yellow-600/20">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
                    📍
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-1">Our Locations</h4>
                    <p className="text-gray-300">Canada & Kigali, Rwanda</p>
                    <p className="text-gray-400 text-sm">Expanding across Africa</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
                    📱
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-1">WhatsApp Store</h4>
                    <p className="text-gray-300">+1 518-507-7243</p>
                    <p className="text-gray-400 text-sm">Available 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
                    ⏰
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-1">Business Hours</h4>
                    <p className="text-gray-300">Mon - Fri: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-300">Sat - Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-yellow-600/20 text-center">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">Ready to Start?</h3>
              <p className="text-gray-300 mb-6">
                Join our exclusive network and access premium automotive opportunities.
              </p>
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-3 font-semibold transition-all duration-300">
                Join VIP Club
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
