
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
      src="/lovable-uploads/a15baf21-f126-4591-878c-e1c3a3061616.png" 
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
