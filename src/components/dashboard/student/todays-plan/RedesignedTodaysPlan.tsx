
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
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Flame,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RedesignedTodaysPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const todayStats = {
    totalTasks: 12,
    completedTasks: 8,
    totalTime: 240, // minutes
    spentTime: 160,
    streakDays: 15
  };

  const completionPercentage = Math.round((todayStats.completedTasks / todayStats.totalTasks) * 100);

  const tasks = [
    {
      id: '1',
      title: "Newton's Laws of Motion",
      type: 'concept',
      subject: 'Physics',
      duration: 30,
      difficulty: 'Medium',
      completed: true,
      link: '/dashboard/student/concepts'
    },
    {
      id: '2',
      title: "Chemical Bonding Flashcards",
      type: 'flashcard',
      subject: 'Chemistry', 
      duration: 20,
      difficulty: 'Easy',
      completed: true,
      link: '/dashboard/student/flashcards'
    },
    {
      id: '3',
      title: "Cell Division Practice Test",
      type: 'practice',
      subject: 'Biology',
      duration: 45,
      difficulty: 'Hard',
      completed: false,
      link: '/dashboard/student/practice-exam'
    },
    {
      id: '4',
      title: "Thermodynamics Concepts",
      type: 'concept',
      subject: 'Physics',
      duration: 35,
      difficulty: 'Hard',
      completed: false,
      link: '/dashboard/student/concepts'
    }
  ];

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'flashcard':
        return <Brain className="h-5 w-5 text-purple-500" />;
      case 'practice':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredTasks = activeTab === 'all' ? tasks : tasks.filter(task => task.type === activeTab);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Progress</p>
                <p className="text-xl font-bold text-blue-800">{completionPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Tasks Done</p>
                <p className="text-xl font-bold text-green-800">{todayStats.completedTasks}/{todayStats.totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Time Spent</p>
                <p className="text-xl font-bold text-purple-800">{Math.floor(todayStats.spentTime / 60)}h {todayStats.spentTime % 60}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600">Streak</p>
                <p className="text-xl font-bold text-orange-800">{todayStats.streakDays} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Today's Learning Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="concept">Concepts</TabsTrigger>
              <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className={`border-l-4 transition-all duration-200 hover:shadow-md ${
                      task.completed 
                        ? 'bg-green-50 border-l-green-500 opacity-75' 
                        : 'border-l-blue-500 hover:shadow-lg'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getTaskIcon(task.type)}
                          <div>
                            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600">{task.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                          </Badge>
                          {task.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{task.duration} min</span>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {task.type}
                          </Badge>
                        </div>
                        
                        <Link to={task.link}>
                          <Button size="sm" variant={task.completed ? "outline" : "default"}>
                            {task.completed ? "Review" : "Start"}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tomorrow's Preview */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-800">
            <TrendingUp className="h-5 w-5" />
            Tomorrow's Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Electromagnetic Induction</p>
                  <p className="text-sm text-gray-600">Physics • 40 min</p>
                </div>
              </div>
              <Badge variant="outline">Scheduled</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">Organic Chemistry Reactions</p>
                  <p className="text-sm text-gray-600">Chemistry • 25 min</p>
                </div>
              </div>
              <Badge variant="outline">Scheduled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Footer */}
      <Card className="sticky bottom-4 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Today's Overall Progress</span>
            <span className="text-sm text-gray-600">{completionPercentage}% Complete</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          <div className="mt-2 text-center text-sm text-gray-600">
            {completionPercentage >= 100 
              ? "🎉 Outstanding! You've completed all today's tasks!" 
              : `${todayStats.totalTasks - todayStats.completedTasks} tasks remaining`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedTodaysPlan;
