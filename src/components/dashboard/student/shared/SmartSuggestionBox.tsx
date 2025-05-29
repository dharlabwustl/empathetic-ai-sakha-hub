
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from 'lucide-react';

interface SmartSuggestionBoxProps {
  suggestions: string[];
  title?: string;
}

export const SmartSuggestionBox: React.FC<SmartSuggestionBoxProps> = ({
  suggestions,
  title = "Smart Suggestions"
}) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">{title}</h3>
        </div>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <Badge key={index} variant="outline" className="text-blue-800 dark:text-blue-200 border-blue-300">
              {suggestion}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
