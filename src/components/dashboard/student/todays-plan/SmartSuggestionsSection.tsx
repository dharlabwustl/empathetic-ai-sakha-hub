
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  Target, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  Star,
  Brain,
  BookOpen,
  Coffee,
  Award
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
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  if (!planData) return null;

  // Generate smart suggestions based on current state
  const generateSmartSuggestions = (): SmartSuggestion[] => {
    const suggestions: SmartSuggestion[] = [];
    const completionRate = planData.totalTasks > 0 ? (planData.completedTasks / planData.totalTasks) * 100 : 0;

    // Motivational suggestions based on progress
    if (completionRate === 0) {
      suggestions.push({
        id: 'start-easy',
        type: 'concept',
        title: 'Start with an Easy Concept',
        description: 'Begin your study session with a fundamental concept to build momentum',
        action: 'concepts',
        priority: 'high',
        reason: 'Starting with easier topics helps build confidence and momentum for the day',
        estimatedTime: 15
      });
    } else if (completionRate < 50) {
      suggestions.push({
        id: 'keep-momentum',
        type: 'flashcard',
        title: 'Quick Flashcard Review',
        description: 'Keep your momentum going with a quick flashcard session',
        action: 'flashcards',
        priority: 'medium',
        reason: 'Short, interactive sessions help maintain focus while making progress',
        estimatedTime: 10
      });
    } else if (completionRate >= 70) {
      suggestions.push({
        id: 'finish-strong',
        type: 'practice-exam',
        title: 'Finish Strong with Practice',
        description: 'Test your knowledge with a practice exam to end the day',
        action: 'practice-exam',
        priority: 'high',
        reason: 'You\'re doing great! A practice test will reinforce what you\'ve learned',
        estimatedTime: 20
      });
    }

    // Backlog-based suggestions
    if (planData.backlogTasks && planData.backlogTasks.length > 0) {
      const overdueCount = planData.backlogTasks.filter(task => task.status === 'overdue').length;
      if (overdueCount > 0) {
        suggestions.push({
          id: 'clear-backlog',
          type: 'concept',
          title: `Clear ${overdueCount} Overdue Task${overdueCount > 1 ? 's' : ''}`,
          description: 'Address overdue tasks to get back on track with your study plan',
          action: 'concepts',
          priority: 'high',
          reason: 'Clearing backlogs prevents knowledge gaps and reduces study stress',
          estimatedTime: planData.backlogTasks[0]?.timeEstimate || 15
        });
      }
    }

    // Time-based suggestions
    const currentHour = new Date().getHours();
    if (currentHour >= 14 && currentHour <= 16) {
      suggestions.push({
        id: 'afternoon-boost',
        type: 'break',
        title: 'Take an Energizing Break',
        description: 'Combat afternoon fatigue with a short, refreshing break',
        action: 'break',
        priority: 'medium',
        reason: 'Afternoon breaks help maintain focus and energy for continued learning',
        estimatedTime: 5
      });
    }

    // Achievement-based suggestions
    if (planData.streak >= 3) {
      suggestions.push({
        id: 'bonus-challenge',
        type: 'bonus',
        title: 'Bonus Challenge Available!',
        description: 'You\'re on a great streak! Try a bonus challenge for extra points',
        action: 'bonus',
        priority: 'low',
        reason: 'Your consistent effort deserves recognition. Bonus challenges provide extra motivation',
        estimatedTime: 10
      });
    }

    return suggestions;
  };

  const suggestions = generateSmartSuggestions();

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'practice-exam': return <Target className="h-5 w-5 text-green-600" />;
      case 'break': return <Coffee className="h-5 w-5 text-orange-600" />;
      case 'bonus': return <Award className="h-5 w-5 text-yellow-600" />;
      default: return <Lightbulb className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          Smart Suggestions
          <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
            {suggestions.length} Available
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">All Caught Up!</h3>
              <p className="text-gray-600 dark:text-gray-400">You're doing great! No immediate suggestions at the moment.</p>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <Card 
                key={suggestion.id}
                className="bg-white dark:bg-gray-800 border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getSuggestionIcon(suggestion.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                          {suggestion.title}
                        </h4>
                        <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority} priority
                        </Badge>
                        {suggestion.estimatedTime && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            <Clock className="h-3 w-3 mr-1" />
                            {suggestion.estimatedTime}m
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {suggestion.description}
                      </p>
                      
                      {expandedSuggestion === suggestion.id && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Why this helps:</strong> {suggestion.reason}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onActionClick(suggestion.action)}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Take Action
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedSuggestion(
                            expandedSuggestion === suggestion.id ? null : suggestion.id
                          )}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          {expandedSuggestion === suggestion.id ? 'Less Info' : 'Why?'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionsSection;
