
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
  RotateCcw,
  Zap,
  ArrowRight,
  Users,
  BookMarked
} from 'lucide-react';

interface TodaysPlanProps {
  userName?: string;
}

const PremiumTodaysPlan: React.FC<TodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState(new Set<string>(['4', '8']));
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for today's plan
  const todayData = {
    streak: 12,
    totalTasks: 15,
    completedTasksCount: 5,
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
        dueTime: '10:00 AM',
        status: 'pending'
      },
      {
        id: '2',
        type: 'flashcard',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard',
        priority: 'high' as const,
        dueTime: '11:00 AM',
        status: 'pending'
      },
      {
        id: '3',
        type: 'exam',
        title: 'Biology Mock Test',
        subject: 'Biology',
        duration: 45,
        difficulty: 'Medium',
        priority: 'medium' as const,
        dueTime: '2:00 PM',
        status: 'pending'
      },
      {
        id: '5',
        type: 'concept',
        title: 'Thermodynamics',
        subject: 'Physics',
        duration: 35,
        difficulty: 'Hard',
        priority: 'medium' as const,
        dueTime: '4:00 PM',
        status: 'pending'
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
        dueDate: 'Yesterday',
        status: 'overdue'
      },
      {
        id: '7',
        type: 'concept',
        title: 'Cell Biology',
        subject: 'Biology',
        duration: 40,
        difficulty: 'Easy',
        priority: 'medium' as const,
        dueDate: '2 days ago',
        status: 'overdue'
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
        completedAt: '9:30 AM',
        status: 'completed'
      },
      {
        id: '8',
        type: 'flashcard',
        title: 'English Vocabulary',
        subject: 'English',
        duration: 15,
        difficulty: 'Easy',
        priority: 'low' as const,
        completedAt: 'Yesterday',
        status: 'completed'
      }
    ],
    smartSuggestions: [
      {
        id: 'sg1',
        title: 'Focus on Physics Today',
        description: 'Your Physics performance needs attention. Start with Laws of Motion.',
        type: 'priority',
        urgency: 'high',
        estimatedTime: '45 min',
        icon: <Target className="h-4 w-4" />
      },
      {
        id: 'sg2', 
        title: 'Quick Chemistry Review',
        description: 'Review organic reactions before starting new concepts.',
        type: 'review',
        urgency: 'medium',
        estimatedTime: '20 min',
        icon: <Brain className="h-4 w-4" />
      },
      {
        id: 'sg3',
        title: 'Complete Overdue Tasks',
        description: 'You have 2 overdue tasks. Complete them to stay on track.',
        type: 'warning',
        urgency: 'high',
        estimatedTime: '60 min',
        icon: <Clock className="h-4 w-4" />
      }
    ]
  };

  const allTasks = [...todayData.todayTasks, ...todayData.pendingTasks, ...todayData.completedTasks];
  const completedCount = todayData.completedTasks.length;
  const todayProgressPercentage = Math.round((completedCount / todayData.totalTasks) * 100);

  // Dynamic badge calculation
  const getBadgeInfo = () => {
    if (completedCount === todayData.totalTasks) {
      return { title: 'Perfect Day', icon: '🏆', color: 'bg-yellow-500', description: 'All tasks completed!' };
    } else if (completedCount >= todayData.totalTasks * 0.8) {
      return { title: 'Champion', icon: '⭐', color: 'bg-purple-500', description: 'Almost there!' };
    } else if (completedCount >= todayData.totalTasks * 0.5) {
      return { title: 'Star Performer', icon: '🌟', color: 'bg-blue-500', description: 'Great progress!' };
    } else if (completedCount > 0) {
      return { title: 'Getting Started', icon: '🚀', color: 'bg-green-500', description: 'Keep going!' };
    } else {
      return { title: 'Ready to Start', icon: '💪', color: 'bg-gray-500', description: 'Let\'s begin!' };
    }
  };

  const handleTaskStart = (task: any) => {
    const taskId = task.id;
    
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${taskId}`);
    } else if (task.type === 'flashcard') {
      navigate(`/dashboard/student/flashcards/${taskId}/interactive`);
    } else if (task.type === 'exam') {
      if (task.status === 'completed') {
        navigate(`/dashboard/student/practice-exam/${taskId}/review`);
      } else {
        navigate(`/dashboard/student/practice-exam/${taskId}/start`);
      }
    }
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
      case 'high': return 'border-red-200 bg-red-50 shadow-red-100';
      case 'medium': return 'border-yellow-200 bg-yellow-50 shadow-yellow-100';
      case 'low': return 'border-green-200 bg-green-50 shadow-green-100';
      default: return 'border-gray-200 bg-gray-50 shadow-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-300 bg-red-100 text-red-800';
      case 'medium': return 'border-yellow-300 bg-yellow-100 text-yellow-800';
      case 'low': return 'border-blue-300 bg-blue-100 text-blue-800';
      default: return 'border-gray-300 bg-gray-100 text-gray-800';
    }
  };

  const renderTaskCard = (task: any, isCompleted = false, showTime = false) => {
    const completed = task.status === 'completed';
    const isOverdue = task.status === 'overdue';
    
    return (
      <Card 
        key={task.id} 
        className={`group transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl ${
          completed
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-green-100' 
            : isOverdue
            ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-red-100'
            : `hover:shadow-lg border-2 ${getPriorityColor(task.priority)} backdrop-blur-sm`
        }`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="relative">
                <div className={`p-3 rounded-xl ${completed ? 'bg-green-100' : isOverdue ? 'bg-red-100' : 'bg-white'} shadow-sm`}>
                  {completed ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    getTaskIcon(task.type)
                  )}
                </div>
                {task.priority === 'high' && !completed && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-semibold text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-900'} truncate`}>
                    {task.title}
                  </h4>
                  <Badge variant="outline" className="text-xs font-medium bg-white/50 backdrop-blur-sm">
                    {task.subject}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {task.duration} min
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      task.difficulty === 'Hard' ? 'border-red-300 text-red-700 bg-red-50' :
                      task.difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                      'border-green-300 text-green-700 bg-green-50'
                    }`}
                  >
                    {task.difficulty}
                  </Badge>
                  {task.priority === 'high' && !completed && (
                    <Badge className="text-xs bg-red-500 text-white animate-pulse">
                      High Priority
                    </Badge>
                  )}
                  {showTime && (task.dueTime || task.completedAt || task.dueDate) && (
                    <span className="text-xs text-gray-500 font-medium">
                      {task.dueTime || task.completedAt || task.dueDate}
                    </span>
                  )}
                </div>

                {isOverdue && (
                  <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    <span>Overdue</span>
                  </div>
                )}
              </div>
            </div>
            
            {!completed && (
              <Button 
                size="sm" 
                className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskStart(task);
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const badge = getBadgeInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Premium Header with Glassmorphism */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
                  Good Morning, {userName}! 
                  <Trophy className="h-10 w-10 text-yellow-300 drop-shadow-lg" />
                </h1>
                <p className="text-blue-100 text-xl font-medium">Ready to conquer your study goals today?</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-3 mb-3">
                  <Flame className="h-8 w-8 text-orange-300 animate-pulse" />
                  <span className="text-3xl font-bold">{todayData.streak} Day Streak</span>
                </div>
                <div className="flex gap-3">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    {Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m planned
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span>Daily Progress</span>
                  <span>{completedCount}/{todayData.totalTasks} tasks ({todayProgressPercentage}%)</span>
                </div>
                <Progress value={todayProgressPercentage} className="h-4 bg-white/20 rounded-full shadow-inner" />
              </div>
              
              <div className={`flex items-center justify-center gap-3 px-6 py-3 rounded-2xl ${badge.color} bg-opacity-20 backdrop-blur-sm border border-white/30`}>
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="font-bold text-lg">{badge.title}</p>
                  <p className="text-sm opacity-90">{badge.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Daily Suggestions */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
                AI Smart Recommendations
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {todayData.smartSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="group p-5 bg-white rounded-2xl border border-yellow-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs font-medium ${getUrgencyColor(suggestion.urgency)}`}>
                          {suggestion.urgency} priority
                        </Badge>
                        <span className="text-xs text-gray-500 font-medium">{suggestion.estimatedTime}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                      <Button size="sm" variant="outline" className="w-full group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Take Action
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs Section */}
        <Card className="shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Calendar className="h-7 w-7 text-blue-600" />
              Study Management Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="all" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  <BookMarked className="h-4 w-4" />
                  All ({allTasks.length})
                </TabsTrigger>
                <TabsTrigger value="today" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  <Calendar className="h-4 w-4" />
                  Today ({todayData.todayTasks.length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  <RotateCcw className="h-4 w-4" />
                  Pending ({todayData.pendingTasks.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  <CheckCircle className="h-4 w-4" />
                  Completed ({todayData.completedTasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">All Tasks</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                    {allTasks.length} total tasks
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allTasks.map((task) => renderTaskCard(task, task.status === 'completed', true))}
                </div>
              </TabsContent>

              <TabsContent value="today" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Today's Schedule</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                    {todayData.todayTasks.length} tasks remaining
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {todayData.todayTasks.map((task) => renderTaskCard(task, false, true))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-orange-700">Overdue Tasks</h3>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 px-3 py-1">
                    {todayData.pendingTasks.length} tasks overdue
                  </Badge>
                </div>
                {todayData.pendingTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {todayData.pendingTasks.map((task) => renderTaskCard(task, false, true))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">All Caught Up!</h3>
                    <p className="text-gray-600 text-lg">No pending tasks. Great job staying on track!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-green-700">Completed Tasks</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                    <Award className="h-4 w-4 mr-2" />
                    {todayData.completedTasks.length} completed
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {todayData.completedTasks.map((task) => renderTaskCard(task, true, true))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-800">Keep Up the Great Work!</h3>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-gray-600">
                You've completed {completedCount} out of {todayData.totalTasks} tasks today. 
                {completedCount > 0 ? " Every step counts towards your success!" : " Ready to start your learning journey?"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumTodaysPlan;
