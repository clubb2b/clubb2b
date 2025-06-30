
import React from 'react';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const BrandLogo = ({ size = 'medium', className = '' }: BrandLogoProps) => {
  const sizeClasses = {
    small: 'w-24 h-16',
    medium: 'w-32 h-20',
    large: 'w-48 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 shadow-lg`}>
      <div className="text-center">
        <div className="text-black font-bold text-xs md:text-sm lg:text-base tracking-wider">
          CLUB B2B
        </div>
        <div className="text-gray-600 text-xs font-light tracking-widest">
          PERFORMANCE
        </div>
        <div className="w-8 h-px bg-gray-400 mx-auto mt-1"></div>
      </div>
    </div>
  );
};

export default BrandLogo;
