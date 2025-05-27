
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, FileText, CheckCircle, Clock, Star, Target, Zap, Trophy, Fire } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SmartSuggestionsSection from './SmartSuggestionsSection';

const EnhancedTodaysPlanView = () => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Mock data with gamification elements
  const todaysPlanData = {
    streak: 12,
    points: 2450,
    level: 7,
    badge: "Consistent Learner",
    totalTasks: 8,
    completedTasks: 3,
    concepts: [
      { id: 'newton-laws', title: "Newton's Laws of Motion", subject: 'Physics', topic: 'Mechanics', difficulty: 'Medium', duration: 30, status: 'completed', points: 50 },
      { id: 'chemical-bonds', title: 'Chemical Bonds', subject: 'Chemistry', topic: 'Bonding', difficulty: 'Easy', duration: 25, status: 'pending', points: 35 }
    ],
    flashcards: [
      { id: 'physics-formulas', title: 'Physics Formulas', subject: 'Physics', cardCount: 25, difficulty: 'Medium', duration: 15, status: 'completed', points: 30 },
      { id: 'chemistry-reactions', title: 'Chemical Reactions', subject: 'Chemistry', cardCount: 20, difficulty: 'Easy', duration: 12, status: 'pending', points: 25 }
    ],
    practiceExams: [
      { id: 'physics-quiz', title: 'Physics Quick Quiz', subject: 'Physics', questionCount: 15, difficulty: 'Medium', duration: 30, status: 'pending', points: 75 },
      { id: 'math-test', title: 'Math Practice Test', subject: 'Mathematics', questionCount: 20, difficulty: 'Hard', duration: 45, status: 'pending', points: 100 }
    ],
    backlogTasks: [
      { id: 'overdue-1', title: 'Thermodynamics Review', type: 'concept', overdueDays: 2 },
      { id: 'overdue-2', title: 'Algebra Flashcards', type: 'flashcard', overdueDays: 1 }
    ]
  };

  const completionRate = (todaysPlanData.completedTasks / todaysPlanData.totalTasks) * 100;
  
  const getAllTasks = () => [
    ...todaysPlanData.concepts.map(c => ({ ...c, type: 'concept' })),
    ...todaysPlanData.flashcards.map(f => ({ ...f, type: 'flashcard' })),
    ...todaysPlanData.practiceExams.map(e => ({ ...e, type: 'exam' }))
  ];

  const getTodayTasks = () => getAllTasks();
  const getPendingTasks = () => getAllTasks().filter(task => task.status === 'pending');
  const getCompletedTasks = () => getAllTasks().filter(task => task.status === 'completed');

  const handleActionClick = (action: string) => {
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
      default:
        break;
    }
  };

  const renderTaskCard = (task: any) => {
    const isCompleted = task.status === 'completed';
    const icons = {
      concept: <BookOpen className="h-5 w-5" />,
      flashcard: <Brain className="h-5 w-5" />,
      exam: <FileText className="h-5 w-5" />
    };

    const colors = {
      concept: 'border-l-blue-500 text-blue-600',
      flashcard: 'border-l-purple-500 text-purple-600',
      exam: 'border-l-green-500 text-green-600'
    };

    return (
      <Card 
        key={task.id} 
        className={`border-l-4 ${colors[task.type]} hover:shadow-lg transition-all duration-200 cursor-pointer ${
          isCompleted ? 'bg-green-50 opacity-75' : ''
        }`}
        onClick={() => setSelectedTask(task.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full bg-gray-100 ${colors[task.type]}`}>
                {icons[task.type]}
              </div>
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {task.points} pts
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{task.points}</span>
            </div>
          </div>
          
          <h3 className={`font-semibold text-lg mb-2 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">{task.subject}</span>
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
              </div>
              {!isCompleted && (
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Start Now
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Gamification Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-4 flex items-center gap-3">
            <Fire className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-90">Study Streak</p>
              <p className="text-2xl font-bold">{todaysPlanData.streak} days</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="p-4 flex items-center gap-3">
            <Star className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-90">Total Points</p>
              <p className="text-2xl font-bold">{todaysPlanData.points}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardContent className="p-4 flex items-center gap-3">
            <Target className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-90">Level</p>
              <p className="text-2xl font-bold">{todaysPlanData.level}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-4 flex items-center gap-3">
            <Trophy className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-90">Latest Badge</p>
              <p className="text-sm font-bold">{todaysPlanData.badge}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Today's Progress
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {todaysPlanData.completedTasks}/{todaysPlanData.totalTasks} tasks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Goal Progress</span>
              <span>{completionRate.toFixed(0)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions */}
      <SmartSuggestionsSection 
        planData={todaysPlanData}
        onActionClick={handleActionClick}
      />

      {/* Tasks Tabs */}
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="today" className="flex items-center gap-2">
            Today 
            <Badge variant="secondary" className="text-xs">{getTodayTasks().length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending
            <Badge variant="secondary" className="text-xs">{getPendingTasks().length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="text-xs">{getCompletedTasks().length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTodayTasks().map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getPendingTasks().map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getCompletedTasks().map(renderTaskCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTodaysPlanView;
