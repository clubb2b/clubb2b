import React from 'react';

const LuxuryBrandLogos = () => {
  const brands = [
    { name: 'Mercedes-Benz', logo: '🌟' },
    { name: 'BMW', logo: '🏎️' },
    { name: 'Audi', logo: '🔥' },
    { name: 'Porsche', logo: '⚡' },
    { name: 'Lexus', logo: '💎' },
    { name: 'Bentley', logo: '👑' },
    { name: 'Rolls-Royce', logo: '🎭' },
    { name: 'Lamborghini', logo: '🦅' },
    { name: 'Ferrari', logo: '🐎' },
    { name: 'Maserati', logo: '🔱' }
  ];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Luxury background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-charcoal to-luxury-black opacity-95"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-luxury text-luxury-platinum tracking-widest animate-elegant-slide-up">
            PREMIUM BRANDS
          </h3>
          <div className="w-24 h-px bg-gradient-luxury mx-auto mt-4"></div>
        </div>
        
        {/* Scrolling brand logos */}
        <div className="relative">
          <div className="flex space-x-12 animate-luxury-shimmer">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-luxury-charcoal/30 backdrop-blur-sm border border-luxury-platinum/20 hover:border-luxury-gold/50 transition-all duration-500 hover:shadow-glow animate-premium-float">
                  <span className="text-3xl filter grayscale hover:grayscale-0 transition-all duration-300">
                    {brand.logo}
                  </span>
                  <span className="text-sm font-elegant text-luxury-platinum tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-luxury-gold/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-luxury-platinum/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default LuxuryBrandLogos;