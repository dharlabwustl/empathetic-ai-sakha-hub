
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  BookOpen, 
  Brain, 
  Target, 
  Coffee, 
  Gift,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface SmartSuggestionsSectionProps {
  planData: TodaysPlanData | null;
  onActionClick: (action: string) => void;
  isMobile?: boolean;
}

const SmartSuggestionsSection: React.FC<SmartSuggestionsSectionProps> = ({ 
  planData, 
  onActionClick, 
  isMobile = false 
}) => {
  if (!planData) return null;

  const getCompletionRate = () => {
    return planData.totalTasks > 0 ? (planData.completedTasks / planData.totalTasks) * 100 : 0;
  };

  const completionRate = getCompletionRate();
  const hasBacklog = planData.backlogTasks && planData.backlogTasks.length > 0;

  // Generate smart suggestions based on current state
  const generateSuggestions = () => {
    const suggestions = [];

    // Backlog clearing suggestions
    if (hasBacklog && planData.backlogTasks.length > 0) {
      suggestions.push({
        id: 'clear-backlog',
        icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
        title: 'Clear Pending Backlog',
        description: `You have ${planData.backlogTasks.length} pending tasks. Start with the most overdue ones.`,
        action: 'concepts',
        priority: 'high',
        bgColor: 'bg-orange-50 border-orange-200',
        textColor: 'text-orange-800'
      });
    }

    // Progress-based suggestions
    if (completionRate < 30) {
      suggestions.push({
        id: 'start-concepts',
        icon: <BookOpen className="h-5 w-5 text-blue-600" />,
        title: 'Start with Key Concepts',
        description: 'Begin your day by studying fundamental concepts to build a strong foundation.',
        action: 'concepts',
        priority: 'high',
        bgColor: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-800'
      });
    } else if (completionRate >= 30 && completionRate < 70) {
      suggestions.push({
        id: 'practice-flashcards',
        icon: <Brain className="h-5 w-5 text-purple-600" />,
        title: 'Reinforce with Flashcards',
        description: 'Great progress! Now reinforce your learning with targeted flashcard practice.',
        action: 'flashcards',
        priority: 'medium',
        bgColor: 'bg-purple-50 border-purple-200',
        textColor: 'text-purple-800'
      });
    } else if (completionRate >= 70) {
      suggestions.push({
        id: 'take-practice-exam',
        icon: <Target className="h-5 w-5 text-green-600" />,
        title: 'Test Your Knowledge',
        description: 'Excellent work! Take a practice exam to assess your understanding.',
        action: 'practice-exam',
        priority: 'medium',
        bgColor: 'bg-green-50 border-green-200',
        textColor: 'text-green-800'
      });
    }

    // Time-based suggestions
    const currentHour = new Date().getHours();
    if (currentHour >= 14 && currentHour <= 16) {
      suggestions.push({
        id: 'afternoon-break',
        icon: <Coffee className="h-5 w-5 text-amber-600" />,
        title: 'Take a Focused Break',
        description: 'Mid-afternoon is perfect for a 15-minute break to recharge your mind.',
        action: 'break',
        priority: 'low',
        bgColor: 'bg-amber-50 border-amber-200',
        textColor: 'text-amber-800'
      });
    }

    // Motivational suggestion for good progress
    if (completionRate >= 80) {
      suggestions.push({
        id: 'reward-yourself',
        icon: <Gift className="h-5 w-5 text-pink-600" />,
        title: 'Great Progress!',
        description: 'You\'re doing amazing! Consider visiting the Feel Good Corner for motivation.',
        action: 'bonus',
        priority: 'low',
        bgColor: 'bg-pink-50 border-pink-200',
        textColor: 'text-pink-800'
      });
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  const suggestions = generateSuggestions();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Recommended</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Optional</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          Smart Suggestions
          <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
            {completionRate.toFixed(0)}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress indicator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Today's Progress</span>
              <span className="text-gray-600">{planData.completedTasks}/{planData.totalTasks} tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">{completionRate >= 50 ? 'On Track' : 'Keep Going'}</span>
          </div>
        </div>

        {/* Suggestion cards */}
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          {suggestions.map((suggestion) => (
            <Card 
              key={suggestion.id} 
              className={`${suggestion.bgColor} border hover:shadow-md transition-all duration-200 cursor-pointer`}
              onClick={() => onActionClick(suggestion.action)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium ${suggestion.textColor} text-sm`}>
                        {suggestion.title}
                      </h4>
                      {getPriorityBadge(suggestion.priority)}
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                      {suggestion.description}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full bg-white/80 hover:bg-white border-white/50 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onActionClick(suggestion.action);
                      }}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Take Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick stats */}
        {hasBacklog && (
          <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {planData.backlogTasks.length} pending tasks need attention
                </span>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-white text-orange-700 border-orange-200 hover:bg-orange-50"
                onClick={() => onActionClick('concepts')}
              >
                Clear Now
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsSection;
