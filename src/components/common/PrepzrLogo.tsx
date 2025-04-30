
import React from 'react';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 60, // Increased default size
  height = "auto"
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/26db6370-4d7a-4e6a-a038-bae30c4c1f66.png" 
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
