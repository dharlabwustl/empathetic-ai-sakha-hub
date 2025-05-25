
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Calendar, Clock, Lightbulb } from 'lucide-react';

interface SmartSuggestion {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  category: 'study' | 'practice' | 'break' | 'revision';
}

const DailySmartSuggestions: React.FC = () => {
  const suggestions: SmartSuggestion[] = [
    {
      id: '1',
      icon: <Brain className="h-4 w-4 text-blue-600" />,
      title: 'Focus on Physics Concepts',
      description: 'Your quiz scores show strength in formulas but conceptual gaps remain',
      action: 'Review Concepts',
      priority: 'high',
      category: 'study'
    },
    {
      id: '2',
      icon: <Target className="h-4 w-4 text-green-600" />,
      title: 'Practice Mock Tests',
      description: 'Your accuracy is improving - time for full-length practice',
      action: 'Take Mock Test',
      priority: 'medium',
      category: 'practice'
    },
    {
      id: '3',
      icon: <Clock className="h-4 w-4 text-purple-600" />,
      title: 'Take a Break',
      description: 'You\'ve been studying for 2 hours straight. A short break will help retention',
      action: 'Break Time',
      priority: 'medium',
      category: 'break'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSuggestionAction = (suggestion: SmartSuggestion) => {
    console.log(`Acting on suggestion: ${suggestion.action}`);
    // Implement action logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{suggestion.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleSuggestionAction(suggestion)}
                      className="h-7 text-xs"
                    >
                      {suggestion.action}
                    </Button>
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
