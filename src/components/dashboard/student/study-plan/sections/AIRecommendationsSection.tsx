
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Target, 
  Clock, 
  TrendingUp,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

export const AIRecommendationsSection = () => {
  const recommendations = [
    {
      id: 1,
      type: 'focus',
      title: 'Focus on Chemistry',
      description: 'Your Chemistry scores have been declining. Spend 30% more time on Organic Chemistry.',
      priority: 'high',
      timeAllocation: '2 hours daily'
    },
    {
      id: 2,
      type: 'timing',
      title: 'Optimize Study Schedule',
      description: 'Your performance is better in evening sessions. Consider moving Physics to evening slots.',
      priority: 'medium',
      timeAllocation: 'Evening sessions'
    },
    {
      id: 3,
      type: 'revision',
      title: 'Increase Revision Frequency',
      description: 'Biology topics need more frequent revision. Schedule weekly review sessions.',
      priority: 'medium',
      timeAllocation: '1 hour weekly'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus': return <Target className="h-5 w-5" />;
      case 'timing': return <Clock className="h-5 w-5" />;
      case 'revision': return <TrendingUp className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Recommendations
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
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">{rec.timeAllocation}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Apply Recommendation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">AI Insights</h4>
            </div>
            <p className="text-sm text-blue-700">
              Based on your study patterns and performance, the AI suggests focusing more on weak areas 
              while maintaining strong subjects. Your learning curve shows better retention during evening hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
