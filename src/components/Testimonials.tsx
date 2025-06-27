
const Testimonials = () => {
  const testimonials = [
    {
      name: "Marcus Johnson",
      location: "Toronto, Canada",
      text: "Exceptional service importing my dream Porsche. The team handled everything professionally and delivered exactly what was promised.",
      rating: 5
    },
    {
      name: "Sarah Mitchell",
      location: "Vancouver, Canada", 
      text: "Their VIP club membership opened doors to exclusive vehicles I couldn't find anywhere else. Truly premium experience.",
      rating: 5
    },
    {
      name: "David Uwimana",
      location: "Kigali, Rwanda",
      text: "Club B2B Performance brought luxury car access to our market. Professional, reliable, and trustworthy partners.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            CLIENT TESTIMONIALS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-yellow-600/30 pt-4">
                <div className="font-semibold text-yellow-500">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
