
import React from 'react';
import { Timer } from 'lucide-react';

interface QuestionTimerProps {
  timeLeft: number;
}

const QuestionTimer: React.FC<QuestionTimerProps> = ({ timeLeft }) => {
  const isRunningLow = timeLeft < 5;
  
  return (
    <div className="flex items-center gap-2">
      <Timer 
        className={`${isRunningLow ? 'text-red-500 animate-pulse' : 'text-blue-500'}`} 
        size={18} 
      />
      <span className={`font-medium ${isRunningLow ? 'text-red-500 animate-pulse' : ''}`}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default QuestionTimer;
