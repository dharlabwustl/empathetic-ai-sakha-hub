
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Heart, Brain, Zap } from 'lucide-react';
import { MoodType } from '@/types/user/base';

export interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
}

const MoodBasedSuggestions: React.FC<MoodBasedSuggestionsProps> = ({ currentMood }) => {
  const getSuggestionsForMood = (mood?: MoodType) => {
    switch (mood) {
      case MoodType.STRESSED:
        return [
          { icon: <Heart className="h-4 w-4" />, text: "Take a 10-min meditation break", action: "Start Now" },
          { icon: <Brain className="h-4 w-4" />, text: "Review easier topics first", action: "Go to Easy Topics" },
        ];
      case MoodType.MOTIVATED:
        return [
          { icon: <Zap className="h-4 w-4" />, text: "Tackle challenging problems", action: "Start Challenge" },
          { icon: <Brain className="h-4 w-4" />, text: "Set a new study goal", action: "Set Goal" },
        ];
      case MoodType.TIRED:
        return [
          { icon: <Heart className="h-4 w-4" />, text: "Take a power nap", action: "Set Timer" },
          { icon: <Lightbulb className="h-4 w-4" />, text: "Review flashcards instead", action: "Open Flashcards" },
        ];
      default:
        return [
          { icon: <Lightbulb className="h-4 w-4" />, text: "Start with today's plan", action: "View Plan" },
          { icon: <Brain className="h-4 w-4" />, text: "Take a quick quiz", action: "Start Quiz" },
        ];
    }
  };

  const suggestions = getSuggestionsForMood(currentMood);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Smart Suggestions
          {currentMood && (
            <Badge variant="outline" className="ml-2">
              {currentMood}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {suggestion.icon}
              <span className="text-sm">{suggestion.text}</span>
            </div>
            <Button size="sm" variant="outline">
              {suggestion.action}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MoodBasedSuggestions;
