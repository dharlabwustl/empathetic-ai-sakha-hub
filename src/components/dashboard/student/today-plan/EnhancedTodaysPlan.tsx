
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Clock, 
  Target, 
  BookOpen, 
  Brain,
  FileText,
  CheckCircle,
  Star,
  Trophy,
  BarChart3,
  Sparkles,
  Play,
  Flame,
  TrendingUp
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

  // Enhanced data structure without repetitive sections
  const todaysData = {
    overallProgress: 75,
    studyGoal: 4,
    timeSpent: 3.2,
    streak: 18,
    smartSuggestions: [
      { id: 1, title: "Start with Physics - your strongest subject today", icon: "🚀", type: "strategy" },
      { id: 2, title: "Take a 10-min break after each hour", icon: "⏰", type: "wellness" },
      { id: 3, title: "Review yesterday's mistakes first", icon: "🎯", type: "preparation" }
    ],
    activeSubjects: [
      { 
        name: 'Physics', 
        progress: 80, 
        tasks: [
          { id: 1, title: "Thermodynamics Laws", type: "concept", duration: 35, priority: "High", completed: false },
          { id: 2, title: "Energy Conservation Practice", type: "practice", duration: 25, priority: "Medium", completed: true }
        ],
        color: "blue",
        timeRemaining: "1h 15m"
      },
      { 
        name: 'Chemistry', 
        progress: 55, 
        tasks: [
          { id: 3, title: "Organic Mechanisms", type: "concept", duration: 40, priority: "High", completed: false },
          { id: 4, title: "Periodic Properties Quiz", type: "quiz", duration: 20, priority: "Medium", completed: false }
        ],
        color: "green",
        timeRemaining: "1h 45m"
      },
      { 
        name: 'Biology', 
        progress: 90, 
        tasks: [
          { id: 5, title: "Genetics Review", type: "flashcard", duration: 15, priority: "Low", completed: false }
        ],
        color: "purple",
        timeRemaining: "30m"
      }
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

  const handleTaskClick = (taskId: number, type: string) => {
    switch (type) {
      case 'concept':
        navigate(`/dashboard/student/concepts`);
        break;
      case 'flashcard':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice':
      case 'quiz':
        navigate('/dashboard/student/practice-exam');
        break;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice':
      case 'quiz': return <FileText className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getSubjectGradient = (color: string) => {
    const gradients = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600"
    };
    return gradients[color] || gradients.blue;
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
      
      <div className={`space-y-6 ${isMobile ? 'px-0' : ''}`}>
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Good Morning, {planData?.userName || userProfile?.name}! 🌟
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {today} • Let's crush your goals today!
          </p>
        </motion.div>

        {/* Daily Smart Suggestions - Moved below header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Sparkles className="h-5 w-5" />
                Today's Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {todaysData.smartSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                    <span className="text-lg">{suggestion.icon}</span>
                    <span className="font-medium text-amber-900 flex-1">{suggestion.title}</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 text-xs">
                      {suggestion.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border-violet-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-violet-800">
                <BarChart3 className="h-5 w-5" />
                Today's Progress Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/70 rounded-xl border">
                  <div className="text-2xl font-bold text-blue-600">{todaysData.overallProgress}%</div>
                  <div className="text-sm text-blue-700 mt-1">Progress</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl border">
                  <div className="text-2xl font-bold text-green-600">{todaysData.timeSpent}h</div>
                  <div className="text-sm text-green-700 mt-1">Studied</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl border">
                  <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                    <Flame className="h-5 w-5" />
                    {todaysData.streak}
                  </div>
                  <div className="text-sm text-orange-700 mt-1">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl border">
                  <div className="text-2xl font-bold text-purple-600">{todaysData.studyGoal}h</div>
                  <div className="text-sm text-purple-700 mt-1">Goal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Study Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Study Sessions
          </h2>
          
          <div className="grid gap-4">
            {todaysData.activeSubjects.map((subject, index) => (
              <Card key={subject.name} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className={`bg-gradient-to-r ${getSubjectGradient(subject.color)} text-white p-4`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <p className="text-white/80 text-sm">{subject.timeRemaining} remaining</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{subject.progress}%</div>
                      <div className="text-white/80 text-xs">Complete</div>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2 bg-white/20 mt-2" />
                </CardHeader>
                <CardContent className="p-0">
                  {subject.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: taskIndex * 0.1 }}
                      className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                        task.completed ? 'bg-green-50' : ''
                      }`}
                      onClick={() => handleTaskClick(task.id, task.type)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            task.completed ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {task.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              getTaskIcon(task.type)
                            )}
                          </div>
                          <div>
                            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{task.duration} min</span>
                              </div>
                              <Badge variant="outline" className={`text-xs ${
                                task.priority === 'High' ? 'border-red-300 text-red-700 bg-red-50' :
                                task.priority === 'Medium' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                                'border-green-300 text-green-700 bg-green-50'
                              }`}>
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {!task.completed && (
                          <Button size="sm" variant="outline" className="gap-1 hover:bg-blue-50">
                            <Play className="h-3 w-3" />
                            Start
                          </Button>
                        )}
                        {task.completed && (
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
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
