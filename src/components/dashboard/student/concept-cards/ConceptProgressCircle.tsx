
import React from 'react';

interface ConceptProgressCircleProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
}

const ConceptProgressCircle: React.FC<ConceptProgressCircleProps> = ({
  percentage,
  size = 'md',
  label
}) => {
  // Calculate SVG dimensions based on size
  const getSizeDimensions = () => {
    switch(size) {
      case 'sm': return { size: 40, strokeWidth: 3, fontSize: 'text-xs', padding: 'p-0' };
      case 'md': return { size: 60, strokeWidth: 4, fontSize: 'text-sm', padding: 'p-1' };
      case 'lg': return { size: 80, strokeWidth: 5, fontSize: 'text-base', padding: 'p-2' };
      case 'xl': return { size: 100, strokeWidth: 6, fontSize: 'text-lg', padding: 'p-3' };
      default: return { size: 60, strokeWidth: 4, fontSize: 'text-sm', padding: 'p-1' };
    }
  };
  
  const { size: dimensions, strokeWidth, fontSize, padding } = getSizeDimensions();
  
  // Calculate circle properties
  const radius = (dimensions - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on percentage
  const getColor = () => {
    if (percentage >= 100) return '#10b981'; // Green
    if (percentage >= 75) return '#22c55e'; // Light Green
    if (percentage >= 50) return '#eab308'; // Yellow
    if (percentage >= 25) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };
  
  return (
    <div className={`relative flex items-center justify-center ${padding}`}>
      <svg
        width={dimensions}
        height={dimensions}
        viewBox={`0 0 ${dimensions} ${dimensions}`}
      >
        {/* Background circle */}
        <circle
          cx={dimensions / 2}
          cy={dimensions / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={dimensions / 2}
          cy={dimensions / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${dimensions / 2} ${dimensions / 2})`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      
      {/* Percentage label */}
      {label && (
        <div className={`absolute ${fontSize} font-medium`}>
          {label}
        </div>
      )}
    </div>
  );
};

export default ConceptProgressCircle;
