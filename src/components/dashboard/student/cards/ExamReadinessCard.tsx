
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Calendar, BookOpen } from "lucide-react";

interface ExamReadinessCardProps {
  examGoal?: string;
  readinessScore?: number;
  daysLeft?: number;
  onAnalyze?: () => void;
}

const ExamReadinessCard: React.FC<ExamReadinessCardProps> = ({
  examGoal = "NEET",
  readinessScore = 75,
  daysLeft = 45,
  onAnalyze
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Target className="h-4 w-4 inline mr-2" />
          Exam Readiness
        </CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{examGoal} Preparation</span>
              <span className={`text-2xl font-bold ${getScoreColor(readinessScore)}`}>
                {readinessScore}%
              </span>
            </div>
            <Progress 
              value={readinessScore} 
              className="h-2"
              style={{
                backgroundColor: '#f1f5f9'
              }}
            />
            <style jsx>{`
              .progress-indicator {
                background-color: ${getProgressColor(readinessScore)};
              }
            `}</style>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{daysLeft} days left</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>On track</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onAnalyze}
          >
            Analyze Readiness
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessCard;
