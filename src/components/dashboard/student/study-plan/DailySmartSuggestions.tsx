
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Clock, Target, TrendingUp, BookOpen, Brain, Zap } from 'lucide-react';

const DailySmartSuggestions: React.FC = () => {
  const suggestions = [
    {
      id: 1,
      type: 'urgent',
      title: 'Focus on Electromagnetism Today',
      description: 'High weightage topic (30%) with only 2 weeks left. Prioritize Electromagnetic Induction.',
      action: 'Start Topic',
      timeRequired: '3 hours',
      priority: 'high',
      subject: 'Physics',
      reasoning: 'Based on exam weightage and time remaining'
    },
    {
      id: 2,
      type: 'review',
      title: 'Quick Review: Organic Chemistry',
      description: 'You studied this 3 days ago. Spaced repetition suggests reviewing now for better retention.',
      action: 'Review',
      timeRequired: '45 min',
      priority: 'medium',
      subject: 'Chemistry',
      reasoning: 'Spaced repetition algorithm'
    },
    {
      id: 3,
      type: 'practice',
      title: 'Solve Calculus Problems',
      description: 'Strong topic but needs practice. Focus on application-based questions.',
      action: 'Practice',
      timeRequired: '1.5 hours',
      priority: 'medium',
      subject: 'Mathematics',
      reasoning: 'Based on your strength profile'
    },
    {
      id: 4,
      type: 'weak_area',
      title: 'Strengthen Physical Chemistry',
      description: 'Identified as weak area. Focus on Chemical Kinetics concepts today.',
      action: 'Study',
      timeRequired: '2 hours',
      priority: 'high',
      subject: 'Chemistry',
      reasoning: 'Performance analysis indicates weakness'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <Target className="h-4 w-4" />;
      case 'review': return <Brain className="h-4 w-4" />;
      case 'practice': return <BookOpen className="h-4 w-4" />;
      case 'weak_area': return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-50 text-red-700 border-red-200';
      case 'review': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'practice': return 'bg-green-50 text-green-700 border-green-200';
      case 'weak_area': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-600" />
          AI-Powered Daily Study Suggestions
        </CardTitle>
        <CardDescription>
          Personalized recommendations based on your progress, exam schedule, and learning patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-full ${getTypeColor(suggestion.type)}`}>
                    {getTypeIcon(suggestion.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{suggestion.timeRequired}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.subject}
                      </Badge>
                      <span className="italic">{suggestion.reasoning}</span>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="ml-4">
                  <Zap className="h-4 w-4 mr-1" />
                  {suggestion.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-purple-900 dark:text-purple-100">Today's Optimal Study Plan</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Following these suggestions will cover 65% of high-weightage topics efficiently
              </p>
            </div>
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              <Target className="h-4 w-4 mr-2" />
              Create Schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
