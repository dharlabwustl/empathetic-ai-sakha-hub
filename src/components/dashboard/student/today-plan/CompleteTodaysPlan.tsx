
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
  Calendar,
  Lightbulb,
  Award,
  Zap,
  Trophy,
  TrendingUp
} from 'lucide-react';
import SmartDailySuggestions from '../SmartDailySuggestions';

interface TodaysPlanProps {
  userName?: string;
}

const CompleteTodaysPlan: React.FC<TodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const [activeTab, setActiveTab] = useState('today');
  const [completedTasks, setCompletedTasks] = useState(new Set<string>());

  // Mock data with gamification
  const todayData = {
    streak: 7,
    totalTasks: 12,
    level: 5,
    xp: 1250,
    xpToNext: 250,
    badges: ['Early Bird', 'Physics Master', 'Consistent Learner'],
    timeAllocation: {
      concepts: 90,
      flashcards: 60,
      practiceExams: 45,
      total: 195
    },
    tasks: [
      {
        id: '1',
        type: 'concept',
        title: 'Laws of Motion',
        subject: 'Physics',
        duration: 30,
        difficulty: 'Medium',
        priority: 'high' as const,
        xpReward: 50,
        status: 'today'
      },
      {
        id: '2',
        type: 'flashcard',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard',
        priority: 'high' as const,
        xpReward: 60,
        status: 'today'
      },
      {
        id: '3',
        type: 'exam',
        title: 'Biology Mock Test',
        subject: 'Biology',
        duration: 45,
        difficulty: 'Medium',
        priority: 'medium' as const,
        xpReward: 75,
        status: 'pending'
      },
      {
        id: '4',
        type: 'concept',
        title: 'Thermodynamics',
        subject: 'Physics',
        duration: 35,
        difficulty: 'Hard',
        priority: 'medium' as const,
        xpReward: 65,
        status: 'completed'
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
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getFilteredTasks = (status: string) => {
    if (status === 'today') {
      return todayData.tasks.filter(task => task.status === 'today');
    } else if (status === 'pending') {
      return todayData.tasks.filter(task => task.status === 'pending');
    } else if (status === 'completed') {
      return todayData.tasks.filter(task => task.status === 'completed');
    }
    return todayData.tasks;
  };

  const getStatusCount = (status: string) => {
    return getFilteredTasks(status).length;
  };

  const TaskCard = ({ task }: { task: typeof todayData.tasks[0] }) => {
    const isCompleted = completedTasks.has(task.id);
    
    return (
      <Card 
        className={`transition-all duration-300 cursor-pointer hover:shadow-lg ${
          isCompleted 
            ? 'bg-green-50 border-green-200 opacity-75' 
            : `border-2 ${getPriorityColor(task.priority)}`
        }`}
        onClick={() => toggleTaskCompletion(task.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">
                {isCompleted ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  getTaskIcon(task.type)
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {task.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                    +{task.xpReward} XP
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.duration} min
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      task.difficulty === 'Hard' ? 'border-red-300 text-red-700' :
                      task.difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                      'border-green-300 text-green-700'
                    }`}
                  >
                    {task.difficulty}
                  </Badge>
                  {task.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">
                      High Priority
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {!isCompleted && (
              <Button 
                size="sm" 
                className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Starting ${task.type}: ${task.title}`);
                }}
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Gamified Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, {userName}! 🌟</h1>
            <p className="text-blue-100 text-lg">Ready to conquer your study goals today?</p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-300" />
              <span className="text-xl font-bold">Level {todayData.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-lg">{todayData.streak} Day Streak</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{todayData.xp}</p>
            <p className="text-sm text-blue-100">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{todayData.xpToNext}</p>
            <p className="text-sm text-blue-100">XP to Next Level</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m</p>
            <p className="text-sm text-blue-100">Planned Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{todayData.badges.length}</p>
            <p className="text-sm text-blue-100">Badges Earned</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span>{completedCount}/{todayData.totalTasks} tasks ({progressPercentage}%)</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Smart Daily Suggestions */}
      <SmartDailySuggestions />

      {/* Enhanced Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-50 to-purple-50">
          <TabsTrigger value="today" className="flex items-center gap-2">
            Today <Badge variant="secondary" className="bg-red-100 text-red-700">{getStatusCount('today')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">{getStatusCount('pending')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed <Badge variant="secondary" className="bg-green-100 text-green-700">{getStatusCount('completed')}</Badge>
          </TabsTrigger>
        </TabsList>

        {['today', 'pending', 'completed'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Tasks
              </h2>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {getStatusCount(tabValue)} tasks
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {getFilteredTasks(tabValue).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {todayData.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-800 border-yellow-300 px-4 py-2">
                <Trophy className="h-4 w-4 mr-1" />
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteTodaysPlan;
