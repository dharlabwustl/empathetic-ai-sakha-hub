
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Brain, Target, Star, ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface SmartSuggestionsCenterProps {
  performance: {
    accuracy: number;
    quizScores: number;
    conceptProgress: number;
    streak: number;
  };
}

export default function SmartSuggestionsCenter({ performance }: SmartSuggestionsCenterProps) {
  const getSuggestion = () => {
    if (performance.accuracy > 80 && performance.quizScores > 85) {
      return {
        icon: <Rocket className="h-5 w-5 text-violet-500" />,
        text: "You're ready for advanced practice exams! Your high accuracy shows mastery 📚🚀.",
        color: "bg-violet-50 border-violet-200 dark:bg-violet-900/30 dark:border-violet-700/50",
        gradient: "from-violet-500 to-purple-600",
        actionText: "Try Advanced Exam",
        actionLink: "/dashboard/student/practice-exam"
      };
    } else if (performance.conceptProgress > 70 && performance.accuracy < 60) {
      return {
        icon: <Brain className="h-5 w-5 text-emerald-500" />,
        text: "Strong conceptual understanding, but recall needs improvement. Focus on flashcards today 🧠.",
        color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-700/50",
        gradient: "from-emerald-500 to-green-600",
        actionText: "Review Flashcards",
        actionLink: "/dashboard/student/flashcards"
      };
    } else if (performance.conceptProgress < 50) {
      return {
        icon: <Target className="h-5 w-5 text-amber-500" />,
        text: "Focus on core concepts first. Small wins will build momentum for more complex topics 🎯.",
        color: "bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700/50",
        gradient: "from-amber-500 to-orange-600",
        actionText: "Study Core Concepts",
        actionLink: "/dashboard/student/concepts"
      };
    } else if (performance.streak >= 5) {
      return {
        icon: <Star className="h-5 w-5 text-blue-500" />,
        text: "Amazing 5-day streak! Your consistency is paying off. Ready for a challenge? 🌟",
        color: "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/50",
        gradient: "from-blue-500 to-indigo-600",
        actionText: "Take a Challenge",
        actionLink: "/dashboard/student/practice-exam"
      };
    }
    
    return {
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      text: "Based on your recent activity, we recommend focusing on key concepts today.",
      color: "bg-purple-50 border-purple-200 dark:bg-purple-900/30 dark:border-purple-700/50",
      gradient: "from-purple-500 to-indigo-600",
      actionText: "View Recommendation",
      actionLink: "/dashboard/student/today"
    };
  };
  
  const suggestion = getSuggestion();

  return (
    <Card className="overflow-hidden border-0 shadow-md relative animate-pulse border-2 border-orange-300 shadow-lg shadow-orange-200/50">
      {/* Enhanced animated arrow for Top Priority with glow effect */}
      <div className="absolute -top-4 left-4 animate-bounce z-10">
        <div className="relative">
          <ArrowDown className="h-7 w-7 text-orange-500 drop-shadow-lg filter" />
          <div className="absolute inset-0 h-7 w-7 text-orange-300 animate-ping">
            <ArrowDown className="h-7 w-7" />
          </div>
        </div>
      </div>
      
      {/* Enhanced sparkle animations with varying sizes and delays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute top-8 left-3 w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-8 right-5 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-1/2 right-2 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '2.4s' }}></div>
        <div className="absolute bottom-1/2 left-6 w-1.5 h-1.5 bg-orange-300 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Enhanced gradient overlay with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-transparent to-red-50/40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-50/30 to-orange-50/50 pointer-events-none"></div>

      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 pb-2 relative z-10 border-b border-orange-100/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-6 w-6 text-orange-500 animate-pulse" />
          Today's Top Priority
          <Badge variant="secondary" className="text-xs animate-pulse bg-orange-100 text-orange-800 border-orange-300 shadow-sm">
            PRIORITY!
          </Badge>
          <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pb-5 relative z-10">
        <div className={`p-4 rounded-lg ${suggestion.color} border mb-3 shadow-sm`}>
          <div className="flex items-start gap-3">
            {suggestion.icon}
            <p className="text-sm">{suggestion.text}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 dark:bg-purple-800/50 p-1.5 rounded-full">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              </div>
              <span className="text-sm font-medium">Performance Alerts</span>
            </div>
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">All Good</span>
          </div>
          
          <Link to={suggestion.actionLink} className="no-underline">
            <Button 
              className={`w-full bg-gradient-to-r ${suggestion.gradient} hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all duration-200`}
            >
              {suggestion.actionText} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
