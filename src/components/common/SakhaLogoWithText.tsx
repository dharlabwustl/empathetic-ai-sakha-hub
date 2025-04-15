
import React from 'react';
import { Link } from "react-router-dom";

interface SakhaLogoWithTextProps {
  className?: string;
  showFullText?: boolean;
}

const SakhaLogoWithText: React.FC<SakhaLogoWithTextProps> = ({ 
  className = "",
  showFullText = false
}) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
        alt="Sakha AI"
        className="w-10 h-10"
      />
      <div>
        <span className="font-display font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Sakha AI
        </span>
        {showFullText && (
          <span className="block text-xs text-gray-600 dark:text-gray-400">
            पहली बार, पढ़ाई से पहले, आपको समझने वाला साथी
          </span>
        )}
      </div>
    </Link>
  );
};

export default SakhaLogoWithText;
