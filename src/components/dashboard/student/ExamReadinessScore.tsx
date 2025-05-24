
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface ExamReadinessScoreProps {
  score: number;
  previousScore: number;
  weeklyTrends: Array<{ week: string; score: number; }>;
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
          Exam Readiness Score
          {isImproving ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{score}%</div>
            <Progress value={score} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {isImproving ? '+' : ''}{scoreChange}% from last week
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Strong Areas</h4>
              <ul className="text-sm space-y-1">
                {strongAreas.map((area, index) => (
                  <li key={index} className="text-muted-foreground">• {area}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600 mb-2">Focus Areas</h4>
              <ul className="text-sm space-y-1">
                {weakAreas.map((area, index) => (
                  <li key={index} className="text-muted-foreground">• {area}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessScore;
