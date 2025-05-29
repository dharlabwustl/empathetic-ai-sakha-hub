
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap, Sparkles, Clock, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NEETStrategyCard: React.FC = () => {
  const navigate = useNavigate();
  const urgencyLevel = "MODERATE";
  const strategy = "Foundation Building + Practice";
  
  const objectives = [
    "Complete syllabus",
    "Concept clarity", 
    "Regular practice"
  ];

  const subjects = [
    { name: "Physics", progress: 65, isWeak: true, color: "text-red-600" },
    { name: "Chemistry", progress: 78, isWeak: false, color: "text-green-600" },
    { name: "Biology", progress: 85, isWeak: false, color: "text-blue-600" }
  ];

  const handleViewPlan = () => {
    navigate('/dashboard/student/study-plans');
  };

  return (
    <motion.div
      className="relative"
      data-tour="neet-strategy"
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

      <Card className="relative shadow-lg border-2 border-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 overflow-hidden">
        {/* Pulsing border effect */}
        <motion.div
          className="absolute inset-0 border-4 border-orange-400 rounded-lg opacity-50"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(251, 146, 60, 0.4)",
              "0 0 0 20px rgba(251, 146, 60, 0)",
              "0 0 0 0 rgba(251, 146, 60, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20"
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
                <Target className="h-5 w-5 text-orange-600" />
              </motion.div>
              NEET Strategy Card - Adaptive Plan
            </CardTitle>
            <Badge className="bg-orange-100 text-orange-800 border-orange-300">
              {urgencyLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="text-center">
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
              {strategy}
            </h3>
          </div>

          {/* Study metrics grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Study Time</p>
                  <p className="font-semibold text-orange-900 dark:text-orange-100">6 hours/day</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Concepts</p>
                  <p className="font-semibold text-orange-900 dark:text-orange-100">8 today</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Daily Pace</p>
                  <p className="font-semibold text-orange-900 dark:text-orange-100">Moderate</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Exam Proximity</p>
                  <p className="font-semibold text-orange-900 dark:text-orange-100">183 days left</p>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Areas - Subjects */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-2">Focus Areas</h4>
            <div className="space-y-2">
              {subjects.map((subject, index) => (
                <div key={subject.name} className="flex items-center justify-between p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-orange-100 dark:border-orange-800">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${subject.isWeak ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span className={`font-medium ${subject.color}`}>{subject.name}</span>
                    {subject.isWeak && (
                      <Badge variant="destructive" className="text-xs px-1 py-0">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Weak
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-medium">{subject.progress}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              onClick={handleViewPlan}
            >
              <Zap className="h-4 w-4 mr-2" />
              View Your Plan
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
