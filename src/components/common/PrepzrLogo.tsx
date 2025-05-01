
import React from 'react';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 480, // Doubled from 240 to 480
  height = "auto"
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/16da1ff5-9fab-4b4b-bd21-5977748acd16.png" 
        alt="PREPZR Logo" 
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default PrepzrLogo;
