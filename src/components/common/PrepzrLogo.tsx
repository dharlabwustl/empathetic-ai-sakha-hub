
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
        src="/lovable-uploads/216cc4f1-982d-42c2-bd7f-e6930fd733e5.png" 
        alt="PREPZR Logo" 
        className="h-full object-contain"
      />
    </div>
  );
};

export default PrepzrLogo;
