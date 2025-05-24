
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar, Target, Zap, TrendingUp } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { getMoodTheme } from '@/components/dashboard/student/moodThemes';

const TodaysPlanView = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const { planData, loading, activeView, setActiveView, markTaskCompleted } = useTodaysPlan("IIT-JEE", "Student");
  const [currentTab, setCurrentTab] = useState('all');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();

  // Load mood from localStorage
  React.useEffect(() => {
    const savedMood = localStorage.getItem('userMood') as MoodType;
    if (savedMood && Object.values(MoodType).includes(savedMood)) {
      setCurrentMood(savedMood);
    }
  }, []);

  // Mocked tasks for demonstration
  const tasks = [
    {
      id: '1',
      title: "Newton's Laws of Motion",
      subject: "Physics",
      type: 'concept',
      status: 'pending',
      timeEstimate: 45,
      isBacklog: false,
      priority: 'high',
      smartTip: "You've been doing well with Physics concepts. Keep the momentum!"
    },
    {
      id: '2',
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      type: 'flashcard',
      status: 'in-progress',
      timeEstimate: 30,
      isBacklog: true,
      priority: 'medium',
      smartTip: "Try grouping reaction mechanisms to improve recall"
    },
    {
      id: '3',
      title: "Calculus Integration Techniques",
      subject: "Mathematics",
      type: 'concept',
      status: 'completed',
      timeEstimate: 60,
      isBacklog: false,
      priority: 'medium',
      completedAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '4',
      title: "Physics Practice Test",
      subject: "Physics",
      type: 'exam',
      status: 'pending',
      timeEstimate: 90,
      isBacklog: false,
      priority: 'high',
      smartTip: "Review Newton's Laws before attempting this test"
    },
    {
      id: '5',
      title: "Chemical Bonding Flashcards",
      subject: "Chemistry",
      type: 'flashcard',
      status: 'pending',
      timeEstimate: 25,
      isBacklog: false,
      priority: 'low',
    },
    {
      id: '6',
      title: "Coordinate Geometry Quiz",
      subject: "Mathematics",
      type: 'exam',
      status: 'completed',
      timeEstimate: 45,
      isBacklog: false,
      priority: 'medium',
      completedAt: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  // Get mood theme
  const moodTheme = currentMood ? getMoodTheme(currentMood) : getMoodTheme('okay');

  // Filter tasks based on current tab
  const getFilteredTasks = () => {
    switch (currentTab) {
      case 'all':
        return tasks;
      case 'pending':
        return tasks.filter(task => task.status === 'pending' || task.status === 'in-progress');
      case 'completed':
        return tasks.filter(task => task.status === 'completed');
      case 'concept':
        return tasks.filter(task => task.type === 'concept');
      case 'flashcard':
        return tasks.filter(task => task.type === 'flashcard');
      case 'exam':
        return tasks.filter(task => task.type === 'exam');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  
  // Calculate metrics
  const totalTimeEstimate = tasks.reduce((total, task) => {
    if (task.status !== 'completed') {
      return total + task.timeEstimate;
    }
    return total;
  }, 0);
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const percentageCompleted = Math.round((completedTasks / totalTasks) * 100);
  const currentStreak = 7; // Mock data
  const readinessScore = 78; // Mock data

  // Handle task actions
  const handleTaskAction = (task: any) => {
    if (task.status === 'completed') {
      switch (task.type) {
        case 'concept':
          navigate(`/dashboard/student/concepts/${task.id}`);
          break;
        case 'flashcard':
          navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
          break;
        case 'exam':
          navigate(`/dashboard/student/practice-exam/${task.id}/review`);
          break;
      }
    } else {
      switch (task.type) {
        case 'concept':
          navigate(`/dashboard/student/concepts/${task.id}`);
          break;
        case 'flashcard':
          navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
          break;
        case 'exam':
          navigate(`/dashboard/student/practice-exam/${task.id}/start`);
          break;
      }
    }
  };

  const handleTaskCardClick = (task: any) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else {
      handleTaskAction(task);
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    localStorage.setItem('userMood', mood);
    
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'flashcard':
        return <Brain className="h-5 w-5 text-violet-500" />;
      case 'exam':
        return <FileText className="h-5 w-5 text-emerald-500" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${moodTheme.background}`}>
      {/* Beautiful Gradient Header with Mood-based Theming */}
      <div 
        className="relative overflow-hidden rounded-2xl mb-8"
        style={{
          background: `linear-gradient(135deg, ${moodTheme.backgroundColor}20 0%, ${moodTheme.backgroundColor}40 50%, ${moodTheme.backgroundColor}20 100%)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className={`text-4xl font-bold ${moodTheme.text} mb-2`}>
                Today's Study Plan
              </h1>
              <p className={`text-lg ${moodTheme.accent} opacity-80`}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className={`h-6 w-6 ${moodTheme.accent}`} />
              <Badge className={`${moodTheme.background} ${moodTheme.text} border-0`}>
                Day {Math.floor(Math.random() * 30) + 1} of Study Plan
              </Badge>
            </div>
          </div>

          {/* Progress Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Target className={`h-5 w-5 ${moodTheme.accent}`} />
                <span className={`text-sm font-medium ${moodTheme.text}`}>Completion</span>
              </div>
              <div className={`text-2xl font-bold ${moodTheme.text}`}>{percentageCompleted}%</div>
              <div className={`text-xs ${moodTheme.accent} opacity-70`}>{completedTasks}/{totalTasks} tasks</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Clock className={`h-5 w-5 ${moodTheme.accent}`} />
                <span className={`text-sm font-medium ${moodTheme.text}`}>Time Left</span>
              </div>
              <div className={`text-2xl font-bold ${moodTheme.text}`}>{totalTimeEstimate}m</div>
              <div className={`text-xs ${moodTheme.accent} opacity-70`}>Today's remaining</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className={`h-5 w-5 ${moodTheme.accent}`} />
                <span className={`text-sm font-medium ${moodTheme.text}`}>Streak</span>
              </div>
              <div className={`text-2xl font-bold ${moodTheme.text}`}>{currentStreak}</div>
              <div className={`text-xs ${moodTheme.accent} opacity-70`}>days active</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className={`h-5 w-5 ${moodTheme.accent}`} />
                <span className={`text-sm font-medium ${moodTheme.text}`}>Readiness</span>
              </div>
              <div className={`text-2xl font-bold ${moodTheme.text}`}>{readinessScore}%</div>
              <div className={`text-xs ${moodTheme.accent} opacity-70`}>exam ready</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${moodTheme.text}`}>Today's Progress</span>
              <span className={`text-sm ${moodTheme.accent}`}>{percentageCompleted}% Complete</span>
            </div>
            <Progress 
              value={percentageCompleted} 
              className="h-3 bg-white/20"
              style={{
                '--progress-background': moodTheme.backgroundColor
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Mood and Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="backdrop-blur-sm bg-white/10 border-white/20">
            <CardContent className="p-6">
              <h3 className={`text-lg font-medium mb-4 ${moodTheme.text}`}>How are you feeling today?</h3>
              <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodChange} />
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20">
            <CardContent className="p-6">
              <h3 className={`text-lg font-medium mb-4 ${moodTheme.text}`}>Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${moodTheme.accent}`}>Tasks Completed</span>
                  <span className={`font-semibold ${moodTheme.text}`}>{completedTasks}/{totalTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${moodTheme.accent}`}>Time Invested</span>
                  <span className={`font-semibold ${moodTheme.text}`}>
                    {tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.timeEstimate, 0)}m
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${moodTheme.accent}`}>Current Streak</span>
                  <span className={`font-semibold ${moodTheme.text}`}>{currentStreak} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tasks Section with Enhanced Design */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className={`text-xl flex items-center gap-2 ${moodTheme.text}`}>
                <Calendar className="h-5 w-5" />
                Task Breakdown
              </CardTitle>
              <div className={`text-sm ${moodTheme.accent}`}>
                Total Estimated Time: <span className="font-semibold">{totalTimeEstimate} min</span>
              </div>
            </div>
          </CardHeader>
          
          <div className="px-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {['all', 'pending', 'completed', 'concept', 'flashcard', 'exam'].map((tab) => (
                <Button
                  key={tab}
                  variant={currentTab === tab ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTab(tab)}
                  className={`capitalize transition-all duration-200 ${
                    currentTab === tab 
                      ? `${moodTheme.background} ${moodTheme.text} border-0` 
                      : `bg-white/10 ${moodTheme.text} border-white/20 hover:bg-white/20`
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="p-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTasks.map(task => (
                <Card 
                  key={task.id} 
                  className={`overflow-hidden transition-all duration-300 border-l-4 cursor-pointer backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30 hover:shadow-lg hover:-translate-y-1 ${
                    task.priority === 'high' ? "border-l-red-500" : 
                    task.priority === 'medium' ? "border-l-amber-500" : "border-l-blue-500"
                  }`}
                  onClick={() => handleTaskCardClick(task)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        {getTaskTypeIcon(task.type)}
                        <span className={`font-medium ${moodTheme.text}`}>{task.subject}</span>
                      </div>
                      {getTaskStatusBadge(task.status)}
                    </div>
                    
                    <h3 className={`font-semibold mb-3 ${moodTheme.text}`}>{task.title}</h3>
                    
                    <div className={`flex items-center gap-2 text-sm ${moodTheme.accent} mb-3`}>
                      <Clock className="h-4 w-4" />
                      <span>{task.timeEstimate} min</span>
                      
                      {task.isBacklog && (
                        <div className="ml-auto flex items-center space-x-1 text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-xs">Backlog</span>
                        </div>
                      )}
                    </div>
                    
                    {task.status === 'completed' && task.completedAt && (
                      <div className="mb-3 flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                      </div>
                    )}
                    
                    {task.smartTip && (
                      <div className="mb-3 py-2 px-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-md text-xs text-blue-800 dark:text-blue-300">
                        <p>{task.smartTip}</p>
                      </div>
                    )}
                    
                    <Button 
                      className={`w-full transition-all duration-200 ${
                        task.status === 'completed' 
                          ? `bg-white/20 ${moodTheme.text} border border-white/30 hover:bg-white/30` 
                          : `${moodTheme.background} ${moodTheme.text} border-0 hover:opacity-90`
                      }`}
                      variant={task.status === 'completed' ? "outline" : "default"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskAction(task);
                      }}
                    >
                      {task.status === 'completed' ? 'Review' : 'Start Now'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredTasks.length === 0 && (
              <div className={`text-center py-10 ${moodTheme.accent}`}>
                <p>No tasks found for this category</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Smart Suggestions with Mood-based Content */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className={`text-xl ${moodTheme.text}`}>Smart Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentMood === MoodType.STRESSED ? (
                <div className={`p-4 rounded-lg border ${moodTheme.border} ${moodTheme.background}`}>
                  <h3 className={`font-medium ${moodTheme.text} mb-2`}>You seem stressed today</h3>
                  <p className={`text-sm ${moodTheme.accent} mb-2`}>
                    Try shorter study sessions of 15-20 minutes with more frequent breaks.
                  </p>
                  <Button variant="outline" className={`text-xs h-7 ${moodTheme.border} ${moodTheme.text}`}>
                    Adjust My Schedule
                  </Button>
                </div>
              ) : currentMood === MoodType.TIRED ? (
                <div className={`p-4 rounded-lg border ${moodTheme.border} ${moodTheme.background}`}>
                  <h3 className={`font-medium ${moodTheme.text} mb-2`}>Energy management for tired days</h3>
                  <p className={`text-sm ${moodTheme.accent} mb-2`}>
                    Focus on review tasks instead of new concepts. Take a short walk before studying.
                  </p>
                  <Button variant="outline" className={`text-xs h-7 ${moodTheme.border} ${moodTheme.text}`}>
                    Show Review Tasks
                  </Button>
                </div>
              ) : (
                <div className={`p-4 rounded-lg border ${moodTheme.border} ${moodTheme.background}`}>
                  <h3 className={`font-medium ${moodTheme.text} mb-2`}>
                    {currentMood ? `Great to see you're feeling ${currentMood}!` : 'Optimize your study session'}
                  </h3>
                  <p className={`text-sm ${moodTheme.accent} mb-2`}>
                    Your calculus scores have improved! Try tackling the advanced practice exam.
                  </p>
                  <Button variant="outline" className={`text-xs h-7 ${moodTheme.border} ${moodTheme.text}`}>
                    Start Advanced Exam
                  </Button>
                </div>
              )}

              <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Subject focus recommendation</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                  Physics concepts need attention based on your recent quiz performance.
                </p>
                <Button variant="outline" className="text-xs h-7 border-blue-300 text-blue-800">
                  View Physics Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodaysPlanView;
