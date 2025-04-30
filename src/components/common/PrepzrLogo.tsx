
import React from 'react';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  showText?: boolean;
  textColor?: string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 40, 
  height = "auto",
  showText = false,
  textColor = "text-blue-500"
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/e0b0d435-a8a1-4419-bedd-59bf826b4560.png" 
        alt="Prepzr Logo" 
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
      />
      
      {showText && (
        <span className={`font-bold ml-2 text-xl tracking-tight ${textColor}`}>
          PREPZR
        </span>
      )}
    </div>
  );
};

export default PrepzrLogo;
