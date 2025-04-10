
import React from 'react';
import { Brain, Clock, BookOpen, Target } from 'lucide-react';

interface ScoreBadgesProps {
  stressScore: number;
  conceptCompletionScore: number;
  mockAccuracyScore: number;
  confidenceAlignmentScore: number;
  getScoreColorClass: (score: number) => string;
}

const ScoreBadges: React.FC<ScoreBadgesProps> = ({
  stressScore,
  conceptCompletionScore,
  mockAccuracyScore,
  confidenceAlignmentScore,
  getScoreColorClass
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <Badge 
        icon={Clock} 
        value={stressScore} 
        label="Stress Management" 
        colorClass={getScoreColorClass(stressScore)}
      />
      <Badge 
        icon={BookOpen} 
        value={Math.round(conceptCompletionScore)} 
        label="Concept Coverage" 
        colorClass={getScoreColorClass(conceptCompletionScore)}
      />
      <Badge 
        icon={Target} 
        value={Math.round(mockAccuracyScore)} 
        label="Mock Accuracy" 
        colorClass={getScoreColorClass(mockAccuracyScore)}
      />
      <Badge 
        icon={Brain} 
        value={Math.round(confidenceAlignmentScore)} 
        label="Confidence Alignment" 
        colorClass={getScoreColorClass(confidenceAlignmentScore)}
      />
    </div>
  );
};

// Badge component for showing scores with icons
const Badge = ({ 
  icon: Icon, 
  value, 
  label, 
  colorClass 
}: { 
  icon: any, 
  value: number, 
  label: string,
  colorClass: string 
}) => (
  <div className="flex items-center bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
    <Icon className={`h-3.5 w-3.5 mr-1.5 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`} />
    <span className="text-xs font-medium">{label}: <span className="font-bold">{value}%</span></span>
  </div>
);

export default ScoreBadges;
