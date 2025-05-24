
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowRight, BookOpen, Clock, Target } from 'lucide-react';

interface SmartSuggestionsCenterProps {
  performance: {
    accuracy: number;
    quizScores: number;
    conceptProgress: number;
    streak: number;
  };
}

const SmartSuggestionsCenter: React.FC<SmartSuggestionsCenterProps> = ({ performance }) => {
  const suggestions = [
    {
      icon: BookOpen,
      title: 'Review Weak Areas',
      description: 'Focus on topics where you scored below 70%',
      action: 'Start Review',
      priority: 'high'
    },
    {
      icon: Clock,
      title: 'Practice Time Management',
      description: 'Take a timed practice test to improve speed',
      action: 'Take Test',
      priority: 'medium'
    },
    {
      icon: Target,
      title: 'Set Weekly Goals',
      description: 'Define clear objectives for the next 7 days',
      action: 'Set Goals',
      priority: 'low'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
            <suggestion.icon className="h-5 w-5 mt-1 text-primary" />
            <div className="flex-1">
              <h4 className="font-medium">{suggestion.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
              <Button variant="outline" size="sm" className="h-8">
                {suggestion.action}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsCenter;
