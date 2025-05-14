
import React from 'react';

interface PrepzrLogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: 'default' | 'large' | 'small';
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  width, 
  height, 
  className = '',
  variant = 'default'
}) => {
  // Determine size based on variant
  let logoWidth = width;
  let logoHeight = height;
  
  if (!width && !height) {
    switch (variant) {
      case 'large':
        logoWidth = 240;
        logoHeight = 80;
        break;
      case 'small':
        logoWidth = 120;
        logoHeight = 40;
        break;
      default:
        logoWidth = 180;
        logoHeight = 60;
    }
  }
  
  return (
    <div 
      style={{ 
        width: logoWidth, 
        height: logoHeight 
      }} 
      className={`flex items-center justify-center ${className}`}
    >
      <img 
        src="/lovable-uploads/262b26ae-8270-42d2-9cd0-4576b6941758.png" 
        alt="PREPZR Logo" 
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default PrepzrLogo;
