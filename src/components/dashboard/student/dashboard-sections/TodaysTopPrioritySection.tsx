
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Target, Zap, Sparkles, X, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TodaysTopPrioritySection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const priorities = [
    {
      id: 1,
      title: "Complete Physics Newton's Laws",
      type: "concept",
      urgency: "HIGH",
      timeEstimate: "45 min",
      isCompleted: false,
      link: "/dashboard/student/concepts"
    },
    {
      id: 2,
      title: "Review Chemistry Bonds Flashcards",
      type: "flashcard",
      urgency: "MEDIUM",
      timeEstimate: "20 min",
      isCompleted: false,
      link: "/dashboard/student/flashcards"
    },
    {
      id: 3,
      title: "Practice Math Algebra Problems",
      type: "practice",
      urgency: "HIGH",
      timeEstimate: "30 min",
      isCompleted: false,
      link: "/dashboard/student/practice-exam"
    }
  ];

  const handleTaskClick = (link: string) => {
    navigate(link);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      id="todays-priority-section"
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated arrow pointing down */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-red-500 text-2xl">↓</div>
      </motion.div>

      {/* Priority badge */}
      <motion.div
        className="absolute -top-2 -right-2 z-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Badge className="bg-red-500 text-white font-bold px-3 py-1 shadow-lg">
          URGENT!
        </Badge>
      </motion.div>

      {/* Sparkle effects */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-yellow-400 text-lg"
          style={{
            top: `${20 + index * 30}%`,
            left: `${10 + index * 80}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      ))}

      <Card className="relative shadow-lg border-2 border-gradient-to-r from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800 overflow-hidden">
        {/* Pulsing border effect */}
        <motion.div
          className="absolute inset-0 border-4 border-red-400 rounded-lg opacity-50"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(248, 113, 113, 0.4)",
              "0 0 0 20px rgba(248, 113, 113, 0)",
              "0 0 0 0 rgba(248, 113, 113, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-900/20 dark:to-orange-900/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Target className="h-5 w-5 text-red-600" />
              </motion.div>
              Today's Top Priority
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 relative z-10">
          {priorities.map((priority, index) => (
            <motion.div
              key={priority.id}
              className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-red-200 dark:border-red-700 cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
              onClick={() => handleTaskClick(priority.link)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-4 w-4 ${priority.isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="font-medium text-gray-900 dark:text-gray-100">{priority.title}</span>
                  {priority.urgency === 'HIGH' && (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      High Priority
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>{priority.timeEstimate}</span>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => navigate('/dashboard/student/today')}
            >
              <Zap className="h-4 w-4 mr-2" />
              View All Tasks
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
