
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  Calendar,
  CheckCircle2,
  Zap,
  Star,
  BarChart3
} from 'lucide-react';

const HeroDashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full max-w-4xl mx-auto"
    >
      {/* Dashboard Container - Increased size */}
      <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Dashboard Header */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Student Dashboard</h2>
              <p className="text-blue-100">Welcome back, Alex!</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              NEET 2026
            </Badge>
          </div>
        </motion.div>

        {/* Dashboard Content - Made larger */}
        <div className="p-6 space-y-6 h-[calc(100%-120px)] overflow-y-auto">
          {/* Exam Readiness Score - Larger */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-violet-600" />
                    <div>
                      <h3 className="text-xl font-bold">Exam Readiness</h3>
                      <p className="text-sm text-muted-foreground">Your current preparation level</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-violet-600">78%</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +5% this week
                    </div>
                  </div>
                </div>
                <Progress value={78} className="h-3 mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">85%</div>
                    <div className="text-xs text-muted-foreground">Concepts</div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-green-600">72%</div>
                    <div className="text-xs text-muted-foreground">Practice</div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">77%</div>
                    <div className="text-xs text-muted-foreground">Speed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's Plan & Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Today's Plan */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Today's Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { subject: "Physics", topic: "Mechanics", time: "45 min", progress: 60, color: "blue" },
                      { subject: "Chemistry", topic: "Organic", time: "30 min", progress: 80, color: "green" },
                      { subject: "Biology", topic: "Genetics", time: "35 min", progress: 20, color: "purple" }
                    ].map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{task.subject}</div>
                          <div className="text-xs text-muted-foreground">{task.topic}</div>
                          <Progress value={task.progress} className="h-1 mt-2" />
                        </div>
                        <div className="text-xs text-muted-foreground ml-2">{task.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">45/60</div>
                      <div className="text-xs text-muted-foreground">Concepts</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">126h</div>
                      <div className="text-xs text-muted-foreground">Study Time</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">82%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                      <Award className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">7 Days</div>
                      <div className="text-xs text-muted-foreground">Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Completed Physics Quiz", score: "85%", time: "2 hours ago", icon: CheckCircle2, color: "green" },
                    { action: "Reviewed Organic Chemistry", progress: "12 concepts", time: "4 hours ago", icon: BookOpen, color: "blue" },
                    { action: "Practice Test - Biology", score: "78%", time: "Yesterday", icon: Star, color: "purple" }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.action}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {activity.score || activity.progress}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3">
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Today's Study
            </Button>
            <Button variant="outline" className="flex-1">
              Take Practice Test
            </Button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-6 bg-green-500 text-white p-2 rounded-full shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CheckCircle2 className="h-4 w-4" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-6 bg-blue-500 text-white p-2 rounded-full shadow-lg"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Brain className="h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroDashboard;
