
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sun, CloudSun, Sunset, Moon } from 'lucide-react';

interface SmartSuggestionBoxProps {
  suggestions?: string[];
  title?: string;
}

export const SmartSuggestionBox: React.FC<SmartSuggestionBoxProps> = ({
  suggestions,
  title = "Smart Suggestions"
}) => {
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<string>('');

  const getTimeBasedSuggestions = () => {
    const now = new Date();
    const hour = now.getHours();
    
    let period = '';
    let suggestionsList: string[] = [];
    
    if (hour >= 5 && hour < 12) {
      period = 'morning';
      suggestionsList = [
        'Start with high-energy Physics problems',
        'Review yesterday\'s concepts',
        'Fresh mind = Complex topics',
        'Morning is perfect for new learning'
      ];
    } else if (hour >= 12 && hour < 17) {
      period = 'afternoon';
      suggestionsList = [
        'Practice numerical problems',
        'Take short concept quizzes',
        'Review and consolidate',
        'Focus on application-based learning'
      ];
    } else if (hour >= 17 && hour < 21) {
      period = 'evening';
      suggestionsList = [
        'Light revision sessions',
        'Flashcard practice',
        'Solve previous year questions',
        'Group study time'
      ];
    } else {
      period = 'night';
      suggestionsList = [
        'Quick concept review',
        'Plan tomorrow\'s study',
        'Light reading only',
        'Rest is important too!'
      ];
    }
    
    return { period, suggestions: suggestionsList };
  };

  const getTimeIcon = (period: string) => {
    switch (period) {
      case 'morning':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'afternoon':
        return <CloudSun className="h-5 w-5 text-orange-500" />;
      case 'evening':
        return <Sunset className="h-5 w-5 text-orange-600" />;
      case 'night':
        return <Moon className="h-5 w-5 text-blue-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
    }
  };

  useEffect(() => {
    const updateSuggestions = () => {
      if (suggestions) {
        setCurrentSuggestions(suggestions);
        setTimeOfDay('');
      } else {
        const { period, suggestions: timeSuggestions } = getTimeBasedSuggestions();
        setCurrentSuggestions(timeSuggestions);
        setTimeOfDay(period);
      }
    };

    // Update immediately
    updateSuggestions();

    // Update every minute
    const interval = setInterval(updateSuggestions, 60000);

    return () => clearInterval(interval);
  }, [suggestions]);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {timeOfDay ? getTimeIcon(timeOfDay) : <Lightbulb className="h-5 w-5 text-blue-600" />}
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">
            {timeOfDay ? `${title} (${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)})` : title}
          </h3>
        </div>
        <div className="space-y-2">
          {currentSuggestions.map((suggestion, index) => (
            <Badge key={index} variant="outline" className="text-blue-800 dark:text-blue-200 border-blue-300">
              {suggestion}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
