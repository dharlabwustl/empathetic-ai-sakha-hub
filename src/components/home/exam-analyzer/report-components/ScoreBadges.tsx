
import React from 'react';
import { Brain, Clock, BookOpen, Target } from 'lucide-react';
import { ExamResults } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScoreBadgesProps {
  stressScore?: number;
  conceptCompletionScore?: number;
  mockAccuracyScore?: number;
  confidenceAlignmentScore?: number;
  getScoreColorClass?: (score: number) => string;
  results: ExamResults; // Added this prop
}

const ScoreBadges: React.FC<ScoreBadgesProps> = ({
  stressScore = 0,
  conceptCompletionScore = 0,
  mockAccuracyScore = 0,
  confidenceAlignmentScore = 0,
  getScoreColorClass = () => "from-green-500 to-green-600",
  results
}) => {
  const isMobile = useIsMobile();
  
  // Extract scores from results if provided
  const stress = results?.stress?.score ?? stressScore;
  const concept = results?.concept?.score ?? conceptCompletionScore;
  const mock = results?.readiness?.score ?? mockAccuracyScore;
  const confidence = results?.confidence?.score ?? confidenceAlignmentScore ?? 0;

  return (
    <div className={`flex flex-wrap gap-2 mt-2 ${isMobile ? 'justify-center' : ''}`}>
      <Badge 
        icon={Clock} 
        value={stress} 
        label="Stress Management" 
        colorClass={getScoreColorClass(stress)}
        isMobile={isMobile}
      />
      <Badge 
        icon={BookOpen} 
        value={Math.round(concept)} 
        label="Concept Coverage" 
        colorClass={getScoreColorClass(concept)}
        isMobile={isMobile}
      />
      <Badge 
        icon={Target} 
        value={Math.round(mock)} 
        label="Mock Accuracy" 
        colorClass={getScoreColorClass(mock)}
        isMobile={isMobile}
      />
      <Badge 
        icon={Brain} 
        value={Math.round(confidence)} 
        label="Confidence Alignment" 
        colorClass={getScoreColorClass(confidence)}
        isMobile={isMobile}
      />
    </div>
  );
};

// Badge component for showing scores with icons
const Badge = ({ 
  icon: Icon, 
  value, 
  label, 
  colorClass,
  isMobile
}: { 
  icon: any, 
  value: number, 
  label: string,
  colorClass: string,
  isMobile: boolean
}) => (
  <div className={`flex items-center ${isMobile ? 'w-full' : ''} bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700`}>
    <Icon className={`h-3.5 w-3.5 mr-1.5 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`} />
    <span className="text-xs font-medium">{label}: <span className="font-bold">{value}%</span></span>
  </div>
);

export default ScoreBadges;
