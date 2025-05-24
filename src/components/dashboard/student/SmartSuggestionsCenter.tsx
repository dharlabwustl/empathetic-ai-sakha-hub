
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfileBase } from "@/types/user/base";
import { Lightbulb, BookOpen, Target, Clock } from 'lucide-react';

interface SmartSuggestionsCenterProps {
  userProfile?: UserProfileBase;
  suggestedNextAction?: string;
}

const SmartSuggestionsCenter: React.FC<SmartSuggestionsCenterProps> = ({ 
  userProfile, 
  suggestedNextAction 
}) => {
  const suggestions = [
    {
      id: 1,
      title: "Review Physics Concepts",
      description: "You haven't reviewed thermodynamics in 3 days",
      icon: <BookOpen className="h-4 w-4" />,
      priority: "high",
      action: "Start Review"
    },
    {
      id: 2,
      title: "Practice Mock Test",
      description: "Take a chemistry practice test to check your progress",
      icon: <Target className="h-4 w-4" />,
      priority: "medium",
      action: "Take Test"
    },
    {
      id: 3,
      title: "Study Break Reminder",
      description: "You've been studying for 2 hours. Time for a break!",
      icon: <Clock className="h-4 w-4" />,
      priority: "low",
      action: "Take Break"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestedNextAction && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Recommended Next Action</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">{suggestedNextAction}</p>
            </div>
          )}
          
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className={`p-1 rounded ${
                  suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                  suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {suggestion.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                {suggestion.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsCenter;
