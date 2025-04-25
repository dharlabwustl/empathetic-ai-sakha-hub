
import React from 'react';

interface SakhaLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const SakhaLogo: React.FC<SakhaLogoProps> = ({ 
  className = "", 
  width = 120, 
  height = "auto" 
}) => {
  return (
    <img 
      src="/lovable-uploads/2bb8a7c0-61bf-4d87-84b8-3afc0f66adc0.png" 
      alt="Sakha Logo" 
      className={className} 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export default SakhaLogo;
