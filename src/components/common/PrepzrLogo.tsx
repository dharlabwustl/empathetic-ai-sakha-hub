
import React from 'react';

interface PrepzrLogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  width = 120, 
  height = 'auto',
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ width, height }}>
      <img 
        src="/lovable-uploads/d7927ed4-d6eb-423e-b5f7-520e49fd78cd.png" 
        alt="PREPZR Logo"
        style={{ width: '100%', height: 'auto' }}
        className="max-w-full"
      />
    </div>
  );
};

export default PrepzrLogo;
