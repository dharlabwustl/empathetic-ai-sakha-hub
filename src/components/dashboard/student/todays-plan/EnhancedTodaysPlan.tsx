
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  Target, 
  TrendingUp, 
  Play,
  CheckCircle,
  Calendar,
  Lightbulb,
  Zap,
  Star,
  Trophy,
  Flame,
  Medal
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  duration: number;
  status: 'pending' | 'completed' | 'in-progress';
  difficulty?: string;
  progress?: number;
  points?: number;
}

const EnhancedTodaysPlan = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const userName = 'Alex';
  const currentStreak = 7;
  const dailyPoints = 245;
  const todayGoal = 8;

  // Mock data
  const concepts: Task[] = [
    { id: 'c1', title: 'Newton\'s Laws of Motion', subject: 'Physics', type: 'concept', duration: 30, status: 'pending', difficulty: 'Medium', points: 25 },
    { id: 'c2', title: 'Organic Chemistry Basics', subject: 'Chemistry', type: 'concept', duration: 45, status: 'completed', difficulty: 'Hard', points: 35 },
    { id: 'c3', title: 'Cell Division Process', subject: 'Biology', type: 'concept', duration: 35, status: 'in-progress', difficulty: 'Medium', progress: 60, points: 30 }
  ];

  const flashcards: Task[] = [
    { id: 'f1', title: 'Physics Formulas', subject: 'Physics', type: 'flashcard', duration: 20, status: 'pending', points: 15 },
    { id: 'f2', title: 'Chemical Reactions', subject: 'Chemistry', type: 'flashcard', duration: 25, status: 'completed', points: 20 },
    { id: 'f3', title: 'Biology Terms', subject: 'Biology', type: 'flashcard', duration: 15, status: 'pending', points: 15 }
  ];

  const practiceExams: Task[] = [
    { id: 'p1', title: 'Physics Mock Test 1', subject: 'Physics', type: 'practice-exam', duration: 60, status: 'pending', difficulty: 'Hard', points: 50 },
    { id: 'p2', title: 'Chemistry Quiz', subject: 'Chemistry', type: 'practice-exam', duration: 30, status: 'completed', difficulty: 'Medium', points: 35 }
  ];

  const allTasks = [...concepts, ...flashcards, ...practiceExams];
  const completedCount = allTasks.filter(task => task.status === 'completed').length;
  const totalTasks = allTasks.length;
  const progressPercentage = Math.round((completedCount / totalTasks) * 100);

  const smartSuggestions = [
    { id: 's1', title: 'Complete Physics concepts first', description: 'You perform better in Physics during morning hours', priority: 'high' as const },
    { id: 's2', title: 'Take a 10-minute break', description: 'You\'ve been studying for 45 minutes', priority: 'medium' as const },
    { id: 's3', title: 'Review yesterday\'s flashcards', description: 'Spaced repetition will improve retention', priority: 'low' as const }
  ];

  const handleTaskStart = (taskId: string) => {
    console.log('Starting task:', taskId);
    // Navigate to appropriate page based on task type
  };

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => [...prev, taskId]);
    console.log('Task completed:', taskId);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5" />;
      case 'flashcard': return <Brain className="h-5 w-5" />;
      case 'practice-exam': return <FileText className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return 'blue';
      case 'flashcard': return 'purple';
      case 'practice-exam': return 'green';
      default: return 'gray';
    }
  };

  const TaskCard = ({ task, onStart, onComplete }: { task: Task; onStart: (id: string) => void; onComplete: (id: string) => void }) => {
    const isCompleted = task.status === 'completed' || completedTasks.includes(task.id);
    const color = getTypeColor(task.type);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`transition-all hover:shadow-lg border-2 ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:border-blue-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600`}>
                  {getTaskIcon(task.type)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.subject}</p>
                </div>
              </div>
              {isCompleted ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => onStart(task.id)} className="bg-blue-500 hover:bg-blue-600">
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onComplete(task.id)}>
                    <CheckCircle className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            
            {task.progress && task.status === 'in-progress' && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {task.duration} min
              </span>
              <div className="flex items-center gap-2">
                {task.difficulty && (
                  <Badge variant="outline" size="sm">{task.difficulty}</Badge>
                )}
                {task.points && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    <Star className="h-3 w-3 mr-1" />
                    {task.points} pts
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const StatCard = ({ title, value, icon, color = "blue", subtitle }: any) => (
    <Card className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200 hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${color}-500 rounded-full shadow-sm`}>
            {icon}
          </div>
          <div>
            <p className={`text-sm text-${color}-600 font-medium`}>{title}</p>
            <p className={`text-xl font-bold text-${color}-800`}>{value}</p>
            {subtitle && <p className={`text-xs text-${color}-600`}>{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle={`Welcome back, ${userName}! Let's make today count 🚀`}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Enhanced Header with Gamification */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-8 w-8 text-blue-600" />
                Today's Mission
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-orange-600">
                  <Flame className="h-5 w-5" />
                  <span className="font-bold text-lg">{currentStreak}</span>
                </div>
                <p className="text-xs text-gray-600">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-yellow-600">
                  <Trophy className="h-5 w-5" />
                  <span className="font-bold text-lg">{dailyPoints}</span>
                </div>
                <p className="text-xs text-gray-600">Points Today</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Daily Progress</span>
              <span>{completedCount}/{totalTasks} tasks completed ({progressPercentage}%)</span>
            </div>
            <Progress value={progressPercentage} className="h-4 bg-white/50" />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Keep going! You're doing great!</span>
              <span>Goal: {todayGoal} tasks</span>
            </div>
          </div>
        </div>

        {/* Smart Suggestions */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Lightbulb className="h-5 w-5" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {smartSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-3 bg-white rounded-lg border border-yellow-200 shadow-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{suggestion.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                      <Badge 
                        variant="outline" 
                        size="sm" 
                        className={`mt-2 ${
                          suggestion.priority === 'high' ? 'border-red-200 text-red-700' :
                          suggestion.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                          'border-blue-200 text-blue-700'
                        }`}
                      >
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            title="Total Time" 
            value="4h 30m"
            subtitle="Estimated"
            icon={<Clock className="h-5 w-5 text-white" />}
            color="blue"
          />
          <StatCard 
            title="Concepts" 
            value={concepts.length}
            subtitle={`${concepts.filter(c => c.status === 'completed').length} completed`}
            icon={<BookOpen className="h-5 w-5 text-white" />}
            color="green"
          />
          <StatCard 
            title="Flashcards" 
            value={flashcards.length}
            subtitle={`${flashcards.filter(f => f.status === 'completed').length} completed`}
            icon={<Brain className="h-5 w-5 text-white" />}
            color="purple"
          />
          <StatCard 
            title="Practice Tests" 
            value={practiceExams.length}
            subtitle={`${practiceExams.filter(p => p.status === 'completed').length} completed`}
            icon={<FileText className="h-5 w-5 text-white" />}
            color="orange"
          />
        </div>

        {/* Enhanced Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
            <TabsTrigger value="concepts" className="rounded-md">
              Concepts
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                {concepts.filter(c => c.status !== 'completed').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="rounded-md">
              Flashcards
              <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
                {flashcards.filter(f => f.status !== 'completed').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="practice" className="rounded-md">
              Practice
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                {practiceExams.filter(p => p.status !== 'completed').length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTasks.slice(0, 6).map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStart={handleTaskStart}
                  onComplete={handleTaskComplete}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concepts" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concepts.map((concept) => (
                <TaskCard 
                  key={concept.id} 
                  task={concept} 
                  onStart={handleTaskStart}
                  onComplete={handleTaskComplete}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flashcards.map((flashcard) => (
                <TaskCard 
                  key={flashcard.id} 
                  task={flashcard} 
                  onStart={handleTaskStart}
                  onComplete={handleTaskComplete}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceExams.map((exam) => (
                <TaskCard 
                  key={exam.id} 
                  task={exam} 
                  onStart={handleTaskStart}
                  onComplete={handleTaskComplete}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
