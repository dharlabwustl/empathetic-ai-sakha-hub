
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ArrowDown, Sparkles, Clock } from 'lucide-react';

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

  // Update time every minute for real-time suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Generate enhanced time-based suggestions with more context
  useEffect(() => {
    const hour = currentTime.getHours();
    const dayOfWeek = currentTime.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let timeBased: string[] = [];

    if (hour >= 5 && hour < 12) {
      // Morning (5 AM - 12 PM) - Peak cognitive performance
      timeBased = [
        "🌅 Morning brain is sharp - tackle complex Physics problems now!",
        "☕ Start with yesterday's revision - reinforce learning",
        "📚 Focus on Math and Physics - your brain is fresh!",
        "⏰ Take 10-minute breaks every 45 minutes for optimal focus",
        isWeekend ? "🎯 Weekend morning - perfect for challenging topics" : "📖 School prep - review today's upcoming subjects"
      ];
    } else if (hour >= 12 && hour < 17) {
      // Afternoon (12 PM - 5 PM) - Good for practice and application
      timeBased = [
        "🌞 Afternoon energy - perfect for practice questions!",
        "⚗️ Chemistry time - memorize reactions and formulas",
        "💤 Feeling drowsy? Quick 15-minute power nap works wonders",
        "🔄 Review flashcards for active recall",
        "📊 Analyze your morning study session progress"
      ];
    } else if (hour >= 17 && hour < 22) {
      // Evening (5 PM - 10 PM) - Great for Biology and review
      timeBased = [
        "🌆 Golden study hours - Biology memorization peak time!",
        "📝 Solve mock tests and analyze your mistakes",
        "👥 Join online study groups for collaborative learning",
        "📈 Review today's progress and plan tomorrow",
        "🎯 Practice weak areas identified today"
      ];
    } else {
      // Night/Late (10 PM - 5 AM) - Light revision only
      timeBased = [
        "🌙 Night owl? Light revision only - avoid heavy concepts",
        "🧘 Try meditation for better sleep and retention",
        "📋 Quick formula sheet review before bed",
        "📅 Plan tomorrow's study schedule",
        hour < 5 ? "😴 Consider getting rest for better performance tomorrow" : "🌅 Early bird! Start with gentle warm-up topics"
      ];
    }

    // Add time-specific motivational messages
    const motivationalBoosts = [
      "💪 You're building exam readiness with Prep-Zer!",
      "🚀 Every study session brings you closer to success!",
      "🏆 Consistent effort today = confident exam tomorrow!",
      "⭐ Your dedication is your competitive advantage!"
    ];

    // Merge suggestions: time-based + original + motivational
    const timeBasedSelection = timeBased.slice(0, 2);
    const originalSelection = suggestions.slice(0, 1);
    const motivationalSelection = motivationalBoosts.slice(0, 1);
    
    const merged = [...timeBasedSelection, ...originalSelection, ...motivationalSelection];
    setDynamicSuggestions(merged.slice(0, 4)); // Limit to 4 suggestions
  }, [currentTime, suggestions]);

  // Enhanced animation classes for special sections
  const getAnimationClasses = () => {
    if (isTopPriority) {
      return "relative animate-pulse border-2 border-orange-300 shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 transition-shadow duration-300";
    }
    if (isStudyPlan) {
      return "relative animate-pulse border-2 border-blue-300 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/60 transition-shadow duration-300";
    }
    return "hover:shadow-md transition-shadow duration-200";
  };

  const getGradientClasses = () => {
    if (isTopPriority) {
      return "bg-gradient-to-br from-orange-50 via-orange-25 to-red-50 dark:from-orange-950 dark:via-orange-925 dark:to-red-950 border-orange-200";
    }
    if (isStudyPlan) {
      return "bg-gradient-to-br from-blue-50 via-blue-25 to-indigo-50 dark:from-blue-950 dark:via-blue-925 dark:to-indigo-950 border-blue-200";
    }
    return "bg-gradient-to-br from-blue-50 via-blue-25 to-indigo-50 dark:from-blue-950 dark:via-blue-925 dark:to-indigo-950 border-blue-200";
  };

  return (
    <Card className={`${getGradientClasses()} ${getAnimationClasses()}`}>
      {/* Enhanced animated arrow for special sections */}
      {(isTopPriority || isStudyPlan) && (
        <div className="absolute -top-3 left-4 animate-bounce z-10">
          <div className="relative">
            <ArrowDown className={`h-6 w-6 ${isTopPriority ? 'text-orange-500' : 'text-blue-500'} drop-shadow-md`} />
            <div className={`absolute inset-0 h-6 w-6 ${isTopPriority ? 'text-orange-300' : 'text-blue-300'} animate-ping`}>
              <ArrowDown className="h-6 w-6" />
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced sparkle animations for premium sections */}
      {(isTopPriority || isStudyPlan) && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-4 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute top-6 left-2 w-1 h-1 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.8s' }}></div>
          <div className="absolute top-1/2 right-1 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '2.4s' }}></div>
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
              key={`${suggestion}-${index}`} 
              variant="outline" 
              className={`${
                isTopPriority ? 'text-orange-800 dark:text-orange-200 border-orange-300 bg-orange-50 dark:bg-orange-900/20' : 
                isStudyPlan ? 'text-blue-800 dark:text-blue-200 border-blue-300 bg-blue-50 dark:bg-blue-900/20' : 
                'text-blue-800 dark:text-blue-200 border-blue-300 bg-blue-50 dark:bg-blue-900/20'
              } ${index < 2 ? 'animate-pulse' : ''} text-xs leading-relaxed p-2 h-auto whitespace-normal text-left justify-start`}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
        {(isTopPriority || isStudyPlan) && (
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Updated {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
