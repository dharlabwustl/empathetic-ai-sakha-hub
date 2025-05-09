
import React from 'react';

type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  className?: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  hard: 'bg-red-100 text-red-800 border-red-300',
};

/**
 * A reusable badge component that displays difficulty levels with appropriate colors
 */
export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ level, className = "" }) => {
  return (
    <span className={`text-xs px-2 py-1 rounded-md ${difficultyColors[level]} ${className}`}>
      {level}
    </span>
  );
};
