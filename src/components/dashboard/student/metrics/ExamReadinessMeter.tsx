
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface ReadinessDataProps {
  conceptCompletion: number;
  flashcardAccuracy: number;
  examScores: {
    physics: number;
    chemistry: number;
    mathematics: number;
    [key: string]: number;
  };
  overallReadiness: number;
  timestamp: string;
}

interface ExamReadinessMeterProps {
  readinessData: ReadinessDataProps;
}

const ExamReadinessMeter: React.FC<ExamReadinessMeterProps> = ({ readinessData }) => {
  // Helper function to determine color based on score
  const getColorClass = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score < 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="space-y-4">
      {/* Overall Readiness Score */}
      <div className="text-center">
        <div className="relative inline-flex justify-center items-center w-20 h-20 rounded-full border-4 border-primary/20">
          <span className="text-2xl font-bold text-primary">{readinessData.overallReadiness}%</span>
        </div>
        <p className="text-sm font-medium mt-2">Overall Readiness</p>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(readinessData.timestamp).toLocaleDateString()}
        </p>
      </div>

      {/* Subject-wise breakdown */}
      <div className="space-y-3">
        {Object.entries(readinessData.examScores).map(([subject, score]) => (
          <div key={subject} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{subject}</span>
              <span className="font-medium">{score}%</span>
            </div>
            <Progress value={score} className={`h-1.5 ${getColorClass(score)}`} />
          </div>
        ))}
      </div>

      {/* Study recommendations */}
      <div className="mt-4 pt-3 border-t">
        <p className="text-xs text-muted-foreground mb-2">Focus areas:</p>
        <ul className="text-sm space-y-1">
          {Object.entries(readinessData.examScores)
            .sort(([, a], [, b]) => a - b)
            .slice(0, 2)
            .map(([subject]) => (
              <li key={subject} className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                <span className="capitalize">{subject}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamReadinessMeter;
