
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
        src="/lovable-uploads/d1a1ba73-9bf2-452a-9132-2b32e9c969d5.png" 
        alt="PREPZR Logo" 
        className="h-full object-contain"
      />
    </div>
  );
};

export default PrepzrLogo;
