
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
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Brain,
  FileText,
  CheckCircle,
  Sparkles,
  Play,
  ChevronRight,
  Flame,
  Trophy
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
    refreshData
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Simplified today's data
  const todaysData = {
    overallProgress: 68,
    studyStreak: 12,
    timeSpent: 2.7,
    studyGoal: 4,
    smartSuggestions: [
      { id: 1, title: "Start with Physics concepts - your strongest subject", icon: "⚡", type: "strategy" },
      { id: 2, title: "Take a 5-min break every 25 minutes", icon: "⏱️", type: "wellness" },
      { id: 3, title: "Review yesterday's mistakes in Chemistry", icon: "🔄", type: "review" }
    ],
    subjects: [
      { 
        name: 'Physics', 
        progress: 75, 
        tasks: [
          { id: 1, title: "Thermodynamics - Heat Transfer", type: "concept", difficulty: "Medium", duration: 30, priority: "High", completed: false },
          { id: 2, title: "Newton's Laws Practice", type: "practice", difficulty: "Medium", duration: 25, priority: "Medium", completed: true }
        ]
      },
      { 
        name: 'Chemistry', 
        progress: 45, 
        tasks: [
          { id: 3, title: "Organic Chemistry Reactions", type: "concept", difficulty: "Hard", duration: 35, priority: "High", completed: false },
          { id: 4, title: "Periodic Table Quiz", type: "quiz", difficulty: "Easy", duration: 15, priority: "Medium", completed: false }
        ]
      },
      { 
        name: 'Biology', 
        progress: 80, 
        tasks: [
          { id: 5, title: "Cell Biology Flashcards", type: "flashcard", difficulty: "Easy", duration: 20, priority: "Low", completed: false }
        ]
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
        action={<Button onClick={refreshData}>Try Again</Button>}
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
            {today} • Ready to achieve your goals today?
          </p>
        </motion.div>

        {/* Daily Smart Suggestions - Below header */}
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
                  <div key={suggestion.id} className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
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

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{todaysData.overallProgress}%</div>
                <div className="text-sm text-blue-700">Progress</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{todaysData.timeSpent}h</div>
                <div className="text-sm text-green-700">Studied</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{todaysData.studyGoal}h</div>
                <div className="text-sm text-purple-700">Goal</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Flame className="h-5 w-5 text-orange-600" />
                  <div className="text-2xl font-bold text-orange-600">{todaysData.studyStreak}</div>
                </div>
                <div className="text-sm text-orange-700">Day Streak</div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Subject-wise Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          {todaysData.subjects.map((subject, index) => (
            <Card key={subject.name} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">{subject.progress}% complete</div>
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
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
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{task.duration} min</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {task.difficulty}
                              </Badge>
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!task.completed && (
                            <Button size="sm" variant="outline" className="gap-1">
                              <Play className="h-3 w-3" />
                              Start
                            </Button>
                          )}
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
      
      <FloatingVoiceButton 
        userName={planData?.userName || userProfile?.name}
        language="en-US"
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
