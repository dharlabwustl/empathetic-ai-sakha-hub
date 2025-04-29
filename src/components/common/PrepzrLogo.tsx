
import React from 'react';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 120, 
  height = "auto" 
}) => {
  return (
    <img 
      src="/lovable-uploads/12538d2d-9eb5-4223-a678-ce8277a58ffe.png" 
      alt="PREPZR Logo" 
      className={className} 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export default PrepzrLogo;
