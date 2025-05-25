
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, BookOpen, Brain, FileText, Coffee, Gift, AlertTriangle } from 'lucide-react';

interface SmartSuggestionsSectionProps {
  planData: any;
  onActionClick: (action: string) => void;
  isMobile: boolean;
}

const SmartSuggestionsSection: React.FC<SmartSuggestionsSectionProps> = ({ 
  planData, 
  onActionClick, 
  isMobile 
}) => {
  const suggestions = [
    {
      id: 'concepts',
      icon: <BookOpen className="h-5 w-5" />,
      title: 'Study New Concepts',
      description: 'You have 3 pending concept cards to review',
      action: 'concepts',
      priority: 'high',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'flashcards',
      icon: <Brain className="h-5 w-5" />,
      title: 'Review Flashcards',
      description: 'Quick 15-minute flashcard session available',
      action: 'flashcards',
      priority: 'medium',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'practice',
      icon: <FileText className="h-5 w-5" />,
      title: 'Take Practice Test',
      description: 'Test your knowledge with a quick quiz',
      action: 'practice-exam',
      priority: 'medium',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'break',
      icon: <Coffee className="h-5 w-5" />,
      title: 'Take a Break',
      description: 'You\'ve been studying for 45 minutes',
      action: 'break',
      priority: 'low',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'backlog',
      icon: <AlertTriangle className="h-5 w-5" />,
      title: 'Clear Backlog',
      description: '2 overdue tasks need attention',
      action: 'backlog',
      priority: 'high',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'bonus',
      icon: <Gift className="h-5 w-5" />,
      title: 'Bonus Activity',
      description: 'Try the Feel Good Corner for motivation',
      action: 'bonus',
      priority: 'low',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-4`}>
            {suggestions.map((suggestion, idx) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${suggestion.color} opacity-5`} />
                
                <div className="relative p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${suggestion.color} text-white`}>
                      {suggestion.icon}
                    </div>
                    {getPriorityBadge(suggestion.priority)}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {suggestion.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {suggestion.description}
                  </p>
                  
                  <Button
                    size="sm"
                    onClick={() => onActionClick(suggestion.action)}
                    className={`w-full bg-gradient-to-r ${suggestion.color} hover:opacity-90`}
                  >
                    Start Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SmartSuggestionsSection;
