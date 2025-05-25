
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';

export interface ExamReadinessScoreProps {
  score?: number;
  targetExam?: string;
  daysRemaining?: number;
  trend?: string;
  recommendations?: string[];
}

const ExamReadinessScore: React.FC<ExamReadinessScoreProps> = ({
  score = 75,
  targetExam = "JEE Main",
  daysRemaining = 45,
  trend = "up",
  recommendations = []
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const defaultRecommendations = [
    "Focus on Physics problem solving",
    "Increase daily practice time",
    "Review weak topics in Mathematics"
  ];

  const displayRecommendations = recommendations.length > 0 ? recommendations : defaultRecommendations;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Exam Readiness Score
          <Badge variant={trend === 'up' ? 'default' : 'destructive'}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trend === 'up' ? 'Improving' : 'Declining'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
          <p className="text-sm text-muted-foreground">Overall Readiness</p>
        </div>

        <Progress value={score} className="h-3" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="text-muted-foreground">Target:</span>
            <span className="font-medium">{targetExam}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">Days left:</span>
            <span className="font-medium">{daysRemaining}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Recommendations:</h4>
          <ul className="space-y-1">
            {displayRecommendations.map((rec, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                <div className="h-1 w-1 bg-blue-500 rounded-full" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessScore;
