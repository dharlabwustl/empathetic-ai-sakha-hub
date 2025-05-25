
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, Target, TrendingUp } from 'lucide-react';

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'study' | 'break' | 'review' | 'practice';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  action: string;
}

interface DailySmartSuggestionsProps {
  suggestions?: SmartSuggestion[];
  onActionClick?: (action: string) => void;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({
  suggestions = [
    {
      id: '1',
      title: 'Focus on Physics',
      description: 'You have 3 pending concept cards in Mechanics',
      type: 'study',
      priority: 'high',
      estimatedTime: '30 min',
      action: 'concepts'
    },
    {
      id: '2',
      title: 'Take a Break',
      description: 'You\'ve been studying for 2 hours. Time for a short break!',
      type: 'break',
      priority: 'medium',
      estimatedTime: '15 min',
      action: 'break'
    },
    {
      id: '3',
      title: 'Review Flashcards',
      description: '8 chemistry flashcards are due for review',
      type: 'review',
      priority: 'medium',
      estimatedTime: '20 min',
      action: 'flashcards'
    }
  ],
  onActionClick
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return <Brain className="h-4 w-4" />;
      case 'break': return <Clock className="h-4 w-4" />;
      case 'review': return <TrendingUp className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${
                  suggestion.type === 'study' ? 'bg-blue-100 text-blue-600' :
                  suggestion.type === 'break' ? 'bg-orange-100 text-orange-600' :
                  suggestion.type === 'review' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {getTypeIcon(suggestion.type)}
                </div>
                <h4 className="font-medium">{suggestion.title}</h4>
              </div>
              <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                {suggestion.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {suggestion.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{suggestion.estimatedTime}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onActionClick?.(suggestion.action)}
                className="text-xs"
              >
                Take Action
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
