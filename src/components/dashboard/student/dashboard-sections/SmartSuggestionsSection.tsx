
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, BookOpen, Clock, Target, Brain } from 'lucide-react';
import { UserProfileType } from '@/types/user/base';

interface SmartSuggestionsSectionProps {
  userProfile: UserProfileType;
}

const SmartSuggestionsSection: React.FC<SmartSuggestionsSectionProps> = ({ userProfile }) => {
  const suggestions = [
    {
      id: 1,
      type: 'study',
      title: 'Complete Physics Concepts',
      description: 'You have 3 pending physics concepts to review',
      priority: 'high',
      timeEstimate: '30 min',
      icon: BookOpen
    },
    {
      id: 2,
      type: 'practice',
      title: 'Take Chemistry Quiz',
      description: 'Practice chemical bonding questions',
      priority: 'medium',
      timeEstimate: '15 min',
      icon: Brain
    },
    {
      id: 3,
      type: 'revision',
      title: 'Quick Math Review',
      description: 'Review yesterday\'s algebra topics',
      priority: 'low',
      timeEstimate: '20 min',
      icon: Target
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <CardTitle className="text-lg">Smart Suggestions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => {
            const IconComponent = suggestion.icon;
            return (
              <div key={suggestion.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {suggestion.timeEstimate}
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Start
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsSection;
