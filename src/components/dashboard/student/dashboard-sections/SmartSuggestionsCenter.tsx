
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SmartSuggestionsCenterProps {
  // Add proper typing when available
}

const SmartSuggestionsCenter = ({}: SmartSuggestionsCenterProps) => {
  // Mock data
  const suggestions = [
    {
      id: '1',
      title: 'Master Newton\'s Third Law',
      description: 'You've been struggling with related problems. Let's review the core principles.',
      type: 'concept',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Practice Organic Chemistry Reactions',
      description: 'Based on your recent performance, additional practice will help solidify these concepts.',
      type: 'practice',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Take a Mock Physics Test',
      description: 'You've been consistently improving. Time to test your overall knowledge!',
      type: 'exam',
      priority: 'low',
    }
  ];
  
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
          label: 'High Priority'
        };
      case 'medium':
        return {
          badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
          label: 'Medium Priority'
        };
      case 'low':
      default:
        return {
          badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
          label: 'Recommended'
        };
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map(suggestion => {
            const priorityStyle = getPriorityStyles(suggestion.priority);
            
            return (
              <div 
                key={suggestion.id} 
                className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">{suggestion.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${priorityStyle.badge}`}>
                    {priorityStyle.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  {suggestion.description}
                </p>
                <Button size="sm" className="w-full flex items-center justify-center">
                  Start Now <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsCenter;
