
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Brain, Target, Star, ArrowRight, ArrowDown, Zap } from 'lucide-react';
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
    <Card className="overflow-hidden border-2 border-purple-200 shadow-md relative">
      {/* Animated arrow pointing down from above */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
        <ArrowDown className="h-6 w-6 text-purple-500 animate-bounce" />
      </div>
      
      {/* Sparkle effects with staggered timing */}
      <div className="absolute top-3 left-6 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
      <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
      <div className="absolute bottom-8 left-12 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
      <div className="absolute bottom-6 right-6 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '900ms' }}></div>
      <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1200ms' }}></div>
      
      {/* Pulsing border with colored shadow */}
      <div className="absolute inset-0 border-2 border-purple-300 rounded-lg animate-pulse shadow-lg shadow-purple-200/50"></div>
      
      {/* Glowing indicator */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1">
          <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
          <Badge className="bg-purple-500 text-white animate-pulse">PRIORITY!</Badge>
        </div>
      </div>

      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 pb-2 relative z-10">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-500" />
          Today's Top Priority
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pb-5 relative z-10">
        <div className={`p-4 rounded-lg ${suggestion.color} border mb-3 shadow-sm relative overflow-hidden`}>
          {/* Additional glow effect inside suggestion box */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="flex items-start gap-3 relative z-10">
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
              className={`w-full bg-gradient-to-r ${suggestion.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              {suggestion.actionText} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
