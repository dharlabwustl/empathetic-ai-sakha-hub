import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import TabAIAssistant from '@/components/dashboard/student/ai-assistant/TabAIAssistant';
import TabProgressMeter from '@/components/dashboard/student/progress/TabProgressMeter';
import { useTabProgress } from '@/hooks/useTabProgress';

const TodaysPlanView = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const { planData, loading, activeView, setActiveView, markTaskCompleted } = useTodaysPlan("IIT-JEE", "Student");
  const [currentTab, setCurrentTab] = useState('all');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();
  const { getTabProgress, updateTabProgress } = useTabProgress();

  // Update progress when component mounts
  useEffect(() => {
    updateTabProgress('today', {
      totalTasks: tasks.length,
      tasksCompleted: tasks.filter(task => task.status === 'completed').length,
      completionPercentage: Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100),
      timeSpent: 120, // Mock time spent
      streak: 5 // Mock streak
    });
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
  
  // Calculate total time
  const totalTimeEstimate = tasks.reduce((total, task) => {
    if (task.status !== 'completed') {
      return total + task.timeEstimate;
    }
    return total;
  }, 0);
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const percentageCompleted = Math.round((completedTasks / totalTasks) * 100);

  // Handle task action (start or review)
  const handleTaskAction = (task: any) => {
    console.log("TodaysPlanView - Task action clicked:", task.id, task.type);
    
    if (task.status === 'completed') {
      // Navigate to review page based on task type
      switch (task.type) {
        case 'concept':
          console.log("TodaysPlanView - Navigating to concept detail (review):", task.id);
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
      // Navigate to start page based on task type
      switch (task.type) {
        case 'concept':
          console.log("TodaysPlanView - Navigating to concept detail (start):", task.id);
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

  // Handle task card click (entire card clickable)
  const handleTaskCardClick = (task: any) => {
    console.log("TodaysPlanView - Task card clicked:", task.id, task.type);
    
    // For concept cards, navigate to concept detail page
    if (task.type === 'concept') {
      console.log("TodaysPlanView - Navigating to concept detail page:", task.id);
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else {
      // For other types, use the same logic as handleTaskAction
      handleTaskAction(task);
    }
  };

  // Handle mood selection
  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    // In a real implementation, we would update the user's mood in the backend
    console.log('User mood updated:', mood);
    
    // Save mood to local storage for persistence
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

  // Today's plan content with enhanced layout
  const todaysPlanContent = (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-primary" />
            Today's Study Plan
          </h1>
          <Badge className="text-sm py-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </Badge>
        </div>
        
        {/* Mood and Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
              <MoodSelector currentMood={currentMood} onMoodSelect={setCurrentMood} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Today's Progress</h3>
              <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                <span>Completed {progressData.tasksCompleted} of {progressData.totalTasks} tasks</span>
                <span>{Math.round(progressData.completionPercentage)}%</span>
              </div>
              <Progress value={progressData.completionPercentage} className="h-2 mb-4" />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time Spent</p>
                  <p className="text-lg font-semibold">{progressData.timeSpent} min</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Completed</p>
                  <p className="text-lg font-semibold">{progressData.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Streak</p>
                  <p className="text-lg font-semibold">{progressData.streak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tasks Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Task Breakdown
              </CardTitle>
              <div className="text-sm text-muted-foreground">
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
                  className="capitalize"
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
                  className={`overflow-hidden transition-all border-l-4 cursor-pointer ${
                    task.priority === 'high' ? "border-l-red-500" : 
                    task.priority === 'medium' ? "border-l-amber-500" : "border-l-blue-500"
                  } hover:shadow-md`}
                  onClick={() => handleTaskCardClick(task)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        {getTaskTypeIcon(task.type)}
                        <span className="font-medium">{task.subject}</span>
                      </div>
                      {getTaskStatusBadge(task.status)}
                    </div>
                    
                    <h3 className="font-semibold mt-3">{task.title}</h3>
                    
                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
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
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                      </div>
                    )}
                    
                    {task.smartTip && (
                      <div className="mt-3 py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-xs text-blue-800 dark:text-blue-300">
                        <p>{task.smartTip}</p>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full mt-3"
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
              <div className="text-center py-10 text-muted-foreground">
                <p>No tasks found for this category</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Sidebar with Progress and AI */}
      <div className="space-y-6">
        <TabProgressMeter 
          tabName="Today's Plan" 
          progressData={progressData}
        />
        <TabAIAssistant 
          tabName="Today's Plan"
          context="User is working on their daily study plan"
        />
      </div>
    </div>
  );

  const progressData = getTabProgress('today');

  return userProfile ? (
    <SharedPageLayout title="Today's Plan" subtitle="Your personalized daily study schedule" activeTab="today">
      {todaysPlanContent}
    </SharedPageLayout>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default TodaysPlanView;
