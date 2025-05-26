
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Brain,
  Zap
} from 'lucide-react';

const EnhancedDashboardPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-8">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main dashboard container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl"
        style={{
          transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Dashboard mockup */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm lg:text-base">
                    Welcome back, Priya!
                  </h3>
                  <p className="text-blue-100 text-xs lg:text-sm">
                    Ready for NEET 2024
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500 text-white text-xs">
                On Track
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6 space-y-4">
            {/* Today's Progress */}
            <Card className="border-0 bg-gray-50 dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm lg:text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs lg:text-sm mb-1">
                    <span>Physics Concepts</span>
                    <span className="text-green-600 font-medium">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs lg:text-sm mb-1">
                    <span>Chemistry Practice</span>
                    <span className="text-blue-600 font-medium">6/8</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs lg:text-sm mb-1">
                    <span>Biology Revision</span>
                    <span className="text-orange-600 font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 lg:p-4 rounded-xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs lg:text-sm font-medium text-green-700 dark:text-green-400">
                    Completed
                  </span>
                </div>
                <div className="text-lg lg:text-xl font-bold text-green-800 dark:text-green-300">
                  47
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  Tasks Today
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 lg:p-4 rounded-xl border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-xs lg:text-sm font-medium text-purple-700 dark:text-purple-400">
                    Streak
                  </span>
                </div>
                <div className="text-lg lg:text-xl font-bold text-purple-800 dark:text-purple-300">
                  12
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Days Active
                </div>
              </motion.div>
            </div>

            {/* Smart Suggestions */}
            <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-3 lg:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-xs lg:text-sm font-semibold text-blue-700 dark:text-blue-400">
                    Smart Suggestion
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                  Focus on Organic Chemistry today - you're 85% ready for mock test!
                </p>
              </CardContent>
            </Card>

            {/* Upcoming Schedule */}
            <div className="space-y-2">
              <h4 className="text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Next Up
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 lg:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-xs lg:text-sm font-medium">Physics Mock Test</div>
                    <div className="text-xs text-gray-500">2:00 PM Today</div>
                  </div>
                  <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-3 p-2 lg:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-xs lg:text-sm font-medium">Chemistry Revision</div>
                    <div className="text-xs text-gray-500">4:30 PM Today</div>
                  </div>
                  <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements around dashboard */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <CheckCircle className="w-4 h-4 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [0, 10, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <Brain className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedDashboardPreview;
