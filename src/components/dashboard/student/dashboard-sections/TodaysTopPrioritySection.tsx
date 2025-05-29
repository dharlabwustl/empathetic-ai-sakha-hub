
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, BookOpen, TrendingUp, AlertTriangle, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TodaysTopPrioritySectionProps {
  onClose?: () => void;
}

const TodaysTopPrioritySection: React.FC<TodaysTopPrioritySectionProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const priorityTask = {
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    progress: 45,
    timeRequired: "2 hours",
    difficulty: "High",
    urgency: "Critical",
    daysLeft: 5
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      data-tour="top-priority"
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
              "0 0 0 0 rgba(239, 68, 68, 0.4)",
              "0 0 0 20px rgba(239, 68, 68, 0)",
              "0 0 0 0 rgba(239, 68, 68, 0.4)"
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
            <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Target className="h-5 w-5 text-red-600" />
              </motion.div>
              Today's Top Priority
            </CardTitle>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="text-center">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
              {priorityTask.subject}: {priorityTask.topic}
            </h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Badge className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300">
                {priorityTask.urgency}
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300">
                {priorityTask.difficulty} Difficulty
              </Badge>
            </div>
          </div>

          {/* Progress section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Topic Progress</span>
              <span className="text-gray-700 dark:text-gray-300">{priorityTask.progress}%</span>
            </div>
            <Progress value={priorityTask.progress} className="h-2" />
          </div>

          {/* Study metrics grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-red-200 dark:border-red-700">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Time Needed</p>
                  <p className="font-semibold text-red-900 dark:text-red-100">{priorityTask.timeRequired}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-red-200 dark:border-red-700">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Days Left</p>
                  <p className="font-semibold text-red-900 dark:text-red-100">{priorityTask.daysLeft} days</p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => navigate('/dashboard/student/concepts')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Start Learning Now
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
