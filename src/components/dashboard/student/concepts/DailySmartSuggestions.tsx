
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Sparkles, TrendingUp, Clock, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartSuggestion {
  id: string;
  type: 'focus' | 'review' | 'practice' | 'timing';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number;
  subject?: string;
}

const DailySmartSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate dynamic suggestions based on time of day, user patterns, etc.
  const generateSuggestions = (): SmartSuggestion[] => {
    const currentHour = new Date().getHours();
    const dayOfWeek = new Date().getDay();
    
    const allSuggestions: SmartSuggestion[] = [
      {
        id: '1',
        type: 'focus',
        title: 'Morning Focus Session',
        description: 'Your brain is most active in the morning. Focus on challenging Physics concepts.',
        action: 'Study Newton\'s Laws',
        priority: 'high',
        estimatedTime: 25,
        subject: 'Physics'
      },
      {
        id: '2',
        type: 'review',
        title: 'Quick Review Time',
        description: 'Review Chemistry concepts you studied 3 days ago for better retention.',
        action: 'Review Chemical Bonding',
        priority: 'medium',
        estimatedTime: 15,
        subject: 'Chemistry'
      },
      {
        id: '3',
        type: 'practice',
        title: 'Practice Makes Perfect',
        description: 'Your Biology progress is excellent. Practice some advanced topics.',
        action: 'Practice Cell Structure',
        priority: 'medium',
        estimatedTime: 20,
        subject: 'Biology'
      },
      {
        id: '4',
        type: 'timing',
        title: 'Optimal Study Window',
        description: 'Based on your habits, this is your most productive time for Mathematics.',
        action: 'Study Calculus',
        priority: 'high',
        estimatedTime: 30,
        subject: 'Mathematics'
      },
      {
        id: '5',
        type: 'focus',
        title: 'Weak Area Alert',
        description: 'You\'ve been avoiding Organic Chemistry. Time to tackle it!',
        action: 'Study Functional Groups',
        priority: 'high',
        estimatedTime: 35,
        subject: 'Chemistry'
      },
      {
        id: '6',
        type: 'review',
        title: 'Spaced Repetition',
        description: 'Perfect time to review Physics concepts from last week.',
        action: 'Review Wave Optics',
        priority: 'medium',
        estimatedTime: 20,
        subject: 'Physics'
      }
    ];

    // Filter suggestions based on time and context
    let contextualSuggestions = allSuggestions;
    
    if (currentHour >= 6 && currentHour <= 10) {
      // Morning - focus on challenging topics
      contextualSuggestions = allSuggestions.filter(s => s.type === 'focus' || s.priority === 'high');
    } else if (currentHour >= 14 && currentHour <= 17) {
      // Afternoon - practice and review
      contextualSuggestions = allSuggestions.filter(s => s.type === 'practice' || s.type === 'review');
    } else if (currentHour >= 18 && currentHour <= 21) {
      // Evening - light review
      contextualSuggestions = allSuggestions.filter(s => s.type === 'review' && s.estimatedTime <= 20);
    }

    // Weekend adjustments
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      contextualSuggestions = allSuggestions.filter(s => s.estimatedTime >= 25);
    }

    return contextualSuggestions.slice(0, 3);
  };

  useEffect(() => {
    setSuggestions(generateSuggestions());
  }, []);

  const refreshSuggestions = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSuggestions(generateSuggestions());
      setCurrentSuggestionIndex(0);
      setIsRefreshing(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'focus': return <TrendingUp className="h-4 w-4" />;
      case 'review': return <RefreshCw className="h-4 w-4" />;
      case 'practice': return <Sparkles className="h-4 w-4" />;
      case 'timing': return <Clock className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'focus': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'review': return 'bg-green-100 text-green-800 border-green-200';
      case 'practice': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'timing': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  if (suggestions.length === 0) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Daily Smart Suggestions
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshSuggestions}
            disabled={isRefreshing}
            className="bg-white/80 hover:bg-white"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 border border-blue-100 dark:border-blue-800 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTypeColor(suggestion.type)}>
                      {getTypeIcon(suggestion.type)}
                      <span className="ml-1 capitalize">{suggestion.type}</span>
                    </Badge>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                    {suggestion.priority}
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-100">
                  {suggestion.title}
                </h4>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {suggestion.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{suggestion.estimatedTime} min</span>
                    {suggestion.subject && (
                      <>
                        <span>•</span>
                        <span>{suggestion.subject}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                  onClick={() => {
                    // Navigate to the suggested action
                    console.log(`Starting: ${suggestion.action}`);
                  }}
                >
                  <span className="text-xs">{suggestion.action}</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Suggestions refresh automatically based on your study patterns and optimal learning times
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
