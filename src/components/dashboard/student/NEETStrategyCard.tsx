
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, TrendingUp, BookOpen, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedHighlight from './dashboard-sections/AnimatedHighlight';

const NEETStrategyCard: React.FC = () => {
  const [showHighlight, setShowHighlight] = useState(true);
  
  const strategyData = {
    currentPhase: "Foundation Building",
    nextPhase: "Problem Solving",
    daysToNext: 15,
    overallProgress: 68,
    weeklyGoal: 35,
    weeklyCompleted: 24,
    focusAreas: [
      { subject: "Chemistry", priority: "High", color: "bg-red-500" },
      { subject: "Physics", priority: "Medium", color: "bg-yellow-500" },
      { subject: "Biology", priority: "Low", color: "bg-green-500" }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Animated Highlight */}
      {showHighlight && (
        <AnimatedHighlight
          message="Your dynamic plan based on your profile, keeps changing based on your learning performance!"
          position="top-center"
          color="purple"
          onClose={() => setShowHighlight(false)}
        />
      )}

      <Card className="premium-card h-full shadow-lg border-2 border-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 pb-3">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Target className="h-5 w-5 text-purple-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#7c3aed", "#ec4899", "#7c3aed"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-purple-700 dark:text-purple-300 font-bold"
            >
              NEET Strategy
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {/* Current Phase */}
          <div className="text-center">
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1 text-sm font-medium">
              Current Phase
            </Badge>
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">
              {strategyData.currentPhase}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {strategyData.daysToNext} days until {strategyData.nextPhase}
            </p>
          </div>

          {/* Progress Overview */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Overall Progress</span>
                <span className="font-medium">{strategyData.overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${strategyData.overallProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Weekly Goal</span>
                <span className="font-medium">{strategyData.weeklyCompleted}/{strategyData.weeklyGoal}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(strategyData.weeklyCompleted / strategyData.weeklyGoal) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              This Week's Focus
            </h4>
            <div className="space-y-2">
              {strategyData.focusAreas.map((area, index) => (
                <motion.div
                  key={area.subject}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${area.color}`} />
                    <span className="text-sm font-medium">{area.subject}</span>
                  </div>
                  <Badge className={getPriorityColor(area.priority)} variant="outline">
                    {area.priority}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Link to="/dashboard/student/academic" className="block">
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <BookOpen className="h-3 w-3 mr-2" />
                View Full Strategy
              </Button>
            </Link>
            <Link to="/dashboard/student/today" className="block">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full hover:bg-purple-50"
              >
                <Clock className="h-3 w-3 mr-2" />
                Today's Plan
              </Button>
            </Link>
          </div>

          {/* Adaptive Indicator */}
          <motion.div
            className="text-center p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg"
            animate={{ 
              backgroundColor: ["rgba(139, 92, 246, 0.1)", "rgba(236, 72, 153, 0.1)", "rgba(139, 92, 246, 0.1)"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="h-4 w-4 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">
              Strategy adapts based on your performance
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
