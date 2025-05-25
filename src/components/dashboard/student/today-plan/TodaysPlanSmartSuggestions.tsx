
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, AlertTriangle, Target, ArrowRight, BookOpen, Brain, FileCheck } from 'lucide-react';

interface TodaysPlanSmartSuggestionsProps {
  planData?: any;
  onActionClick: (action: string) => void;
  isMobile?: boolean;
}

const TodaysPlanSmartSuggestions: React.FC<TodaysPlanSmartSuggestionsProps> = ({
  planData,
  onActionClick,
  isMobile = false
}) => {
  // Mock data for demonstration
  const completedTasks = 2;
  const totalTasks = 5;
  const backlogTasks = 3;
  const urgentTasks = 1;

  const suggestions = [
    {
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      title: "Complete Remaining Tasks",
      description: `You have ${totalTasks - completedTasks} tasks left for today`,
      action: "View Tasks",
      actionType: "today",
      priority: "high"
    },
    {
      icon: <AlertTriangle className="h-4 w-4 text-orange-500" />,
      title: "Address Backlog",
      description: `${backlogTasks} tasks from previous days need attention`,
      action: "Review Backlog",
      actionType: "backlog",
      priority: "medium"
    },
    {
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      title: "Urgent Tasks",
      description: `${urgentTasks} high-priority task requires immediate attention`,
      action: "Handle Urgent",
      actionType: "urgent",
      priority: "high"
    },
    {
      icon: <Target className="h-4 w-4 text-purple-500" />,
      title: "Focus Session",
      description: "Start a 25-minute focused study session",
      action: "Start Focus",
      actionType: "focus",
      priority: "medium"
    }
  ];

  const quickActions = [
    {
      icon: <BookOpen className="h-4 w-4 text-blue-500" />,
      title: "Study Concepts",
      action: () => onActionClick('concepts')
    },
    {
      icon: <Brain className="h-4 w-4 text-purple-500" />,
      title: "Practice Flashcards",
      action: () => onActionClick('flashcards')
    },
    {
      icon: <FileCheck className="h-4 w-4 text-green-500" />,
      title: "Take Quiz",
      action: () => onActionClick('practice-exam')
    }
  ];

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Smart Suggestions for Task Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-300">Today's Progress</h4>
              <p className="text-sm text-green-600 dark:text-green-400">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {Math.round((completedTasks / totalTasks) * 100)}%
              </div>
            </div>
          </div>
          <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="space-y-3 mb-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                suggestion.priority === 'high' 
                  ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' 
                  : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                    {suggestion.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{suggestion.description}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => onActionClick(suggestion.actionType)}
                >
                  {suggestion.action}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Quick Actions
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2"
                onClick={action.action}
              >
                {action.icon}
                <span className="text-xs">{action.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Backlog Management */}
        {backlogTasks > 0 && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-300">Backlog Management</h4>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  {backlogTasks} overdue tasks need your attention
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={() => onActionClick('backlog')}
              >
                Manage Backlog
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSmartSuggestions;
