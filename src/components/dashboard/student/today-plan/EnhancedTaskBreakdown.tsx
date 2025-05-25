
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
  Star,
  AlertTriangle,
  ChevronRight,
  Timer
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

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'flashcard': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'practice-exam': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const handleTaskClick = (task: any) => {
    if (task.type === 'concept') {
      onConceptClick(task.id);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b">
        <CardTitle className="text-2xl flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          Task Breakdown
          <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
            {allTasks.filter(t => completedTasks.has(t.id) || t.status === 'completed').length}/{allTasks.length} Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Task list with premium cards */}
          <div className="space-y-4">
            {allTasks.map((task) => {
              const isCompleted = completedTasks.has(task.id) || task.status === 'completed';
              const isActive = activeTimer === task.id;
              
              return (
                <Card 
                  key={task.id}
                  className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
                    isCompleted 
                      ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500 shadow-green-100' 
                      : 'bg-white dark:bg-gray-800 border-l-blue-500 hover:shadow-blue-100 dark:hover:shadow-blue-900/20'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Completion checkbox */}
                      <button
                        onClick={() => handleTaskToggle(task.id)}
                        className={`mt-1 transition-all duration-200 ${
                          isCompleted 
                            ? 'text-green-600 scale-110' 
                            : 'text-gray-300 hover:text-blue-600 hover:scale-110'
                        }`}
                      >
                        <CheckCircle2 className="h-7 w-7" />
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        {/* Task header */}
                        <div className="flex items-center gap-3 mb-3">
                          {getTaskIcon(task.type)}
                          <h3 
                            className={`font-bold text-xl cursor-pointer hover:text-blue-600 transition-colors ${
                              isCompleted ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'
                            }`}
                            onClick={() => handleTaskClick(task)}
                          >
                            {task.title}
                          </h3>
                          {task.type === 'concept' && (
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <Badge className={getTypeColor(task.type)}>
                            {task.type.replace('-', ' ').toUpperCase()}
                          </Badge>
                          {task.difficulty && (
                            <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                              {task.difficulty}
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-gray-50 text-gray-700">
                            {task.subject}
                          </Badge>
                        </div>
                        
                        {/* Task details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{task.duration} min</span>
                          </div>
                          {task.topic && (
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              <span>{task.topic}</span>
                            </div>
                          )}
                          {task.cardCount && (
                            <div className="flex items-center gap-2">
                              <Brain className="h-4 w-4" />
                              <span>{task.cardCount} cards</span>
                            </div>
                          )}
                          {task.questionCount && (
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              <span>{task.questionCount} questions</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Progress bar for active tasks */}
                        {isActive && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span>Study Progress</span>
                              <span>25% Complete</span>
                            </div>
                            <Progress value={25} className="h-2" />
                          </div>
                        )}
                      </div>
                      
                      {/* Action buttons */}
                      {!isCompleted && (
                        <div className="flex flex-col gap-2">
                          <Button
                            size="lg"
                            variant={isActive ? "default" : "outline"}
                            onClick={() => handleStartTimer(task.id)}
                            className={`min-w-[120px] ${
                              isActive 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {isActive ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start
                              </>
                            )}
                          </Button>
                          
                          {task.type === 'concept' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleTaskClick(task)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Study
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

          {/* Backlog section with premium styling */}
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
      </CardContent>
    </Card>
  );
};

export default EnhancedTaskBreakdown;
