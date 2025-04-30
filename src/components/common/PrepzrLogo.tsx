
import React from 'react';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  showText?: boolean;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 40, 
  height = "auto",
  showText = false
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/2dea6582-4a6f-4b80-a4db-89b92672757f.png" 
        alt="Prepzr Logo" 
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
      />
      
      {showText && (
        <img 
          src="/lovable-uploads/63143d4f-73cd-4fca-a1dd-82e6a5313142.png" 
          alt="Prepzr Text"
          style={{
            height: typeof height === 'number' ? `${height * 0.8}px` : 'auto',
            marginLeft: '8px'
          }}
        />
      )}
    </div>
  );
};

export default PrepzrLogo;
