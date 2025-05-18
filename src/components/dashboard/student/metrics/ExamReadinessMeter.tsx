
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import { ChartLineUp, BookOpen, Brain, FileText, Info, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReadinessData {
  conceptCompletion: number;
  flashcardAccuracy: number;
  examScores: {
    physics: number;
    chemistry: number;
    mathematics: number;
  };
  overallReadiness: number;
  timestamp: string;
  trends?: {
    weekly: {
      direction: 'up' | 'down' | 'stable';
      change: number;
    };
    monthly: {
      direction: 'up' | 'down' | 'stable';
      change: number;
    };
  };
}

interface ExamReadinessMeterProps {
  readinessData: ReadinessData;
}

const ExamReadinessMeter: React.FC<ExamReadinessMeterProps> = ({ readinessData }) => {
  const { conceptCompletion, flashcardAccuracy, examScores, overallReadiness, timestamp, trends } = readinessData;
  const [showTips, setShowTips] = useState(false);

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
  
  const getTrendIcon = (direction: string) => {
    switch(direction) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  // Improvement tips based on scores
  const getImprovementTips = () => {
    const tips = [];
    
    if (conceptCompletion < 70) {
      tips.push("Focus on completing more concept cards to build your foundational knowledge");
    }
    
    if (flashcardAccuracy < 70) {
      tips.push("Review your flashcards more frequently to improve recall accuracy");
    }
    
    const avgExamScore = (examScores.physics + examScores.chemistry + examScores.mathematics) / 3;
    if (avgExamScore < 70) {
      tips.push("Take more practice tests to identify and address weak areas");
    }
    
    if (tips.length === 0) {
      tips.push("You're doing well! Keep up your current study routine to maintain momentum");
    }
    
    return tips;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className={`text-xl font-bold ${getColorClass(overallReadiness)}`}>
              {overallReadiness}%
            </div>
            <span className="text-sm text-muted-foreground">Exam Readiness</span>
            {trends && (
              <div className="flex items-center gap-1 bg-muted/40 px-1.5 py-0.5 rounded text-xs">
                {getTrendIcon(trends.weekly.direction)}
                <span className={trends.weekly.direction === 'up' ? 'text-green-600' : trends.weekly.direction === 'down' ? 'text-red-600' : 'text-gray-600'}>
                  {trends.weekly.change}% this week
                </span>
              </div>
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
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <BookOpen className="h-3 w-3" /> Concepts
                </div>
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
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Brain className="h-3 w-3" /> Flashcards
                </div>
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
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <FileText className="h-3 w-3" /> Practice
                </div>
                <div className={`font-medium ${getColorClass((examScores.physics + examScores.chemistry + examScores.mathematics) / 3)}`}>
                  {Math.round((examScores.physics + examScores.chemistry + examScores.mathematics) / 3)}%
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs space-y-1">
                <p>Practice exam performance</p>
                <p>Physics: {examScores.physics}%</p>
                <p>Chemistry: {examScores.chemistry}%</p>
                <p>Mathematics: {examScores.mathematics}%</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Weekly trend chart summary */}
      {trends && (
        <div className="text-xs text-center pt-1">
          <div className="flex justify-between items-center border-t pt-2">
            <span>Monthly trend: </span>
            <div className="flex items-center gap-1">
              {getTrendIcon(trends.monthly.direction)}
              <span className={trends.monthly.direction === 'up' ? 'text-green-600' : trends.monthly.direction === 'down' ? 'text-red-600' : 'text-gray-600'}>
                {trends.monthly.change}%
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Improvement tips toggle */}
      <div className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-1"
          onClick={() => setShowTips(!showTips)}
        >
          <Info className="h-4 w-4" />
          {showTips ? 'Hide improvement tips' : 'Show improvement tips'}
        </Button>
        
        {showTips && (
          <Card className="mt-2">
            <CardContent className="p-3">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                <ChartLineUp className="h-4 w-4 text-blue-500" />
                Improvement Tips
              </h4>
              <ul className="space-y-1">
                {getImprovementTips().map((tip, index) => (
                  <li key={index} className="text-xs flex items-start gap-1">
                    <span className="font-bold text-blue-500 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExamReadinessMeter;
