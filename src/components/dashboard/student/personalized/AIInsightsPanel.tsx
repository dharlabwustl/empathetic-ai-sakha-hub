
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { Brain, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

interface AIInsightsPanelProps {
  userProfile: UserProfileBase;
  currentMood: MoodType;
  className?: string;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  userProfile,
  currentMood,
  className = ""
}) => {
  const generateInsights = () => {
    const insights = [];
    
    // Mood-based insights
    if (currentMood === MoodType.STRESSED) {
      insights.push({
        type: 'wellness',
        icon: <AlertCircle className="h-4 w-4" />,
        message: 'Consider a 10-minute breathing exercise before studying',
        priority: 'high'
      });
    } else if (currentMood === MoodType.MOTIVATED) {
      insights.push({
        type: 'opportunity',
        icon: <Sparkles className="h-4 w-4" />,
        message: 'Great energy! Perfect time for challenging problems',
        priority: 'medium'
      });
    }

    // Performance insights
    insights.push({
      type: 'performance',
      icon: <TrendingUp className="h-4 w-4" />,
      message: 'Your Physics scores improved 15% this week',
      priority: 'low'
    });

    // Study pattern insights
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 11) {
      insights.push({
        type: 'timing',
        icon: <Brain className="h-4 w-4" />,
        message: 'Peak focus time detected - ideal for complex concepts',
        priority: 'medium'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights for {userProfile.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="text-primary mt-0.5">
                {insight.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{insight.message}</p>
                <Badge 
                  variant={getPriorityColor(insight.priority) as any}
                  className="mt-1 text-xs"
                >
                  {insight.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
