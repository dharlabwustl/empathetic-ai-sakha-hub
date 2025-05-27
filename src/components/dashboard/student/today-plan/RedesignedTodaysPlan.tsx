
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  Target, 
  Play,
  CheckCircle,
  Star,
  Calendar,
  Lightbulb,
  Award,
  Trophy,
  Flame,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface TodaysPlanProps {
  userName?: string;
}

const RedesignedTodaysPlan: React.FC<TodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState(new Set<string>(['4', '8'])); // Some pre-completed tasks
  const [activeTab, setActiveTab] = useState('today');

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
    todayTasks: [
      {
        id: '1',
        type: 'concept',
        title: 'Laws of Motion',
        subject: 'Physics',
        duration: 30,
        difficulty: 'Medium',
        priority: 'high' as const,
        dueTime: '10:00 AM'
      },
      {
        id: '2',
        type: 'flashcard',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard',
        priority: 'high' as const,
        dueTime: '11:00 AM'
      },
      {
        id: '3',
        type: 'exam',
        title: 'Biology Mock Test',
        subject: 'Biology',
        duration: 45,
        difficulty: 'Medium',
        priority: 'medium' as const,
        dueTime: '2:00 PM'
      },
      {
        id: '5',
        type: 'concept',
        title: 'Thermodynamics',
        subject: 'Physics',
        duration: 35,
        difficulty: 'Hard',
        priority: 'medium' as const,
        dueTime: '4:00 PM'
      }
    ],
    pendingTasks: [
      {
        id: '6',
        type: 'flashcard',
        title: 'Calculus Derivatives',
        subject: 'Mathematics',
        duration: 20,
        difficulty: 'Medium',
        priority: 'low' as const,
        dueDate: 'Yesterday'
      },
      {
        id: '7',
        type: 'concept',
        title: 'Cell Biology',
        subject: 'Biology',
        duration: 40,
        difficulty: 'Easy',
        priority: 'medium' as const,
        dueDate: '2 days ago'
      }
    ],
    completedTasks: [
      {
        id: '4',
        type: 'concept',
        title: 'Atomic Structure',
        subject: 'Chemistry',
        duration: 30,
        difficulty: 'Medium',
        priority: 'high' as const,
        completedAt: '9:30 AM'
      },
      {
        id: '8',
        type: 'flashcard',
        title: 'English Vocabulary',
        subject: 'English',
        duration: 15,
        difficulty: 'Easy',
        priority: 'low' as const,
        completedAt: 'Yesterday'
      }
    ],
    smartSuggestions: [
      {
        id: 'sg1',
        title: 'Focus on Physics Today',
        description: 'Your Physics performance needs attention. Start with Laws of Motion.',
        type: 'priority',
        icon: <Target className="h-4 w-4" />
      },
      {
        id: 'sg2', 
        title: 'Quick Chemistry Review',
        description: 'Review organic reactions before starting new concepts.',
        type: 'review',
        icon: <Brain className="h-4 w-4" />
      }
    ]
  };

  const completedCount = completedTasks.size;
  const todayProgressPercentage = Math.round((completedCount / (todayData.todayTasks.length + completedCount)) * 100);

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

  // Fixed navigation function for task actions
  const handleTaskAction = (task: any, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    console.log('🚨 TODAY PLAN - Starting task:', task.type, task.title);
    
    switch (task.type) {
      case 'concept':
        console.log('🚨 Navigating to concept:', `/dashboard/student/concepts/${task.id}`);
        navigate(`/dashboard/student/concepts/${task.id}`);
        break;
      case 'flashcard':
        console.log('🚨 Navigating to flashcards interactive');
        navigate('/dashboard/student/flashcards/1/interactive');
        break;
      case 'exam':
        console.log('🚨 Navigating to practice exam');
        navigate('/dashboard/student/practice-exam');
        break;
      default:
        console.log('🚨 Unknown task type:', task.type);
        break;
    }
  };

  const renderTaskCard = (task: any, isCompleted = false, showTime = false) => {
    const completed = completedTasks.has(task.id);
    
    return (
      <Card 
        key={task.id} 
        className={`transition-all duration-300 ${
          completed || isCompleted
            ? 'bg-green-50 border-green-200 opacity-75' 
            : `hover:shadow-md border-2 ${getPriorityColor(task.priority)}`
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">
                {completed || isCompleted ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="transition-colors hover:text-green-600"
                  >
                    {getTaskIcon(task.type)}
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold ${(completed || isCompleted) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
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
                  {showTime && (task.dueTime || task.completedAt || task.dueDate) && (
                    <span className="text-xs text-gray-500">
                      {task.dueTime || task.completedAt || task.dueDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {!(completed || isCompleted) && (
              <Button 
                size="sm" 
                className="ml-4"
                onClick={(e) => handleTaskAction(task, e)}
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Enhanced Welcome Header with Gamification */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              Good Morning, {userName}! 
              <Trophy className="h-8 w-8 text-yellow-300" />
            </h1>
            <p className="text-blue-100 text-lg">Ready to conquer your study goals today?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-6 w-6 text-orange-300" />
              <span className="text-2xl font-bold">{todayData.streak} Day Streak</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingUp className="h-4 w-4 mr-1" />
                {Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m planned
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Progress</span>
            <span>{completedCount}/{todayData.todayTasks.length + completedCount} tasks ({todayProgressPercentage}%)</span>
          </div>
          <Progress value={todayProgressPercentage} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Smart Daily Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Lightbulb className="h-6 w-6" />
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
              PREPZR AI Daily Smart Recommendations
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayData.smartSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Premium Tabs Section */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="h-6 w-6 text-blue-600" />
            Study Management Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                All ({todayData.todayTasks.length + todayData.pendingTasks.length + todayData.completedTasks.length})
              </TabsTrigger>
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Today ({todayData.todayTasks.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Pending ({todayData.pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({todayData.completedTasks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">All Tasks</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {todayData.todayTasks.length + todayData.pendingTasks.length + todayData.completedTasks.length} total tasks
                </Badge>
              </div>
              {[...todayData.todayTasks, ...todayData.pendingTasks, ...todayData.completedTasks].map((task) => 
                renderTaskCard(task, todayData.completedTasks.includes(task), true)
              )}
            </TabsContent>

            <TabsContent value="today" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Today's Schedule</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {todayData.todayTasks.length} tasks remaining
                </Badge>
              </div>
              {todayData.todayTasks.map((task) => renderTaskCard(task, false, true))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-orange-700">Overdue Tasks</h3>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {todayData.pendingTasks.length} tasks overdue
                </Badge>
              </div>
              {todayData.pendingTasks.length > 0 ? (
                todayData.pendingTasks.map((task) => renderTaskCard(task, false, true))
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-600">No pending tasks. Great job staying on track!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-700">Completed Tasks</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Award className="h-4 w-4 mr-1" />
                  {todayData.completedTasks.length} completed
                </Badge>
              </div>
              {todayData.completedTasks.map((task) => renderTaskCard(task, true, true))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedTodaysPlan;
