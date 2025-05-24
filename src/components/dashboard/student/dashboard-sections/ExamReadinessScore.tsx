
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';

export interface ExamReadinessScoreProps {
  score: number;
  previousScore: number;
  weeklyTrends: Array<{ week: string; score: number }>;
  weakAreas: string[];
  strongAreas: string[];
}

const ExamReadinessScore: React.FC<ExamReadinessScoreProps> = ({
  score,
  previousScore,
  weeklyTrends,
  weakAreas,
  strongAreas
}) => {
  const scoreChange = score - previousScore;
  const isImproving = scoreChange > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Exam Readiness Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">{score}%</div>
            <Badge variant={isImproving ? "default" : "secondary"}>
              {isImproving ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {scoreChange > 0 ? '+' : ''}{scoreChange}%
            </Badge>
          </div>
          
          <Progress value={score} className="h-2" />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-green-600 font-medium">Strong Areas</div>
              {strongAreas.map((area, index) => (
                <div key={index} className="text-muted-foreground">{area}</div>
              ))}
            </div>
            <div>
              <div className="text-red-600 font-medium flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Needs Focus
              </div>
              {weakAreas.map((area, index) => (
                <div key={index} className="text-muted-foreground">{area}</div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessScore;
