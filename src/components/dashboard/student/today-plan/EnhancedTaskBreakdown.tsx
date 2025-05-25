
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Play, 
  BookOpen, 
  Brain, 
  Target,
  AlertTriangle,
  Timer
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import TaskCard from './TaskCard';

interface EnhancedTaskBreakdownProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const EnhancedTaskBreakdown: React.FC<EnhancedTaskBreakdownProps> = ({ 
  planData, 
  onConceptClick, 
  isMobile = false 
}) => {
  if (!planData) return null;

  const allTasks = [
    ...planData.concepts.map(c => ({ ...c, type: 'concept' as const })),
    ...planData.flashcards.map(f => ({ ...f, type: 'flashcard' as const })),
    ...planData.practiceExams.map(p => ({ ...p, type: 'practice-exam' as const }))
  ];

  const completedCount = allTasks.filter(t => t.status === 'completed').length;
  const progressPercentage = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

  const handleTaskStart = (taskId: string) => {
    console.log('Starting task:', taskId);
  };

  const handleTaskComplete = (taskId: string) => {
    console.log('Completing task:', taskId);
  };

  const handleTaskClick = (taskId: string) => {
    const task = allTasks.find(t => t.id === taskId);
    if (task?.type === 'concept') {
      onConceptClick(taskId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Today's Study Progress</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {progressPercentage >= 70 ? 'Excellent progress! 🎉' : 
                   progressPercentage >= 50 ? 'Good momentum! 🚀' : 
                   progressPercentage >= 25 ? 'Getting started! 📚' : 'Ready to begin! ⭐'}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-white dark:bg-gray-800 text-lg px-3 py-1">
              {planData.streak} day streak 🔥
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Main Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Overall Progress</span>
                <span className="text-2xl font-bold">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-4" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{allTasks.length - completedCount}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{planData.timeAllocation.total}m</div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            Today's Tasks
            <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
              {completedCount}/{allTasks.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {allTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={handleTaskStart}
                onComplete={handleTaskComplete}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backlog Section */}
      {planData.backlogTasks && planData.backlogTasks.length > 0 && (
        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-3 text-orange-800 dark:text-orange-200">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              Pending Backlog ({planData.backlogTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {planData.backlogTasks.slice(0, 3).map((task) => (
                <Card key={task.id} className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{task.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {task.subject}
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="h-4 w-4" />
                            {task.timeEstimate}min
                          </span>
                          {task.daysOverdue && (
                            <Badge variant="destructive" className="text-xs">
                              {task.daysOverdue} days overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-orange-600 border-orange-300 hover:bg-orange-50"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Clear Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedTaskBreakdown;
