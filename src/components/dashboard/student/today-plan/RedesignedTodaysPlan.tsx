
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Target, 
  Play,
  CheckCircle,
  Calendar,
  Lightbulb,
  Zap,
  Star,
  Trophy,
  Flame,
  Award,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TodaysPlanProps {
  userName?: string;
}

const RedesignedTodaysPlan: React.FC<TodaysPlanProps> = ({ 
  userName = 'Student'
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for today's plan
  const todayData = {
    streak: 7,
    totalTasks: 12,
    completedTasks: 4,
    timeAllocation: {
      concepts: 90,
      flashcards: 60,
      practiceExams: 45,
      total: 195
    },
    concepts: [
      {
        id: '1',
        title: 'Laws of Motion',
        subject: 'Physics',
        duration: 30,
        difficulty: 'Medium',
        priority: 'high' as const,
        status: 'pending' as const,
        dueTime: '10:00 AM'
      },
      {
        id: '2',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        duration: 25,
        difficulty: 'Hard',
        priority: 'high' as const,
        status: 'completed' as const,
        dueTime: '11:00 AM'
      },
      {
        id: '3',
        title: 'Cell Biology',
        subject: 'Biology',
        duration: 35,
        difficulty: 'Easy',
        priority: 'medium' as const,
        status: 'pending' as const,
        dueTime: '2:00 PM'
      }
    ],
    flashcards: [
      {
        id: '1',
        title: 'Physics Formulas',
        subject: 'Physics',
        duration: 20,
        cardCount: 25,
        priority: 'medium' as const,
        status: 'pending' as const,
        dueTime: '3:00 PM'
      },
      {
        id: '2',
        title: 'Chemistry Equations',
        subject: 'Chemistry',
        duration: 15,
        cardCount: 30,
        priority: 'low' as const,
        status: 'completed' as const,
        dueTime: '4:00 PM'
      }
    ],
    practiceExams: [
      {
        id: '4',
        title: 'Physics Mock Test',
        subject: 'Physics',
        duration: 60,
        questionCount: 30,
        priority: 'high' as const,
        status: 'pending' as const,
        dueTime: '5:00 PM'
      },
      {
        id: '6',
        title: 'Biology Quiz',
        subject: 'Biology',
        duration: 45,
        questionCount: 25,
        priority: 'medium' as const,
        status: 'completed' as const,
        dueTime: 'Yesterday'
      }
    ],
    smartSuggestions: [
      {
        id: 'sg1',
        title: 'Focus on Physics Today',
        description: 'Your Physics performance needs attention. Start with Laws of Motion.',
        priority: 'high' as const,
        action: 'Start Physics Concepts',
        estimatedTime: '30 min'
      },
      {
        id: 'sg2', 
        title: 'Quick Chemistry Review',
        description: 'Review organic reactions before starting new concepts.',
        priority: 'medium' as const,
        action: 'Review Flashcards',
        estimatedTime: '15 min'
      },
      {
        id: 'sg3',
        title: 'Practice Makes Perfect',
        description: 'Take a quick practice test to boost confidence.',
        priority: 'low' as const,
        action: 'Start Practice Test',
        estimatedTime: '45 min'
      }
    ]
  };

  const completedCount = todayData.completedTasks;
  const totalCount = todayData.totalTasks;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Dynamic badge system
  const getDailyBadge = () => {
    if (progressPercentage >= 100) return { text: 'Perfect Day!', color: 'from-yellow-400 to-orange-500', icon: <Trophy className="h-5 w-5" /> };
    if (progressPercentage >= 80) return { text: 'Champion', color: 'from-purple-500 to-pink-500', icon: <Award className="h-5 w-5" /> };
    if (progressPercentage >= 60) return { text: 'Star Performer', color: 'from-blue-500 to-indigo-500', icon: <Star className="h-5 w-5" /> };
    if (progressPercentage >= 40) return { text: 'On Track', color: 'from-green-500 to-emerald-500', icon: <Target className="h-5 w-5" /> };
    if (progressPercentage >= 20) return { text: 'Getting Started', color: 'from-orange-500 to-red-500', icon: <TrendingUp className="h-5 w-5" /> };
    return { text: 'Just Beginning', color: 'from-gray-500 to-gray-600', icon: <Play className="h-5 w-5" /> };
  };

  const dailyBadge = getDailyBadge();

  // Navigation handlers
  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const handleFlashcardClick = (flashcardId: string) => {
    navigate(`/dashboard/student/flashcards/${flashcardId}/interactive`);
  };

  const handlePracticeExamClick = (examId: string, status: string) => {
    if (status === 'completed') {
      navigate(`/dashboard/student/practice-exam/${examId}/review`);
    } else {
      navigate(`/dashboard/student/practice-exam/${examId}/start`);
    }
  };

  // Helper functions
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
      case 'high': return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'medium': return 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100';
      case 'low': return 'border-green-200 bg-green-50 hover:bg-green-100';
      default: return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'bg-blue-100 text-blue-700 border-blue-200',
      'Chemistry': 'bg-purple-100 text-purple-700 border-purple-200',
      'Biology': 'bg-green-100 text-green-700 border-green-200',
      'Mathematics': 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Get all tasks for filtering
  const getAllTasks = () => {
    return [
      ...todayData.concepts.map(c => ({ ...c, type: 'concept' })),
      ...todayData.flashcards.map(f => ({ ...f, type: 'flashcard' })),
      ...todayData.practiceExams.map(p => ({ ...p, type: 'exam' }))
    ];
  };

  const getFilteredTasks = () => {
    const allTasks = getAllTasks();
    switch (activeTab) {
      case 'today':
        return allTasks;
      case 'pending':
        return allTasks.filter(task => task.status === 'pending');
      case 'completed':
        return allTasks.filter(task => task.status === 'completed');
      default:
        return allTasks;
    }
  };

  const getTabCount = (tab: string) => {
    const allTasks = getAllTasks();
    switch (tab) {
      case 'all':
        return allTasks.length;
      case 'today':
        return allTasks.length;
      case 'pending':
        return allTasks.filter(task => task.status === 'pending').length;
      case 'completed':
        return allTasks.filter(task => task.status === 'completed').length;
      default:
        return 0;
    }
  };

  const renderTaskCard = (task: any) => {
    const isCompleted = task.status === 'completed';
    
    return (
      <motion.div
        key={`${task.type}-${task.id}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card 
          className={`relative overflow-hidden transition-all duration-300 cursor-pointer backdrop-blur-sm border-2 ${
            isCompleted
              ? 'bg-green-50/80 border-green-200 opacity-80' 
              : `hover:shadow-xl ${getPriorityColor(task.priority)} border-2`
          }`}
          onClick={() => {
            if (task.type === 'concept') handleConceptClick(task.id);
            else if (task.type === 'flashcard') handleFlashcardClick(task.id);
            else if (task.type === 'exam') handlePracticeExamClick(task.id, task.status);
          }}
        >
          {/* Priority indicator */}
          {task.priority === 'high' && !isCompleted && (
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-red-500"></div>
          )}
          
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-3 rounded-full ${
                  isCompleted ? 'bg-green-100' : 
                  task.type === 'concept' ? 'bg-blue-100' :
                  task.type === 'flashcard' ? 'bg-purple-100' : 'bg-green-100'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    getTaskIcon(task.type)
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={`font-semibold text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h4>
                    <Badge variant="outline" className={getSubjectColor(task.subject)}>
                      {task.subject}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {task.duration} min
                    </span>
                    {task.difficulty && (
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
                    )}
                    {task.priority === 'high' && !isCompleted && (
                      <Badge variant="destructive" className="text-xs">
                        High Priority
                      </Badge>
                    )}
                    {task.dueTime && (
                      <span className="text-xs text-gray-500">
                        Due: {task.dueTime}
                      </span>
                    )}
                  </div>
                  
                  {(task.cardCount || task.questionCount) && (
                    <div className="mt-2 text-xs text-gray-500">
                      {task.cardCount && `${task.cardCount} cards`}
                      {task.questionCount && `${task.questionCount} questions`}
                    </div>
                  )}
                </div>
              </div>
              
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (task.type === 'concept') handleConceptClick(task.id);
                    else if (task.type === 'flashcard') handleFlashcardClick(task.id);
                    else if (task.type === 'exam') handlePracticeExamClick(task.id, task.status);
                  }}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Premium Header with Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                  Good Morning, {userName}! 
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    🌟
                  </motion.div>
                </h1>
                <p className="text-xl text-gray-600">Ready to achieve greatness today?</p>
              </div>
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-r ${dailyBadge.color} text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg`}
                >
                  {dailyBadge.icon}
                  <span className="font-semibold">{dailyBadge.text}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg"
                >
                  <Flame className="h-5 w-5" />
                  <span className="font-semibold">{todayData.streak} Day Streak</span>
                </motion.div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              {[
                { label: 'Completed', value: completedCount, total: totalCount, color: 'from-green-500 to-emerald-500', icon: <CheckCircle className="h-6 w-6" /> },
                { label: 'Total Tasks', value: totalCount, color: 'from-blue-500 to-indigo-500', icon: <Target className="h-6 w-6" /> },
                { label: 'Study Time', value: `${Math.floor(todayData.timeAllocation.total / 60)}h ${todayData.timeAllocation.total % 60}m`, color: 'from-purple-500 to-pink-500', icon: <Clock className="h-6 w-6" /> },
                { label: 'Progress', value: `${progressPercentage}%`, color: 'from-orange-500 to-red-500', icon: <TrendingUp className="h-6 w-6" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center p-4 bg-gradient-to-br ${stat.color} text-white rounded-xl shadow-lg`}
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Daily Progress</span>
                <span>{completedCount}/{totalCount} tasks completed ({progressPercentage}%)</span>
              </div>
              <div className="relative">
                <Progress value={progressPercentage} className="h-4 bg-white/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Lightbulb className="h-6 w-6" />
                🤖 AI-Powered Daily Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {todayData.smartSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={
                              suggestion.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                              suggestion.priority === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-blue-50 text-blue-700 border-blue-200'
                            }
                          >
                            {suggestion.priority} priority
                          </Badge>
                          <span className="text-xs text-gray-500">{suggestion.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      {suggestion.action}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-2xl backdrop-blur-sm bg-white/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="h-6 w-6 text-blue-600" />
                Study Management Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100 p-2 rounded-xl">
                  {[
                    { value: 'all', label: 'All Tasks', icon: <Target className="h-4 w-4" /> },
                    { value: 'today', label: 'Today', icon: <Calendar className="h-4 w-4" /> },
                    { value: 'pending', label: 'Pending', icon: <RotateCcw className="h-4 w-4" /> },
                    { value: 'completed', label: 'Completed', icon: <CheckCircle className="h-4 w-4" /> }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      {tab.icon}
                      {tab.label} ({getTabCount(tab.value)})
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredTasks().map(renderTaskCard)}
                  </div>

                  {getFilteredTasks().length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {activeTab === 'completed' ? 'No completed tasks yet' : 'No tasks found'}
                      </h3>
                      <p className="text-gray-500">
                        {activeTab === 'completed' ? 'Start working on your tasks to see them here!' : 'All tasks completed! Great job! 🎉'}
                      </p>
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl"
        >
          <h3 className="text-xl font-bold mb-2">
            {progressPercentage >= 80 ? "You're crushing it today! 🚀" :
             progressPercentage >= 50 ? "Great progress! Keep it up! 💪" :
             progressPercentage >= 20 ? "You're getting there! Stay focused! ⭐" :
             "Every journey begins with a single step! 🌟"}
          </h3>
          <p className="text-blue-100">
            {progressPercentage < 100 
              ? `${100 - progressPercentage}% more to complete today's goals!`
              : "🎉 Amazing! You've completed all tasks for today!"}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedTodaysPlan;
