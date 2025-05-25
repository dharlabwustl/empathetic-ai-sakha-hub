
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, AlertTriangle, TrendingUp, Coffee, Gift } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { motion } from 'framer-motion';

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

  // Generate smart suggestions based on plan data
  const suggestions = [
    ...(planData.backlogTasks && planData.backlogTasks.length > 0 ? [{
      id: 'clear-backlog',
      type: 'warning' as const,
      icon: <AlertTriangle className="h-5 w-5" />,
      title: 'Clear Pending Backlog',
      description: `You have ${planData.backlogTasks.length} overdue tasks. Clear them to stay on track.`,
      action: 'concepts',
      actionText: 'Review Backlog'
    }] : []),
    
    ...(planData.completedTasks < planData.totalTasks ? [{
      id: 'focus-mode',
      type: 'info' as const,
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Activate Focus Mode',
      description: 'Complete your remaining tasks efficiently with focused study sessions.',
      action: 'flashcards',
      actionText: 'Start Focus Session'
    }] : []),
    
    ...(planData.completedTasks >= planData.totalTasks * 0.7 ? [{
      id: 'practice-test',
      type: 'success' as const,
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Take Practice Test',
      description: 'Great progress! Test your knowledge with a practice exam.',
      action: 'practice-exam',
      actionText: 'Start Practice Test'
    }] : []),
    
    {
      id: 'take-break',
      type: 'info' as const,
      icon: <Coffee className="h-5 w-5" />,
      title: 'Scheduled Break',
      description: 'Take a 10-minute break to maintain peak performance.',
      action: 'break',
      actionText: 'Take Break'
    },
    
    {
      id: 'bonus-activity',
      type: 'bonus' as const,
      icon: <Gift className="h-5 w-5" />,
      title: 'Bonus Activity',
      description: 'Visit the Feel Good Corner for motivation and stress relief.',
      action: 'bonus',
      actionText: 'Feel Good Corner'
    }
  ];

  const getVariantForType = (type: string) => {
    switch (type) {
      case 'warning': return 'destructive';
      case 'success': return 'default';
      case 'bonus': return 'secondary';
      default: return 'outline';
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'warning': return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
      case 'success': return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      case 'bonus': return 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20';
      default: return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-600" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getColorForType(suggestion.type)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {suggestion.description}
                    </p>
                    <Button
                      onClick={() => onActionClick(suggestion.action)}
                      variant={getVariantForType(suggestion.type)}
                      size="sm"
                    >
                      {suggestion.actionText}
                    </Button>
                  </div>
                </div>
                {suggestion.type === 'warning' && (
                  <Badge variant="destructive" className="ml-2">
                    Urgent
                  </Badge>
                )}
                {suggestion.type === 'bonus' && (
                  <Badge variant="secondary" className="ml-2">
                    Bonus
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SmartSuggestionsSection;
