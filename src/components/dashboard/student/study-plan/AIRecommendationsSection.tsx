
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Clock, Target, Lightbulb, AlertTriangle } from 'lucide-react';

interface AIRecommendationsSectionProps {
  performance: any;
  subjects: any;
}

const AIRecommendationsSection: React.FC<AIRecommendationsSectionProps> = ({ performance, subjects }) => {
  const recommendations = [
    {
      type: 'focus',
      title: 'Focus on Organic Chemistry',
      description: 'Your performance in organic chemistry has declined by 15% this week. Allocate 2 extra hours daily.',
      priority: 'high',
      icon: AlertTriangle
    },
    {
      type: 'time',
      title: 'Optimize Study Schedule',
      description: 'Your productivity peaks at 9-11 AM. Schedule difficult topics during this time.',
      priority: 'medium',
      icon: Clock
    },
    {
      type: 'strategy',
      title: 'Increase Revision Frequency',
      description: 'Topics not revised in 7+ days show 30% accuracy drop. Schedule weekly revisions.',
      priority: 'high',
      icon: TrendingUp
    },
    {
      type: 'improvement',
      title: 'Practice More MCQs',
      description: 'Your conceptual knowledge is strong but MCQ speed needs improvement.',
      priority: 'medium',
      icon: Target
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const IconComponent = rec.icon;
              return (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <IconComponent className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                        <Button size="sm" variant="outline">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Weekly Strategy Update
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-1">This Week's Focus</h4>
              <p className="text-sm text-yellow-700">
                Concentrate on weak areas: Thermodynamics (Physics) and Coordination Compounds (Chemistry)
              </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-1">Strength Building</h4>
              <p className="text-sm text-green-700">
                Continue excelling in Biology - your strong subject. Use this confidence boost for other subjects.
              </p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-1">Time Management</h4>
              <p className="text-sm text-blue-700">
                Aim for 2 hours of Physics, 2.5 hours of Chemistry, and 1.5 hours of Biology daily.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendationsSection;
