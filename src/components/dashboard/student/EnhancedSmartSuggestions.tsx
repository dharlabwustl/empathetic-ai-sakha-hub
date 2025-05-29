
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Clock, 
  BookOpen, 
  Brain, 
  Target, 
  Coffee, 
  Moon, 
  Sun, 
  Sunrise,
  ArrowRight,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface EnhancedSmartSuggestionsProps {
  userName?: string;
}

const EnhancedSmartSuggestions: React.FC<EnhancedSmartSuggestionsProps> = ({ 
  userName = "Student" 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getTimeBasedSuggestion = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 9) {
      return {
        icon: <Sunrise className="h-5 w-5 text-amber-500" />,
        greeting: `Good morning, ${userName}!`,
        text: "Your brain is at peak performance in the morning. Perfect time to tackle new Physics concepts or challenging math problems.",
        action: "Start Morning Study",
        actionLink: "/dashboard/student/concepts",
        color: "bg-amber-50 border-amber-200 dark:bg-amber-900/30",
        gradient: "from-amber-500 to-orange-600"
      };
    } else if (hour >= 9 && hour < 12) {
      return {
        icon: <Sun className="h-5 w-5 text-yellow-500" />,
        greeting: `Good morning, ${userName}!`,
        text: "Late morning is excellent for conceptual learning. Your focus is sharp - dive into Chemistry reactions or Biology processes.",
        action: "Study Core Concepts",
        actionLink: "/dashboard/student/concepts",
        color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30",
        gradient: "from-yellow-500 to-amber-600"
      };
    } else if (hour >= 12 && hour < 14) {
      return {
        icon: <Target className="h-5 w-5 text-blue-500" />,
        greeting: `Good afternoon, ${userName}!`,
        text: "Post-lunch energy dip? Try light revision or flashcards to maintain momentum without overwhelming yourself.",
        action: "Quick Flashcard Review",
        actionLink: "/dashboard/student/flashcards",
        color: "bg-blue-50 border-blue-200 dark:bg-blue-900/30",
        gradient: "from-blue-500 to-indigo-600"
      };
    } else if (hour >= 14 && hour < 17) {
      return {
        icon: <Brain className="h-5 w-5 text-purple-500" />,
        greeting: `Good afternoon, ${userName}!`,
        text: "Afternoon focus time! Perfect for solving practice problems and applying what you learned this morning.",
        action: "Practice Problems",
        actionLink: "/dashboard/student/practice-exam",
        color: "bg-purple-50 border-purple-200 dark:bg-purple-900/30",
        gradient: "from-purple-500 to-pink-600"
      };
    } else if (hour >= 17 && hour < 20) {
      return {
        icon: <BookOpen className="h-5 w-5 text-green-500" />,
        greeting: `Good evening, ${userName}!`,
        text: "Evening is ideal for revision and consolidation. Review today's concepts and prepare for tomorrow.",
        action: "Evening Revision",
        actionLink: "/dashboard/student/concepts",
        color: "bg-green-50 border-green-200 dark:bg-green-900/30",
        gradient: "from-green-500 to-emerald-600"
      };
    } else if (hour >= 20 && hour < 22) {
      return {
        icon: <Coffee className="h-5 w-5 text-orange-500" />,
        greeting: `Good evening, ${userName}!`,
        text: "Wind down with light study. Try motivational content or quick formula reviews to end positively.",
        action: "Feel Good Corner",
        actionLink: "/dashboard/student/feel-good-corner",
        color: "bg-orange-50 border-orange-200 dark:bg-orange-900/30",
        gradient: "from-orange-500 to-red-600"
      };
    } else {
      return {
        icon: <Moon className="h-5 w-5 text-indigo-500" />,
        greeting: `Good night, ${userName}!`,
        text: "Late night study? Keep it light with flashcards or positive affirmations. Rest is crucial for memory consolidation.",
        action: "Light Study Mode",
        actionLink: "/dashboard/student/flashcards",
        color: "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30",
        gradient: "from-indigo-500 to-purple-600"
      };
    }
  };

  if (!isVisible) return null;

  const suggestion = getTimeBasedSuggestion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${suggestion.color} border shadow-md mb-4`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </motion.div>
              Smart Study Suggestion
              <Badge variant="outline" className="bg-white/80">
                <Clock className="h-3 w-3 mr-1" />
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit', 
                  hour12: true 
                })}
              </Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {suggestion.icon}
            </motion.div>
            <div>
              <h4 className="font-semibold text-sm mb-1">{suggestion.greeting}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {suggestion.text}
              </p>
            </div>
          </div>
          
          <Button 
            className={`w-full bg-gradient-to-r ${suggestion.gradient} hover:opacity-90 text-white`}
            onClick={() => navigate(suggestion.actionLink)}
          >
            {suggestion.action} <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedSmartSuggestions;
