
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
import { useLanguage } from '@/hooks/useLanguage';

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
  const { language, t } = useLanguage();
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

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-50 border-l-red-500';
      case 'medium': return 'bg-yellow-50 border-l-yellow-500';
      case 'low': return 'bg-green-50 border-l-green-500';
      default: return 'bg-gray-50 border-l-gray-500';
    }
  };

  const completedCount = completedTasks.size;
  const totalTasks = allTasks.length;
  const completionPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Task Overview Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              {t('todaysPlan.taskBreakdown')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">
                {completedCount}/{totalTasks} {language === 'hi' ? 'पूर्ण' : 'Complete'}
              </span>
            </div>
          </div>
          <Progress value={completionPercentage} className="mt-2" />
        </CardHeader>
      </Card>

      {/* Task Cards */}
      <div className="grid gap-4">
        {allTasks.map((task, index) => {
          const isCompleted = completedTasks.has(task.id);
          const isTimerActive = activeTimer === task.id;
          
          return (
            <Card 
              key={task.id}
              className={`${getPriorityColor(task.priority)} border-l-4 transition-all duration-300 hover:shadow-md ${
                isCompleted ? 'opacity-75 bg-green-50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Task Icon */}
                    <div className={`p-2 rounded-lg ${
                      task.type === 'concept' ? 'bg-blue-100' :
                      task.type === 'flashcard' ? 'bg-purple-100' :
                      'bg-green-100'
                    }`}>
                      {getTaskIcon(task.type)}
                    </div>
                    
                    {/* Task Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h3>
                        {task.difficulty && (
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {language === 'hi' ? 
                              (task.difficulty === 'easy' ? 'आसान' : task.difficulty === 'medium' ? 'मध्यम' : 'कठिन') :
                              task.difficulty
                            }
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{task.timeEstimate || 30} {language === 'hi' ? 'मिनट' : 'min'}</span>
                        </div>
                        
                        {task.priority && (
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="capitalize">
                              {language === 'hi' ? 
                                (task.priority === 'high' ? 'उच्च' : task.priority === 'medium' ? 'मध्यम' : 'निम्न') :
                                task.priority
                              } {language === 'hi' ? 'प्राथमिकता' : 'priority'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    {/* Timer Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartTimer(task.id)}
                      className={isTimerActive ? 'bg-blue-100 text-blue-700' : ''}
                    >
                      {isTimerActive ? <Pause className="h-4 w-4" /> : <Timer className="h-4 w-4" />}
                    </Button>
                    
                    {/* Complete Button */}
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTaskToggle(task.id)}
                      className={isCompleted ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    
                    {/* Start/Open Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (task.type === 'concept') {
                          onConceptClick(task.id);
                        }
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Timer Display */}
                {isTimerActive && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-blue-700">
                      <Timer className="h-4 w-4" />
                      <span className="font-mono text-lg">25:00</span>
                      <span className="text-sm">
                        {language === 'hi' ? 'फोकस सत्र' : 'Focus Session'}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Completion Celebration */}
      {completionPercentage === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              {language === 'hi' ? 'बधाई हो!' : 'Congratulations!'}
            </h3>
            <p className="text-green-700">
              {language === 'hi' ? 
                'आपने आज के सभी कार्य पूरे कर लिए हैं!' :
                'You have completed all tasks for today!'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedTaskBreakdown;
