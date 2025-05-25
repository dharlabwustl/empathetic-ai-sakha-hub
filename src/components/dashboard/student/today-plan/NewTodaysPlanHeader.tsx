
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, TrendingUp, BookOpen, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface NewTodaysPlanHeaderProps {
  userName?: string;
  isMobile?: boolean;
}

const NewTodaysPlanHeader: React.FC<NewTodaysPlanHeaderProps> = ({ 
  userName = "Student", 
  isMobile = false 
}) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const strongSubjects = ["Physics", "Mathematics"];
  const weakSubjects = ["Chemistry", "Biology"];

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Good Morning, {userName}! 🌟
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            {today} • Let's make today count towards your exam success
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">Today's Focus</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-green-500" />
            <span className="text-gray-600 dark:text-gray-400">4 Hours Goal</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span className="text-gray-600 dark:text-gray-400">Week 8/12</span>
          </div>
        </div>
      </motion.div>

      {/* Smart Suggestions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-blue-800/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Today's Smart Suggestions</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Strong Subjects */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-700 dark:text-green-400">Strong Subjects</span>
                  </div>
                  <div className="space-y-2">
                    {strongSubjects.map((subject, index) => (
                      <motion.div
                        key={subject}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium">{subject}</span>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs">
                            85% mastery
                          </Badge>
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">
                          Advanced problems today
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Weak Subjects */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-orange-700 dark:text-orange-400">Focus Areas</span>
                  </div>
                  <div className="space-y-2">
                    {weakSubjects.map((subject, index) => (
                      <motion.div
                        key={subject}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="font-medium">{subject}</span>
                          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                            65% mastery
                          </Badge>
                        </div>
                        <div className="text-sm text-orange-600 dark:text-orange-400">
                          Extra practice needed
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Action Suggestions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-blue-200 dark:border-blue-800">
                <Button size="sm" variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Quick 15-min Chemistry boost
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  Advanced Physics problems
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Biology weak concepts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NewTodaysPlanHeader;
