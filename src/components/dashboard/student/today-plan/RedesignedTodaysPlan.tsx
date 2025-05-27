
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  Target, 
  Play,
  CheckCircle,
  Star,
  Zap,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react';

interface TodaysPlanProps {
  userName?: string;
}

const RedesignedTodaysPlan: React.FC<TodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const [completedTasks, setCompletedTasks] = useState(new Set<string>());

  // Mock data for today's plan
  const todayData = {
    streak: 7,
    totalTasks: 12,
    timeAllocation: {
      concepts: 90,
      flashcards: 60,
      practiceExams: 45,
      total: 195
    },
    tasks: [
      {
        id: '1',
        type: 'concept',
        title: 'Laws of Motion',
        subject: 'Physics',
        duration: 30,
        difficulty: 'Medium',
        priority: 'high' as const
      },
      {
        id: '2',
        type: 'flashcard',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard',
        priority: 'high' as const
      },
      {
        id: '3',
        type: 'exam',
        title: 'Biology Mock Test',
        subject: 'Biology',
        duration: 45,
        difficulty: 'Medium',
        priority: 'medium' as const
      },
      {
        id: '4',
        type: 'concept',
        title: 'Thermodynamics',
        subject: 'Physics',
        duration: 35,
        difficulty: 'Hard',
        priority: 'medium' as const
      }
    ],
    goals: {
      daily: 180, // minutes
      completed: 85
    }
  };

  const completedCount = completedTasks.size;
  const progressPercentage = Math.round((completedCount / todayData.totalTasks) * 100);

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'exam': return <FileText className="h-5 w-5 text-green-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, {userName}! 🌟</h1>
            <p className="text-blue-100 text-lg">Ready to conquer your study goals today?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-xl font-bold">{todayData.streak} Day Streak</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m planned
            </Badge>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Progress</span>
            <span>{completedCount}/{todayData.totalTasks} tasks ({progressPercentage}%)</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-800">{todayData.timeAllocation.concepts}m</p>
            <p className="text-sm text-blue-600 font-medium">Concepts</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-800">{todayData.timeAllocation.flashcards}m</p>
            <p className="text-sm text-purple-600 font-medium">Flashcards</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-800">{todayData.timeAllocation.practiceExams}m</p>
            <p className="text-sm text-green-600 font-medium">Practice</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold text-orange-800">{todayData.goals.completed}%</p>
            <p className="text-sm text-orange-600 font-medium">Goal Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Tasks */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="h-6 w-6 text-blue-600" />
            Today's Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {todayData.tasks.map((task) => {
              const isCompleted = completedTasks.has(task.id);
              
              return (
                <Card 
                  key={task.id} 
                  className={`transition-all duration-300 cursor-pointer ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200 opacity-75' 
                      : `hover:shadow-md border-2 ${getPriorityColor(task.priority)}`
                  }`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            getTaskIcon(task.type)
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {task.subject}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.duration} min
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                task.difficulty === 'Hard' ? 'border-red-300 text-red-700' :
                                task.difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                                'border-green-300 text-green-700'
                              }`}
                            >
                              {task.difficulty}
                            </Badge>
                            {task.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">
                                High Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {!isCompleted && (
                        <Button 
                          size="sm" 
                          className="ml-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Starting ${task.type}: ${task.title}`);
                          }}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Section */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-indigo-900">Stay Motivated!</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm font-medium text-gray-800 mb-1">Today's Focus</p>
              <p className="text-xs text-gray-600">Complete high-priority Physics concepts to boost your understanding</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm font-medium text-gray-800 mb-1">Weekly Goal</p>
              <p className="text-xs text-gray-600">Maintain your 7-day streak and aim for 90% completion rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedTodaysPlan;
