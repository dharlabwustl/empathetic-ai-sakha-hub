
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, TrendingUp, BookOpen, Trophy, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NEETStrategyCard = () => {
  const strategies = [
    {
      title: "Priority Topics Focus",
      description: "Master high-weightage chapters first",
      progress: 78,
      timeLeft: "5 days",
      priority: "Critical",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Weak Areas Improvement", 
      description: "Target concepts with <60% accuracy",
      progress: 45,
      timeLeft: "12 days",
      priority: "High",
      color: "from-orange-500 to-yellow-500"
    },
    {
      title: "Practice Test Strategy",
      description: "Daily mock tests & analysis",
      progress: 92,
      timeLeft: "Ongoing",
      priority: "Medium",
      color: "from-green-500 to-blue-500"
    }
  ];

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Target className="h-5 w-5 text-purple-600" />
          </motion.div>
          <motion.span
            animate={{ 
              color: ["#7c3aed", "#3b82f6", "#7c3aed"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-bold"
          >
            NEET 2026 Strategy
          </motion.span>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity
            }}
            className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold"
          >
            PRIORITY
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={index}
            className="p-3 rounded-lg border bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-sm">{strategy.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">{strategy.description}</p>
              </div>
              <div className="text-right">
                <motion.div
                  animate={{ 
                    borderColor: strategy.priority === 'Critical' 
                      ? ["#dc2626", "#ea580c", "#dc2626"]
                      : strategy.priority === 'High'
                      ? ["#ea580c", "#f59e0b", "#ea580c"] 
                      : ["#10b981", "#3b82f6", "#10b981"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity
                  }}
                  className={`px-2 py-1 rounded text-xs font-bold border-2 ${
                    strategy.priority === 'Critical' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : strategy.priority === 'High'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}
                >
                  {strategy.priority}
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">{strategy.timeLeft}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span className="font-semibold">{strategy.progress}%</span>
              </div>
              <Progress value={strategy.progress} className="h-1.5" />
            </div>
          </motion.div>
        ))}
        
        <motion.div
          className="pt-2"
          animate={{ 
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Link to="/dashboard/student/study-plan">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold shadow-lg"
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              View Complete Study Plan
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-2 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Days Left</p>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">185</p>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-2 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs font-medium text-green-700 dark:text-green-300">Target Score</p>
            <p className="text-lg font-bold text-green-900 dark:text-green-100">685+</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEETStrategyCard;
