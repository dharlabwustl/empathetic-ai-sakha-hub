
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Brain, Target, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-500" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pb-5">
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
              className={`w-full bg-gradient-to-r ${suggestion.gradient} hover:opacity-90 text-white`}
            >
              {suggestion.actionText} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
