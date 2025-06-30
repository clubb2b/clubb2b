
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            GET IN TOUCH
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
            Ready to join the exclusive world of luxury automotive excellence? Contact us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-light text-white mb-6 tracking-wide">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                  required
                />
              </div>
              
              <Input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
              />
              
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:border-white focus:outline-none"
                required
              >
                <option value="">Select Service Interest</option>
                <option value="import">Import Luxury Cars</option>
                <option value="export">Export Services</option>
                <option value="maritime">Maritime Freight</option>
                <option value="air">Air Freight</option>
                <option value="local-sales">Local Car Sales</option>
                <option value="vip-club">VIP Club Membership</option>
                <option value="rentals">Luxury Car Rentals</option>
                <option value="chauffeur">VIP Chauffeur Service</option>
                <option value="other">Other</option>
              </select>
              
              <Textarea
                name="message"
                placeholder="Tell us about your requirements..."
                value={formData.message}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white min-h-[120px]"
                required
              />
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-gray-200 py-3 text-lg font-light tracking-wider transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
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

            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center">
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide">Ready to Start?</h3>
              <p className="text-gray-300 mb-6 font-light">
                Join our exclusive network and access premium automotive opportunities.
              </p>
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-light tracking-wider transition-all duration-300">
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
