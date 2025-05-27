
import React, { useState } from 'react';
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
  TrendingUp,
  Flame,
  Award,
  BarChart3,
  Zap
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  const [activeTab, setActiveTab] = useState("concepts");
  
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

  // Consolidated today's data with enhanced structure
  const todaysData = {
    overallProgress: 68,
    studyStreak: 12,
    timeSpent: 2.7,
    studyGoal: 4,
    efficiency: 85,
    smartSuggestions: [
      { id: 1, title: "Start with Physics - your strongest subject today", icon: "⚡", type: "strategy", priority: "high" },
      { id: 2, title: "Take a 5-min break every 25 minutes", icon: "⏱️", type: "wellness", priority: "medium" },
      { id: 3, title: "Review yesterday's Chemistry mistakes", icon: "🔄", type: "review", priority: "high" }
    ],
    concepts: [
      { id: 1, title: "Thermodynamics - Heat Transfer", subject: "Physics", difficulty: "Medium", duration: 30, priority: "High", completed: false, progress: 0 },
      { id: 2, title: "Organic Chemistry Reactions", subject: "Chemistry", difficulty: "Hard", duration: 35, priority: "High", completed: false, progress: 15 },
      { id: 3, title: "Cell Biology Structure", subject: "Biology", difficulty: "Easy", duration: 20, priority: "Medium", completed: true, progress: 100 }
    ],
    flashcards: [
      { id: 1, title: "Physics Formulas Set A", cardCount: 25, difficulty: "Medium", duration: 15, completed: false, progress: 60 },
      { id: 2, title: "Chemical Bonds Review", cardCount: 18, difficulty: "Easy", duration: 12, completed: false, progress: 30 }
    ],
    practiceExams: [
      { id: 1, title: "NEET Physics Mock Test", questionCount: 45, difficulty: "Hard", duration: 60, completed: false, progress: 0 },
      { id: 2, title: "Chemistry Quick Quiz", questionCount: 20, difficulty: "Medium", duration: 25, completed: false, progress: 0 }
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

  const renderTaskCard = (task: any, type: string) => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all ${
        task.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
      }`}
      onClick={() => handleTaskClick(task.id, type)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            task.completed ? 'bg-green-100 text-green-600' : 
            type === 'concept' ? 'bg-blue-100 text-blue-600' :
            type === 'flashcard' ? 'bg-purple-100 text-purple-600' :
            'bg-orange-100 text-orange-600'
          }`}>
            {task.completed ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              getTaskIcon(type)
            )}
          </div>
          <div>
            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h4>
            {task.subject && (
              <p className="text-sm text-gray-500">{task.subject}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {task.priority && (
            <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </Badge>
          )}
          {!task.completed && (
            <Button size="sm" variant="outline" className="gap-1">
              <Play className="h-3 w-3" />
              Start
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {task.progress !== undefined && (
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-1" />
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{task.duration} min</span>
            </div>
            {task.difficulty && (
              <Badge variant="outline" className="text-xs">
                {task.difficulty}
              </Badge>
            )}
            {task.cardCount && (
              <span>{task.cardCount} cards</span>
            )}
            {task.questionCount && (
              <span>{task.questionCount} questions</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

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

        {/* Smart Suggestions - Moved below header */}
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
              <div className="grid gap-3">
                {todaysData.smartSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                    <span className="text-lg">{suggestion.icon}</span>
                    <span className="font-medium text-amber-900 flex-1">{suggestion.title}</span>
                    <Badge variant="outline" className={`text-xs ${
                      suggestion.priority === 'high' ? 'bg-red-100 text-red-700 border-red-300' :
                      'bg-amber-100 text-amber-700 border-amber-300'
                    }`}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{todaysData.overallProgress}%</div>
                  <div className="text-xs text-blue-700">Progress</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{todaysData.timeSpent}h</div>
                  <div className="text-xs text-green-700">Studied</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{todaysData.studyGoal}h</div>
                  <div className="text-xs text-purple-700">Goal</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{todaysData.studyStreak}</div>
                  <div className="text-xs text-orange-700">Day Streak</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-teal-600" />
                <div>
                  <div className="text-2xl font-bold text-teal-600">{todaysData.efficiency}%</div>
                  <div className="text-xs text-teal-700">Efficiency</div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Modern Tabbed Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="concepts" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Concepts ({todaysData.concepts.length})
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Flashcards ({todaysData.flashcards.length})
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Practice ({todaysData.practiceExams.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="concepts" className="space-y-4">
              <div className="grid gap-4">
                {todaysData.concepts.map((concept) => renderTaskCard(concept, 'concept'))}
              </div>
            </TabsContent>

            <TabsContent value="flashcards" className="space-y-4">
              <div className="grid gap-4">
                {todaysData.flashcards.map((flashcard) => renderTaskCard(flashcard, 'flashcard'))}
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              <div className="grid gap-4">
                {todaysData.practiceExams.map((exam) => renderTaskCard(exam, 'practice'))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Time Allocation Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                Time Allocation Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">1.5h</div>
                  <div className="text-sm text-gray-600">Concepts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">0.5h</div>
                  <div className="text-sm text-gray-600">Flashcards</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">1.5h</div>
                  <div className="text-sm text-gray-600">Practice</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">0.5h</div>
                  <div className="text-sm text-gray-600">Breaks</div>
                </div>
              </div>
            </CardContent>
          </Card>
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
