
import React from 'react';

interface PrepzrLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ width = 180, height = 60, className = '' }) => {
  return (
    <div style={{ width, height }} className={`flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/5efe900b-dae0-453f-a1fc-d43c2ccc0f68.png" 
        alt="PREPZR Logo" 
        className="h-full object-contain"
      />
    </div>
  );
};

export default PrepzrLogo;
