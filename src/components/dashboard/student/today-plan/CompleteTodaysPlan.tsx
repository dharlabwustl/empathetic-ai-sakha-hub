
import React, { useState, useEffect } from 'react';
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
  Lightbulb,
  Star,
  TrendingUp
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import ContentFeedback from '../feedback/ContentFeedback';

interface CompleteTodaysPlanProps {
  userName?: string;
}

const CompleteTodaysPlan: React.FC<CompleteTodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedTasks, setCompletedTasks] = useState(new Set<string>());

  // Mock data - replace with actual data fetching
  const mockPlanData: TodaysPlanData = {
    id: '1',
    date: new Date().toISOString(),
    streak: 7,
    completedTasks: 3,
    totalTasks: 8,
    timeAllocation: {
      concepts: 90,
      flashcards: 60,
      practiceExams: 45,
      revision: 30,
      total: 225
    },
    concepts: [
      {
        id: 'c1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        topic: 'Mechanics',
        duration: 30,
        status: 'pending',
        difficulty: 'Medium'
      },
      {
        id: 'c2',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        topic: 'Organic Chemistry',
        duration: 35,
        status: 'completed',
        difficulty: 'Hard'
      }
    ],
    flashcards: [
      {
        id: 'f1',
        title: 'Physics Formulas',
        subject: 'Physics',
        duration: 20,
        status: 'pending',
        cardCount: 25
      },
      {
        id: 'f2',
        title: 'Biology Terms',
        subject: 'Biology',
        duration: 15,
        status: 'completed',
        cardCount: 30
      }
    ],
    practiceExams: [
      {
        id: 'e1',
        title: 'Physics Mock Test',
        subject: 'Physics',
        duration: 45,
        status: 'pending',
        questionCount: 50
      }
    ],
    backlogTasks: [],
    smartSuggestions: [
      {
        id: 's1',
        type: 'concept',
        title: 'Focus on weak areas',
        description: 'Review thermodynamics concepts',
        action: 'Study Now',
        priority: 'high',
        reason: 'Low performance in recent tests'
      }
    ],
    userName
  };

  const progressPercentage = Math.round((mockPlanData.completedTasks / mockPlanData.totalTasks) * 100);

  const TaskCard = ({ task, type, onStart }: any) => {
    const isCompleted = task.status === 'completed';
    const typeConfig = {
      concept: { icon: <BookOpen className="h-5 w-5" />, color: 'blue', bgColor: 'bg-blue-50' },
      flashcard: { icon: <Brain className="h-5 w-5" />, color: 'purple', bgColor: 'bg-purple-50' },
      exam: { icon: <FileText className="h-5 w-5" />, color: 'green', bgColor: 'bg-green-50' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];

    return (
      <Card className={`transition-all hover:shadow-md border-2 ${
        isCompleted ? 'bg-green-50 border-green-200' : 'hover:border-blue-200'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-2 rounded-full ${config.bgColor} text-${config.color}-600`}>
                {config.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-gray-900 ${isCompleted ? 'line-through' : ''}`}>
                  {task.title}
                </h4>
                <p className="text-sm text-gray-600">{task.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ContentFeedback
                contentId={task.id}
                contentType={type}
                contentTitle={task.title}
              />
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Button size="sm" onClick={() => onStart(task)}>
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.duration} min
            </span>
            {task.difficulty && (
              <Badge variant="outline" className="text-xs">{task.difficulty}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Good Morning, {userName}! 🌟</h1>
            <p className="text-blue-100 text-lg">Ready to achieve your study goals today?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-6 w-6 text-yellow-300" />
              <span className="text-2xl font-bold">{mockPlanData.streak} Day Streak</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-3 py-1">
              {Math.floor(mockPlanData.timeAllocation.total / 60)}h {mockPlanData.timeAllocation.total % 60}m planned
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-yellow-300" />
              <div>
                <p className="text-sm text-blue-100">Daily Progress</p>
                <p className="text-2xl font-bold">{progressPercentage}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-300" />
              <div>
                <p className="text-sm text-blue-100">Tasks Completed</p>
                <p className="text-2xl font-bold">{mockPlanData.completedTasks}/{mockPlanData.totalTasks}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-300" />
              <div>
                <p className="text-sm text-blue-100">Study Time</p>
                <p className="text-2xl font-bold">{Math.floor(mockPlanData.timeAllocation.total / 60)}h {mockPlanData.timeAllocation.total % 60}m</p>
              </div>
            </div>
          </div>
        </div>

        <Progress value={progressPercentage} className="h-4 bg-white/20" />
      </div>

      {/* Smart Suggestions */}
      {mockPlanData.smartSuggestions && mockPlanData.smartSuggestions.length > 0 && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Lightbulb className="h-5 w-5" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPlanData.smartSuggestions.slice(0, 4).map((suggestion) => (
                <div key={suggestion.id} className="p-4 bg-white rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                      <p className="text-xs text-amber-600">{suggestion.reason}</p>
                    </div>
                    <Badge 
                      variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                      className="ml-2"
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg h-12">
          <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
          <TabsTrigger value="concepts" className="rounded-md">Concepts</TabsTrigger>
          <TabsTrigger value="flashcards" className="rounded-md">Flashcards</TabsTrigger>
          <TabsTrigger value="practice" className="rounded-md">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Time Allocation Overview */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Schedule Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-blue-800">{mockPlanData.timeAllocation.concepts}m</p>
                  <p className="text-sm text-blue-600 font-medium">Concepts Study</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <Brain className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-purple-800">{mockPlanData.timeAllocation.flashcards}m</p>
                  <p className="text-sm text-purple-600 font-medium">Flashcard Review</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                  <FileText className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-green-800">{mockPlanData.timeAllocation.practiceExams}m</p>
                  <p className="text-sm text-green-600 font-medium">Practice Tests</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <Clock className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-gray-800">{mockPlanData.timeAllocation.revision}m</p>
                  <p className="text-sm text-gray-600 font-medium">Revision</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPlanData.concepts.map((concept) => (
              <TaskCard 
                key={concept.id} 
                task={concept} 
                type="concept"
                onStart={() => console.log('Start concept:', concept.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPlanData.flashcards.map((flashcard) => (
              <TaskCard 
                key={flashcard.id} 
                task={flashcard} 
                type="flashcard"
                onStart={() => console.log('Start flashcard:', flashcard.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPlanData.practiceExams.map((exam) => (
              <TaskCard 
                key={exam.id} 
                task={exam} 
                type="exam"
                onStart={() => console.log('Start exam:', exam.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompleteTodaysPlan;
