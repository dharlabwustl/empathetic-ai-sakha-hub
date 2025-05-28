
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Clock, Target, TrendingUp, BookOpen, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartDailySuggestionsProps {
  userName?: string;
  currentMood?: string;
  lastActivity?: string;
}

const SmartDailySuggestions: React.FC<SmartDailySuggestionsProps> = ({
  userName,
  currentMood,
  lastActivity
}) => {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 10) setTimeOfDay('morning');
    else if (hour < 14) setTimeOfDay('afternoon');
    else if (hour < 18) setTimeOfDay('evening');
    else setTimeOfDay('night');
  }, []);

  const getSuggestions = () => {
    const baseSuggestions = {
      morning: [
        {
          icon: <BookOpen className="h-5 w-5 text-blue-600" />,
          title: "Start with Strong Subjects",
          description: "Begin your day by reviewing topics you're confident in",
          action: "Start Revision",
          color: "bg-blue-50 border-blue-200"
        },
        {
          icon: <Target className="h-5 w-5 text-green-600" />,
          title: "Set Today's Goals",
          description: "Define 3 key objectives for productive learning",
          action: "Set Goals",
          color: "bg-green-50 border-green-200"
        },
        {
          icon: <Brain className="h-5 w-5 text-purple-600" />,
          title: "Take Quick Assessment",
          description: "Check your readiness with a 10-minute practice test",
          action: "Take Test",
          color: "bg-purple-50 border-purple-200"
        }
      ],
      afternoon: [
        {
          icon: <Zap className="h-5 w-5 text-orange-600" />,
          title: "Power Practice Session",
          description: "Focus on challenging topics when your energy is high",
          action: "Start Practice",
          color: "bg-orange-50 border-orange-200"
        },
        {
          icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
          title: "Review Progress",
          description: "Check your study streak and adjust your plan",
          action: "View Progress",
          color: "bg-indigo-50 border-indigo-200"
        },
        {
          icon: <Clock className="h-5 w-5 text-red-600" />,
          title: "Timed Mock Test",
          description: "Perfect time for a full-length practice exam",
          action: "Take Mock Test",
          color: "bg-red-50 border-red-200"
        }
      ],
      evening: [
        {
          icon: <BookOpen className="h-5 w-5 text-teal-600" />,
          title: "Concept Revision",
          description: "Strengthen understanding with detailed concept cards",
          action: "Revise Concepts",
          color: "bg-teal-50 border-teal-200"
        },
        {
          icon: <Brain className="h-5 w-5 text-pink-600" />,
          title: "Quick Flashcards",
          description: "Reinforce memory with adaptive flashcard review",
          action: "Review Cards",
          color: "bg-pink-50 border-pink-200"
        }
      ],
      night: [
        {
          icon: <Clock className="h-5 w-5 text-violet-600" />,
          title: "Light Review",
          description: "Wind down with easy revision of today's topics",
          action: "Light Study",
          color: "bg-violet-50 border-violet-200"
        },
        {
          icon: <Target className="h-5 w-5 text-emerald-600" />,
          title: "Plan Tomorrow",
          description: "Set your priorities for tomorrow's study session",
          action: "Plan Ahead",
          color: "bg-emerald-50 border-emerald-200"
        }
      ]
    };

    return baseSuggestions[timeOfDay as keyof typeof baseSuggestions] || baseSuggestions.morning;
  };

  const suggestions = getSuggestions();
  const currentSuggestion = suggestions[currentSuggestionIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionIndex((prev) => (prev + 1) % suggestions.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [suggestions.length]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Smart Daily Suggestions
        </h3>
        <div className="text-sm text-gray-500 capitalize">
          {timeOfDay} recommendations
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSuggestionIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={`${currentSuggestion.color} transition-all duration-300 hover:shadow-md`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {currentSuggestion.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {currentSuggestion.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {currentSuggestion.description}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white hover:bg-gray-50"
                >
                  {currentSuggestion.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex justify-center mt-3 gap-2">
        {suggestions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSuggestionIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSuggestionIndex 
                ? 'bg-purple-600 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SmartDailySuggestions;
