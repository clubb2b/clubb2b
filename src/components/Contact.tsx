
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
        title: "Message Sent!",
        description: "We'll contact you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Please contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            GET IN TOUCH
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <Input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md"
                required
              >
                <option value="">Select Service</option>
                <option value="import">Import Luxury Cars</option>
                <option value="export">Export Services</option>
                <option value="vip-club">VIP Club</option>
                <option value="other">Other</option>
              </select>
              
              <Textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-light">Follow Us</h4>
                    <p className="text-gray-300">@CLUB_B2B</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                    📱
                  </div>
                  <div>
                    <h4 className="text-white font-light">WhatsApp</h4>
                    <p className="text-gray-300">+1 518-507-7243</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
