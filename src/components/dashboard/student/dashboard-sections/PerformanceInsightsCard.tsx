
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Award } from 'lucide-react';

interface PerformanceInsightsCardProps {
  className?: string;
}

const PerformanceInsightsCard: React.FC<PerformanceInsightsCardProps> = ({ className }) => {
  const insights = [
    { subject: 'Physics', progress: 78, trend: 'up', change: '+5%' },
    { subject: 'Chemistry', progress: 65, trend: 'down', change: '-2%' },
    { subject: 'Biology', progress: 82, trend: 'up', change: '+8%' },
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-600" />
          Performance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{insight.subject}</span>
              <div className="flex items-center gap-1">
                {insight.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-xs ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {insight.change}
                </span>
              </div>
            </div>
            <Progress value={insight.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PerformanceInsightsCard;
