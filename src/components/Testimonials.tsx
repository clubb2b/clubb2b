
const Testimonials = () => {
  const testimonials = [
    {
      name: "Marcus Johnson",
      location: "Toronto, Canada",
      text: "Exceptional service and attention to detail. The team's professionalism and expertise made the entire export process seamless.",
      rating: 5
    },
    {
      name: "Sarah Mitchell",
      location: "Vancouver, Canada", 
      text: "Outstanding quality and service. They delivered exactly what was promised with remarkable precision and care.",
      rating: 5
    },
    {
      name: "David Uwimana",
      location: "Kigali, Rwanda",
      text: "Club B2B Performance sets the standard for luxury vehicle export. Professional, reliable, and trustworthy partners.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-800 tracking-wider">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-xl text-gray-600 font-light mb-8">
            What our clients say about our services
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gray-400 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="font-medium text-gray-800">{testimonial.name}</div>
                <div className="text-gray-500 text-sm">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
