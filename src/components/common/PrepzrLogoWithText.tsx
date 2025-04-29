
import React from 'react';
import { Link } from "react-router-dom";

interface PrepzrLogoWithTextProps {
  className?: string;
}

const PrepzrLogoWithText: React.FC<PrepzrLogoWithTextProps> = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/lovable-uploads/12538d2d-9eb5-4223-a678-ce8277a58ffe.png"
        alt="PREPZR"
        className="w-10 h-10"
      />
      <span className="font-display font-bold text-xl bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
        PREPZR
      </span>
    </Link>
  );
};

export default PrepzrLogoWithText;
