
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Clock, TrendingUp, AlertCircle } from "lucide-react";

interface SmartSuggestion {
  id: string;
  type: 'study' | 'review' | 'break' | 'exam';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  action?: () => void;
}

interface SmartSuggestionsSectionProps {
  suggestions?: SmartSuggestion[];
}

const SmartSuggestionsSection: React.FC<SmartSuggestionsSectionProps> = ({ 
  suggestions = [] 
}) => {
  const defaultSuggestions: SmartSuggestion[] = [
    {
      id: '1',
      type: 'study',
      title: 'Review Physics Concepts',
      description: 'You have 3 pending concept cards in Mechanics that need attention',
      priority: 'high',
      estimatedTime: '25 min'
    },
    {
      id: '2',
      type: 'exam',
      title: 'Take Chemistry Mock Test',
      description: 'Practice with Organic Chemistry questions to improve your weak areas',
      priority: 'medium',
      estimatedTime: '45 min'
    },
    {
      id: '3',
      type: 'break',
      title: 'Take a Study Break',
      description: 'You\'ve been studying for 2 hours. Time for a 15-minute break!',
      priority: 'medium',
      estimatedTime: '15 min'
    }
  ];

  const displaySuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return <Lightbulb className="h-4 w-4" />;
      case 'exam': return <TrendingUp className="h-4 w-4" />;
      case 'break': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displaySuggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                    {suggestion.estimatedTime && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {suggestion.estimatedTime}
                      </div>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={suggestion.action}>
                  Act Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsSection;
