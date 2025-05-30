
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Clock } from 'lucide-react';

const PerformanceInsightsCard: React.FC = () => {
  const insights = [
    { subject: "Physics", score: 78, trend: "up", color: "blue" },
    { subject: "Chemistry", score: 85, trend: "up", color: "green" },
    { subject: "Biology", score: 82, trend: "down", color: "purple" }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Performance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{insight.subject}</span>
              <div className="flex items-center gap-1">
                <span className="text-sm">{insight.score}%</span>
                <TrendingUp className={`h-3 w-3 ${insight.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              </div>
            </div>
            <Progress value={insight.score} className="h-2" />
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
            <Award className="h-4 w-4" />
            Strong performer in Chemistry!
          </div>
          <p className="text-xs text-green-600 dark:text-green-500 mt-1">
            Keep up the excellent work in organic chemistry
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceInsightsCard;
