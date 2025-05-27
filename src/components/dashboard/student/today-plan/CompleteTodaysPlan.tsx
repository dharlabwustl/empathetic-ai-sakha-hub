
import React, { useState } from 'react';
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
  Zap,
  Calendar,
  TrendingUp,
  Award,
  ChevronRight,
  Timer,
  Trophy,
  ListTodo
} from 'lucide-react';

interface CompleteTodaysPlanProps {
  userName?: string;
}

const CompleteTodaysPlan: React.FC<CompleteTodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const [completedTasks, setCompletedTasks] = useState(new Set<string>());
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data for today's plan
  const todayData = {
    streak: 7,
    totalTasks: 8,
    studyGoal: 180, // minutes
    completedTime: 85,
    tasks: [
      {
        id: '1',
        type: 'concept' as const,
        title: 'Laws of Motion',
        subject: 'Physics',
        duration: 30,
        difficulty: 'Medium' as const,
        priority: 'high' as const,
        progress: 0
      },
      {
        id: '2',
        type: 'flashcard' as const,
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard' as const,
        priority: 'high' as const,
        progress: 0
      },
      {
        id: '3',
        type: 'exam' as const,
        title: 'Biology Mock Test',
        subject: 'Biology',
        duration: 45,
        difficulty: 'Medium' as const,
        priority: 'medium' as const,
        progress: 0
      },
      {
        id: '4',
        type: 'concept' as const,
        title: 'Thermodynamics',
        subject: 'Physics',
        duration: 35,
        difficulty: 'Hard' as const,
        priority: 'medium' as const,
        progress: 0
      }
    ],
    weeklyGoals: {
      concepts: { completed: 12, target: 15 },
      flashcards: { completed: 8, target: 10 },
      exams: { completed: 2, target: 3 }
    }
  };

  const completedCount = completedTasks.size;
  const progressPercentage = Math.round((completedCount / todayData.totalTasks) * 100);
  const timeProgressPercentage = Math.round((todayData.completedTime / todayData.studyGoal) * 100);

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'exam': return <FileText className="h-5 w-5 text-green-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-8 w-8 text-yellow-300" />
              <div>
                <h1 className="text-3xl font-bold">Good Morning, {userName}! 🌟</h1>
                <p className="text-blue-100 text-lg mt-1">Let's make today productive and successful!</p>
              </div>
            </div>
            
            {/* Daily Progress */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100">Tasks Progress</span>
                  <span className="text-white font-bold">{completedCount}/{todayData.totalTasks}</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-white/20" />
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100">Study Time</span>
                  <span className="text-white font-bold">{todayData.completedTime}/{todayData.studyGoal}m</span>
                </div>
                <Progress value={timeProgressPercentage} className="h-2 bg-white/20" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-3">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-xl font-bold">{todayData.streak} Day Streak</span>
            </div>
            <Badge variant="secondary" className="bg-white/30 text-white border-white/30 text-lg px-4 py-2">
              {Math.floor(todayData.studyGoal / 60)}h {todayData.studyGoal % 60}m Planned
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 rounded-lg p-1">
          <TabsTrigger value="overview" className="text-sm font-medium">Today's Overview</TabsTrigger>
          <TabsTrigger value="tasks" className="text-sm font-medium">Study Tasks</TabsTrigger>
          <TabsTrigger value="progress" className="text-sm font-medium">Weekly Progress</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <p className="text-3xl font-bold text-blue-800 mb-2">
                  {todayData.tasks.filter(t => t.type === 'concept').length}
                </p>
                <p className="text-blue-600 font-medium">Concepts Today</p>
                <p className="text-sm text-blue-500 mt-1">
                  {todayData.tasks.filter(t => t.type === 'concept').reduce((acc, t) => acc + t.duration, 0)} minutes
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <p className="text-3xl font-bold text-purple-800 mb-2">
                  {todayData.tasks.filter(t => t.type === 'flashcard').length}
                </p>
                <p className="text-purple-600 font-medium">Flashcard Sets</p>
                <p className="text-sm text-purple-500 mt-1">
                  {todayData.tasks.filter(t => t.type === 'flashcard').reduce((acc, t) => acc + t.duration, 0)} minutes
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <p className="text-3xl font-bold text-green-800 mb-2">
                  {todayData.tasks.filter(t => t.type === 'exam').length}
                </p>
                <p className="text-green-600 font-medium">Practice Tests</p>
                <p className="text-sm text-green-500 mt-1">
                  {todayData.tasks.filter(t => t.type === 'exam').reduce((acc, t) => acc + t.duration, 0)} minutes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="h-6 w-6 text-orange-500" />
                Quick Start - High Priority Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {todayData.tasks
                  .filter(task => task.priority === 'high')
                  .map((task) => {
                    const isCompleted = completedTasks.has(task.id);
                    
                    return (
                      <div 
                        key={task.id} 
                        className={`flex items-center justify-between p-4 rounded-lg border-l-4 transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-green-50 border-l-green-500 opacity-75' 
                            : getPriorityColor(task.priority)
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-white shadow-sm">
                            {isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : (
                              getTaskIcon(task.type)
                            )}
                          </div>
                          
                          <div>
                            <h4 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {task.duration} min
                              </span>
                              <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                                {task.difficulty}
                              </Badge>
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {task.subject}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={isCompleted ? "outline" : "default"}
                            size="sm"
                            onClick={() => toggleTaskCompletion(task.id)}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Completed
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                Start Now
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6 mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ListTodo className="h-6 w-6 text-blue-600" />
                All Study Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {todayData.tasks.map((task) => {
                  const isCompleted = completedTasks.has(task.id);
                  
                  return (
                    <Card 
                      key={task.id} 
                      className={`transition-all duration-300 border-l-4 ${
                        isCompleted 
                          ? 'bg-green-50 border-l-green-500 opacity-75' 
                          : getPriorityColor(task.priority)
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-2 rounded-full bg-white shadow-sm mt-1">
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                getTaskIcon(task.type)
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className={`font-semibold text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                  {task.title}
                                </h4>
                                {task.priority === 'high' && !isCompleted && (
                                  <Badge variant="destructive" className="text-xs">
                                    High Priority
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {task.duration} min
                                </span>
                                <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                                  {task.difficulty}
                                </Badge>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                  {task.subject}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!isCompleted && (
                              <Button 
                                size="sm"
                                onClick={() => {
                                  console.log(`Starting ${task.type}: ${task.title}`);
                                }}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Start
                              </Button>
                            )}
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => toggleTaskCompletion(task.id)}
                            >
                              {isCompleted ? 'Undo' : 'Mark Complete'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-blue-800">Weekly Concepts</h3>
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{todayData.weeklyGoals.concepts.completed}/{todayData.weeklyGoals.concepts.target}</span>
                  </div>
                  <Progress 
                    value={(todayData.weeklyGoals.concepts.completed / todayData.weeklyGoals.concepts.target) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-blue-600">
                    {todayData.weeklyGoals.concepts.target - todayData.weeklyGoals.concepts.completed} more to go!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-purple-800">Weekly Flashcards</h3>
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{todayData.weeklyGoals.flashcards.completed}/{todayData.weeklyGoals.flashcards.target}</span>
                  </div>
                  <Progress 
                    value={(todayData.weeklyGoals.flashcards.completed / todayData.weeklyGoals.flashcards.target) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-purple-600">
                    {todayData.weeklyGoals.flashcards.target - todayData.weeklyGoals.flashcards.completed} more to go!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800">Weekly Exams</h3>
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{todayData.weeklyGoals.exams.completed}/{todayData.weeklyGoals.exams.target}</span>
                  </div>
                  <Progress 
                    value={(todayData.weeklyGoals.exams.completed / todayData.weeklyGoals.exams.target) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-green-600">
                    {todayData.weeklyGoals.exams.target - todayData.weeklyGoals.exams.completed} more to go!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Motivational Section */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-indigo-900">Keep Up The Great Work!</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-indigo-200">
                  <p className="text-sm font-medium text-gray-800 mb-1">This Week's Highlight</p>
                  <p className="text-xs text-gray-600">You're maintaining a {todayData.streak}-day study streak! Keep it up.</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-indigo-200">
                  <p className="text-sm font-medium text-gray-800 mb-1">Next Milestone</p>
                  <p className="text-xs text-gray-600">Complete 3 more concepts to reach your weekly goal!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompleteTodaysPlan;
