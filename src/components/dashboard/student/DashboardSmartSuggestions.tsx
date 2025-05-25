
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Brain, Target, Star, ArrowRight, BookOpen, Clock, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface DashboardSmartSuggestionsProps {
  performance: {
    accuracy: number;
    quizScores: number;
    conceptProgress: number;
    streak: number;
  };
}

const DashboardSmartSuggestions: React.FC<DashboardSmartSuggestionsProps> = ({ performance }) => {
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
      actionText: "View Today's Plan",
      actionLink: "/dashboard/student/today"
    };
  };
  
  const suggestion = getSuggestion();

  // Daily smart suggestions
  const dailySuggestions = [
    {
      icon: <BookOpen className="h-4 w-4 text-blue-500" />,
      title: "Review Concepts",
      description: "5 concept cards pending review",
      action: "Review Now",
      link: "/dashboard/student/concepts"
    },
    {
      icon: <Clock className="h-4 w-4 text-orange-500" />,
      title: "Today's Plan",
      description: "3 tasks remaining for today",
      action: "View Plan",
      link: "/dashboard/student/today"
    },
    {
      icon: <FileCheck className="h-4 w-4 text-green-500" />,
      title: "Practice Test",
      description: "Take a quick 10-question quiz",
      action: "Start Quiz",
      link: "/dashboard/student/practice-exam"
    }
  ];

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-500" />
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Main suggestion */}
        <div className={`p-4 rounded-lg ${suggestion.color} border mb-4 shadow-sm`}>
          <div className="flex items-start gap-3">
            {suggestion.icon}
            <p className="text-sm">{suggestion.text}</p>
          </div>
        </div>
        
        {/* Daily action items */}
        <div className="space-y-3">
          {dailySuggestions.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
              <Link to={item.link}>
                <Button variant="outline" size="sm" className="text-xs">
                  {item.action}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Main action button */}
        <Link to={suggestion.actionLink} className="no-underline">
          <Button 
            className={`w-full mt-4 bg-gradient-to-r ${suggestion.gradient} hover:opacity-90 text-white`}
          >
            {suggestion.actionText} <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DashboardSmartSuggestions;
