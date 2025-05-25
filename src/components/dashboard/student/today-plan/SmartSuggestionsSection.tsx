
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Clock, Target, Zap, BookOpen, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const suggestions = [
    {
      id: 'priority-concepts',
      title: 'Focus on High-Priority Concepts',
      description: 'Start with concepts marked as challenging',
      icon: Brain,
      action: 'concepts',
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'quick-revision',
      title: 'Quick Flashcard Review',
      description: 'Review flashcards for better retention',
      icon: Zap,
      action: 'flashcards',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'practice-test',
      title: 'Take Practice Test',
      description: 'Test your knowledge with practice questions',
      icon: Target,
      action: 'practice-exam',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'study-break',
      title: 'Take a Study Break',
      description: 'Manage stress and stay motivated',
      icon: Coffee,
      action: 'break',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const getTimeBasedSuggestion = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Start your day with high-energy concept learning';
    } else if (hour < 17) {
      return 'Perfect time for practice tests and problem solving';
    } else {
      return 'Evening is ideal for revision and flashcard review';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Smart Study Suggestions</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {getTimeBasedSuggestion()}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div className={`mx-auto w-12 h-12 rounded-full bg-gradient-to-r ${suggestion.color} flex items-center justify-center text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onActionClick(suggestion.action)}
                          className="w-full text-xs"
                        >
                          Start Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {/* Progress insight */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-sm">Today's Focus</p>
                <p className="text-xs text-muted-foreground">
                  Complete 3 concept cards and 20 flashcards for optimal progress
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SmartSuggestionsSection;
