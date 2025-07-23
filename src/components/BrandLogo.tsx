
import React from 'react';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const BrandLogo = ({ size = 'medium', className = '' }: BrandLogoProps) => {
  const sizeClasses = {
    small: 'w-28 h-20',
    medium: 'w-36 h-24',
    large: 'w-52 h-36'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Elegant background with gradient and premium styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary-dark rounded-xl shadow-luxury backdrop-blur-sm border border-white/20"></div>
      
      {/* Premium border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-transparent to-transparent p-px">
        <div className="h-full w-full rounded-xl bg-gradient-to-br from-primary/80 to-primary-dark/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Main brand text */}
        <div className="text-primary-foreground font-luxury text-xs md:text-sm lg:text-base tracking-[0.2em] font-bold mb-1">
          CLUB B2B
        </div>
        
        {/* Elegant separator */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mb-1"></div>
        
        {/* Performance text */}
        <div className="text-primary-foreground/90 text-[10px] md:text-xs font-light tracking-[0.3em] uppercase">
          PERFORMANCE
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
};

export default BrandLogo;
