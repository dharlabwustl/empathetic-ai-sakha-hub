
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
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
  Flag,
  AlertTriangle,
  Crown,
  Sparkles
} from 'lucide-react';

interface Task {
  id: string;
  type: 'concept' | 'flashcard' | 'exam';
  title: string;
  subject: string;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'in-progress';
  dueTime?: string;
  completedAt?: string;
  dueDate?: string;
}

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'priority' | 'review' | 'bonus';
  urgency: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  estimatedTime: string;
}

interface PremiumTodaysPlanProps {
  userName?: string;
}

const PremiumTodaysPlan: React.FC<PremiumTodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState(new Set<string>(['4', '8']));
  const [activeTab, setActiveTab] = useState('today');

  // Mock data with enhanced structure
  const todayData = {
    streak: 12,
    totalTasks: 15,
    timeAllocation: {
      concepts: 120,
      flashcards: 80,
      practiceExams: 60,
      total: 260
    },
    todayTasks: [
      {
        id: '1',
        type: 'concept' as const,
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        duration: 35,
        difficulty: 'Medium' as const,
        priority: 'high' as const,
        status: 'pending' as const,
        dueTime: '10:00 AM'
      },
      {
        id: '2',
        type: 'flashcard' as const,
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard' as const,
        priority: 'high' as const,
        status: 'pending' as const,
        dueTime: '11:30 AM'
      },
      {
        id: '3',
        type: 'exam' as const,
        title: 'Biology Mock Test - Chapter 5',
        subject: 'Biology',
        duration: 45,
        difficulty: 'Medium' as const,
        priority: 'medium' as const,
        status: 'pending' as const,
        dueTime: '2:00 PM'
      },
      {
        id: '5',
        type: 'concept' as const,
        title: 'Thermodynamics Basics',
        subject: 'Physics',
        duration: 40,
        difficulty: 'Hard' as const,
        priority: 'medium' as const,
        status: 'pending' as const,
        dueTime: '4:00 PM'
      }
    ],
    pendingTasks: [
      {
        id: '6',
        type: 'flashcard' as const,
        title: 'Calculus Derivatives',
        subject: 'Mathematics',
        duration: 20,
        difficulty: 'Medium' as const,
        priority: 'low' as const,
        status: 'pending' as const,
        dueDate: 'Yesterday'
      },
      {
        id: '7',
        type: 'concept' as const,
        title: 'Cell Biology Structure',
        subject: 'Biology',
        duration: 30,
        difficulty: 'Easy' as const,
        priority: 'medium' as const,
        status: 'pending' as const,
        dueDate: '2 days ago'
      }
    ],
    completedTasks: [
      {
        id: '4',
        type: 'concept' as const,
        title: 'Atomic Structure',
        subject: 'Chemistry',
        duration: 30,
        difficulty: 'Medium' as const,
        priority: 'high' as const,
        status: 'completed' as const,
        completedAt: '9:30 AM'
      },
      {
        id: '8',
        type: 'flashcard' as const,
        title: 'English Vocabulary Set A',
        subject: 'English',
        duration: 15,
        difficulty: 'Easy' as const,
        priority: 'low' as const,
        status: 'completed' as const,
        completedAt: 'Yesterday'
      }
    ],
    smartSuggestions: [
      {
        id: 'sg1',
        title: 'Focus on Physics Today',
        description: 'Your Physics performance needs attention. Start with Newton\'s Laws.',
        type: 'priority',
        urgency: 'high',
        icon: <Target className="h-4 w-4" />,
        estimatedTime: '35 min'
      },
      {
        id: 'sg2', 
        title: 'Quick Chemistry Review',
        description: 'Review organic reactions before starting new concepts.',
        type: 'review',
        urgency: 'medium',
        icon: <Brain className="h-4 w-4" />,
        estimatedTime: '20 min'
      },
      {
        id: 'sg3',
        title: 'Bonus Biology Practice',
        description: 'Extra practice questions available for cell biology.',
        type: 'bonus',
        urgency: 'low',
        icon: <Sparkles className="h-4 w-4" />,
        estimatedTime: '15 min'
      }
    ]
  };

  const completedCount = completedTasks.size + todayData.completedTasks.length;
  const totalTasksCount = todayData.todayTasks.length + todayData.pendingTasks.length + todayData.completedTasks.length;
  const todayProgressPercentage = Math.round((completedCount / totalTasksCount) * 100);

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const handleTaskStart = (task: Task) => {
    switch (task.type) {
      case 'concept':
        navigate(`/dashboard/student/concepts/${task.id}`);
        break;
      case 'flashcard':
        navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
        break;
      case 'exam':
        if (task.status === 'completed') {
          navigate(`/dashboard/student/practice-exam/${task.id}/review`);
        } else {
          navigate(`/dashboard/student/practice-exam/${task.id}/start`);
        }
        break;
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
      case 'high': return 'border-red-200 bg-gradient-to-br from-red-50 to-red-100 shadow-red-100';
      case 'medium': return 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-yellow-100';
      case 'low': return 'border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-green-100';
      default: return 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-gray-100';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'from-blue-500 to-blue-600',
      'Chemistry': 'from-purple-500 to-purple-600',
      'Biology': 'from-green-500 to-green-600',
      'Mathematics': 'from-orange-500 to-orange-600',
      'English': 'from-pink-500 to-pink-600'
    };
    return colors[subject as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getDailyBadge = () => {
    if (todayProgressPercentage >= 100) return { text: 'Perfect Day!', icon: <Crown className="h-5 w-5" />, color: 'from-yellow-400 to-yellow-500' };
    if (todayProgressPercentage >= 80) return { text: 'Champion', icon: <Trophy className="h-5 w-5" />, color: 'from-purple-400 to-purple-500' };
    if (todayProgressPercentage >= 60) return { text: 'Star Performer', icon: <Star className="h-5 w-5" />, color: 'from-blue-400 to-blue-500' };
    if (todayProgressPercentage >= 40) return { text: 'Making Progress', icon: <TrendingUp className="h-5 w-5" />, color: 'from-green-400 to-green-500' };
    return { text: 'Getting Started', icon: <Target className="h-5 w-5" />, color: 'from-gray-400 to-gray-500' };
  };

  const renderTaskCard = (task: Task, isCompleted = false, showTime = false) => {
    const completed = completedTasks.has(task.id) || isCompleted;
    const badge = getDailyBadge();
    
    return (
      <Card 
        key={task.id} 
        className={`group transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl ${
          completed
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-green-100' 
            : `hover:shadow-2xl border-2 ${getPriorityColor(task.priority)} backdrop-blur-sm`
        } shadow-lg`}
        onClick={() => !isCompleted && toggleTaskCompletion(task.id)}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="relative">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${getSubjectColor(task.subject)} shadow-lg`}>
                  {completed ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <div className="text-white">
                      {getTaskIcon(task.type)}
                    </div>
                  )}
                </div>
                {task.priority === 'high' && !completed && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-bold text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-900'} truncate`}>
                    {task.title}
                  </h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSubjectColor(task.subject)} text-white shadow-sm`}>
                    {task.subject}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
                    <Clock className="h-3 w-3" />
                    {task.duration} min
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs border-0 shadow-sm ${
                      task.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                      task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}
                  >
                    {task.difficulty}
                  </Badge>
                  {task.priority === 'high' && (
                    <Badge className="text-xs bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm">
                      <Flag className="h-3 w-3 mr-1" />
                      High Priority
                    </Badge>
                  )}
                </div>

                {showTime && (task.dueTime || task.completedAt || task.dueDate) && (
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
                    {task.dueTime || task.completedAt || task.dueDate}
                  </div>
                )}
              </div>
            </div>
            
            {!completed && (
              <Button 
                size="sm" 
                className="ml-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskStart(task);
                }}
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}

            {completed && (
              <Button 
                size="sm" 
                variant="outline"
                className="ml-4 border-green-300 text-green-700 hover:bg-green-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskStart(task);
                }}
              >
                Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const badge = getDailyBadge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Enhanced Header with Glassmorphism */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-2xl backdrop-blur-lg">
          <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
                  Good Morning, {userName}! 
                  <Trophy className="h-10 w-10 text-yellow-300 animate-pulse" />
                </h1>
                <p className="text-blue-100 text-xl">Ready to conquer your study goals today? Let's make it count! 🚀</p>
              </div>
              <div className="text-right flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Flame className="h-6 w-6 text-orange-300" />
                  <span className="text-2xl font-bold">{todayData.streak} Day Streak</span>
                </div>
                <div className={`flex items-center gap-2 bg-gradient-to-r ${badge.color} px-4 py-2 rounded-full text-white shadow-lg`}>
                  {badge.icon}
                  <span className="font-bold">{badge.text}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex justify-between text-lg font-semibold mb-3">
                <span>Daily Progress</span>
                <span>{completedCount}/{totalTasksCount} tasks ({todayProgressPercentage}%)</span>
              </div>
              <Progress value={todayProgressPercentage} className="h-4 bg-white/20" />
              <div className="mt-3 flex justify-between text-sm">
                <span>{Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m planned</span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Keep going, you're doing great!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Daily Suggestions with Enhanced Design */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-yellow-800">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold text-2xl">
                PREPZR AI Smart Recommendations
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {todayData.smartSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id} 
                  className="group p-5 bg-white rounded-xl border border-yellow-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shadow-lg ${
                      suggestion.urgency === 'high' ? 'bg-gradient-to-r from-red-400 to-red-500' :
                      suggestion.urgency === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                      'bg-gradient-to-r from-green-400 to-green-500'
                    } text-white`}>
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-800">{suggestion.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            suggestion.urgency === 'high' ? 'border-red-300 text-red-700 bg-red-50' :
                            suggestion.urgency === 'medium' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                            'border-green-300 text-green-700 bg-green-50'
                          }`}
                        >
                          {suggestion.urgency} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {suggestion.estimatedTime}
                        </span>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transform transition-all duration-200 group-hover:scale-105"
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Start Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs Section */}
        <Card className="shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Calendar className="h-8 w-8 text-blue-600" />
              Study Management Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-2 rounded-xl">
                <TabsTrigger 
                  value="all" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg"
                >
                  <Target className="h-4 w-4" />
                  All ({totalTasksCount})
                </TabsTrigger>
                <TabsTrigger 
                  value="today" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg"
                >
                  <Calendar className="h-4 w-4" />
                  Today ({todayData.todayTasks.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Pending ({todayData.pendingTasks.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg"
                >
                  <CheckCircle className="h-4 w-4" />
                  Completed ({todayData.completedTasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">All Tasks Overview</h3>
                  {[...todayData.todayTasks, ...todayData.pendingTasks, ...todayData.completedTasks].map((task) => 
                    renderTaskCard(task, task.status === 'completed', true)
                  )}
                </div>
              </TabsContent>

              <TabsContent value="today" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Today's Schedule</h3>
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    {todayData.todayTasks.length} tasks scheduled
                  </Badge>
                </div>
                <div className="space-y-4">
                  {todayData.todayTasks.map((task) => renderTaskCard(task, false, true))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-orange-700">Overdue Tasks</h3>
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    {todayData.pendingTasks.length} tasks overdue
                  </Badge>
                </div>
                {todayData.pendingTasks.length > 0 ? (
                  <div className="space-y-4">
                    {todayData.pendingTasks.map((task) => renderTaskCard(task, false, true))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                    <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">All Caught Up!</h3>
                    <p className="text-gray-600 text-lg">No pending tasks. Great job staying on track!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-green-700">Completed Tasks</h3>
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <Award className="h-4 w-4 mr-1" />
                    {todayData.completedTasks.length} completed
                  </Badge>
                </div>
                <div className="space-y-4">
                  {todayData.completedTasks.map((task) => renderTaskCard(task, true, true))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Trophy className="h-8 w-8 text-yellow-300" />
              <h3 className="text-2xl font-bold">Keep Going, Champion!</h3>
              <Trophy className="h-8 w-8 text-yellow-300" />
            </div>
            <p className="text-lg text-purple-100 mb-4">
              {todayProgressPercentage >= 80 
                ? "Outstanding progress today! You're on fire! 🔥" 
                : todayProgressPercentage >= 50 
                ? "Great momentum! Keep pushing forward! 💪"
                : "Every step counts! Start with just one task! ✨"}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-300" />
                <span>{todayData.streak} day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-300" />
                <span>{todayProgressPercentage}% completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-300" />
                <span>{Math.floor(todayData.timeAllocation.total / 60)}h planned</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumTodaysPlan;
