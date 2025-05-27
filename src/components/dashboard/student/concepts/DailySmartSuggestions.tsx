
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw, BookOpen, Brain, Target, Clock, TrendingUp } from 'lucide-react';

interface SmartSuggestion {
  id: string;
  type: 'focus' | 'review' | 'practice' | 'timing';
  title: string;
  description: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  icon: React.ReactNode;
}

const DailySmartSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([
    {
      id: '1',
      type: 'focus',
      title: 'Focus on Physics - Mechanics',
      description: 'Your weakest area with only 60% completion. Spend 30 minutes on force diagrams.',
      subject: 'Physics',
      priority: 'high',
      estimatedTime: '30 min',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'review',
      title: 'Review Chemistry - Organic Reactions',
      description: 'Last studied 5 days ago. Quick revision to maintain retention.',
      subject: 'Chemistry',
      priority: 'medium',
      estimatedTime: '20 min',
      icon: <RefreshCw className="h-4 w-4" />
    },
    {
      id: '3',
      type: 'practice',
      title: 'Practice Biology MCQs',
      description: 'Strong performance area. Take advantage with advanced questions.',
      subject: 'Biology',
      priority: 'low',
      estimatedTime: '25 min',
      icon: <Brain className="h-4 w-4" />
    }
  ]);

  const generateNewSuggestions = () => {
    const allSuggestions = [
      {
        id: '4',
        type: 'timing',
        title: 'Morning Study Session',
        description: 'Best time for complex concepts. Schedule Physics for 9-10 AM.',
        subject: 'Physics',
        priority: 'medium',
        estimatedTime: '60 min',
        icon: <Clock className="h-4 w-4" />
      },
      {
        id: '5',
        type: 'focus',
        title: 'Strengthen Weak Topics',
        description: 'Focus on Chemical Bonding - your accuracy is below 70%.',
        subject: 'Chemistry',
        priority: 'high',
        estimatedTime: '40 min',
        icon: <TrendingUp className="h-4 w-4" />
      },
      {
        id: '6',
        type: 'review',
        title: 'Revision: Cell Biology',
        description: 'Completed last week. Quick review to reinforce memory.',
        subject: 'Biology',
        priority: 'low',
        estimatedTime: '15 min',
        icon: <BookOpen className="h-4 w-4" />
      }
    ];

    const randomSuggestions = allSuggestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((suggestion, index) => ({ ...suggestion, id: `${Date.now()}-${index}` }));

    setSuggestions(randomSuggestions);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Chemistry':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Biology':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-yellow-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-yellow-800">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Daily Smart Suggestions
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewSuggestions}
            className="bg-white hover:bg-yellow-50 border-yellow-300 text-yellow-700"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {suggestion.icon}
                    <p className="text-sm font-semibold text-gray-800">{suggestion.title}</p>
                    <Badge variant="outline" className={getSubjectColor(suggestion.subject)}>
                      {suggestion.subject}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority} priority
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Clock className="h-3 w-3 mr-1" />
                      {suggestion.estimatedTime}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
