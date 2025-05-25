
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { 
  Clock, 
  Target, 
  Zap, 
  RefreshCw, 
  Coffee, 
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface TodaysPlanSmartSuggestionsProps {
  planData: TodaysPlanData | null;
  onActionClick: (action: string) => void;
  isMobile?: boolean;
}

const TodaysPlanSmartSuggestions: React.FC<TodaysPlanSmartSuggestionsProps> = ({ 
  planData, 
  onActionClick, 
  isMobile = false 
}) => {
  if (!planData) return null;

  const completedTasks = [
    ...planData.concepts.filter(c => c.status === 'completed').length,
    ...planData.flashcards.filter(f => f.status === 'completed').length,
    ...planData.practiceExams.filter(p => p.status === 'completed').length
  ].length;

  const totalTasks = planData.concepts.length + planData.flashcards.length + planData.practiceExams.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const suggestions = [
    {
      id: 'prioritize-weak',
      title: 'Focus on Weak Areas',
      description: 'Tackle challenging topics first while you\'re fresh',
      icon: <Target className="h-4 w-4 text-red-500" />,
      action: 'concepts',
      priority: 'high',
      condition: completionRate < 30
    },
    {
      id: 'quick-wins',
      title: 'Complete Quick Tasks',
      description: 'Finish easy flashcards to build momentum',
      icon: <Zap className="h-4 w-4 text-yellow-500" />,
      action: 'flashcards',
      priority: 'medium',
      condition: completionRate >= 30 && completionRate < 70
    },
    {
      id: 'practice-test',
      title: 'Take Practice Test',
      description: 'Test your knowledge with a mock exam',
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      action: 'practice-exam',
      priority: 'high',
      condition: completionRate >= 70
    },
    {
      id: 'manage-backlog',
      title: 'Review Backlog',
      description: 'Check pending tasks from previous days',
      icon: <RefreshCw className="h-4 w-4 text-blue-500" />,
      action: 'concepts',
      priority: 'medium',
      condition: true
    },
    {
      id: 'take-break',
      title: 'Take a Break',
      description: 'You\'ve been productive! Time for a short break',
      icon: <Coffee className="h-4 w-4 text-purple-500" />,
      action: 'break',
      priority: 'low',
      condition: completionRate >= 50
    }
  ];

  const visibleSuggestions = suggestions.filter(s => s.condition).slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          Smart Suggestions
          <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
            {Math.round(completionRate)}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onActionClick(suggestion.action)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
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
              <Button variant="ghost" size="sm" className="ml-2">
                Start
              </Button>
            </div>
          ))}
          
          {totalTasks > 0 && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Today's Progress</span>
                <span className="font-medium">{completedTasks}/{totalTasks} tasks</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSmartSuggestions;
