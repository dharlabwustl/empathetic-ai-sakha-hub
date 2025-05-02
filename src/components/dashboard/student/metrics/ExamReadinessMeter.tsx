
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from 'date-fns';

interface ReadinessData {
  conceptCompletion: number;
  flashcardAccuracy: number;
  examScores: {
    physics: number;
    chemistry: number;
    mathematics?: number;
    biology?: number;
  };
  overallReadiness: number;
  timestamp: string;
  examType?: string;
}

interface ExamReadinessMeterProps {
  readinessData: ReadinessData;
}

const ExamReadinessMeter: React.FC<ExamReadinessMeterProps> = ({ readinessData }) => {
  const { conceptCompletion, flashcardAccuracy, examScores, overallReadiness, timestamp, examType } = readinessData;

  const getColorClass = (value: number) => {
    if (value >= 80) return "text-green-600 dark:text-green-400";
    if (value >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const getProgressColorClass = (value: number) => {
    if (value >= 80) return "bg-green-600 dark:bg-green-500";
    if (value >= 60) return "bg-amber-500 dark:bg-amber-400";
    return "bg-red-500 dark:bg-red-500";
  };

  // Calculate the average exam score
  const calculateAverageExamScore = () => {
    const scores: number[] = [];
    
    // Add scores based on exam type
    if (examType === 'NEET') {
      scores.push(examScores.physics, examScores.chemistry);
      if (examScores.biology) scores.push(examScores.biology);
    } else {
      scores.push(examScores.physics, examScores.chemistry);
      if (examScores.mathematics) scores.push(examScores.mathematics);
    }
    
    const validScores = scores.filter(score => typeof score === 'number');
    return validScores.length > 0 
      ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) 
      : 0;
  };

  const averageExamScore = calculateAverageExamScore();
  
  // Prepare exam-specific tooltip content
  const getExamScoresTooltip = () => {
    if (examType === 'NEET') {
      return (
        <div className="text-xs space-y-1">
          <p>Practice exam performance</p>
          <p>Physics: {examScores.physics}%</p>
          <p>Chemistry: {examScores.chemistry}%</p>
          <p>Biology: {examScores.biology || 0}%</p>
          <p className="mt-2 text-xs text-blue-500">NEET scoring: +4/-1 per question</p>
        </div>
      );
    }
    
    return (
      <div className="text-xs space-y-1">
        <p>Practice exam performance</p>
        <p>Physics: {examScores.physics}%</p>
        <p>Chemistry: {examScores.chemistry}%</p>
        <p>Mathematics: {examScores.mathematics || 0}%</p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className={`text-xl font-bold ${getColorClass(overallReadiness)}`}>
              {overallReadiness}%
            </div>
            <span className="text-sm text-muted-foreground">Overall Readiness</span>
            {examType && (
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                {examType}
              </span>
            )}
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(timestamp))} ago
        </span>
      </div>

      <Progress 
        value={overallReadiness} 
        className={`h-2 ${getProgressColorClass(overallReadiness)}`} 
      />

      <div className="grid grid-cols-3 gap-4 pt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground">Concepts</div>
                <div className={`font-medium ${getColorClass(conceptCompletion)}`}>{conceptCompletion}%</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Concept mastery level</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground">Flashcards</div>
                <div className={`font-medium ${getColorClass(flashcardAccuracy)}`}>{flashcardAccuracy}%</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Flashcard recall accuracy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground">Practice</div>
                <div className={`font-medium ${getColorClass(averageExamScore)}`}>
                  {averageExamScore}%
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {getExamScoresTooltip()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ExamReadinessMeter;
