
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    // Fallback testimonials in case database is unavailable
    {
      customer_name: "Marcus Johnson",
      customer_location: "Toronto, Canada",
      review_text: "Exceptional service and attention to detail. The team's professionalism and expertise made the entire export process seamless.",
      rating: 5
    },
    {
      customer_name: "Sarah Mitchell",
      customer_location: "Vancouver, Canada", 
      review_text: "Outstanding quality and service. They delivered exactly what was promised with remarkable precision and care.",
      rating: 5
    },
    {
      customer_name: "David Uwimana",
      customer_location: "Kigali, Rwanda",
      review_text: "Club B2B Performance sets the standard for luxury vehicle export. Professional, reliable, and trustworthy partners.",
      rating: 5
    }
  ]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Use the secure public_testimonials view that excludes sensitive customer data
        const { data, error } = await supabase
          .from('public_testimonials')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback testimonials are already set in state
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            What our clients say about our services
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-8 rounded-lg border border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-white text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.review_text}"
              </p>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="font-medium text-white">{testimonial.customer_name}</div>
                <div className="text-gray-400 text-sm">{testimonial.customer_location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
