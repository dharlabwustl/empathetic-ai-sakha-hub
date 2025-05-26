
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Clock, 
  CheckCircle2, 
  Play, 
  Calendar,
  TrendingUp,
  Zap,
  Award,
  Timer,
  BarChart3
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { motion } from 'framer-motion';

interface ModernTodaysPlanLayoutProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  onTaskComplete: (taskId: string, type: 'concept' | 'flashcard' | 'practice-exam') => void;
  isMobile?: boolean;
}

const ModernTodaysPlanLayout: React.FC<ModernTodaysPlanLayoutProps> = ({
  planData,
  onConceptClick,
  onTaskComplete,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!planData) return null;

  const completionPercentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);
  const remainingTime = planData.timeAllocation.total - (planData.timeAllocation.total * completionPercentage / 100);

  const renderTaskCard = (task: any, type: 'concept' | 'flashcard' | 'practice-exam') => {
    const isCompleted = task.status === 'completed';
    const icon = type === 'concept' ? BookOpen : type === 'flashcard' ? Brain : Target;
    const IconComponent = icon;

    return (
      <motion.div
        key={task.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isCompleted 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'hover:border-primary/50'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-800' 
                    : type === 'concept' 
                      ? 'bg-blue-100 dark:bg-blue-800'
                      : type === 'flashcard'
                        ? 'bg-purple-100 dark:bg-purple-800'
                        : 'bg-orange-100 dark:bg-orange-800'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <IconComponent className={`h-5 w-5 ${
                      type === 'concept' 
                        ? 'text-blue-600 dark:text-blue-400'
                        : type === 'flashcard'
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-orange-600 dark:text-orange-400'
                    }`} />
                  )}
                </div>
                <div>
                  <h4 className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500">{task.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {task.duration}m
                </Badge>
                {!isCompleted && (
                  <Button 
                    size="sm" 
                    onClick={() => type === 'concept' ? onConceptClick(task.id) : onTaskComplete(task.id, type)}
                    className="h-8"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                )}
              </div>
            </div>
            {task.difficulty && (
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  task.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                  task.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {task.difficulty}
              </Badge>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{planData.completedTasks}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                <Timer className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{planData.totalTasks - planData.completedTasks}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{Math.round(remainingTime)}m</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Time Left</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{planData.streak}</p>
                <p className="text-xs text-green-600 dark:text-green-400">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Today's Progress</h3>
              <Badge variant="outline" className="text-sm">
                {completionPercentage}% Complete
              </Badge>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{planData.completedTasks} of {planData.totalTasks} tasks completed</span>
              <span>{Math.round(planData.timeAllocation.total)} minutes total</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {!isMobile && "Overview"}
          </TabsTrigger>
          <TabsTrigger value="concepts" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {!isMobile && "Concepts"}
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            {!isMobile && "Flashcards"}
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            {!isMobile && "Practice"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Time Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Concepts</span>
                  <Badge variant="outline">{planData.timeAllocation.concepts}m</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Flashcards</span>
                  <Badge variant="outline">{planData.timeAllocation.flashcards}m</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Practice Exams</span>
                  <Badge variant="outline">{planData.timeAllocation.practiceExams}m</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Revision</span>
                  <Badge variant="outline">{planData.timeAllocation.revision}m</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Tomorrow's Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Total Tasks</span>
                  <Badge variant="outline">{planData.tomorrowPreview?.totalTasks || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Focus Area</span>
                  <Badge>{planData.tomorrowPreview?.focusArea || "Mathematics"}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Difficulty</span>
                  <Badge variant="outline">{planData.tomorrowPreview?.difficulty || "moderate"}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {planData.concepts?.map((concept) => renderTaskCard(concept, 'concept'))}
          </div>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {planData.flashcards?.map((flashcard) => renderTaskCard(flashcard, 'flashcard'))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {planData.practiceExams?.map((exam) => renderTaskCard(exam, 'practice-exam'))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernTodaysPlanLayout;
