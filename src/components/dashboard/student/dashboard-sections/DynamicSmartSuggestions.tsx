
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Brain, Target, Star, ArrowRight, TrendingUp, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface DynamicSmartSuggestionsProps {
  performance: {
    accuracy: number;
    quizScores: number;
    conceptProgress: number;
    streak: number;
  };
  userProfile?: {
    name: string;
    examGoal?: string;
  };
}

export default function DynamicSmartSuggestions({ 
  performance, 
  userProfile 
}: DynamicSmartSuggestionsProps) {
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [dailyTip, setDailyTip] = useState('');

  // Generate daily suggestions based on date and performance
  const getDailySuggestions = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const hour = today.getHours();
    
    const suggestions = [];

    // Performance-based suggestions
    if (performance.accuracy > 80 && performance.quizScores > 85) {
      suggestions.push({
        icon: <Star className="h-5 w-5 text-yellow-500" />,
        title: "Challenge Yourself",
        text: "Your accuracy is excellent! Try advanced practice problems to push your limits.",
        color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700/50",
        actionText: "Take Advanced Test",
        actionLink: "/dashboard/student/practice-exam",
        priority: "high"
      });
    }

    if (performance.conceptProgress < 60) {
      suggestions.push({
        icon: <Brain className="h-5 w-5 text-blue-500" />,
        title: "Strengthen Foundation",
        text: "Focus on core concepts today. Small consistent steps lead to big improvements!",
        color: "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/50",
        actionText: "Study Concepts",
        actionLink: "/dashboard/student/concepts",
        priority: "high"
      });
    }

    if (performance.streak >= 7) {
      suggestions.push({
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        title: "Amazing Streak!",
        text: `${performance.streak} days strong! Your consistency is exceptional. Keep the momentum!`,
        color: "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700/50",
        actionText: "Continue Streak",
        actionLink: "/dashboard/student/today",
        priority: "medium"
      });
    }

    // Time-based suggestions
    if (hour >= 6 && hour < 12) {
      suggestions.push({
        icon: <Clock className="h-5 w-5 text-purple-500" />,
        title: "Morning Focus",
        text: "Great time for complex concepts! Your brain is fresh and ready for challenging topics.",
        color: "bg-purple-50 border-purple-200 dark:bg-purple-900/30 dark:border-purple-700/50",
        actionText: "Start Learning",
        actionLink: "/dashboard/student/concepts",
        priority: "medium"
      });
    } else if (hour >= 14 && hour < 18) {
      suggestions.push({
        icon: <Target className="h-5 w-5 text-orange-500" />,
        title: "Practice Time",
        text: "Perfect afternoon energy for practice tests and problem-solving sessions.",
        color: "bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:border-orange-700/50",
        actionText: "Practice Now",
        actionLink: "/dashboard/student/practice-exam",
        priority: "medium"
      });
    }

    // Day-based suggestions
    if (dayOfWeek === 1) { // Monday
      suggestions.push({
        icon: <Calendar className="h-5 w-5 text-indigo-500" />,
        title: "Week Planning",
        text: "Start strong! Set your weekly goals and plan your study schedule for maximum efficiency.",
        color: "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700/50",
        actionText: "Plan Week",
        actionLink: "/dashboard/student/today",
        priority: "low"
      });
    } else if (dayOfWeek === 5) { // Friday
      suggestions.push({
        icon: <Star className="h-5 w-5 text-pink-500" />,
        title: "Week Review",
        text: "Great work this week! Review what you've learned and celebrate your progress.",
        color: "bg-pink-50 border-pink-200 dark:bg-pink-900/30 dark:border-pink-700/50",
        actionText: "Review Progress",
        actionLink: "/dashboard/student/academic",
        priority: "low"
      });
    }

    // Sort by priority
    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const suggestions = getDailySuggestions();
  const currentSuggestionData = suggestions[currentSuggestion] || suggestions[0];

  // Daily motivational tips
  const dailyTips = [
    "Remember: Progress, not perfection! Every small step counts.",
    "Your brain grows stronger with each challenge you tackle.",
    "Consistency beats intensity. Keep showing up every day!",
    "Mistakes are learning opportunities in disguise.",
    "You're closer to your goal than you were yesterday!",
    "Excellence is not a skill, it's an attitude.",
    "The best time to plant a tree was 20 years ago. The second best time is now."
  ];

  useEffect(() => {
    const today = new Date();
    const tipIndex = today.getDate() % dailyTips.length;
    setDailyTip(dailyTips[tipIndex]);
  }, []);

  // Rotate suggestions every 10 seconds
  useEffect(() => {
    if (suggestions.length > 1) {
      const interval = setInterval(() => {
        setCurrentSuggestion(prev => (prev + 1) % suggestions.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [suggestions.length]);

  if (!currentSuggestionData) {
    return (
      <Card className="overflow-hidden border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Keep studying to unlock personalized suggestions!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-violet-500" />
            Smart Suggestions
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Daily Tips
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Main Suggestion */}
        <div className={`p-4 rounded-lg ${currentSuggestionData.color} border shadow-sm`}>
          <div className="flex items-start gap-3 mb-3">
            {currentSuggestionData.icon}
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">{currentSuggestionData.title}</h4>
              <p className="text-sm">{currentSuggestionData.text}</p>
            </div>
          </div>
          <Link to={currentSuggestionData.actionLink} className="no-underline">
            <Button size="sm" className="w-full">
              {currentSuggestionData.actionText} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Daily Motivational Tip */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">Daily Motivation</span>
          </div>
          <p className="text-sm text-muted-foreground italic">"{dailyTip}"</p>
        </div>

        {/* Suggestion Indicator */}
        {suggestions.length > 1 && (
          <div className="flex items-center justify-center gap-2">
            {suggestions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSuggestion 
                    ? 'bg-violet-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              {currentSuggestion + 1} of {suggestions.length}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
