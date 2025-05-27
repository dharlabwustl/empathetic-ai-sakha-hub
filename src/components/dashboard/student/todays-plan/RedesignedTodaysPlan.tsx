
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Brain, 
  FileText, 
  Target,
  TrendingUp,
  CheckCircle,
  Circle,
  Lightbulb,
  Timer,
  Award,
  ArrowRight
} from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface Task {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'quiz' | 'revision';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  completed: boolean;
  subject: string;
  priority: 'high' | 'medium' | 'low';
}

interface SmartSuggestion {
  id: string;
  type: 'concept' | 'flashcard' | 'practice-exam' | 'break' | 'bonus';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  estimatedTime?: number;
}

interface RedesignedTodaysPlanProps {
  userProfile?: any;
  currentMood?: MoodType;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ 
  userProfile, 
  currentMood 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - in real app this would come from props/API
  const todaysStats = {
    totalTasks: 12,
    completedTasks: 5,
    totalTime: 240, // minutes
    completedTime: 95,
    streak: 7,
    efficiency: 85
  };

  const tasks: Task[] = [
    {
      id: '1',
      title: "Newton's Laws of Motion",
      type: 'concept',
      difficulty: 'medium',
      timeEstimate: 30,
      completed: true,
      subject: 'Physics',
      priority: 'high'
    },
    {
      id: '2',
      title: "Chemical Bonds Flashcards",
      type: 'flashcard',
      difficulty: 'easy',
      timeEstimate: 20,
      completed: true,
      subject: 'Chemistry',
      priority: 'medium'
    },
    {
      id: '3',
      title: "Algebra Practice Problems",
      type: 'quiz',
      difficulty: 'medium',
      timeEstimate: 25,
      completed: false,
      subject: 'Mathematics',
      priority: 'high'
    },
    {
      id: '4',
      title: "Cell Structure Revision",
      type: 'revision',
      difficulty: 'hard',
      timeEstimate: 45,
      completed: false,
      subject: 'Biology',
      priority: 'medium'
    }
  ];

  const smartSuggestions: SmartSuggestion[] = [
    {
      id: '1',
      type: 'concept',
      title: 'Focus on Weak Areas',
      description: 'Organic Chemistry concepts need attention',
      action: 'Study organic reactions for 30 minutes',
      priority: 'high',
      reason: 'Recent test scores show 60% accuracy in this area',
      estimatedTime: 30
    },
    {
      id: '2',
      type: 'break',
      title: 'Take a Break',
      description: 'You\'ve been studying for 2 hours straight',
      action: 'Take a 15-minute wellness break',
      priority: 'medium',
      reason: 'Prevent burnout and maintain focus',
      estimatedTime: 15
    }
  ];

  const timeAllocation = {
    concepts: 90,
    flashcards: 60,
    practiceExams: 75,
    revision: 45
  };

  const tomorrowPreview = {
    totalTasks: 8,
    focusArea: 'Physics - Thermodynamics',
    difficulty: 'Medium-Hard',
    concepts: 3,
    flashcards: 2,
    practiceExams: 3
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'quiz': return <FileText className="h-4 w-4" />;
      case 'revision': return <Target className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with User Name and Date */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Good morning, {userProfile?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        {currentMood && (
          <Badge variant="outline" className="capitalize">
            {currentMood.toLowerCase()} mood
          </Badge>
        )}
      </div>

      {/* Smart Suggestions Section - Moved below name header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Lightbulb className="h-5 w-5" />
            Smart Suggestions for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {smartSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-3 bg-white rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{suggestion.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                    <p className="text-xs text-purple-600 mt-1">{suggestion.reason}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasks</p>
                <p className="text-xl font-bold">{todaysStats.completedTasks}/{todaysStats.totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-xl font-bold">{Math.round(todaysStats.completedTime/60)}h {todaysStats.completedTime%60}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Streak</p>
                <p className="text-xl font-bold">{todaysStats.streak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="text-xl font-bold">{todaysStats.efficiency}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Today's Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round((todaysStats.completedTasks / todaysStats.totalTasks) * 100)}%</span>
                  </div>
                  <Progress value={(todaysStats.completedTasks / todaysStats.totalTasks) * 100} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Time Progress</span>
                    <span>{Math.round((todaysStats.completedTime / todaysStats.totalTime) * 100)}%</span>
                  </div>
                  <Progress value={(todaysStats.completedTime / todaysStats.totalTime) * 100} />
                </div>
              </CardContent>
            </Card>

            {/* Time Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Time Allocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(timeAllocation).map(([type, time]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="capitalize text-sm">{type}</span>
                    <span className="font-medium">{time}m</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className={`border-l-4 ${getPriorityColor(task.priority)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                      <div className="flex items-center gap-2">
                        {getTaskIcon(task.type)}
                        <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                        {task.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Timer className="h-3 w-3" />
                        {task.timeEstimate}m
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {task.subject} • Priority: {task.priority}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Progress Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Subject-wise Progress</h4>
                  <div className="space-y-3">
                    {['Physics', 'Chemistry', 'Biology'].map((subject) => (
                      <div key={subject}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{subject}</span>
                          <span>{Math.floor(Math.random() * 30) + 60}%</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 30) + 60} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Activity Types</h4>
                  <div className="space-y-3">
                    {Object.entries(timeAllocation).map(([type, time]) => (
                      <div key={type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{type}</span>
                          <span>{Math.round((time / todaysStats.totalTime) * 100)}%</span>
                        </div>
                        <Progress value={(time / todaysStats.totalTime) * 100} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tomorrow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tomorrow's Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Overview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Tasks:</span>
                      <span className="font-medium">{tomorrowPreview.totalTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Focus Area:</span>
                      <span className="font-medium">{tomorrowPreview.focusArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <Badge variant="outline">{tomorrowPreview.difficulty}</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Task Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Concepts:</span>
                      <span className="font-medium">{tomorrowPreview.concepts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flashcards:</span>
                      <span className="font-medium">{tomorrowPreview.flashcards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Practice Exams:</span>
                      <span className="font-medium">{tomorrowPreview.practiceExams}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">
                <ArrowRight className="mr-2 h-4 w-4" />
                Prepare for Tomorrow
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedesignedTodaysPlan;
