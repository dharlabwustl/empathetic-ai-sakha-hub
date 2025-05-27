
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
  Calendar,
  Star,
  Zap,
  Lightbulb,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import DailySmartSuggestions from '@/components/dashboard/student/DailySmartSuggestions';

const TodayPlan = () => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState(new Set<string>());
  const [activeTab, setActiveTab] = useState('overview');

  const todayData = {
    userName: 'Student',
    streak: 7,
    totalTasks: 12,
    timeAllocation: {
      concepts: 90,
      flashcards: 60,
      practiceExams: 45,
      total: 195
    },
    concepts: [
      {
        id: 'c1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        duration: 30,
        difficulty: 'Medium',
        priority: 'high' as const,
        description: 'Master the three fundamental laws of motion'
      },
      {
        id: 'c2',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 35,
        difficulty: 'Hard',
        priority: 'high' as const,
        description: 'Learn substitution and elimination reactions'
      }
    ],
    flashcards: [
      {
        id: 'f1',
        title: 'Physics Formulas',
        subject: 'Physics',
        duration: 25,
        cardCount: 30,
        priority: 'medium' as const
      },
      {
        id: 'f2',
        title: 'Chemical Elements',
        subject: 'Chemistry',
        duration: 20,
        cardCount: 25,
        priority: 'medium' as const
      }
    ],
    practiceExams: [
      {
        id: 'p1',
        title: 'Biology Mock Test',
        subject: 'Biology',
        duration: 45,
        questionCount: 50,
        priority: 'high' as const
      }
    ],
    smartSuggestions: [
      {
        id: 's1',
        type: 'concept' as const,
        title: 'Quick Review Session',
        description: 'Review yesterday\'s weak areas before starting new concepts',
        priority: 'high' as const,
        reason: 'Based on your performance patterns'
      },
      {
        id: 's2',
        type: 'break' as const,
        title: 'Mindfulness Break',
        description: 'Take a 10-minute meditation break to improve focus',
        priority: 'medium' as const,
        reason: 'You\'ve been studying for 2 hours'
      }
    ]
  };

  const completedCount = completedTasks.size;
  const progressPercentage = Math.round((completedCount / todayData.totalTasks) * 100);

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const TaskCard = ({ task, type, onStart }: any) => {
    const isCompleted = completedTasks.has(task.id);
    const typeConfig = {
      concept: { icon: <BookOpen className="h-5 w-5" />, color: 'blue', bgColor: 'bg-blue-50 border-blue-200' },
      flashcard: { icon: <Brain className="h-5 w-5" />, color: 'purple', bgColor: 'bg-purple-50 border-purple-200' },
      exam: { icon: <FileText className="h-5 w-5" />, color: 'green', bgColor: 'bg-green-50 border-green-200' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`transition-all duration-300`}
      >
        <Card className={`border-2 ${isCompleted ? 'bg-green-50 border-green-200 opacity-75' : config.bgColor + ' hover:shadow-lg'}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-${config.color}-100 text-${config.color}-600`}>
                  {isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : config.icon}
                </div>
                <div>
                  <h4 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-600">{task.subject}</p>
                  {task.description && (
                    <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                  )}
                </div>
              </div>
              {!isCompleted && (
                <Button size="sm" onClick={() => onStart(task)}>
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-gray-500">
                <Clock className="h-3 w-3" />
                {task.duration} min
              </span>
              <div className="flex gap-2">
                {task.difficulty && (
                  <Badge variant="outline" size="sm">{task.difficulty}</Badge>
                )}
                {task.cardCount && (
                  <Badge variant="secondary" size="sm">{task.cardCount} cards</Badge>
                )}
                {task.questionCount && (
                  <Badge variant="secondary" size="sm">{task.questionCount} questions</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const handleTaskStart = (task: any) => {
    if (task.subject === 'Physics' || task.subject === 'Chemistry') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.cardCount) {
      navigate('/dashboard/student/flashcards');
    } else {
      navigate('/dashboard/student/practice-exam');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Good Morning, {todayData.userName}! 🌟</h1>
            <p className="text-blue-100 text-lg">Your personalized study plan is ready. Let's make today count!</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-6 w-6 text-yellow-300" />
              <span className="text-2xl font-bold">{todayData.streak} Day Streak</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              {Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m planned
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span>Daily Progress</span>
            <span>{completedCount}/{todayData.totalTasks} tasks ({progressPercentage}%)</span>
          </div>
          <Progress value={progressPercentage} className="h-4 bg-white/20" />
        </div>
      </div>

      {/* Smart Suggestions */}
      <DailySmartSuggestions userName={todayData.userName} />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-10 w-10 mx-auto mb-3 text-blue-600" />
            <p className="text-3xl font-bold text-blue-800 mb-1">{todayData.concepts.length}</p>
            <p className="text-sm text-blue-600 font-medium">Concepts</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Brain className="h-10 w-10 mx-auto mb-3 text-purple-600" />
            <p className="text-3xl font-bold text-purple-800 mb-1">{todayData.flashcards.length}</p>
            <p className="text-sm text-purple-600 font-medium">Flashcards</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-10 w-10 mx-auto mb-3 text-green-600" />
            <p className="text-3xl font-bold text-green-800 mb-1">{todayData.practiceExams.length}</p>
            <p className="text-sm text-green-600 font-medium">Practice Tests</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Award className="h-10 w-10 mx-auto mb-3 text-orange-600" />
            <p className="text-3xl font-bold text-orange-800 mb-1">{progressPercentage}%</p>
            <p className="text-sm text-orange-600 font-medium">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg h-12">
          <TabsTrigger value="overview" className="rounded-md text-sm font-medium">Overview</TabsTrigger>
          <TabsTrigger value="concepts" className="rounded-md text-sm font-medium">Concepts</TabsTrigger>
          <TabsTrigger value="flashcards" className="rounded-md text-sm font-medium">Flashcards</TabsTrigger>
          <TabsTrigger value="practice" className="rounded-md text-sm font-medium">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-8">
          <div className="grid gap-6">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-indigo-600" />
                  Today's Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white rounded-xl border-2 border-blue-100 shadow-sm">
                    <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-3xl font-bold text-blue-800 mb-2">{todayData.timeAllocation.concepts}m</p>
                    <p className="text-blue-600 font-semibold">Concept Learning</p>
                    <p className="text-xs text-gray-500 mt-2">Deep understanding</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl border-2 border-purple-100 shadow-sm">
                    <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <p className="text-3xl font-bold text-purple-800 mb-2">{todayData.timeAllocation.flashcards}m</p>
                    <p className="text-purple-600 font-semibold">Memory Review</p>
                    <p className="text-xs text-gray-500 mt-2">Spaced repetition</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl border-2 border-green-100 shadow-sm">
                    <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-3xl font-bold text-green-800 mb-2">{todayData.timeAllocation.practiceExams}m</p>
                    <p className="text-green-600 font-semibold">Practice Tests</p>
                    <p className="text-xs text-gray-500 mt-2">Skill application</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4 mt-8">
          <div className="grid gap-4">
            {todayData.concepts.map((concept) => (
              <TaskCard 
                key={concept.id} 
                task={concept} 
                type="concept" 
                onStart={handleTaskStart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-4 mt-8">
          <div className="grid gap-4">
            {todayData.flashcards.map((flashcard) => (
              <TaskCard 
                key={flashcard.id} 
                task={flashcard} 
                type="flashcard" 
                onStart={handleTaskStart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4 mt-8">
          <div className="grid gap-4">
            {todayData.practiceExams.map((exam) => (
              <TaskCard 
                key={exam.id} 
                task={exam} 
                type="exam" 
                onStart={handleTaskStart}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Motivational Footer */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Zap className="h-8 w-8 text-indigo-600" />
            <h3 className="text-2xl font-bold text-indigo-900">Stay Motivated!</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border-2 border-indigo-100 shadow-sm">
              <p className="text-lg font-semibold text-gray-800 mb-2">Today's Focus</p>
              <p className="text-gray-600">Complete high-priority concepts to build strong foundations</p>
            </div>
            <div className="p-6 bg-white rounded-xl border-2 border-indigo-100 shadow-sm">
              <p className="text-lg font-semibold text-gray-800 mb-2">Weekly Goal</p>
              <p className="text-gray-600">Maintain your {todayData.streak}-day streak and aim for excellence</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodayPlan;
