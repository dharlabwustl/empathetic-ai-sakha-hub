
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain,
  FileText,
  CheckCircle,
  Star,
  Zap,
  Trophy,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Enhanced data structure
  const todaysData = {
    overallProgress: 68,
    studyGoal: 4,
    timeSpent: 2.7,
    efficiency: 87,
    streak: 12,
    smartSuggestions: [
      { id: 1, title: "Focus on weak areas first", type: "priority", icon: "🎯" },
      { id: 2, title: "Take a 5-min break every 25 mins", type: "wellness", icon: "⏰" },
      { id: 3, title: "Review yesterday's mistakes", type: "revision", icon: "🔄" }
    ],
    subjects: [
      { 
        name: 'Physics', 
        progress: 75, 
        tasks: [
          { id: 1, title: "Thermodynamics - Heat Transfer", type: "concept", difficulty: "Medium", duration: 30, priority: "High", completed: false },
          { id: 2, title: "Newton's Laws Practice", type: "practice", difficulty: "Easy", duration: 25, priority: "Medium", completed: true }
        ],
        color: "blue"
      },
      { 
        name: 'Chemistry', 
        progress: 45, 
        tasks: [
          { id: 3, title: "Organic Chemistry Reactions", type: "concept", difficulty: "Hard", duration: 35, priority: "High", completed: false },
          { id: 4, title: "Chemical Bonds Quiz", type: "quiz", difficulty: "Medium", duration: 20, priority: "Low", completed: false }
        ],
        color: "green"
      },
      { 
        name: 'Biology', 
        progress: 80, 
        tasks: [
          { id: 5, title: "Cell Biology Concepts", type: "concept", difficulty: "Easy", duration: 20, priority: "Medium", completed: true },
          { id: 6, title: "Photosynthesis Flashcards", type: "flashcard", difficulty: "Easy", duration: 15, priority: "Low", completed: false }
        ],
        color: "purple"
      }
    ]
  };

  const handleTaskClick = (taskId: number, type: string) => {
    switch (type) {
      case 'concept':
        navigate(`/dashboard/student/concepts`);
        break;
      case 'flashcard':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice':
      case 'quiz':
        navigate('/dashboard/student/practice-exam');
        break;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice':
      case 'quiz': return <FileText className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getSubjectColor = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <SharedPageLayout
      title=""
      subtitle=""
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-8 ${isMobile ? 'px-0' : ''}`}>
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Good Morning, {userProfile?.name}! 🌟
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {today} • Let's make today count towards your exam success
          </p>
        </motion.div>

        {/* Daily Smart Suggestions - Moved below header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Sparkles className="h-5 w-5" />
                Daily Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {todaysData.smartSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <span className="text-xl">{suggestion.icon}</span>
                    <span className="font-medium text-amber-900">{suggestion.title}</span>
                    <Badge variant="outline" className="ml-auto bg-amber-100 text-amber-700 border-amber-300">
                      {suggestion.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{todaysData.overallProgress}%</div>
                <div className="text-sm text-blue-700">Progress</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{todaysData.timeSpent}h</div>
                <div className="text-sm text-green-700">Study Time</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{todaysData.efficiency}%</div>
                <div className="text-sm text-purple-700">Efficiency</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{todaysData.streak}</div>
                <div className="text-sm text-orange-700">Day Streak</div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Subject-wise Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          {todaysData.subjects.map((subject, index) => (
            <Card key={subject.name} className="overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${getSubjectColor(subject.color)} text-white`}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{subject.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {subject.progress}% Complete
                    </Badge>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2 bg-white/20" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {subject.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: taskIndex * 0.1 }}
                      className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                        task.completed ? 'bg-green-50' : ''
                      }`}
                      onClick={() => handleTaskClick(task.id, task.type)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            task.completed ? 'bg-green-100' : `bg-${subject.color}-100`
                          }`}>
                            {task.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              getTaskIcon(task.type)
                            )}
                          </div>
                          <div>
                            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{task.duration} min</span>
                              <Badge variant="outline" className="text-xs">
                                {task.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!task.completed && (
                            <Button size="sm" variant="outline" className="gap-1">
                              <Play className="h-3 w-3" />
                              Start
                            </Button>
                          )}
                          {task.completed && (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
