
import React from 'react';
import { Link } from "react-router-dom";

interface SakhaLogoWithTextProps {
  className?: string;
}

const SakhaLogoWithText: React.FC<SakhaLogoWithTextProps> = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
        alt="Sakha AI"
        className="w-10 h-10"
      />
      <span className="font-display font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Sakha AI
      </span>
    </Link>
  );
};

export default SakhaLogoWithText;
