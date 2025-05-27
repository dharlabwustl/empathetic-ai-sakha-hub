
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Brain, BookOpen, Target, Clock, ChevronRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodType } from '@/types/user/base';

interface SmartDailySuggestionsProps {
  userName: string;
  currentMood?: MoodType;
  onClose?: () => void;
}

const SmartDailySuggestions: React.FC<SmartDailySuggestionsProps> = ({ 
  userName, 
  currentMood,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // Mood-based suggestions
  const getMoodBasedSuggestions = (mood?: MoodType) => {
    const baseSuggestions = [
      {
        id: 1,
        title: "Review Physics formulas",
        description: "Quick 15-min review of kinematics equations",
        type: "review",
        estimatedTime: 15,
        priority: "high",
        icon: BookOpen
      },
      {
        id: 2,
        title: "Chemistry flashcards",
        description: "Practice organic chemistry reactions",
        type: "practice",
        estimatedTime: 20,
        priority: "medium",
        icon: Brain
      },
      {
        id: 3,
        title: "Biology quiz",
        description: "Test your knowledge on cell division",
        type: "quiz",
        estimatedTime: 25,
        priority: "low",
        icon: Target
      }
    ];

    if (mood === MoodType.MOTIVATED) {
      return [
        {
          id: 4,
          title: "Challenge yourself!",
          description: "Tackle advanced calculus problems",
          type: "challenge",
          estimatedTime: 45,
          priority: "high",
          icon: Target
        },
        ...baseSuggestions
      ];
    }

    if (mood === MoodType.TIRED) {
      return [
        {
          id: 5,
          title: "Light review session",
          description: "Go through yesterday's notes",
          type: "review",
          estimatedTime: 10,
          priority: "high",
          icon: BookOpen
        }
      ];
    }

    if (mood === MoodType.ANXIOUS || mood === MoodType.STRESSED) {
      return [
        {
          id: 6,
          title: "Relaxed practice",
          description: "Easy revision of familiar topics",
          type: "review",
          estimatedTime: 15,
          priority: "high",
          icon: BookOpen
        }
      ];
    }

    return baseSuggestions;
  };

  const suggestions = getMoodBasedSuggestions(currentMood);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review': return BookOpen;
      case 'practice': return Brain;
      case 'quiz': return Target;
      case 'challenge': return Target;
      default: return BookOpen;
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Smart Daily Suggestions</CardTitle>
                {currentMood && (
                  <Badge variant="outline" className="capitalize">
                    {currentMood.toLowerCase()} mood
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestions.slice(0, 3).map((suggestion, index) => {
                const IconComponent = getTypeIcon(suggestion.type);
                return (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{suggestion.estimatedTime}m</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="text-xs">
                View All Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default SmartDailySuggestions;
