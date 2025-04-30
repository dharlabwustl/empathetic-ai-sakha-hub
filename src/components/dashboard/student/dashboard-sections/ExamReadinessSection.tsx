
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Clock, PieChart, BookOpen, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const ExamReadinessSection = () => {
  const overallReadiness = 72;
  const subjectReadiness = [
    { name: 'Physics', progress: 65, color: 'bg-blue-500' },
    { name: 'Chemistry', progress: 80, color: 'bg-green-500' },
    { name: 'Mathematics', progress: 58, color: 'bg-purple-500' },
    { name: 'Biology', progress: 75, color: 'bg-amber-500' },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-amber-500" />
          Exam Readiness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall readiness */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-32 h-32 mb-2">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-gray-100 dark:text-gray-800"
                />
                
                {/* Progress circle with dash offset animation */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-amber-500"
                  strokeLinecap="round"
                  strokeDasharray={283} // 2 * PI * radius
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ 
                    strokeDashoffset: 283 * (1 - overallReadiness / 100) 
                  }}
                  transition={{ duration: 1, delay: 0.2 }}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold">{overallReadiness}%</span>
                  <span className="block text-xs text-gray-500">Readiness</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium">Overall Exam Readiness</h3>
              <p className="text-xs text-gray-500 mt-1">Based on your performance</p>
            </div>
          </motion.div>

          {/* Subject readiness */}
          <div className="pt-2">
            <h3 className="text-sm font-medium mb-3">Subject Readiness</h3>
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {subjectReadiness.map((subject) => (
                <motion.div key={subject.name} variants={itemVariants}>
                  <div className="flex justify-between text-xs">
                    <span>{subject.name}</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress 
                    value={subject.progress} 
                    className={`h-2 mt-1 ${subject.color}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Time until exam */}
          <motion.div 
            className="flex items-center justify-between text-sm bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <span className="font-medium">Time until exam:</span>
            </div>
            <span className="font-bold">42 days</span>
          </motion.div>

          {/* Quick stats */}
          <motion.div 
            className="grid grid-cols-2 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded text-center">
              <PieChart className="h-4 w-4 mx-auto mb-1 text-blue-500" />
              <span className="text-xs block">85% Quiz Accuracy</span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded text-center">
              <BookOpen className="h-4 w-4 mx-auto mb-1 text-purple-500" />
              <span className="text-xs block">120 Concepts Learned</span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded text-center">
              <Brain className="h-4 w-4 mx-auto mb-1 text-green-500" />
              <span className="text-xs block">75% Focus Score</span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded text-center">
              <Clock className="h-4 w-4 mx-auto mb-1 text-amber-500" />
              <span className="text-xs block">42h Study Time</span>
            </motion.div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
