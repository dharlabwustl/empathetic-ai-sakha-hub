
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
  Medal,
  Crown,
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
  const [activeTab, setActiveTab] = useState('all');

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
        dueTime: '10:00 AM',
        description: 'Understanding Newton\'s three fundamental laws'
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
        cardCount: 45
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
        questionCount: 30
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
        description: 'Heat, work, and energy transfer'
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
        cardCount: 25
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
        description: 'Cellular structure and function'
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
        description: 'Electronic configuration and atomic models'
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
        cardCount: 20
      }
    ],
    smartSuggestions: [
      {
        id: 'sg1',
        title: 'Focus on Physics Today',
        description: 'Your Physics performance needs attention. Start with Laws of Motion.',
        type: 'priority',
        icon: <Target className="h-4 w-4" />,
        action: 'Start Physics Concepts',
        urgency: 'high'
      },
      {
        id: 'sg2', 
        title: 'Quick Chemistry Review',
        description: 'Review organic reactions before starting new concepts.',
        type: 'review',
        icon: <Brain className="h-4 w-4" />,
        action: 'Review Chemistry',
        urgency: 'medium'
      },
      {
        id: 'sg3',
        title: 'Take a Break',
        description: 'You\'ve been studying for 2 hours. A 10-minute break will boost focus.',
        type: 'wellness',
        icon: <Sparkles className="h-4 w-4" />,
        action: 'Take Break',
        urgency: 'low'
      },
      {
        id: 'sg4',
        title: 'Weak Areas Alert',
        description: 'Biology concepts need more attention based on recent performance.',
        type: 'improvement',
        icon: <TrendingUp className="h-4 w-4" />,
        action: 'Practice Biology',
        urgency: 'medium'
      }
    ]
  };

  const completedCount = completedTasks.size;
  const allTasksCount = todayData.todayTasks.length + todayData.pendingTasks.length + todayData.completedTasks.length;
  const todayProgressPercentage = Math.round(((completedCount + todayData.completedTasks.length) / allTasksCount) * 100);

  // Daily badge calculation
  const getDailyBadge = () => {
    const percentage = todayProgressPercentage;
    if (percentage >= 100) return { 
      title: 'Perfect Day!', 
      icon: <Crown className="h-5 w-5" />, 
      color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      textColor: 'text-white'
    };
    if (percentage >= 80) return { 
      title: 'Champion', 
      icon: <Trophy className="h-5 w-5" />, 
      color: 'bg-gradient-to-r from-purple-500 to-purple-700',
      textColor: 'text-white'
    };
    if (percentage >= 60) return { 
      title: 'Star Performer', 
      icon: <Medal className="h-5 w-5" />, 
      color: 'bg-gradient-to-r from-blue-500 to-blue-700',
      textColor: 'text-white'
    };
    if (percentage >= 40) return { 
      title: 'On Track', 
      icon: <Star className="h-5 w-5" />, 
      color: 'bg-gradient-to-r from-green-500 to-green-700',
      textColor: 'text-white'
    };
    if (percentage >= 20) return { 
      title: 'Getting Started', 
      icon: <TrendingUp className="h-5 w-5" />, 
      color: 'bg-gradient-to-r from-orange-500 to-orange-700',
      textColor: 'text-white'
    };
    return { 
      title: 'Just Started', 
      icon: <Play className="h-5 w-5" />, 
      color: 'bg-gradient-to-r from-gray-500 to-gray-700',
      textColor: 'text-white'
    };
  };

  const dailyBadge = getDailyBadge();

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const handleTaskClick = (task: any) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.type === 'flashcard') {
      navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
    } else if (task.type === 'exam') {
      const isCompleted = completedTasks.has(task.id) || todayData.completedTasks.some(t => t.id === task.id);
      if (isCompleted) {
        navigate(`/dashboard/student/practice-exam/${task.id}/review`);
      } else {
        navigate(`/dashboard/student/practice-exam/${task.id}/start`);
      }
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-6 w-6 text-blue-600" />;
      case 'flashcard': return <Brain className="h-6 w-6 text-purple-600" />;
      case 'exam': return <FileText className="h-6 w-6 text-green-600" />;
      default: return <Target className="h-6 w-6 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50/50';
      case 'low': return 'border-l-green-500 bg-green-50/50';
      default: return 'border-l-gray-500 bg-gray-50/50';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'bg-blue-100 text-blue-800 border-blue-200',
      'Chemistry': 'bg-purple-100 text-purple-800 border-purple-200',
      'Biology': 'bg-green-100 text-green-800 border-green-200',
      'Mathematics': 'bg-orange-100 text-orange-800 border-orange-200',
      'English': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const renderTaskCard = (task: any, isCompleted = false, showTime = false) => {
    const completed = completedTasks.has(task.id) || isCompleted;
    
    return (
      <Card 
        key={task.id} 
        className={`group transition-all duration-300 cursor-pointer border-l-4 hover:shadow-xl hover:scale-[1.02] ${
          completed
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-green-500 opacity-90' 
            : `hover:shadow-lg border-2 hover:border-blue-300 ${getPriorityColor(task.priority)}`
        }`}
        onClick={() => !isCompleted && toggleTaskCompletion(task.id)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className={`p-3 rounded-xl shadow-sm ${completed ? 'bg-green-100' : 'bg-white'} transition-colors`}>
                {completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  getTaskIcon(task.type)
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-bold text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <Badge variant="outline" className={getSubjectColor(task.subject)}>
                    {task.subject}
                  </Badge>
                </div>
                
                {task.description && (
                  <p className={`text-sm mb-3 ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    {task.duration} min
                  </span>
                  
                  <Badge variant="outline" className={getDifficultyBadge(task.difficulty)}>
                    {task.difficulty}
                  </Badge>
                  
                  {task.priority === 'high' && (
                    <Badge className="bg-red-500 text-white">
                      High Priority
                    </Badge>
                  )}
                  
                  {showTime && (task.dueTime || task.completedAt || task.dueDate) && (
                    <span className="text-xs text-gray-500 font-medium">
                      {task.dueTime || task.completedAt || task.dueDate}
                    </span>
                  )}
                  
                  {task.cardCount && (
                    <span className="text-xs text-purple-600 font-medium">
                      {task.cardCount} cards
                    </span>
                  )}
                  
                  {task.questionCount && (
                    <span className="text-xs text-green-600 font-medium">
                      {task.questionCount} questions
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {!completed && (
              <Button 
                className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskClick(task);
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                {task.type === 'exam' ? 'Start Test' : 'Start'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const getTabData = () => {
    const allTasks = [...todayData.todayTasks, ...todayData.pendingTasks, ...todayData.completedTasks];
    const today = todayData.todayTasks;
    const pending = todayData.pendingTasks;
    const completed = todayData.completedTasks;

    switch (activeTab) {
      case 'today': return today;
      case 'pending': return pending;
      case 'completed': return completed;
      default: return allTasks;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Premium Header with Gamification */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  Good Morning, {userName}! 
                  <div className="animate-bounce">🌟</div>
                </h1>
                <p className="text-blue-100 text-xl">Ready to conquer your study goals today?</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`${dailyBadge.color} ${dailyBadge.textColor} px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg text-lg font-bold`}>
                  {dailyBadge.icon}
                  <span>{dailyBadge.title}</span>
                </div>
                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg">
                  <Flame className="h-6 w-6" />
                  <span className="text-xl font-bold">{todayData.streak} Day Streak</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-3xl font-bold">{completedCount + todayData.completedTasks.length}</div>
                <div className="text-sm opacity-90">Completed</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-3xl font-bold">{allTasksCount}</div>
                <div className="text-sm opacity-90">Total Tasks</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-3xl font-bold">{Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m</div>
                <div className="text-sm opacity-90">Study Time</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-3xl font-bold">{todayProgressPercentage}%</div>
                <div className="text-sm opacity-90">Progress</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Daily Progress</span>
                <span>{completedCount + todayData.completedTasks.length}/{allTasksCount} tasks completed ({todayProgressPercentage}%)</span>
              </div>
              <Progress value={todayProgressPercentage} className="h-4 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Enhanced Smart Daily Suggestions */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-amber-800">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AI-Powered Smart Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayData.smartSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="group p-5 bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      suggestion.urgency === 'high' ? 'bg-red-100 text-red-600' :
                      suggestion.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-800">{suggestion.title}</h4>
                        <Badge variant="outline" className={
                          suggestion.urgency === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                          suggestion.urgency === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }>
                          {suggestion.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                      <Button size="sm" variant="outline" className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all">
                        <Zap className="h-4 w-4 mr-1" />
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Premium Tabs Section */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-3xl">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              Study Management Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-2 rounded-xl">
                <TabsTrigger value="all" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <Target className="h-4 w-4" />
                  All ({todayData.todayTasks.length + todayData.pendingTasks.length + todayData.completedTasks.length})
                </TabsTrigger>
                <TabsTrigger value="today" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <Calendar className="h-4 w-4" />
                  Today ({todayData.todayTasks.length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <RotateCcw className="h-4 w-4" />
                  Pending ({todayData.pendingTasks.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <CheckCircle className="h-4 w-4" />
                  Completed ({todayData.completedTasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getTabData().map((task) => renderTaskCard(task, activeTab === 'completed', true))}
                </div>

                {getTabData().length === 0 && (
                  <div className="text-center py-16">
                    <div className="mb-6">
                      {activeTab === 'completed' ? (
                        <Award className="h-20 w-20 text-gray-300 mx-auto" />
                      ) : (
                        <CheckCircle className="h-20 w-20 text-gray-300 mx-auto" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">
                      {activeTab === 'completed' ? 'No completed tasks yet' : 'No tasks found'}
                    </h3>
                    <p className="text-gray-500 text-lg">
                      {activeTab === 'completed' ? 'Start working on your tasks to see them here!' : 'Great job! All your tasks are completed!'}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-2">Keep Going! You're Doing Amazing! 🚀</h3>
          <p className="text-green-100">Every task completed brings you closer to your goals. Stay consistent!</p>
        </div>
      </div>
    </div>
  );
};

export default RedesignedTodaysPlan;
