
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface CardProgressProps {
  progress?: number;
}

const CardProgress: React.FC<CardProgressProps> = ({ progress }) => {
  if (typeof progress === 'undefined') return null;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
};

export default CardProgress;
