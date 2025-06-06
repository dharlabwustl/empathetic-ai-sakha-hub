
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
  TrendingUp, 
  Play,
  CheckCircle,
  Calendar,
  Lightbulb,
  Zap,
  Star
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
  userName?: string;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick,
  isMobile = false,
  userName = 'Student'
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!planData) return null;

  // Calculate overall stats
  const totalTasks = planData.concepts.length + planData.flashcards.length + planData.practiceExams.length;
  const completedTasks = [
    ...planData.concepts.filter(c => c.status === 'completed'),
    ...planData.flashcards.filter(f => f.status === 'completed'),
    ...planData.practiceExams.filter(p => p.status === 'completed')
  ].length;
  
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const StatCard = ({ title, value, icon, color = "blue" }: any) => (
    <Card className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200 hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${color}-500 rounded-full shadow-sm`}>
            {icon}
          </div>
          <div>
            <p className={`text-sm text-${color}-600 font-medium`}>{title}</p>
            <p className={`text-xl font-bold text-${color}-800`}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TaskCard = ({ task, type, onStart }: any) => {
    const isCompleted = task.status === 'completed';
    const typeConfig = {
      concept: { icon: <BookOpen className="h-5 w-5" />, color: 'blue' },
      flashcard: { icon: <Brain className="h-5 w-5" />, color: 'purple' },
      exam: { icon: <FileText className="h-5 w-5" />, color: 'green' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];

    return (
      <Card className={`transition-all hover:shadow-md border-2 ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:border-blue-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-${config.color}-100 text-${config.color}-600`}>
                {config.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.subject}</p>
              </div>
            </div>
            {isCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Button size="sm" onClick={() => onStart(task)}>
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.duration} min
            </span>
            {task.difficulty && (
              <Badge variant="outline" size="sm">{task.difficulty}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with User Greeting */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Good Morning, {userName}! 🌟
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your personalized study plan is ready. Let's make today count!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
              <Star className="h-3 w-3 mr-1" />
              Day {planData.streak} Streak
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span>Daily Progress</span>
            <span>{completedTasks}/{totalTasks} tasks completed ({progressPercentage}%)</span>
          </div>
          <Progress value={progressPercentage} className="h-4 bg-white/50" />
        </div>
      </div>

      {/* Smart Daily Suggestions - Now below header */}
      {planData.smartSuggestions && planData.smartSuggestions.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Lightbulb className="h-5 w-5" />
              Smart Daily Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {planData.smartSuggestions.slice(0, 4).map((suggestion) => (
                <div key={suggestion.id} className="p-3 bg-white rounded-lg border border-yellow-200 shadow-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{suggestion.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Time" 
          value={`${Math.floor(planData.timeAllocation.total / 60)}h ${planData.timeAllocation.total % 60}m`}
          icon={<Clock className="h-5 w-5 text-white" />}
          color="blue"
        />
        <StatCard 
          title="Concepts" 
          value={planData.concepts.length}
          icon={<BookOpen className="h-5 w-5 text-white" />}
          color="green"
        />
        <StatCard 
          title="Flashcards" 
          value={planData.flashcards.length}
          icon={<Brain className="h-5 w-5 text-white" />}
          color="purple"
        />
        <StatCard 
          title="Practice Tests" 
          value={planData.practiceExams.length}
          icon={<FileText className="h-5 w-5 text-white" />}
          color="orange"
        />
      </div>

      {/* Enhanced Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
          <TabsTrigger value="concepts" className="rounded-md">Concepts</TabsTrigger>
          <TabsTrigger value="flashcards" className="rounded-md">Flashcards</TabsTrigger>
          <TabsTrigger value="practice" className="rounded-md">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Time Allocation Overview */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Time Allocation Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-800">{planData.timeAllocation.concepts}m</p>
                  <p className="text-sm text-blue-600 font-medium">Concepts Study</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-800">{planData.timeAllocation.flashcards}m</p>
                  <p className="text-sm text-purple-600 font-medium">Flashcard Review</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-800">{planData.timeAllocation.practiceExams}m</p>
                  <p className="text-sm text-green-600 font-medium">Practice Tests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tomorrow's Preview */}
          {planData.tomorrowPreview && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  Tomorrow's Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-800">{planData.tomorrowPreview.totalTasks}</p>
                    <p className="text-sm text-gray-600 font-medium">Total Tasks</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-800">{planData.tomorrowPreview.concepts}</p>
                    <p className="text-sm text-blue-600 font-medium">Concepts</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-800">{planData.tomorrowPreview.flashcards}</p>
                    <p className="text-sm text-purple-600 font-medium">Flashcards</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-800">{planData.tomorrowPreview.practiceExams}</p>
                    <p className="text-sm text-green-600 font-medium">Practice</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planData.concepts.map((concept) => (
              <TaskCard 
                key={concept.id} 
                task={concept} 
                type="concept"
                onStart={onConceptClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planData.flashcards.map((flashcard) => (
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
            {planData.practiceExams.map((exam) => (
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

export default NewTodaysPlanView;
