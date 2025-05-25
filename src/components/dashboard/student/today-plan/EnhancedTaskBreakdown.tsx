
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  Pause, 
  BookOpen, 
  Brain, 
  Target, 
  Trophy,
  RotateCcw,
  Star,
  AlertTriangle
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

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
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  if (!planData) return null;

  const allTasks = [
    ...planData.concepts.map(c => ({ ...c, type: 'concept' as const })),
    ...planData.flashcards.map(f => ({ ...f, type: 'flashcard' as const })),
    ...planData.practiceExams.map(p => ({ ...p, type: 'practice-exam' as const }))
  ];

  const handleTaskToggle = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const handleStartTimer = (taskId: string) => {
    setActiveTimer(activeTimer === taskId ? null : taskId);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'practice-exam': return <Target className="h-5 w-5 text-green-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityIcon = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'hard': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'easy': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleTaskClick = (task: any) => {
    if (task.type === 'concept') {
      onConceptClick(task.id);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-600" />
          Today's Task Breakdown
          <Badge variant="outline" className="ml-auto">
            {allTasks.filter(t => completedTasks.has(t.id) || t.status === 'completed').length}/{allTasks.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Subject-wise breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Concepts</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{planData.concepts.length}</div>
              <div className="text-sm text-gray-600">{planData.timeAllocation.concepts}min total</div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Flashcards</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{planData.flashcards.length}</div>
              <div className="text-sm text-gray-600">{planData.timeAllocation.flashcards}min total</div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-green-600" />
                <span className="font-medium">Practice</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{planData.practiceExams.length}</div>
              <div className="text-sm text-gray-600">{planData.timeAllocation.practiceExams}min total</div>
            </div>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            {allTasks.map((task) => {
              const isCompleted = completedTasks.has(task.id) || task.status === 'completed';
              const isActive = activeTimer === task.id;
              
              return (
                <Card 
                  key={task.id}
                  className={`transition-all duration-200 hover:shadow-md ${
                    isCompleted 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => handleTaskToggle(task.id)}
                        className={`mt-1 transition-colors ${
                          isCompleted 
                            ? 'text-green-600' 
                            : 'text-gray-400 hover:text-blue-600'
                        }`}
                      >
                        <CheckCircle2 className="h-6 w-6" />
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getTaskIcon(task.type)}
                          <h3 
                            className={`font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors ${
                              isCompleted ? 'line-through text-gray-500' : ''
                            }`}
                            onClick={() => handleTaskClick(task)}
                          >
                            {task.title}
                          </h3>
                          {task.difficulty && getPriorityIcon(task.difficulty)}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {task.type.replace('-', ' ')}
                          </Badge>
                          {task.difficulty && (
                            <Badge variant="outline" className="capitalize">
                              {task.difficulty}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {task.duration}min
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {task.subject}
                          </div>
                          {task.topic && (
                            <div className="text-xs">
                              Topic: {task.topic}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!isCompleted && (
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant={isActive ? "default" : "outline"}
                            onClick={() => handleStartTimer(task.id)}
                            className="min-w-[100px]"
                          >
                            {isActive ? (
                              <><Pause className="h-4 w-4 mr-2" /> Pause</>
                            ) : (
                              <><Play className="h-4 w-4 mr-2" /> Start</>
                            )}
                          </Button>
                          
                          {task.type === 'concept' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleTaskClick(task)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Study Now
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Backlog section */}
          {planData.backlogTasks && planData.backlogTasks.length > 0 && (
            <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-orange-800 dark:text-orange-200">
                  <AlertTriangle className="h-5 w-5" />
                  Pending Backlog ({planData.backlogTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {planData.backlogTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{task.subject}</span>
                          <span>•</span>
                          <span>{task.timeEstimate}min</span>
                          {task.daysOverdue && (
                            <>
                              <span>•</span>
                              <span className="text-red-600">{task.daysOverdue} days overdue</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-orange-600 border-orange-300">
                        Clear Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTaskBreakdown;
