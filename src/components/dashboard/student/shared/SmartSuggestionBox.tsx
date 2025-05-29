
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ArrowDown, Sparkles } from 'lucide-react';

interface SmartSuggestionBoxProps {
  suggestions: string[];
  title?: string;
  isTopPriority?: boolean;
  isStudyPlan?: boolean;
}

export const SmartSuggestionBox: React.FC<SmartSuggestionBoxProps> = ({
  suggestions,
  title = "Smart Suggestions",
  isTopPriority = false,
  isStudyPlan = false
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dynamicSuggestions, setDynamicSuggestions] = useState(suggestions);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Generate time-based suggestions
  useEffect(() => {
    const hour = currentTime.getHours();
    let timeBased: string[] = [];

    if (hour >= 5 && hour < 12) {
      // Morning (5 AM - 12 PM)
      timeBased = [
        "Start with complex topics - your brain is fresh!",
        "Review yesterday's concepts first",
        "Focus on Physics and Math this morning",
        "Take breaks every 45 minutes"
      ];
    } else if (hour >= 12 && hour < 17) {
      // Afternoon (12 PM - 5 PM)
      timeBased = [
        "Practice previous year questions now",
        "Focus on Chemistry reactions and formulas",
        "Take a power nap if feeling tired",
        "Review flashcards for quick revision"
      ];
    } else if (hour >= 17 && hour < 22) {
      // Evening (5 PM - 10 PM)
      timeBased = [
        "Perfect time for Biology memorization",
        "Solve mock tests and analyze errors",
        "Group study with friends online",
        "Review the day's learning progress"
      ];
    } else {
      // Night/Late (10 PM - 5 AM)
      timeBased = [
        "Light revision only - avoid new topics",
        "Practice meditation for better sleep",
        "Review formula sheets quickly",
        "Plan tomorrow's study schedule"
      ];
    }

    // Merge with original suggestions, prioritizing time-based ones
    const merged = [...timeBased.slice(0, 2), ...suggestions.slice(0, 2)];
    setDynamicSuggestions(merged);
  }, [currentTime, suggestions]);

  // Animation classes for special sections
  const getAnimationClasses = () => {
    if (isTopPriority) {
      return "relative animate-pulse border-2 border-orange-300 shadow-lg shadow-orange-200/50";
    }
    if (isStudyPlan) {
      return "relative animate-pulse border-2 border-blue-300 shadow-lg shadow-blue-200/50";
    }
    return "";
  };

  const getGradientClasses = () => {
    if (isTopPriority) {
      return "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200";
    }
    if (isStudyPlan) {
      return "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200";
    }
    return "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200";
  };

  return (
    <Card className={`${getGradientClasses()} ${getAnimationClasses()}`}>
      {/* Animated arrow for special sections */}
      {(isTopPriority || isStudyPlan) && (
        <div className="absolute -top-3 left-4 animate-bounce">
          <ArrowDown className={`h-6 w-6 ${isTopPriority ? 'text-orange-500' : 'text-blue-500'}`} />
        </div>
      )}
      
      {/* Premium sparkle animations for enhanced sections */}
      {(isTopPriority || isStudyPlan) && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-4 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-6 left-2 w-1 h-1 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className={`h-5 w-5 ${isTopPriority ? 'text-orange-600' : isStudyPlan ? 'text-blue-600' : 'text-blue-600'}`} />
          <h3 className={`font-semibold ${isTopPriority ? 'text-orange-900 dark:text-orange-100' : isStudyPlan ? 'text-blue-900 dark:text-blue-100' : 'text-blue-900 dark:text-blue-100'}`}>
            {title}
          </h3>
          {(isTopPriority || isStudyPlan) && (
            <Badge variant="secondary" className="text-xs animate-pulse">
              {isTopPriority ? 'PRIORITY!' : 'LIVE PLAN'}
            </Badge>
          )}
          {(isTopPriority || isStudyPlan) && (
            <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
          )}
        </div>
        <div className="space-y-2">
          {dynamicSuggestions.map((suggestion, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={`${
                isTopPriority ? 'text-orange-800 dark:text-orange-200 border-orange-300' : 
                isStudyPlan ? 'text-blue-800 dark:text-blue-200 border-blue-300' : 
                'text-blue-800 dark:text-blue-200 border-blue-300'
              } ${index < 2 ? 'animate-pulse' : ''}`}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
        {(isTopPriority || isStudyPlan) && (
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Updated {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
