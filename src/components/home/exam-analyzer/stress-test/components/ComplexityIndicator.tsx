
import React from 'react';

interface ComplexityIndicatorProps {
  currentComplexity: number;
}

const ComplexityIndicator: React.FC<ComplexityIndicatorProps> = ({ currentComplexity }) => {
  return (
    <div className="flex items-center">
      <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Complexity:</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((level) => (
          <div 
            key={level}
            className={`h-1.5 w-1.5 rounded-full mx-0.5 ${
              level <= currentComplexity 
                ? 'bg-gradient-to-r from-blue-400 to-violet-500' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ComplexityIndicator;
