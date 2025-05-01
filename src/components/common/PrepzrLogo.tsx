
import React from 'react';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  showText?: boolean;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 480, 
  height = "auto",
  showText = true
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/3c4867e2-71b8-4046-8390-e2064eefbed4.png" 
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
