
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Brain, Target, Coffee, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DailySmartSuggestionsProps {
  examReadinessScore?: number;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ 
  examReadinessScore = 75 
}) => {
  const navigate = useNavigate();

  const suggestions = [
    {
      id: 'focus-weak',
      title: 'Focus on Weak Areas',
      description: 'Spend 30 minutes on Thermodynamics concepts',
      icon: <Target className="h-4 w-4" />,
      priority: 'high',
      action: () => navigate('/dashboard/student/concepts'),
      timeEstimate: '30 min'
    },
    {
      id: 'quick-revision',
      title: 'Quick Revision',
      description: 'Review Organic Chemistry flashcards',
      icon: <Brain className="h-4 w-4" />,
      priority: 'medium',
      action: () => navigate('/dashboard/student/flashcards'),
      timeEstimate: '15 min'
    },
    {
      id: 'practice-test',
      title: 'Practice Test',
      description: 'Take a 20-question Physics mock test',
      icon: <BookOpen className="h-4 w-4" />,
      priority: 'high',
      action: () => navigate('/dashboard/student/practice-exam'),
      timeEstimate: '25 min'
    },
    {
      id: 'break-time',
      title: 'Take a Break',
      description: 'You\'ve been studying for 2 hours. Time for a break!',
      icon: <Coffee className="h-4 w-4" />,
      priority: 'low',
      action: () => navigate('/dashboard/student/feel-good-corner'),
      timeEstimate: '10 min'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.slice(0, 3).map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={suggestion.action}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{suggestion.timeEstimate}</span>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3"
            onClick={() => navigate('/dashboard/student/today')}
          >
            View All Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
