
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video, Phone, MapPin, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AppointmentBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    meetingType: 'video',
    date: '',
    time: '',
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const appointmentMessage = `New appointment request:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Meeting Type: ${formData.meetingType}
Date: ${formData.date}
Time: ${formData.time}
Message: ${formData.message}`;

      const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(appointmentMessage)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Appointment Request Sent!",
        description: "We'll confirm your appointment within 2 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        meetingType: 'video',
        date: '',
        time: '',
        message: ''
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send appointment request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light text-black">Book Your Consultation</h2>
            <Button onClick={onClose} variant="ghost" className="text-black hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>

            <Input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="border-gray-300"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
              required
            >
              <option value="">Select Service</option>
              <option value="import">Luxury Car Import</option>
              <option value="export">Vehicle Export</option>
              <option value="shipping">Shipping Quote</option>
              <option value="vip">VIP Services</option>
              <option value="financing">Financing Options</option>
              <option value="inspection">Vehicle Inspection</option>
              <option value="consultation">General Consultation</option>
            </select>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Preferred Meeting Type</p>
              <div className="grid grid-cols-3 gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="meetingType"
                    value="video"
                    checked={formData.meetingType === 'video'}
                    onChange={handleInputChange}
                    className="text-black"
                  />
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Video Call</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="meetingType"
                    value="phone"
                    checked={formData.meetingType === 'phone'}
                    onChange={handleInputChange}
                    className="text-black"
                  />
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Phone Call</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="meetingType"
                    value="in-person"
                    checked={formData.meetingType === 'in-person'}
                    onChange={handleInputChange}
                    className="text-black"
                  />
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">In Person</span>
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Preferred Date</span>
                </label>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Preferred Time</span>
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
                  required
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>

            <Textarea
              name="message"
              placeholder="Tell us about your specific requirements or questions..."
              value={formData.message}
              onChange={handleInputChange}
              className="border-gray-300 min-h-[100px]"
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-black mb-2">What to Expect:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Personalized consultation with our experts</li>
                <li>• Detailed discussion of your requirements</li>
                <li>• Custom quote and timeline</li>
                <li>• Next steps and documentation needed</li>
              </ul>
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-light tracking-wider transition-all duration-300"
            >
              {isSubmitting ? "BOOKING..." : "BOOK CONSULTATION"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
