
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

export const AIRecommendationsSection = () => {
  const recommendations = [
    {
      id: 1,
      type: 'focus',
      title: 'Increase Chemistry Focus',
      description: 'Your Chemistry scores are below target. Consider allocating 2 more hours per week.',
      priority: 'high',
      actionable: true
    },
    {
      id: 2,
      type: 'strategy',
      title: 'Morning Study Sessions',
      description: 'Your performance is 15% better in morning sessions. Schedule difficult topics early.',
      priority: 'medium',
      actionable: true
    },
    {
      id: 3,
      type: 'revision',
      title: 'Physics Revision Needed',
      description: 'You haven\'t revised Mechanics topics in 2 weeks. Schedule a revision session.',
      priority: 'medium',
      actionable: true
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      'high': 'destructive',
      'medium': 'default',
      'low': 'secondary'
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus': return <TrendingUp className="h-4 w-4" />;
      case 'strategy': return <Lightbulb className="h-4 w-4" />;
      case 'revision': return <AlertTriangle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(rec.type)}
                      <h4 className="font-medium">{rec.title}</h4>
                    </div>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  {rec.actionable && (
                    <Button size="sm" variant="outline">
                      Apply Recommendation
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
