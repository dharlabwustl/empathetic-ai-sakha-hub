
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface ExamReadinessSectionProps {
  score: number;
  previousScore: number;
  weeklyTrends: Array<{ week: string; score: number }>;
  weakAreas: string[];
  strongAreas: string[];
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({
  score,
  previousScore,
  weeklyTrends,
  weakAreas,
  strongAreas
}) => {
  const scoreChange = score - previousScore;
  const isImproving = scoreChange > 0;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Exam Readiness Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
            <div className={`text-sm ${isImproving ? 'text-green-600' : 'text-red-600'}`}>
              {isImproving ? '+' : ''}{scoreChange}% from last week
            </div>
            <Progress value={score} className="mt-4 h-3" />
          </div>

          {/* Weak Areas */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Focus Areas
            </h4>
            <ul className="space-y-2">
              {weakAreas.map((area, index) => (
                <li key={index} className="text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/20 p-2 rounded">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Strong Areas */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Strong Areas
            </h4>
            <ul className="space-y-2">
              {strongAreas.map((area, index) => (
                <li key={index} className="text-sm text-muted-foreground bg-green-50 dark:bg-green-950/20 p-2 rounded">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
