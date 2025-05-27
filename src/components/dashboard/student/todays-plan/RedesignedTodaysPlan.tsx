
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
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
  Trophy,
  Zap,
  Timer,
  TrendingUp
} from 'lucide-react';

interface TodaysPlanProps {
  userName?: string;
}

const RedesignedTodaysPlan: React.FC<TodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const [completedTasks, setCompletedTasks] = useState(new Set<string>());
  const [activeTab, setActiveTab] = useState('today');

  // Mock data for today's plan
  const todayData = {
    streak: 7,
    points: 1250,
    level: 8,
    totalTasks: 12,
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
        points: 150,
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
        points: 120,
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
        points: 200,
        status: 'completed'
      },
      {
        id: '4',
        type: 'concept',
        title: 'Thermodynamics',
        subject: 'Physics',
        duration: 35,
        difficulty: 'Hard',
        priority: 'medium' as const,
        points: 180,
        status: 'upcoming'
      }
    ],
    smartSuggestions: [
      {
        id: 'sg1',
        title: 'Focus on Physics Today',
        description: 'Your Physics performance needs attention. Start with Laws of Motion.',
        type: 'priority',
        icon: <Target className="h-4 w-4" />
      },
      {
        id: 'sg2', 
        title: 'Quick Chemistry Review',
        description: 'Review organic reactions before starting new concepts.',
        type: 'review',
        icon: <Brain className="h-4 w-4" />
      },
      {
        id: 'sg3',
        title: 'Take Breaks',
        description: 'Schedule 10-minute breaks between study sessions for better retention.',
        type: 'wellness',
        icon: <Clock className="h-4 w-4" />
      }
    ],
    achievements: [
      { id: 1, title: '7-Day Streak', description: 'Completed daily tasks for 7 consecutive days', earned: true },
      { id: 2, title: 'Chemistry Master', description: 'Scored 90%+ on 5 chemistry tests', earned: true },
      { id: 3, title: 'Early Bird', description: 'Started studying before 8 AM for 5 days', earned: false }
    ]
  };

  const getTasksByStatus = (status: string) => {
    return todayData.tasks.filter(task => task.status === status);
  };

  const completedCount = completedTasks.size + getTasksByStatus('completed').length;
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

  const renderTaskCard = (task: any, isCompleted = false) => (
    <Card 
      key={task.id} 
      className={`transition-all duration-300 cursor-pointer group ${
        isCompleted || completedTasks.has(task.id)
          ? 'bg-green-50 border-green-200 opacity-75' 
          : `hover:shadow-lg border-2 ${getPriorityColor(task.priority)} hover:scale-[1.02]`
      }`}
      onClick={() => !isCompleted && toggleTaskCompletion(task.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">
              {isCompleted || completedTasks.has(task.id) ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                getTaskIcon(task.type)
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className={`font-semibold ${isCompleted || completedTasks.has(task.id) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h4>
                <Badge variant="outline" className="text-xs">
                  {task.subject}
                </Badge>
                {task.points && (
                  <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                    +{task.points} pts
                  </Badge>
                )}
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
          
          {!isCompleted && !completedTasks.has(task.id) && (
            <Button 
              size="sm" 
              className="ml-4 group-hover:scale-105 transition-transform"
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Enhanced Header with Gamification */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, {userName}! 🌟</h1>
            <p className="text-blue-100 text-lg">Ready to level up your knowledge today?</p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-xl font-bold">{todayData.streak} Day Streak</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Level {todayData.level}
                </Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <span className="text-xl font-bold">{todayData.points} Points</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {Math.floor(todayData.timeAllocation.total / 60)}h {todayData.timeAllocation.total % 60}m planned
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Progress</span>
            <span>{completedCount}/{todayData.totalTasks} tasks ({progressPercentage}%)</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-white/20" />
        </div>
      </motion.div>

      {/* Smart Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Lightbulb className="h-6 w-6" />
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
                PREPZR AI Smart Recommendations
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {todayData.smartSuggestions.map((suggestion) => (
                <motion.div 
                  key={suggestion.id} 
                  className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white">
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Tasks with Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-6 w-6 text-blue-600" />
              Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-50">
                <TabsTrigger value="today" className="relative">
                  Today
                  <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                    {getTasksByStatus('today').length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="relative">
                  Upcoming  
                  <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-700">
                    {getTasksByStatus('upcoming').length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="relative">
                  Completed
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                    {getTasksByStatus('completed').length + completedTasks.size}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                <AnimatePresence>
                  {getTasksByStatus('today').map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderTaskCard(task)}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                <AnimatePresence>
                  {getTasksByStatus('upcoming').map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderTaskCard(task)}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <AnimatePresence>
                  {/* Originally completed tasks */}
                  {getTasksByStatus('completed').map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderTaskCard(task, true)}
                    </motion.div>
                  ))}
                  {/* Tasks completed in this session */}
                  {Array.from(completedTasks).map((taskId) => {
                    const task = todayData.tasks.find(t => t.id === taskId);
                    return task ? (
                      <motion.div
                        key={taskId}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderTaskCard(task, true)}
                      </motion.div>
                    ) : null;
                  })}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {todayData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Trophy className={`h-8 w-8 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <div>
                      <h4 className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RedesignedTodaysPlan;
