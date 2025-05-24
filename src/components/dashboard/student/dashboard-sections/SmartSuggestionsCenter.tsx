
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Star, Clock } from 'lucide-react';

export interface SmartSuggestionsCenterProps {
  performance: {
    suggestions: Array<{
      id: string;
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
      type: 'study' | 'revision' | 'practice';
      estimatedTime: number;
    }>;
  };
}

const SmartSuggestionsCenter: React.FC<SmartSuggestionsCenterProps> = ({ performance }) => {
  const priorityColors = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary'
  } as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {performance.suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-3 border rounded-lg space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-medium">{suggestion.title}</h4>
                <Badge variant={priorityColors[suggestion.priority]}>
                  {suggestion.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {suggestion.estimatedTime} min
                </div>
                <Button size="sm" variant="outline">Start</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsCenter;
