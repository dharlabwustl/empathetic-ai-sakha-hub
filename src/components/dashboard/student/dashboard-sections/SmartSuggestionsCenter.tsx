
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Brain, Target, Star, ArrowRight, Sparkles, Clock, Coffee, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SmartSuggestionsCenterProps {
  performance: {
    accuracy: number;
    quizScores: number;
    conceptProgress: number;
    streak: number;
  };
  userName?: string;
}

export default function SmartSuggestionsCenter({ performance, userName = "Student" }: SmartSuggestionsCenterProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for dynamic suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getTimeBasedGreetingAndSuggestion = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return {
        greeting: `Good morning, ${userName}! 🌅`,
        icon: <Coffee className="h-5 w-5 text-yellow-500" />,
        text: "Start your day fresh! Morning is perfect for learning new concepts when your mind is most alert and focused.",
        color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700/50",
        gradient: "from-yellow-500 to-orange-600",
        actionText: "Study New Concepts",
        actionLink: "/dashboard/student/concepts"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: `Good afternoon, ${userName}! ☀️`,
        icon: <Target className="h-5 w-5 text-blue-500" />,
        text: "Afternoon focus time! Perfect for practice problems and reinforcing what you learned this morning.",
        color: "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/50",
        gradient: "from-blue-500 to-indigo-600",
        actionText: "Practice Problems",
        actionLink: "/dashboard/student/practice-exam"
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        greeting: `Good evening, ${userName}! 🌆`,
        icon: <Brain className="h-5 w-5 text-purple-500" />,
        text: "Evening review time! Consolidate today's learning with flashcards and quick revision sessions.",
        color: "bg-purple-50 border-purple-200 dark:bg-purple-900/30 dark:border-purple-700/50",
        gradient: "from-purple-500 to-pink-600",
        actionText: "Review with Flashcards",
        actionLink: "/dashboard/student/flashcards"
      };
    } else {
      return {
        greeting: `Hello, ${userName}! 🌙`,
        icon: <Star className="h-5 w-5 text-indigo-500" />,
        text: "Night wind-down! Try some light revision or motivational content to end your day positively.",
        color: "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700/50",
        gradient: "from-indigo-500 to-purple-600",
        actionText: "Light Revision",
        actionLink: "/dashboard/student/feel-good-corner"
      };
    }
  };

  const getPerformanceBasedSuggestion = () => {
    if (performance.accuracy > 80 && performance.quizScores > 85) {
      return {
        icon: <Rocket className="h-5 w-5 text-violet-500" />,
        text: "You're ready for advanced practice exams! Your high accuracy shows excellent mastery.",
        color: "bg-violet-50 border-violet-200 dark:bg-violet-900/30 dark:border-violet-700/50",
        gradient: "from-violet-500 to-purple-600",
        actionText: "Try Advanced Exam",
        actionLink: "/dashboard/student/practice-exam"
      };
    } else if (performance.conceptProgress > 70 && performance.accuracy < 60) {
      return {
        icon: <Brain className="h-5 w-5 text-emerald-500" />,
        text: "Strong conceptual understanding! Let's improve recall with focused flashcard practice.",
        color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-700/50",
        gradient: "from-emerald-500 to-green-600",
        actionText: "Review Flashcards",
        actionLink: "/dashboard/student/flashcards"
      };
    } else if (performance.conceptProgress < 50) {
      return {
        icon: <BookOpen className="h-5 w-5 text-amber-500" />,
        text: "Focus on core concepts first. Building a strong foundation will accelerate your progress.",
        color: "bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700/50",
        gradient: "from-amber-500 to-orange-600",
        actionText: "Study Core Concepts",
        actionLink: "/dashboard/student/concepts"
      };
    }
    
    return null;
  };
  
  const timeBasedSuggestion = getTimeBasedGreetingAndSuggestion();
  const performanceSuggestion = getPerformanceBasedSuggestion();

  return (
    <Card className="overflow-hidden border-0 shadow-md" data-tour="smart-suggestions">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
          <Brain className="h-5 w-5 text-violet-500" />
          Daily Smart Suggestions
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="h-4 w-4 text-violet-400 ml-1" />
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pb-5">
        {/* Time-based greeting and suggestion */}
        <motion.div 
          className={`p-4 rounded-lg ${timeBasedSuggestion.color} border mb-3 shadow-sm`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-2">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
              {timeBasedSuggestion.greeting}
            </h3>
          </div>
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {timeBasedSuggestion.icon}
            </motion.div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{timeBasedSuggestion.text}</p>
          </div>
        </motion.div>

        {/* Performance-based suggestion */}
        {performanceSuggestion && (
          <motion.div 
            className={`p-3 rounded-lg ${performanceSuggestion.color} border mb-3 shadow-sm`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {performanceSuggestion.icon}
              </motion.div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{performanceSuggestion.text}</p>
            </div>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 dark:bg-purple-800/50 p-1.5 rounded-full">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Performance Alerts</span>
            </div>
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
              All Good
            </span>
          </div>
          
          <Link to={timeBasedSuggestion.actionLink} className="no-underline">
            <Button 
              className={`w-full bg-gradient-to-r ${timeBasedSuggestion.gradient} hover:opacity-90 text-white`}
            >
              <Zap className="h-4 w-4 mr-2" />
              {timeBasedSuggestion.actionText} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
