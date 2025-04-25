
import React from 'react';
import { Link } from "react-router-dom";

interface SakhaLogoWithTextProps {
  className?: string;
}

const SakhaLogoWithText: React.FC<SakhaLogoWithTextProps> = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/lovable-uploads/a15baf21-f126-4591-878c-e1c3a3061616.png"
        alt="Sakha AI"
        className="h-8"
      />
    </Link>
  );
};

export default SakhaLogoWithText;
