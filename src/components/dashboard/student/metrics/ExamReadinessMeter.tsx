
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserIcon } from 'lucide-react';

interface ReadinessData {
  conceptCompletion: number;
  flashcardAccuracy: number;
  examScores: {
    [subject: string]: number;
  };
  overallReadiness: number;
  timestamp: string;
}

interface ExamReadinessMeterProps {
  userAvatar?: string;
  readinessData: ReadinessData;
}

const ExamReadinessMeter: React.FC<ExamReadinessMeterProps> = ({
  userAvatar,
  readinessData
}) => {
  const getReadinessColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          Exam Readiness Meter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Readiness Meter */}
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
            <Progress 
              value={readinessData.overallReadiness} 
              className={`h-4 ${getReadinessColor(readinessData.overallReadiness)}`}
            />
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Concepts</p>
              <p className="font-medium">{readinessData.conceptCompletion}% Complete</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Flashcards</p>
              <p className="font-medium">{readinessData.flashcardAccuracy}% Accuracy</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Exam Scores</p>
              <p className="font-medium">
                {Object.values(readinessData.examScores).reduce((a, b) => a + b, 0) / 
                 Object.values(readinessData.examScores).length}% Avg
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-right">
            Last updated: {new Date(readinessData.timestamp).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessMeter;
