
import React from 'react';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 200, // Increased default size to 200 for better visibility
  height = "auto"
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/c160b4d6-0d19-4442-9def-5dabcfbe1bd7.png" 
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
