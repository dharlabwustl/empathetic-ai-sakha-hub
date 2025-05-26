
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import SmartSuggestionsSection from '../todays-plan/SmartSuggestionsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';
import NewTodaysPlanHeader from './NewTodaysPlanHeader';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  CheckCircle, 
  Clock, 
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Award,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  const [activeTab, setActiveTab] = useState("all");
  
  // Get today's plan data
  const {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");

  // Mock comprehensive today's plan data
  const todaysData = {
    stats: {
      totalTasks: 12,
      completed: 7,
      pending: 5,
      studyTime: 240, // minutes
      efficiency: 87
    },
    concepts: [
      {
        id: 'concept-1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        topic: 'Mechanics',
        difficulty: 'Medium',
        duration: 25,
        status: 'completed',
        priority: 'high'
      },
      {
        id: 'concept-2',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        topic: 'Organic Chemistry',
        difficulty: 'Hard',
        duration: 35,
        status: 'pending',
        priority: 'high'
      },
      {
        id: 'concept-3',
        title: 'Cell Division - Mitosis',
        subject: 'Biology',
        topic: 'Cell Biology',
        difficulty: 'Easy',
        duration: 20,
        status: 'pending',
        priority: 'medium'
      }
    ],
    flashcards: [
      {
        id: 'flashcard-1',
        title: 'Physics Formulas Set 1',
        subject: 'Physics',
        cardCount: 25,
        duration: 15,
        status: 'completed',
        difficulty: 'Medium'
      },
      {
        id: 'flashcard-2',
        title: 'Chemistry Elements',
        subject: 'Chemistry',
        cardCount: 30,
        duration: 20,
        status: 'pending',
        difficulty: 'Easy'
      }
    ],
    practiceTests: [
      {
        id: 'test-1',
        title: 'Physics Mock Test - Mechanics',
        subject: 'Physics',
        questionCount: 20,
        duration: 45,
        status: 'pending',
        difficulty: 'Hard'
      },
      {
        id: 'test-2',
        title: 'Biology Quick Quiz',
        subject: 'Biology',
        questionCount: 10,
        duration: 15,
        status: 'completed',
        difficulty: 'Medium'
      }
    ],
    tomorrow: {
      totalTasks: 10,
      focus: 'Chemistry Organic Reactions',
      estimatedTime: 180
    }
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

  const handleTaskClick = (taskId: string, type: string) => {
    if (type === 'concept') {
      navigate(`/dashboard/student/concepts/${taskId}`);
    } else if (type === 'flashcard') {
      navigate('/dashboard/student/flashcards');
    } else if (type === 'test') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  const renderTaskCard = (task: any, type: string) => {
    const isCompleted = task.status === 'completed';
    const icons = {
      concept: BookOpen,
      flashcard: Brain,
      test: FileText
    };
    const Icon = icons[type as keyof typeof icons];
    
    return (
      <motion.div
        key={task.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cursor-pointer"
        onClick={() => handleTaskClick(task.id, type)}
      >
        <Card className={`border-l-4 transition-all duration-200 hover:shadow-md ${
          isCompleted 
            ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500' 
            : 'hover:shadow-lg border-l-blue-500'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Icon className="h-5 w-5 text-blue-500" />
                )}
                <Badge variant={isCompleted ? "outline" : "default"} className={
                  isCompleted ? "bg-green-100 text-green-700 border-green-200" : ""
                }>
                  {isCompleted ? "Completed" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={
                  task.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                  task.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }>
                  {task.difficulty}
                </Badge>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <h3 className={`font-medium text-base mb-2 ${
              isCompleted ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{task.subject}</span>
                {task.topic && (
                  <>
                    <span>•</span>
                    <span>{task.topic}</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{task.duration} min</span>
                  {task.questionCount && (
                    <span className="ml-2">• {task.questionCount} questions</span>
                  )}
                  {task.cardCount && (
                    <span className="ml-2">• {task.cardCount} cards</span>
                  )}
                </div>
                {!isCompleted && (
                  <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                    Start
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const allTasks = [
    ...todaysData.concepts.map(c => ({ ...c, type: 'concept' })),
    ...todaysData.flashcards.map(f => ({ ...f, type: 'flashcard' })),
    ...todaysData.practiceTests.map(t => ({ ...t, type: 'test' }))
  ];

  const getFilteredTasks = (filter: string) => {
    switch (filter) {
      case 'concepts':
        return todaysData.concepts.map(c => ({ ...c, type: 'concept' }));
      case 'flashcards':
        return todaysData.flashcards.map(f => ({ ...f, type: 'flashcard' }));
      case 'tests':
        return todaysData.practiceTests.map(t => ({ ...t, type: 'test' }));
      case 'pending':
        return allTasks.filter(task => task.status === 'pending');
      case 'completed':
        return allTasks.filter(task => task.status === 'completed');
      default:
        return allTasks;
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
        {/* Header */}
        <NewTodaysPlanHeader 
          userName={planData?.userName || userProfile?.name}
          isMobile={isMobile}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">{todaysData.stats.totalTasks}</p>
                  <p className="text-xs text-blue-600">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">{todaysData.stats.completed}</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-700">{todaysData.stats.pending}</p>
                  <p className="text-xs text-orange-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">{Math.round(todaysData.stats.studyTime / 60)}h</p>
                  <p className="text-xs text-purple-600">Study Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-indigo-700">{todaysData.stats.efficiency}%</p>
                  <p className="text-xs text-indigo-600">Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall Completion</span>
                <span className="text-lg font-bold">{Math.round((todaysData.stats.completed / todaysData.stats.totalTasks) * 100)}%</span>
              </div>
              <Progress value={(todaysData.stats.completed / todaysData.stats.totalTasks) * 100} className="h-3" />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-blue-600">Concepts</div>
                  <div>{todaysData.concepts.filter(c => c.status === 'completed').length}/{todaysData.concepts.length}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-purple-600">Flashcards</div>
                  <div>{todaysData.flashcards.filter(f => f.status === 'completed').length}/{todaysData.flashcards.length}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-green-600">Tests</div>
                  <div>{todaysData.practiceTests.filter(t => t.status === 'completed').length}/{todaysData.practiceTests.length}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Interface */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="concepts">Concepts</TabsTrigger>
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="grid grid-cols-1 gap-4">
                  {getFilteredTasks(activeTab).map((task) => 
                    renderTaskCard(task, task.type)
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tomorrow's Preview */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Tomorrow's Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Main Focus</h3>
                  <p className="text-sm text-gray-600">{todaysData.tomorrow.focus}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">{todaysData.tomorrow.totalTasks} tasks</div>
                  <div className="text-sm text-gray-600">{Math.round(todaysData.tomorrow.estimatedTime / 60)}h estimated</div>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Prepare for Tomorrow
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Smart suggestions section */}
        <SmartSuggestionsSection 
          planData={planData}
          onActionClick={(action) => {
            switch (action) {
              case 'concepts':
                navigate('/dashboard/student/concepts');
                break;
              case 'flashcards':
                navigate('/dashboard/student/flashcards');
                break;
              case 'practice-exam':
                navigate('/dashboard/student/practice-exam');
                break;
              case 'break':
                navigate('/dashboard/student/feel-good-corner');
                break;
              default:
                console.log('Suggestion action:', action);
            }
          }}
          isMobile={isMobile}
        />
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
