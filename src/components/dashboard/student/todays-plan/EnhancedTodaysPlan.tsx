
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertTriangle, Target, BookOpen, Brain, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SmartSuggestionsSection from './SmartSuggestionsSection';
import { TodaysPlanData } from '@/types/student/todaysPlan';

const EnhancedTodaysPlan: React.FC = () => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState<TodaysPlanData | null>(null);

  useEffect(() => {
    // Initialize plan data
    const mockPlanData: TodaysPlanData = {
      totalTasks: 8,
      completedTasks: 3,
      pendingTasks: 5,
      dailyGoal: "Complete 6 tasks",
      estimatedTimeRemaining: 180, // minutes
      backlogTasks: [
        {
          id: 'backlog-1',
          title: 'Physics - Thermodynamics Review',
          type: 'concept',
          overdueDays: 2,
          priority: 'high'
        },
        {
          id: 'backlog-2',
          title: 'Chemistry Formula Practice',
          type: 'flashcard',
          overdueDays: 1,
          priority: 'medium'
        }
      ],
      todaysTasks: [
        {
          id: 'task-1',
          title: "Newton's Laws of Motion",
          type: 'concept',
          estimatedTime: 30,
          completed: true,
          priority: 'high'
        },
        {
          id: 'task-2',
          title: 'Organic Chemistry Reactions',
          type: 'flashcard',
          estimatedTime: 20,
          completed: true,
          priority: 'medium'
        },
        {
          id: 'task-3',
          title: 'Algebra Practice Test',
          type: 'quiz',
          estimatedTime: 45,
          completed: true,
          priority: 'medium'
        },
        {
          id: 'task-4',
          title: 'Wave Motion Concepts',
          type: 'concept',
          estimatedTime: 35,
          completed: false,
          priority: 'high'
        },
        {
          id: 'task-5',
          title: 'Periodic Table Review',
          type: 'flashcard',
          estimatedTime: 25,
          completed: false,
          priority: 'medium'
        }
      ]
    };
    setPlanData(mockPlanData);
  }, []);

  const getProgressPercentage = () => {
    if (!planData) return 0;
    return Math.round((planData.completedTasks / planData.totalTasks) * 100);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-4 w-4" />;
      case 'flashcard':
        return <Brain className="h-4 w-4" />;
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleTaskClick = (task: any) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.type === 'flashcard') {
      navigate('/dashboard/student/flashcards');
    } else if (task.type === 'quiz') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'concepts':
        navigate('/dashboard/student/concepts');
        break;
      case 'flashcards':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice-exam':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'break':
        // Handle break suggestion
        break;
      case 'bonus':
        navigate('/dashboard/student/feel-good-corner');
        break;
      default:
        break;
    }
  };

  if (!planData) return null;

  return (
    <div className="space-y-6 p-6">
      {/* Progress Meter at Top */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-7 w-7 text-blue-600" />
              Today's Progress
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {getProgressPercentage()}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={getProgressPercentage()} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white/60 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{planData.completedTasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="p-3 bg-white/60 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{planData.pendingTasks}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="p-3 bg-white/60 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{planData.backlogTasks.length}</div>
                <div className="text-sm text-gray-600">Backlog</div>
              </div>
              <div className="p-3 bg-white/60 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{planData.estimatedTimeRemaining}m</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions Section */}
      <SmartSuggestionsSection
        planData={planData}
        onActionClick={handleActionClick}
        isMobile={false}
      />

      {/* Today's Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {planData.todaysTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  task.completed 
                    ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      task.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {task.completed ? <CheckCircle className="h-4 w-4" /> : getTaskIcon(task.type)}
                    </div>
                    <div>
                      <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{task.estimatedTime} min</span>
                        <span>•</span>
                        <span className="capitalize">{task.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    {task.completed && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Done
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backlog Tasks */}
      {planData.backlogTasks.length > 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Pending Backlog ({planData.backlogTasks.length} tasks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {planData.backlogTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-white border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-50"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-full bg-orange-100 text-orange-600">
                        {getTaskIcon(task.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-800">{task.title}</h4>
                        <div className="text-sm text-orange-600">
                          Overdue by {task.overdueDays} {task.overdueDays === 1 ? 'day' : 'days'}
                        </div>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedTodaysPlan;
