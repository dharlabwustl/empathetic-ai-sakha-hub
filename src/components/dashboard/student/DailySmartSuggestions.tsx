
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  Target,
  Sparkles,
  Zap,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Suggestion {
  id: string;
  type: 'study' | 'break' | 'focus' | 'review';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  icon: React.ReactNode;
  action?: string;
}

interface DailySmartSuggestionsProps {
  userName: string;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ userName }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allSuggestions: Suggestion[] = [
    {
      id: '1',
      type: 'study',
      title: 'Physics Formula Review',
      description: 'Review kinematics equations - you struggled with these in yesterday\'s practice test',
      priority: 'high',
      estimatedTime: '15 min',
      icon: <Target className="h-4 w-4" />,
      action: 'Start Review'
    },
    {
      id: '2',
      type: 'focus',
      title: 'Deep Focus Session',
      description: 'Your peak concentration hours are 6-8 PM. Schedule complex topics now.',
      priority: 'medium',
      estimatedTime: '2 hours',
      icon: <Brain className="h-4 w-4" />,
      action: 'Plan Session'
    },
    {
      id: '3',
      type: 'break',
      title: 'Take a Strategic Break',
      description: 'You\'ve been studying for 90 minutes. A 10-minute break will boost retention.',
      priority: 'medium',
      estimatedTime: '10 min',
      icon: <Clock className="h-4 w-4" />,
      action: 'Take Break'
    },
    {
      id: '4',
      type: 'review',
      title: 'Chemistry Flashcards',
      description: 'Organic reactions are due for spaced repetition review today',
      priority: 'high',
      estimatedTime: '20 min',
      icon: <RefreshCw className="h-4 w-4" />,
      action: 'Review Now'
    },
    {
      id: '5',
      type: 'study',
      title: 'Biology Diagrams',
      description: 'Visual learners retain 65% more. Try diagram-based learning for cell structure.',
      priority: 'low',
      estimatedTime: '25 min',
      icon: <Lightbulb className="h-4 w-4" />,
      action: 'Explore'
    }
  ];

  useEffect(() => {
    // Initialize with first 3 suggestions
    setSuggestions(allSuggestions.slice(0, 3));
  }, []);

  useEffect(() => {
    // Auto-rotate suggestions every 8 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % suggestions.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [suggestions.length]);

  const refreshSuggestions = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Shuffle and get new set of suggestions
      const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 3));
      setCurrentIndex(0);
      setIsRefreshing(false);
    }, 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="h-4 w-4" />;
      case 'break': return <Clock className="h-4 w-4" />;
      case 'focus': return <Brain className="h-4 w-4" />;
      case 'review': return <RefreshCw className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="mb-6">
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
              </div>
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  Daily Smart Suggestions
                  <motion.span 
                    className="text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text font-extrabold"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% auto'
                    }}
                  >
                    PREPZR AI
                  </motion.span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Updated {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshSuggestions}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0.7,
                  y: 0,
                  scale: index === currentIndex ? 1 : 0.98
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-md' 
                    : 'bg-gray-50/50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      index === currentIndex 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                        >
                          {suggestion.priority}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {suggestion.estimatedTime}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                  {suggestion.action && (
                    <Button 
                      size="sm" 
                      variant={index === currentIndex ? "default" : "outline"}
                      className={index === currentIndex ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
                    >
                      {suggestion.action}
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 pt-2">
            {suggestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailySmartSuggestions;
