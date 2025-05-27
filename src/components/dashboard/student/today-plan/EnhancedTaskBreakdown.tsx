
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  CheckCircle, 
  Target,
  Play,
  Calendar,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface EnhancedTaskBreakdownProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const EnhancedTaskBreakdown: React.FC<EnhancedTaskBreakdownProps> = ({
  planData,
  onConceptClick,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for demonstration
  const mockStats = {
    totalTasks: 12,
    completedTasks: 5,
    timeSpent: 145, // minutes
    timeGoal: 240, // minutes
    efficiency: 85,
    streak: 7
  };

  const mockTasks = {
    concepts: [
      {
        id: '1',
        title: 'Electromagnetic Induction',
        subject: 'Physics',
        difficulty: 'Medium',
        duration: 30,
        completed: false,
        priority: 'high'
      },
      {
        id: '2',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        difficulty: 'Hard',
        duration: 45,
        completed: true,
        priority: 'medium'
      }
    ],
    flashcards: [
      {
        id: '3',
        title: 'Human Anatomy',
        subject: 'Biology',
        cardCount: 25,
        duration: 20,
        completed: false,
        masteryLevel: 75
      },
      {
        id: '4',
        title: 'Physics Formulas',
        subject: 'Physics',
        cardCount: 18,
        duration: 15,
        completed: true,
        masteryLevel: 90
      }
    ],
    practice: [
      {
        id: '5',
        title: 'NEET Mock Test 1',
        questionCount: 50,
        duration: 90,
        completed: false,
        difficulty: 'Hard'
      }
    ]
  };

  const renderStatsCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{mockStats.completedTasks}/{mockStats.totalTasks}</div>
            <div className="text-xs text-blue-600">Tasks Done</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{Math.round(mockStats.timeSpent / 60)}h</div>
            <div className="text-xs text-green-600">Time Spent</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{mockStats.efficiency}%</div>
            <div className="text-xs text-purple-600">Efficiency</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{mockStats.streak}</div>
            <div className="text-xs text-orange-600">Day Streak</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderTaskCard = (task: any, type: string) => {
    const isCompleted = task.completed;
    const cardColor = isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : 'bg-white dark:bg-gray-800';
    
    return (
      <motion.div
        key={task.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <Card className={`${cardColor} hover:shadow-md transition-all duration-200 border-l-4 ${
          isCompleted ? 'border-l-green-500' : 
          type === 'concepts' ? 'border-l-blue-500' :
          type === 'flashcards' ? 'border-l-purple-500' : 'border-l-orange-500'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {type === 'concepts' && <BookOpen className="h-5 w-5 text-blue-500" />}
                {type === 'flashcards' && <Brain className="h-5 w-5 text-purple-500" />}
                {type === 'practice' && <FileText className="h-5 w-5 text-orange-500" />}
                
                <div>
                  <h3 className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {task.subject && (
                      <Badge variant="outline" className="text-xs">
                        {task.subject}
                      </Badge>
                    )}
                    {task.difficulty && (
                      <Badge variant="outline" className={`text-xs ${
                        task.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
                        task.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {task.difficulty}
                      </Badge>
                    )}
                    {task.priority && (
                      <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {task.priority}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Button size="sm" variant="outline" className="h-8">
                  <Play className="h-3 w-3 mr-1" />
                  Start
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{task.duration} min</span>
                </div>
                {task.cardCount && (
                  <span>{task.cardCount} cards</span>
                )}
                {task.questionCount && (
                  <span>{task.questionCount} questions</span>
                )}
              </div>
              
              {task.masteryLevel && (
                <div className="flex items-center gap-2">
                  <span className="text-xs">Mastery:</span>
                  <span className={`text-xs font-medium ${
                    task.masteryLevel >= 80 ? 'text-green-600' :
                    task.masteryLevel >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {task.masteryLevel}%
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {renderStatsCards()}

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Task Completion</span>
                <span>{Math.round((mockStats.completedTasks / mockStats.totalTasks) * 100)}%</span>
              </div>
              <Progress value={(mockStats.completedTasks / mockStats.totalTasks) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Time Progress</span>
                <span>{Math.round((mockStats.timeSpent / mockStats.timeGoal) * 100)}%</span>
              </div>
              <Progress value={(mockStats.timeSpent / mockStats.timeGoal) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="concepts">Concepts</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="all" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">All Today's Tasks</h3>
                  {mockTasks.concepts.map(task => renderTaskCard(task, 'concepts'))}
                  {mockTasks.flashcards.map(task => renderTaskCard(task, 'flashcards'))}
                  {mockTasks.practice.map(task => renderTaskCard(task, 'practice'))}
                </div>
              </TabsContent>

              <TabsContent value="concepts" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Concept Learning</h3>
                  {mockTasks.concepts.map(task => renderTaskCard(task, 'concepts'))}
                </div>
              </TabsContent>

              <TabsContent value="flashcards" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Flashcard Reviews</h3>
                  {mockTasks.flashcards.map(task => renderTaskCard(task, 'flashcards'))}
                </div>
              </TabsContent>

              <TabsContent value="practice" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Practice Tests</h3>
                  {mockTasks.practice.map(task => renderTaskCard(task, 'practice'))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTaskBreakdown;
