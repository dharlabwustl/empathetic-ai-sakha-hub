
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Target, Calendar, Clock, TrendingUp, BookOpen } from 'lucide-react';

interface DailySmartSuggestionsProps {
  performance?: {
    accuracy: number;
    quizScores: number;
    conceptProgress: number;
    streak: number;
  };
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ 
  performance = {
    accuracy: 78,
    quizScores: 85,
    conceptProgress: 72,
    streak: 7
  }
}) => {
  const getDailySmartSuggestions = () => {
    const suggestions = [];

    if (performance.accuracy > 80 && performance.quizScores > 85) {
      suggestions.push({
        icon: <Target className="h-4 w-4 text-green-600" />,
        title: "Ready for Advanced Practice",
        text: "Your high accuracy shows mastery. Time for advanced practice exams!",
        color: "bg-green-50 border-green-200",
        textColor: "text-green-800",
        action: "Take Advanced Exam",
        actionLink: "/dashboard/student/practice-exam"
      });
    }

    if (performance.conceptProgress > 70 && performance.accuracy < 60) {
      suggestions.push({
        icon: <Brain className="h-4 w-4 text-blue-600" />,
        title: "Focus on Recall",
        text: "Strong concepts, but recall needs work. Flashcard practice recommended.",
        color: "bg-blue-50 border-blue-200",
        textColor: "text-blue-800",
        action: "Practice Flashcards",
        actionLink: "/dashboard/student/flashcards"
      });
    }

    if (performance.conceptProgress < 50) {
      suggestions.push({
        icon: <BookOpen className="h-4 w-4 text-amber-600" />,
        title: "Build Foundation",
        text: "Focus on core concepts first. Small wins build momentum.",
        color: "bg-amber-50 border-amber-200",
        textColor: "text-amber-800",
        action: "Study Concepts",
        actionLink: "/dashboard/student/concepts"
      });
    }

    if (performance.streak >= 5) {
      suggestions.push({
        icon: <TrendingUp className="h-4 w-4 text-purple-600" />,
        title: "Streak Master!",
        text: "Amazing study streak! Your consistency is paying off.",
        color: "bg-purple-50 border-purple-200",
        textColor: "text-purple-800",
        action: "Keep Going",
        actionLink: "/dashboard/student/today"
      });
    }

    // Add time-based suggestions
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 11) {
      suggestions.push({
        icon: <Clock className="h-4 w-4 text-indigo-600" />,
        title: "Peak Learning Time",
        text: "Morning is perfect for complex topics. Tackle difficult concepts now.",
        color: "bg-indigo-50 border-indigo-200",
        textColor: "text-indigo-800",
        action: "Start Learning",
        actionLink: "/dashboard/student/concepts"
      });
    }

    return suggestions.slice(0, 3);
  };

  const suggestions = getDailySmartSuggestions();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-purple-600" />
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className={`p-4 rounded-lg border ${suggestion.color} ${suggestion.textColor}`}>
            <div className="flex items-start gap-3 mb-3">
              {suggestion.icon}
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{suggestion.title}</h4>
                <p className="text-sm opacity-90">{suggestion.text}</p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full border-current text-current hover:bg-current hover:text-white"
              onClick={() => window.location.href = suggestion.actionLink}
            >
              {suggestion.action}
            </Button>
          </div>
        ))}
        
        {/* Quick stats */}
        <div className="pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-gray-800">{performance.streak}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-gray-800">{performance.accuracy}%</div>
              <div className="text-xs text-gray-600">Accuracy</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
