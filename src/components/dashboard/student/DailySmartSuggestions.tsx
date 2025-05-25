
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Clock, Target, BookOpen, Brain } from "lucide-react";

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'study' | 'break' | 'review' | 'exam';
  estimatedTime: string;
  action: string;
}

interface DailySmartSuggestionsProps {
  suggestions?: SmartSuggestion[];
  onSuggestionClick?: (suggestion: SmartSuggestion) => void;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({
  suggestions = [
    {
      id: '1',
      title: 'Review Physics Concepts',
      description: 'You missed some concepts yesterday. Quick review recommended.',
      priority: 'high',
      category: 'review',
      estimatedTime: '15 min',
      action: 'Start Review'
    },
    {
      id: '2', 
      title: 'Take a Study Break',
      description: 'You\'ve been studying for 2 hours. Time for a refreshing break.',
      priority: 'medium',
      category: 'break',
      estimatedTime: '10 min',
      action: 'Take Break'
    },
    {
      id: '3',
      title: 'Chemistry Practice Test',
      description: 'Perfect time to test your chemistry knowledge.',
      priority: 'medium',
      category: 'exam',
      estimatedTime: '30 min',
      action: 'Start Test'
    }
  ],
  onSuggestionClick
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return <BookOpen className="h-4 w-4" />;
      case 'break': return <Clock className="h-4 w-4" />;
      case 'review': return <Brain className="h-4 w-4" />;
      case 'exam': return <Target className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const handleSuggestionClick = (suggestion: SmartSuggestion) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(suggestion.category)}
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {suggestion.estimatedTime}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => handleSuggestionClick(suggestion)}
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
