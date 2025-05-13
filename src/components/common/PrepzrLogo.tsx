
import React from 'react';

interface PrepzrLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ width = 120, height = 40, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <img 
        src="/lovable-uploads/3a221f0e-7b76-4533-b1a8-2ed78e178b72.png" 
        alt="PREPZR Logo" 
        className="max-w-full max-h-full"
      />
    </div>
  );
};

export default PrepzrLogo;
