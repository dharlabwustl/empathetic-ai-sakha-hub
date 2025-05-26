
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Target, 
  Trophy, 
  BookOpen, 
  Brain, 
  FileText, 
  Zap, 
  CheckCircle2,
  Play,
  Star,
  TrendingUp,
  Award,
  Flame
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { useNavigate } from 'react-router-dom';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

const RedesignedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const mockTodayData = {
    userName: userProfile?.name || 'Student',
    streak: 7,
    completedTasks: 4,
    totalTasks: 12,
    progressPercentage: 33,
    totalStudyTime: 240, // minutes
    subjects: [
      {
        name: 'Physics',
        color: 'bg-blue-500',
        tasks: [
          { id: 'p1', title: 'Newton\'s Laws of Motion', type: 'concept', duration: 30, difficulty: 'Medium' },
          { id: 'p2', title: 'Force & Motion Flashcards', type: 'flashcard', duration: 15, cardCount: 25 },
          { id: 'p3', title: 'Mechanics Practice Test', type: 'exam', duration: 45, questions: 20 }
        ]
      },
      {
        name: 'Chemistry',
        color: 'bg-green-500',
        tasks: [
          { id: 'c1', title: 'Periodic Table Trends', type: 'concept', duration: 25, difficulty: 'Easy' },
          { id: 'c2', title: 'Chemical Bonding Quiz', type: 'exam', duration: 30, questions: 15 },
          { id: 'c3', title: 'Organic Chemistry Flashcards', type: 'flashcard', duration: 20, cardCount: 30 }
        ]
      },
      {
        name: 'Biology',
        color: 'bg-purple-500',
        tasks: [
          { id: 'b1', title: 'Cell Structure & Function', type: 'concept', duration: 35, difficulty: 'Hard' },
          { id: 'b2', title: 'Genetics Practice Problems', type: 'exam', duration: 40, questions: 18 },
          { id: 'b3', title: 'Human Physiology Review', type: 'flashcard', duration: 18, cardCount: 22 }
        ]
      }
    ]
  };

  const handleTaskComplete = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const handleTaskClick = (task: any) => {
    switch (task.type) {
      case 'concept':
        navigate('/dashboard/student/concepts');
        break;
      case 'flashcard':
        navigate('/dashboard/student/flashcards');
        break;
      case 'exam':
        navigate('/dashboard/student/practice-exam');
        break;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5" />;
      case 'flashcard': return <Brain className="h-5 w-5" />;
      case 'exam': return <FileText className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <SharedPageLayout
      title=""
      subtitle=""
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Study Plan - PREPZR</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <div className="space-y-8 p-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Good Morning, {mockTodayData.userName}! 🌟
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {today} • Let's crush your NEET preparation goals today!
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <span className="text-2xl font-bold text-blue-700">{mockTodayData.streak}</span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">Day Streak</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="text-2xl font-bold text-green-700">{completedTasks.size + mockTodayData.completedTasks}</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="h-6 w-6 text-purple-500" />
                    <span className="text-2xl font-bold text-purple-700">{mockTodayData.totalTasks}</span>
                  </div>
                  <p className="text-sm text-purple-600 font-medium">Total Tasks</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-6 w-6 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-700">{Math.floor(mockTodayData.totalStudyTime / 60)}h</span>
                  </div>
                  <p className="text-sm text-orange-600 font-medium">Study Time</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Section */}
            <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Today's Progress
                    </h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {mockTodayData.progressPercentage}% Complete
                    </Badge>
                  </div>
                  <Progress value={mockTodayData.progressPercentage} className="h-3" />
                  <p className="text-sm text-gray-600 text-center">
                    Great progress! Keep going to reach your daily goal 🎯
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject-wise Tasks */}
          <div className="space-y-8">
            {mockTodayData.subjects.map((subject, subjectIndex) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: subjectIndex * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur shadow-xl border-0">
                  <CardHeader className={`${subject.color} text-white rounded-t-lg`}>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-full">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      {subject.name}
                      <Badge variant="outline" className="ml-auto bg-white/20 text-white border-white/30">
                        {subject.tasks.length} Tasks
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4">
                      {subject.tasks.map((task, taskIndex) => {
                        const isCompleted = completedTasks.has(task.id);
                        
                        return (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: taskIndex * 0.1 }}
                          >
                            <Card 
                              className={`transition-all duration-300 border-l-4 cursor-pointer hover:shadow-lg ${
                                isCompleted 
                                  ? 'bg-green-50 border-l-green-500 shadow-green-100' 
                                  : 'bg-white border-l-gray-300 hover:border-l-blue-500'
                              }`}
                              onClick={() => handleTaskClick(task)}
                            >
                              <CardContent className="p-5">
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleTaskComplete(task.id);
                                    }}
                                    className={`transition-all duration-200 ${
                                      isCompleted 
                                        ? 'text-green-600 scale-110' 
                                        : 'text-gray-300 hover:text-blue-600 hover:scale-110'
                                    }`}
                                  >
                                    <CheckCircle2 className="h-7 w-7" />
                                  </button>

                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      {getTaskIcon(task.type)}
                                      <h4 className={`font-semibold text-lg ${
                                        isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
                                      }`}>
                                        {task.title}
                                      </h4>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 flex-wrap">
                                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                        {task.type.toUpperCase()}
                                      </Badge>
                                      {task.difficulty && (
                                        <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                                          {task.difficulty}
                                        </Badge>
                                      )}
                                      <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>{task.duration} min</span>
                                      </div>
                                      {task.cardCount && (
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                          <Brain className="h-4 w-4" />
                                          <span>{task.cardCount} cards</span>
                                        </div>
                                      )}
                                      {task.questions && (
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                          <Target className="h-4 w-4" />
                                          <span>{task.questions} questions</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {!isCompleted && (
                                    <Button 
                                      variant="outline" 
                                      size="lg"
                                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                    >
                                      <Play className="h-4 w-4 mr-2" />
                                      Start
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Smart Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Smart AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-700">Strong Performance</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      You're excelling in Physics concepts! Consider tackling advanced numerical problems.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-blue-700">Focus Area</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Chemistry needs attention. Spend 15 extra minutes on organic reactions today.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName={mockTodayData.userName}
        language="en-US"
      />
    </SharedPageLayout>
  );
};

export default RedesignedTodaysPlan;
