
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Brain, 
  Zap, 
  BookOpen, 
  FlaskConical,
  Calculator,
  Calendar,
  TrendingUp,
  Star,
  Play,
  Pause,
  RotateCcw,
  Award,
  ChevronRight,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface ModernTodaysPlanProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const ModernTodaysPlan: React.FC<ModernTodaysPlanProps> = ({
  planData,
  onConceptClick,
  isMobile = false
}) => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => [...prev, taskId]);
  };

  const todayStats = {
    completed: planData?.completedTasks || 3,
    total: planData?.totalTasks || 7,
    timeSpent: 145,
    targetTime: 240,
    efficiency: 87,
    streak: planData?.streak || 4
  };

  const subjectData = [
    { name: 'Physics', tasks: 3, completed: 1, time: 75, color: 'bg-blue-500', icon: <Calculator className="h-4 w-4" /> },
    { name: 'Chemistry', tasks: 2, completed: 1, time: 45, color: 'bg-green-500', icon: <FlaskConical className="h-4 w-4" /> },
    { name: 'Biology', tasks: 2, completed: 1, time: 25, color: 'bg-purple-500', icon: <Brain className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Completed</p>
                  <p className="text-2xl font-bold text-green-700">{todayStats.completed}/{todayStats.total}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Study Time</p>
                  <p className="text-2xl font-bold text-blue-700">{Math.floor(todayStats.timeSpent / 60)}h {todayStats.timeSpent % 60}m</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Efficiency</p>
                  <p className="text-2xl font-bold text-purple-700">{todayStats.efficiency}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600">Streak</p>
                  <p className="text-2xl font-bold text-orange-700">{todayStats.streak} Days</p>
                </div>
                <Zap className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Today's Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span>Overall Progress</span>
              <span className="font-medium">{Math.round((todayStats.completed / todayStats.total) * 100)}%</span>
            </div>
            <Progress value={(todayStats.completed / todayStats.total) * 100} className="h-3" />
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {subjectData.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${subject.color} text-white`}>
                      {subject.icon}
                    </div>
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Tasks: {subject.completed}/{subject.tasks}</div>
                    <div>Time: {subject.time}m</div>
                  </div>
                  <Progress value={(subject.completed / subject.tasks) * 100} className="h-2 mt-2" />
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Task Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="concepts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="concepts" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Concepts
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Practice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="concepts" className="space-y-4 mt-6">
              {planData?.concepts.map((concept, index) => (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`transition-all duration-300 ${
                    completedTasks.includes(concept.id) ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            completedTasks.includes(concept.id) ? 'bg-green-500' : 'bg-blue-100'
                          }`}>
                            {completedTasks.includes(concept.id) ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <Brain className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{concept.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{concept.subject}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {concept.duration}m
                              </span>
                              <Badge variant="outline" size="sm">
                                {concept.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {activeTimer === concept.id ? (
                            <Button size="sm" variant="outline" onClick={() => setActiveTimer(null)}>
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => setActiveTimer(concept.id)}>
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            size="sm"
                            onClick={() => {
                              handleTaskComplete(concept.id);
                              onConceptClick(concept.id);
                            }}
                            disabled={completedTasks.includes(concept.id)}
                          >
                            {completedTasks.includes(concept.id) ? 'Completed' : 'Start'}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )) || []}
            </TabsContent>

            <TabsContent value="flashcards" className="space-y-4 mt-6">
              {planData?.flashcards.map((flashcard, index) => (
                <motion.div
                  key={flashcard.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-full">
                            <BookOpen className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{flashcard.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{flashcard.subject}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {flashcard.duration}m
                              </span>
                              <span>{flashcard.cardCount} cards</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">
                          Start Review
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )) || []}
            </TabsContent>

            <TabsContent value="practice" className="space-y-4 mt-6">
              {planData?.practiceExams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Target className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{exam.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{exam.subject}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {exam.duration}m
                              </span>
                              <span>{exam.questionCount} questions</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">
                          Take Test
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )) || []}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tomorrow's Preview */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            Tomorrow's Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">5</div>
              <div className="text-sm text-indigo-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">Mathematics</div>
              <div className="text-sm text-indigo-600">Focus Subject</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">3h 30m</div>
              <div className="text-sm text-indigo-600">Estimated Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Smart AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Great progress on Biology!</p>
                <p className="text-sm text-gray-600">You're 88% complete. Consider taking a practice test to reinforce your learning.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Physics needs attention</p>
                <p className="text-sm text-gray-600">Focus on numerical problems and practice more concept applications.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <Award className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Maintain your streak!</p>
                <p className="text-sm text-gray-600">You're on a 4-day study streak. Keep it up to build strong study habits.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernTodaysPlan;
