
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

export const AIRecommendationsSection = () => {
  const recommendations = [
    {
      id: '1',
      type: 'focus',
      title: 'Increase Chemistry Study Time',
      description: 'Based on your performance, consider increasing Chemistry study time by 30% this week.',
      priority: 'high',
      actionable: true
    },
    {
      id: '2',
      type: 'strategy',
      title: 'Morning Study Sessions',
      description: 'Your concentration is highest between 6-9 AM. Schedule difficult topics during this time.',
      priority: 'medium',
      actionable: true
    },
    {
      id: '3',
      type: 'revision',
      title: 'Review Thermodynamics',
      description: 'Your last test showed weakness in thermodynamics. Plan a revision session this week.',
      priority: 'high',
      actionable: true
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Priority</Badge>;
      default:
        return <Badge variant="outline">Low Priority</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'strategy':
        return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'revision':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Brain className="h-4 w-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Study Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="border-2 border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(rec.type)}
                      <h3 className="font-semibold">{rec.title}</h3>
                    </div>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{rec.description}</p>
                  
                  {rec.actionable && (
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Apply Recommendation
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-600" />
              AI Insights Summary
            </h4>
            <p className="text-sm text-gray-700">
              Based on your study patterns and performance data, our AI recommends focusing on Chemistry 
              while maintaining your strong Biology performance. Your optimal study time is early morning, 
              and you should plan revision sessions for weaker topics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
