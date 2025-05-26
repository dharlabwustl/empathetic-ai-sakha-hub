
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain,
  FileText,
  CheckCircle,
  Star,
  Zap,
  Trophy,
  BarChart3
} from 'lucide-react';

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  
  const {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Mock enhanced data for today's plan
  const todaysData = {
    overallProgress: 68,
    studyGoal: 4,
    timeSpent: 2.7,
    efficiency: 87,
    streak: 12,
    subjects: [
      { name: 'Physics', progress: 75, tasks: 8, completed: 6, time: 90 },
      { name: 'Chemistry', progress: 45, tasks: 6, completed: 3, time: 60 },
      { name: 'Biology', progress: 80, tasks: 5, completed: 4, time: 75 },
      { name: 'Mathematics', progress: 60, tasks: 4, completed: 2, time: 45 }
    ],
    pendingTasks: [
      { id: 1, title: "Thermodynamics - Heat Transfer", type: "concept", subject: "Physics", difficulty: "Medium", duration: 30, priority: "High" },
      { id: 2, title: "Organic Chemistry Reactions", type: "flashcard", subject: "Chemistry", difficulty: "Hard", duration: 25, priority: "Medium" },
      { id: 3, title: "Cell Biology Quiz", type: "practice", subject: "Biology", difficulty: "Easy", duration: 20, priority: "Low" }
    ],
    completedTasks: [
      { id: 4, title: "Newton's Laws Practice", type: "concept", subject: "Physics", difficulty: "Medium", duration: 30 },
      { id: 5, title: "Photosynthesis Flashcards", type: "flashcard", subject: "Biology", difficulty: "Easy", duration: 15 }
    ]
  };
  
  if (loading) {
    return <LoadingState message="Loading your study plan..." />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title="Could not load study plan" 
        message={error} 
        action={
          <Button onClick={refreshData}>
            Try Again
          </Button>
        }
      />
    );
  }

  const handleTaskClick = (taskId: number) => {
    const task = todaysData.pendingTasks.find(t => t.id === taskId);
    if (task) {
      switch (task.type) {
        case 'concept':
          navigate(`/dashboard/student/concepts`);
          break;
        case 'flashcard':
          navigate('/dashboard/student/flashcards');
          break;
        case 'practice':
          navigate('/dashboard/student/practice-exam');
          break;
      }
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice': return <FileText className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <SharedPageLayout
      title=""
      subtitle=""
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-8 ${isMobile ? 'px-0' : ''}`}>
        {/* Premium Header */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Good Morning, {planData?.userName || userProfile?.name}! 🌟
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {today} • Let's make today count towards your exam success
            </p>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{todaysData.overallProgress}%</div>
                <div className="text-sm text-blue-700">Today's Progress</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{todaysData.timeSpent}h</div>
                <div className="text-sm text-green-700">Study Time</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{todaysData.efficiency}%</div>
                <div className="text-sm text-purple-700">Efficiency</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{todaysData.streak}</div>
                <div className="text-sm text-orange-700">Day Streak</div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {todaysData.subjects.map((subject, index) => (
                  <div key={subject.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="outline">{subject.completed}/{subject.tasks} tasks</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{subject.progress}% complete</span>
                      <span>{subject.time} min studied</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Pending Tasks ({todaysData.pendingTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysData.pendingTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          {getTaskIcon(task.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline">
                          {task.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.duration} min
                      </span>
                      <Button size="sm" variant="outline">
                        Start Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Completed Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Completed Today ({todaysData.completedTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysData.completedTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800">{task.title}</h4>
                        <p className="text-sm text-green-600">{task.subject} • {task.duration} min</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        Completed
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Voice assistant for learning support */}
      <FloatingVoiceButton 
        userName={planData?.userName || userProfile?.name}
        language="en-US"
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
