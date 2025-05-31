
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, BookOpen, Clock, AlertTriangle, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const TodaysTopPrioritySection: React.FC = () => {
  const todaysPriority = {
    subject: "Chemistry",
    topic: "Organic Chemistry - Mechanisms",
    urgency: "High",
    timeLeft: "2 hours",
    progress: 35,
    description: "Focus on reaction mechanisms and electron movement",
    estimatedTime: "90 minutes",
    difficulty: "Hard"
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <AnimatedHighlight
        id="todays_priority"
        message="Start here! Focus on your weakest area first"
        position="top-right"
        arrowDirection="down"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Target className="h-5 w-5 text-red-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#dc2626", "#ea580c", "#dc2626"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Today's TOP Priority
              </motion.span>
            </div>
            <Badge className={getUrgencyColor(todaysPriority.urgency)}>
              <AlertTriangle className="h-3 w-3 mr-1" />
              {todaysPriority.urgency} Priority
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <div className="space-y-4">
            {/* Priority Overview */}
            <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50/50">
              <h3 className="font-bold text-lg text-red-900 mb-2">
                {todaysPriority.subject}: {todaysPriority.topic}
              </h3>
              <p className="text-sm text-gray-700 mb-3">{todaysPriority.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span>Est. Time: {todaysPriority.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-red-600" />
                  <span>Difficulty: {todaysPriority.difficulty}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Current Progress</span>
                  <span className="text-gray-700">{todaysPriority.progress}%</span>
                </div>
                <Progress value={todaysPriority.progress} className="h-2" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link to="/dashboard/student/concepts/organic-chemistry" className="flex-1">
                  <Button 
                    size="sm" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/dashboard/student/flashcards/1/interactive" className="flex-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full hover:bg-red-50 border-red-300"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Practice
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-red-50 rounded">
                <p className="text-xs text-gray-600">Time Left Today</p>
                <p className="font-bold text-red-700">{todaysPriority.timeLeft}</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <p className="text-xs text-gray-600">Questions to Solve</p>
                <p className="font-bold text-orange-700">25</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <p className="text-xs text-gray-600">Target Score</p>
                <p className="font-bold text-yellow-700">80%</p>
              </div>
            </div>

            <Link to="/dashboard/student/today">
              <Button variant="outline" className="w-full justify-center">
                View Full Today's Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
