
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap, Sparkles, Clock, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const NEETStrategyCard: React.FC = () => {
  const urgencyLevel = "HIGH";
  const strategy = "Foundation Building + Practice";
  
  // Enhanced strategy data based on user profile
  const strategyData = {
    totalStudyTime: "6 hours/day",
    conceptsToday: 8,
    dailyPace: "Moderate",
    examProximity: "6 months left",
    daysLeft: 183
  };
  
  const objectives = [
    "Complete 8 new concepts",
    "Revise 15 previous topics", 
    "Solve 50 practice questions"
  ];

  const getUrgencyColor = (level: string) => {
    switch(level) {
      case "HIGH": return "from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800";
      case "MODERATE": return "from-orange-200 to-yellow-200 dark:from-orange-800 dark:to-yellow-800";
      default: return "from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800";
    }
  };

  return (
    <motion.div
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
        <div className="text-red-500 text-2xl font-bold">↓</div>
      </motion.div>

      {/* Priority badge */}
      <motion.div
        className="absolute -top-2 -right-2 z-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Badge className="bg-red-500 text-white font-bold px-3 py-1 shadow-lg">
          PRIORITY!
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

      <Card className={`relative shadow-xl border-2 border-gradient-to-r ${getUrgencyColor(urgencyLevel)} overflow-hidden`}>
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
            <Badge className={`${
              urgencyLevel === "HIGH" ? "bg-red-100 text-red-800 border-red-300" :
              "bg-orange-100 text-orange-800 border-orange-300"
            }`}>
              {urgencyLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="text-center">
            <h3 className="font-bold text-red-900 dark:text-red-100 mb-2 text-lg">
              NEET Strategy - {strategy}
            </h3>
            
            {/* Strategy Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-red-200 dark:border-red-700">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Study Time</span>
                </div>
                <p className="font-bold text-blue-700 dark:text-blue-300">{strategyData.totalStudyTime}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Concepts</span>
                </div>
                <p className="font-bold text-green-700 dark:text-green-300">{strategyData.conceptsToday} today</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Pace</span>
                </div>
                <p className="font-bold text-purple-700 dark:text-purple-300">{strategyData.dailyPace}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Exam</span>
                </div>
                <p className="font-bold text-orange-700 dark:text-orange-300">{strategyData.daysLeft} days</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2 text-sm bg-white/60 dark:bg-gray-800/60 p-2 rounded border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-800 dark:text-gray-200 font-medium">{objective}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              <Zap className="h-4 w-4 mr-2" />
              Start Today's Focus Session
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
