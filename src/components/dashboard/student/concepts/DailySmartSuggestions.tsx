
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, RefreshCw, Clock, Target, BookOpen, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Suggestion {
  id: string;
  type: 'focus' | 'review' | 'practice' | 'timing';
  title: string;
  description: string;
  subject?: string;
  estimatedTime?: number;
  priority: 'high' | 'medium' | 'low';
}

const DailySmartSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateSuggestions = () => {
    const allSuggestions: Suggestion[] = [
      {
        id: '1',
        type: 'focus',
        title: 'Focus on Physics Mechanics today',
        description: 'You\'ve been struggling with Newton\'s laws. Spend extra time on force diagrams.',
        subject: 'Physics',
        estimatedTime: 45,
        priority: 'high'
      },
      {
        id: '2',
        type: 'review',
        title: 'Quick review: Chemical Bonding',
        description: 'You mastered this topic well. A 15-minute review will keep it fresh.',
        subject: 'Chemistry',
        estimatedTime: 15,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'practice',
        title: 'Practice Biology diagrams',
        description: 'Drawing cell structures will improve your understanding and memory.',
        subject: 'Biology',
        estimatedTime: 30,
        priority: 'high'
      },
      {
        id: '4',
        type: 'timing',
        title: 'Best study time: 4-6 PM',
        description: 'Based on your activity, you\'re most productive during late afternoon.',
        estimatedTime: 120,
        priority: 'low'
      },
      {
        id: '5',
        type: 'focus',
        title: 'Organic Chemistry reactions need attention',
        description: 'Mechanism understanding is below target. Focus on electron movement.',
        subject: 'Chemistry',
        estimatedTime: 60,
        priority: 'high'
      },
      {
        id: '6',
        type: 'review',
        title: 'Mathematics: Calculus revision',
        description: 'Strong foundation detected. Quick practice problems will maintain skills.',
        subject: 'Mathematics',
        estimatedTime: 25,
        priority: 'medium'
      }
    ];

    // Randomly select 3-4 suggestions
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 3);
    
    return selected;
  };

  const refreshSuggestions = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSuggestions(generateSuggestions());
      setIsRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    setSuggestions(generateSuggestions());
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus': return Target;
      case 'review': return BookOpen;
      case 'practice': return Brain;
      case 'timing': return Clock;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'focus': return 'bg-red-100 text-red-700 border-red-200';
      case 'review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'practice': return 'bg-green-100 text-green-700 border-green-200';
      case 'timing': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg font-semibold">Daily Smart Suggestions</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshSuggestions}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={suggestions.map(s => s.id).join(',')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {suggestions.map((suggestion, index) => {
              const TypeIcon = getTypeIcon(suggestion.type);
              return (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                        <TypeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                          {suggestion.title}
                        </h4>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(suggestion.priority)}`} />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={getTypeColor(suggestion.type)} size="sm">
                          {suggestion.type}
                        </Badge>
                        {suggestion.subject && (
                          <Badge variant="outline" className="text-xs">
                            {suggestion.subject}
                          </Badge>
                        )}
                        {suggestion.estimatedTime && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {suggestion.estimatedTime}m
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
