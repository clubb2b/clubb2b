
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
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
  );
};

export default ContactForm;
