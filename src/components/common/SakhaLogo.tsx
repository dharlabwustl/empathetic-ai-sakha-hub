
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
      src="/lovable-uploads/f294ea8b-7f79-4425-9971-8ecd365d9c42.png" 
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
