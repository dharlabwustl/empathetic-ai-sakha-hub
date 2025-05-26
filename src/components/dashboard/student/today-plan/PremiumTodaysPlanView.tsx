
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain, 
  Zap, 
  Award,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Timer,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface PremiumTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  userName?: string;
  onConceptClick: (conceptId: string) => void;
  onActionClick: (action: string) => void;
  isMobile?: boolean;
}

const PremiumTodaysPlanView: React.FC<PremiumTodaysPlanViewProps> = ({
  planData,
  userName = "Student",
  onConceptClick,
  onActionClick,
  isMobile = false
}) => {
  if (!planData) return null;

  const completionRate = planData.totalTasks > 0 ? (planData.completedTasks / planData.totalTasks) * 100 : 0;
  const studyStreak = 7; // Mock data
  const focusTime = "2h 45m"; // Mock data

  const strongSubjects = ["Physics", "Mathematics"];
  const weakSubjects = ["Chemistry", "Biology"];

  const todayTasks = [
    {
      id: "1",
      title: "Thermodynamics - Heat Transfer",
      subject: "Physics", 
      duration: "45 min",
      priority: "high",
      completed: false,
      difficulty: "medium"
    },
    {
      id: "2", 
      title: "Organic Chemistry - Reactions",
      subject: "Chemistry",
      duration: "30 min", 
      priority: "medium",
      completed: true,
      difficulty: "hard"
    },
    {
      id: "3",
      title: "Calculus - Integration",
      subject: "Mathematics",
      duration: "60 min",
      priority: "high", 
      completed: false,
      difficulty: "easy"
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Premium Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Good Morning, {userName}! ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-green-600">{studyStreak}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full">
              <Timer className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-blue-600">{focusTime}</div>
              <div className="text-xs text-gray-600">Focus Time</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full">
              <Target className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-purple-600">{Math.round(completionRate)}%</div>
              <div className="text-xs text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Smart Suggestions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              AI Smart Suggestions
              <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                Powered by Sakha AI
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strong Subjects */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-400">Strong Performance</span>
                </div>
                <div className="space-y-3">
                  {strongSubjects.map((subject, index) => (
                    <motion.div
                      key={subject}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">{subject}</span>
                          <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                            85% mastery
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                        Ready for advanced problems and mock tests
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span className="font-semibold text-amber-700 dark:text-amber-400">Focus Areas</span>
                </div>
                <div className="space-y-3">
                  {weakSubjects.map((subject, index) => (
                    <motion.div
                      key={subject}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">{subject}</span>
                          <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs">
                            65% mastery
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                        Needs extra practice and concept review
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
              <div className="flex flex-wrap gap-3">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  onClick={() => onActionClick('concepts')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Concepts
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => onActionClick('practice-exam')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Practice Test
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => onActionClick('flashcards')}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Quick Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Task Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-xl border-2 border-gray-200/50 dark:border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              Today's Learning Path
              <Badge variant="outline" className="ml-auto">
                {todayTasks.filter(t => !t.completed).length} remaining
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Overview */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">{planData.completedTasks}/{planData.totalTasks} tasks</span>
                </div>
                <Progress value={completionRate} className="h-3 mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{completionRate >= 50 ? 'Great progress!' : 'Keep going!'}</span>
                  <span>{Math.round(completionRate)}% complete</span>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      task.completed 
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          task.completed 
                            ? 'bg-green-500 text-white' 
                            : task.priority === 'high' 
                              ? 'bg-red-100 text-red-600' 
                              : 'bg-blue-100 text-blue-600'
                        }`}>
                          {task.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <BookOpen className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {task.subject}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.duration}
                            </span>
                            <Badge 
                              variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {task.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {!task.completed && (
                        <Button 
                          size="sm"
                          onClick={() => onConceptClick(task.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          Start
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PremiumTodaysPlanView;
