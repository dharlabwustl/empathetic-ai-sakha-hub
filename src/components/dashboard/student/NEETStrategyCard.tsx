
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Calendar, Target, TrendingUp, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './dashboard-sections/AnimatedHighlight';

const NEETStrategyCard: React.FC = () => {
  const strategyData = {
    currentPhase: "Intensive Revision",
    daysToExam: 338,
    completion: 68,
    weeklyTarget: 35,
    weeklyProgress: 28,
    focusAreas: [
      { subject: "Chemistry", priority: "High", sessions: 12 },
      { subject: "Physics", priority: "Medium", sessions: 8 },
      { subject: "Biology", priority: "Low", sessions: 6 }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <AnimatedHighlight
        text="Your dynamic plan based on your profile, keeps changing based on your learning performance!"
        storageKey="neet_strategy_dynamic"
        variant="info"
      />
      
      <Card className="premium-card h-full shadow-lg border-2 border-gradient-to-b from-purple-200 to-indigo-200 dark:from-purple-800 dark:to-indigo-800">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 pb-3">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="h-5 w-5 text-purple-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#7c3aed", "#3730a3", "#7c3aed"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-bold text-base"
            >
              NEET Strategy 2026
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* Current Phase */}
          <div className="bg-purple-50/50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Current Phase</span>
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
            <p className="font-semibold text-purple-900 dark:text-purple-100">{strategyData.currentPhase}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{strategyData.daysToExam} days to exam</p>
          </div>

          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Overall Progress</span>
              <span className="text-gray-700 dark:text-gray-300">{strategyData.completion}%</span>
            </div>
            <Progress value={strategyData.completion} className="h-2" />
          </div>

          {/* Weekly Target */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Weekly Target</span>
              <span className="text-gray-700 dark:text-gray-300">{strategyData.weeklyProgress}/{strategyData.weeklyTarget}h</span>
            </div>
            <Progress value={(strategyData.weeklyProgress / strategyData.weeklyTarget) * 100} className="h-2" />
          </div>

          {/* Focus Areas */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Focus Areas</h4>
            {strategyData.focusAreas.map((area, index) => (
              <motion.div
                key={area.subject}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{area.subject}</span>
                  <Badge className={getPriorityColor(area.priority)} size="sm">
                    {area.priority}
                  </Badge>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{area.sessions} sessions</span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Link to="/dashboard/student/academic">
              <Button 
                size="sm" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Target className="h-3 w-3 mr-1" />
                View Full Strategy
              </Button>
            </Link>
            <Link to="/dashboard/student/analytics">
              <Button 
                size="sm" 
                variant="outline"
                className="w-full hover:bg-purple-50"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Performance Insights
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
