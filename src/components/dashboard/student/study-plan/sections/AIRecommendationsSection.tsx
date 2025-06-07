
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, TrendingUp, Clock, Target, AlertTriangle } from 'lucide-react';

export const AIRecommendationsSection = () => {
  const [recommendations] = useState([
    {
      id: 1,
      type: 'focus',
      priority: 'high',
      title: 'Increase Chemistry Study Time',
      description: 'Based on your recent performance, consider allocating 2 more hours per week to Chemistry, particularly Organic Chemistry concepts.',
      actionable: true,
      impact: 'Expected 15% improvement in Chemistry scores',
      timeframe: 'Next 2 weeks'
    },
    {
      id: 2,
      type: 'strategy',
      priority: 'medium',
      title: 'Optimize Study Schedule',
      description: 'Your performance data shows better retention during evening sessions. Consider shifting more intensive topics to 7-9 PM.',
      actionable: true,
      impact: 'Improved retention by 20%',
      timeframe: 'Immediate'
    },
    {
      id: 3,
      type: 'revision',
      priority: 'high',
      title: 'Revision Alert: Physics Mechanics',
      description: 'You haven\'t revised Physics Mechanics in 2 weeks. Schedule a revision session to maintain your strong performance.',
      actionable: true,
      impact: 'Maintain 85% accuracy',
      timeframe: 'This week'
    },
    {
      id: 4,
      type: 'time-allocation',
      priority: 'low',
      title: 'Biology Chapter Prioritization',
      description: 'Focus on Human Physiology and Genetics chapters as they have higher weightage in NEET and align with your learning style.',
      actionable: true,
      impact: 'Maximize score potential',
      timeframe: 'Next month'
    }
  ]);

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
      case 'focus': return <Target className="h-4 w-4" />;
      case 'strategy': return <Lightbulb className="h-4 w-4" />;
      case 'revision': return <TrendingUp className="h-4 w-4" />;
      case 'time-allocation': return <Clock className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
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
                      <h3 className="font-semibold">{rec.title}</h3>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={getPriorityColor(rec.priority)}
                    >
                      {rec.priority.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{rec.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-gray-600">Impact:</span>
                      <span className="font-medium">{rec.impact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="text-gray-600">Timeframe:</span>
                      <span className="font-medium">{rec.timeframe}</span>
                    </div>
                  </div>
                  
                  {rec.actionable && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        Apply Recommendation
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-600" />
              How AI Recommendations Work
            </h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• Analyzes your study patterns, performance data, and learning preferences</p>
              <p>• Compares with successful NEET preparation strategies</p>
              <p>• Provides personalized suggestions based on your strengths and weaknesses</p>
              <p>• Continuously adapts based on your progress and feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
