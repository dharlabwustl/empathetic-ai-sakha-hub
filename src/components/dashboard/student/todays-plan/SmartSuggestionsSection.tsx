
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  AlertTriangle, 
  Coffee, 
  Star, 
  BookOpen, 
  Clock, 
  Zap,
  TrendingUp
} from 'lucide-react';
import { TodaysPlanData, SmartSuggestion } from '@/types/student/todaysPlan';

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

  // Generate smart suggestions based on current state
  const generateSmartSuggestions = (): SmartSuggestion[] => {
    const suggestions: SmartSuggestion[] = [];
    const currentHour = new Date().getHours();
    const completedTasks = planData.completedTasks;
    const totalTasks = planData.totalTasks;
    const backlogCount = planData.backlogTasks?.length || 0;

    // Morning productivity suggestion
    if (currentHour < 12 && completedTasks === 0) {
      suggestions.push({
        id: 'morning-boost',
        type: 'concept',
        title: 'Start with Concept Learning',
        description: 'Your brain is freshest in the morning - perfect for learning new concepts',
        action: 'concepts',
        priority: 'high',
        reason: 'Peak morning productivity',
        estimatedTime: 30
      });
    }

    // Backlog suggestion
    if (backlogCount > 0) {
      suggestions.push({
        id: 'clear-backlog',
        type: 'practice-exam',
        title: 'Clear Pending Backlog',
        description: `You have ${backlogCount} overdue tasks. Let's tackle them first!`,
        action: 'practice-exam',
        priority: 'high',
        reason: 'Reduce study debt',
        estimatedTime: 25
      });
    }

    // Progress-based suggestions
    if (completedTasks > 0 && completedTasks < totalTasks) {
      const progressPercent = (completedTasks / totalTasks) * 100;
      
      if (progressPercent >= 50) {
        suggestions.push({
          id: 'momentum-keep',
          type: 'flashcard',
          title: 'Keep the Momentum Going!',
          description: `Great progress! You're ${Math.round(progressPercent)}% done. Quick flashcard review?`,
          action: 'flashcards',
          priority: 'medium',
          reason: 'Maintain study flow',
          estimatedTime: 15
        });
      } else {
        suggestions.push({
          id: 'boost-progress',
          type: 'practice-exam',
          title: 'Boost Your Progress',
          description: 'Try a quick practice session to accelerate your daily goals',
          action: 'practice-exam',
          priority: 'medium',
          reason: 'Accelerate progress',
          estimatedTime: 20
        });
      }
    }

    // Break suggestion for long study sessions
    if (completedTasks >= 3) {
      suggestions.push({
        id: 'take-break',
        type: 'break',
        title: 'Time for a Break',
        description: 'You\'ve been productive! A 5-minute break will refresh your mind',
        action: 'break',
        priority: 'medium',
        reason: 'Prevent burnout',
        estimatedTime: 5
      });
    }

    // Bonus motivation for completed tasks
    if (completedTasks === totalTasks) {
      suggestions.push({
        id: 'bonus-reward',
        type: 'bonus',
        title: 'All Done! Claim Your Reward',
        description: 'Amazing work today! Visit the Feel Good Corner for a well-deserved break',
        action: 'bonus',
        priority: 'low',
        reason: 'Celebration time',
        estimatedTime: 10
      });
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  const suggestions = planData.smartSuggestions || generateSmartSuggestions();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice-exam': return <Target className="h-4 w-4" />;
      case 'break': return <Coffee className="h-4 w-4" />;
      case 'bonus': return <Star className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Smart Study Suggestions
          <Badge variant="outline" className="bg-white dark:bg-gray-800 ml-auto">
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.length === 0 ? (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No suggestions right now. Keep up the great work!</p>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <div 
                key={suggestion.id}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(suggestion.priority)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-full">
                    {getIconForType(suggestion.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        {suggestion.title}
                      </h4>
                      <Badge variant="outline" className="text-xs capitalize">
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {suggestion.estimatedTime}min
                        </span>
                        <span>{suggestion.reason}</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => onActionClick(suggestion.action)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {suggestion.type === 'break' ? 'Take Break' : 'Start Now'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsSection;
