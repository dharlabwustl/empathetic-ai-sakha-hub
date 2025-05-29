
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Clock } from 'lucide-react';

interface SmartSuggestionBoxProps {
  suggestions?: string[];
  title?: string;
}

export const SmartSuggestionBox: React.FC<SmartSuggestionBoxProps> = ({
  suggestions: propSuggestions,
  title = "Smart Suggestions"
}) => {
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  // Time-based suggestions that update based on current hour
  const getTimeBasedSuggestions = (): string[] => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      // Morning (5 AM - 12 PM)
      return [
        "Start with high-energy Physics problems",
        "Review yesterday's weak concepts",
        "Practice numerical problems in Chemistry",
        "Solve 10 Biology diagrams",
        "Complete morning revision checklist"
      ];
    } else if (hour >= 12 && hour < 17) {
      // Afternoon (12 PM - 5 PM)
      return [
        "Take a challenging practice test",
        "Focus on complex organic reactions",
        "Analyze previous year questions",
        "Work on theorem proofs",
        "Complete mock exam analysis"
      ];
    } else if (hour >= 17 && hour < 22) {
      // Evening (5 PM - 10 PM)
      return [
        "Review today's study notes",
        "Practice quick recall flashcards",
        "Solve short answer questions",
        "Watch concept recap videos",
        "Prepare tomorrow's study plan"
      ];
    } else {
      // Night (10 PM - 5 AM)
      return [
        "Light revision of key formulas",
        "Review important definitions",
        "Quick concept refresher",
        "Plan tomorrow's priorities",
        "Relaxing biology reading"
      ];
    }
  };

  // Update suggestions every minute
  useEffect(() => {
    const updateSuggestions = () => {
      if (!propSuggestions) {
        const timeBased = getTimeBasedSuggestions();
        // Randomize and pick 3-4 suggestions
        const shuffled = timeBased.sort(() => 0.5 - Math.random());
        setCurrentSuggestions(shuffled.slice(0, Math.max(3, Math.min(4, shuffled.length))));
      } else {
        setCurrentSuggestions(propSuggestions);
      }
      setLastUpdateTime(new Date());
    };

    // Initial update
    updateSuggestions();

    // Update every minute
    const interval = setInterval(updateSuggestions, 60000);

    return () => clearInterval(interval);
  }, [propSuggestions]);

  const getTimeOfDayText = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Morning Focus";
    if (hour >= 12 && hour < 17) return "Afternoon Power";
    if (hour >= 17 && hour < 22) return "Evening Review";
    return "Night Study";
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">{title}</h3>
          <div className="flex items-center gap-1 ml-auto">
            <Clock className="h-3 w-3 text-blue-500" />
            <span className="text-xs text-blue-600 dark:text-blue-300">{getTimeOfDayText()}</span>
          </div>
        </div>
        <div className="space-y-2">
          {currentSuggestions.map((suggestion, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-blue-800 dark:text-blue-200 border-blue-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-blue-500 mt-2 opacity-70">
          Last updated: {lastUpdateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </CardContent>
    </Card>
  );
};
