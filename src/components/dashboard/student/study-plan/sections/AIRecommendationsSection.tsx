
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, TrendingUp, Clock, Target, Zap } from 'lucide-react';

export const AIRecommendationsSection = () => {
  const [recommendations] = useState([
    {
      id: 1,
      type: 'focus',
      title: 'Focus on Organic Chemistry',
      description: 'Your performance in organic chemistry has been below average. Recommend increasing study time by 30%.',
      priority: 'high',
      actionable: true,
      impact: 'High'
    },
    {
      id: 2,
      type: 'time-allocation',
      title: 'Adjust Study Schedule',
      description: 'Consider shifting Physics study to morning hours when your focus is highest.',
      priority: 'medium',
      actionable: true,
      impact: 'Medium'
    },
    {
      id: 3,
      type: 'strategy',
      title: 'Revision Strategy Update',
      description: 'Implement spaced repetition for Biology topics you completed 2 weeks ago.',
      priority: 'medium',
      actionable: true,
      impact: 'High'
    },
    {
      id: 4,
      type: 'revision',
      title: 'Revision Frequency Optimization',
      description: 'Based on your retention patterns, revise Chemistry concepts every 3 days instead of weekly.',
      priority: 'low',
      actionable: false,
      impact: 'Medium'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus':
        return <Target className="h-4 w-4" />;
      case 'time-allocation':
        return <Clock className="h-4 w-4" />;
      case 'strategy':
        return <TrendingUp className="h-4 w-4" />;
      case 'revision':
        return <Zap className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
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
                      <h3 className="font-medium">{rec.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(rec.priority)}
                      >
                        {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                      </Badge>
                      <Badge variant="secondary">
                        {rec.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 capitalize">
                        {rec.type.replace('-', ' ')} recommendation
                      </span>
                    </div>
                    {rec.actionable && (
                      <Button size="sm" variant="outline">
                        Apply Recommendation
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Weekly Strategy Updates */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Weekly Strategy Updates
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Increase Chemistry study time based on recent performance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Maintain current Biology schedule - excellent progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Consider adding more practice tests for Physics</span>
              </div>
            </div>
          </div>

          {/* Personalized Insights */}
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              Personalized Insights
            </h4>
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                <strong>Learning Pattern:</strong> You perform best during evening study sessions with 45-minute focus blocks.
              </p>
              <p className="mb-2">
                <strong>Retention Rate:</strong> Biology concepts stick better with visual aids, while Physics needs more problem-solving practice.
              </p>
              <p>
                <strong>Weak Areas:</strong> Focus on Organic Chemistry mechanisms and Thermodynamics laws for maximum improvement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
