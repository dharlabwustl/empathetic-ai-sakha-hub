
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
  AlertTriangle,
  Crown,
  Medal,
  Sparkles
} from 'lucide-react';

interface TodaysPlanProps {
  userName?: string;
}

const RedesignedTodaysPlan: React.FC<TodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState(new Set<string>(['4', '8']));
  const [activeTab, setActiveTab] = useState('today');

  // Mock data for today's plan
  const todayData = {
    streak: 12,
    totalTasks: 15,
    perfectDays: 8,
    badges: {
      perfectDay: false,
      champion: true,
      starPerformer: false,
      speedLearner: true
    },
    timeAllocation: {
      concepts: 90,
      flashcards: 60,
      practiceExams: 45,
      total: 195
    },
    todayTasks: [
      {
        id: 'concept-1',
        type: 'concept',
        title: 'Laws of Motion',
        subject: 'Physics',
        duration: 30,
        difficulty: 'Medium',
        priority: 'high' as const,
        dueTime: '10:00 AM'
      },
      {
        id: 'flashcard-2',
        type: 'flashcard',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard',
        priority: 'high' as const,
        dueTime: '11:00 AM'
      },
      {
        id: 'exam-3',
        type: 'exam',
        title: 'Biology Mock Test',
        subject: 'Biology',
        duration: 45,
        difficulty: 'Medium',
        priority: 'medium' as const,
        dueTime: '2:00 PM'
      },
      {
        id: 'concept-5',
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
        id: 'flashcard-6',
        type: 'flashcard',
        title: 'Calculus Derivatives',
        subject: 'Mathematics',
        duration: 20,
        difficulty: 'Medium',
        priority: 'low' as const,
        dueDate: 'Yesterday'
      },
      {
        id: 'concept-7',
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
    allTasks: [],
    smartSuggestions: [
      {
        id: 'sg1',
        title: 'Focus on Physics Today',
        description: 'Your Physics performance needs attention. Start with Laws of Motion.',
        type: 'priority',
        priority: 'high',
        estimatedTime: 45,
        urgency: 'high',
        icon: <Target className="h-4 w-4" />
      },
      {
        id: 'sg2', 
        title: 'Quick Chemistry Review',
        description: 'Review organic reactions before starting new concepts.',
        type: 'review',
        priority: 'medium',
        estimatedTime: 20,
        urgency: 'medium',
        icon: <Brain className="h-4 w-4" />
      },
      {
        id: 'sg3',
        title: 'Practice Test Recommended',
        description: 'Take a biology practice test to assess your knowledge.',
        type: 'practice',
        priority: 'low',
        estimatedTime: 60,
        urgency: 'low',
        icon: <FileText className="h-4 w-4" />
      }
    ]
  };

  // Combine all tasks for the "All" tab
  todayData.allTasks = [
    ...todayData.todayTasks,
    ...todayData.pendingTasks,
    ...todayData.completedTasks
  ];

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
      case 'high': return 'border-red-200 bg-red-50 shadow-red-100';
      case 'medium': return 'border-yellow-200 bg-yellow-50 shadow-yellow-100';
      case 'low': return 'border-green-200 bg-green-50 shadow-green-100';
      default: return 'border-gray-200 bg-gray-50 shadow-gray-100';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge variant="destructive" className="animate-pulse">🔥 Urgent</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-orange-100 text-orange-700 border-orange-200">⚡ Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">💡 Low</Badge>;
      default:
        return null;
    }
  };

  const handleTaskStart = (task: any) => {
    switch (task.type) {
      case 'concept':
        navigate(`/dashboard/student/concepts/${task.id}`);
        break;
      case 'flashcard':
        navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
        break;
      case 'exam':
        const isCompleted = completedTasks.has(task.id);
        if (isCompleted) {
          navigate(`/dashboard/student/practice-exam/${task.id}/review`);
        } else {
          navigate(`/dashboard/student/practice-exam/${task.id}/start`);
        }
        break;
      default:
        console.log(`Starting ${task.type}: ${task.title}`);
    }
  };

  const renderTaskCard = (task: any, isCompleted = false, showTime = false) => {
    const completed = completedTasks.has(task.id) || isCompleted;
    
    return (
      <Card 
        key={task.id} 
        className={`group transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl ${
          completed
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100' 
            : `border-2 ${getPriorityColor(task.priority)} hover:shadow-2xl backdrop-blur-sm`
        }`}
        onClick={() => !isCompleted && toggleTaskCompletion(task.id)}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">
                {completed ? (
                  <div className="relative">
                    <CheckCircle className="h-7 w-7 text-green-500" />
                    <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                ) : (
                  <div className="p-2 rounded-full bg-white shadow-md">
                    {getTaskIcon(task.type)}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-semibold text-lg ${
                    completed ? 'line-through text-gray-500' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {task.title}
                  </h4>
                  <Badge variant="outline" className="text-xs font-medium">
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
                  {task.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs animate-pulse">
                      🔥 High Priority
                    </Badge>
                  )}
                  {showTime && (task.dueTime || task.completedAt || task.dueDate) && (
                    <span className="text-xs text-gray-500 font-medium">
                      {task.dueTime || task.completedAt || task.dueDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {!completed && (
              <Button 
                size="sm" 
                className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskStart(task);
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
  };

  const getDynamicBadges = () => {
    const badges = [];
    
    if (todayData.badges.champion) {
      badges.push(
        <Badge key="champion" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white animate-pulse">
          <Crown className="h-4 w-4 mr-1" />
          Champion
        </Badge>
      );
    }
    
    if (todayData.badges.speedLearner) {
      badges.push(
        <Badge key="speed" className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
          <Zap className="h-4 w-4 mr-1" />
          Speed Learner
        </Badge>
      );
    }
    
    if (todayData.perfectDays >= 7) {
      badges.push(
        <Badge key="perfect" className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
          <Medal className="h-4 w-4 mr-1" />
          Perfect Week
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Enhanced Welcome Header with Premium Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
                Good Morning, {userName}! 
                <Trophy className="h-10 w-10 text-yellow-300 animate-bounce" />
              </h1>
              <p className="text-blue-100 text-xl mb-4">Ready to conquer your study goals today?</p>
              
              {/* Dynamic Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {getDynamicBadges()}
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="h-8 w-8 text-orange-300 animate-pulse" />
                <span className="text-3xl font-bold">{todayData.streak} Day Streak</span>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m planned
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <Star className="h-4 w-4 mr-1" />
                  {todayData.perfectDays} Perfect Days
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Daily Progress</span>
              <span>{completedCount}/{todayData.todayTasks.length + completedCount} tasks ({todayProgressPercentage}%)</span>
            </div>
            <Progress value={todayProgressPercentage} className="h-4 bg-white/20 shadow-inner" />
          </div>
        </div>
      </div>

      {/* AI Smart Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 border-2 border-yellow-200 shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
              PREPZR AI Smart Recommendations
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {todayData.smartSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white shadow-lg">
                      {suggestion.icon}
                    </div>
                    {getUrgencyBadge(suggestion.urgency)}
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{suggestion.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {suggestion.estimatedTime} min
                    </span>
                    <Badge variant="outline" className={
                      suggestion.priority === 'high' ? 'border-red-200 text-red-700 bg-red-50' :
                      suggestion.priority === 'medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                      'border-green-200 text-green-700 bg-green-50'
                    }>
                      {suggestion.priority} priority
                    </Badge>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    Take Action
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Premium Tabs Section */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl">
            <Calendar className="h-8 w-8 text-blue-600" />
            Study Management Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-2 rounded-2xl">
              <TabsTrigger 
                value="all" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <Target className="h-4 w-4" />
                All ({todayData.allTasks.length})
              </TabsTrigger>
              <TabsTrigger 
                value="today" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <Calendar className="h-4 w-4" />
                Today ({todayData.todayTasks.length})
              </TabsTrigger>
              <TabsTrigger 
                value="pending" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <RotateCcw className="h-4 w-4" />
                Pending ({todayData.pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <CheckCircle className="h-4 w-4" />
                Completed ({todayData.completedTasks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">All Tasks</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-lg px-4 py-2">
                  {todayData.allTasks.length} total tasks
                </Badge>
              </div>
              <div className="grid gap-4">
                {todayData.allTasks.map((task) => renderTaskCard(task, false, true))}
              </div>
            </TabsContent>

            <TabsContent value="today" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Today's Schedule</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-lg px-4 py-2">
                  {todayData.todayTasks.length} tasks remaining
                </Badge>
              </div>
              <div className="grid gap-4">
                {todayData.todayTasks.map((task) => renderTaskCard(task, false, true))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-orange-700">Overdue Tasks</h3>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-lg px-4 py-2">
                  {todayData.pendingTasks.length} tasks overdue
                </Badge>
              </div>
              {todayData.pendingTasks.length > 0 ? (
                <div className="grid gap-4">
                  {todayData.pendingTasks.map((task) => renderTaskCard(task, false, true))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">All Caught Up!</h3>
                  <p className="text-gray-600 text-lg">No pending tasks. Great job staying on track!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-green-700">Completed Tasks</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-lg px-4 py-2">
                  <Award className="h-5 w-5 mr-2" />
                  {todayData.completedTasks.length} completed
                </Badge>
              </div>
              <div className="grid gap-4">
                {todayData.completedTasks.map((task) => renderTaskCard(task, true, true))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Motivational Footer */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-800">Keep Going, Champion!</h3>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 text-lg mb-4">
            {todayProgressPercentage < 50 
              ? `You're ${100 - todayProgressPercentage}% away from completing today's goals! Every step counts! 💪`
              : todayProgressPercentage < 100
                ? `Amazing progress! Only ${100 - todayProgressPercentage}% more to go. You've got this! 🚀`
                : "🎉 Incredible! You've completed all tasks for today! You're unstoppable! 🌟"}
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-lg px-6 py-2">
              🔥 {todayData.streak} Day Streak
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-lg px-6 py-2">
              ⭐ {todayData.perfectDays} Perfect Days
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedTodaysPlan;
