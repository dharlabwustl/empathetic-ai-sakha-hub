
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Brain, FileText, Users, Coffee, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DailySmartSuggestions: React.FC = () => {
  const currentHour = new Date().getHours();
  
  const getTimeBasedSuggestions = () => {
    if (currentHour >= 6 && currentHour < 10) {
      return [
        {
          title: "Morning Boost: Start with Physics",
          description: "Your brain is fresh - tackle challenging physics concepts",
          icon: <Zap className="h-4 w-4" />,
          action: "Study Physics",
          link: "/dashboard/student/concepts",
          priority: "high",
          time: "30 min"
        },
        {
          title: "Quick Revision Session",
          description: "Review yesterday's topics with flashcards",
          icon: <Brain className="h-4 w-4" />,
          action: "Start Flashcards",
          link: "/dashboard/student/flashcards/1/interactive",
          priority: "medium",
          time: "15 min"
        }
      ];
    } else if (currentHour >= 10 && currentHour < 14) {
      return [
        {
          title: "Mid-Morning Focus: Chemistry Practice",
          description: "Perfect time for problem-solving in chemistry",
          icon: <FileText className="h-4 w-4" />,
          action: "Take Practice Test",
          link: "/dashboard/student/practice-exam/2/start",
          priority: "high",
          time: "45 min"
        },
        {
          title: "Concept Clarity Check",
          description: "Review difficult concepts you've marked",
          icon: <BookOpen className="h-4 w-4" />,
          action: "Review Concepts",
          link: "/dashboard/student/concepts",
          priority: "medium",
          time: "20 min"
        }
      ];
    } else if (currentHour >= 14 && currentHour < 18) {
      return [
        {
          title: "Afternoon Study: Biology Deep Dive",
          description: "Post-lunch energy perfect for detailed biology study",
          icon: <Brain className="h-4 w-4" />,
          action: "Study Biology",
          link: "/dashboard/student/concepts",
          priority: "high",
          time: "40 min"
        },
        {
          title: "Interactive Learning",
          description: "Join study groups or AI tutor sessions",
          icon: <Users className="h-4 w-4" />,
          action: "Chat with AI Tutor",
          link: "/dashboard/student/tutor",
          priority: "medium",
          time: "25 min"
        }
      ];
    } else if (currentHour >= 18 && currentHour < 22) {
      return [
        {
          title: "Evening Review Session",
          description: "Perfect time to consolidate today's learning",
          icon: <BookOpen className="h-4 w-4" />,
          action: "Review & Practice",
          link: "/dashboard/student/flashcards/1/interactive",
          priority: "high",
          time: "35 min"
        },
        {
          title: "Mock Test Challenge",
          description: "Test your knowledge with a timed practice exam",
          icon: <FileText className="h-4 w-4" />,
          action: "Take Mock Test",
          link: "/dashboard/student/practice-exam/2/start",
          priority: "medium",
          time: "60 min"
        }
      ];
    } else {
      return [
        {
          title: "Light Study Session",
          description: "Wind down with easy revision using flashcards",
          icon: <Coffee className="h-4 w-4" />,
          action: "Light Revision",
          link: "/dashboard/student/flashcards/1/interactive",
          priority: "low",
          time: "15 min"
        },
        {
          title: "Plan Tomorrow",
          description: "Set up your study plan for tomorrow",
          icon: <Clock className="h-4 w-4" />,
          action: "Check Study Plan",
          link: "/dashboard/student/study-plan",
          priority: "medium",
          time: "10 min"
        }
      ];
    }
  };

  const suggestions = getTimeBasedSuggestions();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-300 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTimeOfDay = () => {
    if (currentHour >= 6 && currentHour < 12) return "Morning";
    if (currentHour >= 12 && currentHour < 18) return "Afternoon";
    if (currentHour >= 18 && currentHour < 22) return "Evening";
    return "Night";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-800 dark:to-orange-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Brain className="h-5 w-5 text-amber-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#d97706", "#ea580c", "#d97706"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-bold"
            >
              {getTimeOfDay()} Smart Suggestions
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg border-2 ${getPriorityColor(suggestion.priority)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {suggestion.icon}
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {suggestion.title}
                      </h4>
                      <Badge className={`text-xs ${getPriorityBadgeColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {suggestion.time}
                      </Badge>
                    </div>
                  </div>
                  
                  <Link to={suggestion.link}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="sm" className="ml-4">
                        {suggestion.action}
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailySmartSuggestions;
