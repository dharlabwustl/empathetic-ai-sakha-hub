
import React from 'react';
import { Link } from "react-router-dom";

interface SakhaLogoWithTextProps {
  className?: string;
}

const SakhaLogoWithText: React.FC<SakhaLogoWithTextProps> = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/lovable-uploads/14eecdc0-e84c-4b2a-9033-7585f67644a4.png"
        alt="Sakha AI"
        className="h-8"
      />
    </Link>
  );
};

export default SakhaLogoWithText;
