
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
      src="/lovable-uploads/6bd65589-a748-4b63-a28b-12521c233a7e.png" 
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
