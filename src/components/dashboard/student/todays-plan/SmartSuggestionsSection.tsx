
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Lightbulb, Target, Zap, Clock, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface SmartSuggestionsSectionProps {
  planData: TodaysPlanData | null;
  onActionClick: (action: string) => void;
  isMobile?: boolean;
}

const SmartSuggestionsSection: React.FC<SmartSuggestionsSectionProps> = ({ 
  planData, 
  onActionClick,
  isMobile 
}) => {
  if (!planData) return null;

  const completionRate = (planData.completedTasks / planData.totalTasks) * 100;
  const currentHour = new Date().getHours();
  const remainingTasks = planData.totalTasks - planData.completedTasks;

  const getSmartSuggestions = () => {
    const suggestions = [];

    // Completion-based suggestions
    if (completionRate === 100) {
      suggestions.push({
        icon: <Star className="h-5 w-5 text-yellow-500" />,
        title: "Perfect Day Completed! 🎉",
        description: "You've completed all tasks for today. Consider exploring bonus content or taking a well-deserved break.",
        action: "Explore Bonus",
        actionType: "bonus",
        priority: "celebration",
        bgColor: "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
        borderColor: "border-yellow-200 dark:border-yellow-800"
      });
    } else if (completionRate >= 75) {
      suggestions.push({
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        title: "Almost There! 🚀",
        description: `Only ${remainingTasks} task${remainingTasks > 1 ? 's' : ''} left. You're doing amazing - finish strong!`,
        action: "Continue Tasks",
        actionType: "continue",
        priority: "high",
        bgColor: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        borderColor: "border-green-200 dark:border-green-800"
      });
    } else if (completionRate >= 50) {
      suggestions.push({
        icon: <Zap className="h-5 w-5 text-blue-500" />,
        title: "Great Momentum! ⚡",
        description: "You're halfway through! Take a 5-minute break and then tackle the next challenge.",
        action: "Take Break",
        actionType: "break",
        priority: "medium",
        bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
        borderColor: "border-blue-200 dark:border-blue-800"
      });
    } else if (completionRate >= 25) {
      suggestions.push({
        icon: <Target className="h-5 w-5 text-purple-500" />,
        title: "Building Momentum 💪",
        description: "Good start! Focus on your strongest subject next to build confidence.",
        action: "Study Strong Subject",
        actionType: "strong-subject",
        priority: "medium",
        bgColor: "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
        borderColor: "border-purple-200 dark:border-purple-800"
      });
    } else {
      suggestions.push({
        icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
        title: "Let's Get Started! 🌟",
        description: "Start with a quick 15-minute concept review to warm up your brain.",
        action: "Quick Start",
        actionType: "quick-start",
        priority: "high",
        bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
        borderColor: "border-amber-200 dark:border-amber-800"
      });
    }

    // Time-based suggestions
    if (currentHour < 12 && completionRate < 30) {
      suggestions.push({
        icon: <Clock className="h-5 w-5 text-indigo-500" />,
        title: "Morning Power Hour 🌅",
        description: "Your brain is fresh! Perfect time for challenging concepts and new learning.",
        action: "Study Concepts",
        actionType: "concepts",
        priority: "medium",
        bgColor: "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
        borderColor: "border-indigo-200 dark:border-indigo-800"
      });
    } else if (currentHour > 18 && remainingTasks > 0) {
      suggestions.push({
        icon: <Brain className="h-5 w-5 text-teal-500" />,
        title: "Evening Review Time 🌙",
        description: "Evening is perfect for flashcard reviews and light practice sessions.",
        action: "Review Flashcards",
        actionType: "flashcards",
        priority: "medium",
        bgColor: "bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20",
        borderColor: "border-teal-200 dark:border-teal-800"
      });
    }

    // Streak-based suggestions
    if (planData.streak >= 7) {
      suggestions.push({
        icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
        title: "Amazing Streak! 🔥",
        description: `${planData.streak} days of consistent study! You're building excellent habits.`,
        action: "Keep Streak",
        actionType: "streak",
        priority: "low",
        bgColor: "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
        borderColor: "border-emerald-200 dark:border-emerald-800"
      });
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  const suggestions = getSmartSuggestions();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'celebration':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">🎉 Celebration</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Recommended</Badge>;
      case 'low':
        return <Badge variant="outline">Bonus</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Brain className="h-6 w-6 text-violet-600" />
          Smart Suggestions for Today
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          AI-powered recommendations based on your progress and optimal learning times
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-2 ${suggestion.bgColor} ${suggestion.borderColor} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    {suggestion.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {suggestion.title}
                    </h3>
                    {getPriorityBadge(suggestion.priority)}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {suggestion.description}
              </p>
              
              <Button 
                onClick={() => onActionClick(suggestion.actionType)}
                className="w-full sm:w-auto"
                variant={suggestion.priority === 'high' ? 'default' : 'outline'}
              >
                {suggestion.action}
              </Button>
            </div>
          ))}
        </div>

        {/* Progress Insight */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Today's Progress Insight
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {completionRate >= 75 
              ? "You're performing exceptionally well today! Your consistency is paying off."
              : completionRate >= 50
              ? "Solid progress so far. You're on track to meet your daily goals."
              : completionRate >= 25
              ? "Good start! Remember, small consistent steps lead to big achievements."
              : "Every expert was once a beginner. Take the first step and build momentum!"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsSection;
