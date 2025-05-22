
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
        src="/lovable-uploads/8f5b4c23-6323-41cd-9d0d-cca84f710783.png" 
        alt="PREPZR Logo"
        style={{ width: '100%', height: 'auto' }}
        className="max-w-full"
      />
    </div>
  );
};

export default PrepzrLogo;
