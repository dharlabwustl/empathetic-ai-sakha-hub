
import React from 'react';

interface PrepzrLogoProps {
  width?: number;
  height?: number;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ width = 120, height = 40 }) => {
  return (
    <div style={{ width, height }} className="flex items-center justify-center">
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-500">PREPZR</span>
    </div>
  );
};

export default PrepzrLogo;
