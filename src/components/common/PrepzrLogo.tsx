
import React from 'react';

interface PrepzrLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ width = 120, height = 40, className = '' }) => {
  return (
    <div style={{ width, height }} className={`flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/034e236e-70d0-4fb6-bde4-7e91df8b0a7f.png" 
        alt="PREPZR Logo" 
        className="h-full object-contain"
      />
    </div>
  );
};

export default PrepzrLogo;
