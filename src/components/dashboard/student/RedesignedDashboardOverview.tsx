
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Brain,
  Trophy,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Timer,
  Award,
  BarChart3,
  Users,
  MessageCircle,
  PlayCircle,
  RefreshCw,
  Lightbulb,
  Heart,
  Music
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import MoodLogButton from '../mood-tracking/MoodLogButton';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from '../mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  // Enhanced exam data with more visual appeal
  const examData = {
    name: "NEET 2026",
    date: "May 5, 2026",
    daysLeft: 145,
    progress: 68,
    readinessScore: 75,
    subjects: [
      { name: "Physics", progress: 72, color: "blue", icon: Zap },
      { name: "Chemistry", progress: 65, color: "green", icon: Brain },
      { name: "Biology", progress: 71, color: "purple", icon: Heart }
    ]
  };

  // Enhanced today's plan with visual improvements
  const todaysPlan = [
    { 
      subject: "Physics", 
      task: "Newton's Laws", 
      time: "2 hrs", 
      progress: 60, 
      type: "concept",
      priority: "high",
      icon: Zap,
      color: "blue"
    },
    { 
      subject: "Chemistry", 
      task: "Organic Reactions", 
      time: "1.5 hrs", 
      progress: 30, 
      type: "practice",
      priority: "medium",
      icon: Brain,
      color: "green"
    },
    { 
      subject: "Biology", 
      task: "Cell Division", 
      time: "1 hr", 
      progress: 80, 
      type: "revision",
      priority: "low",
      icon: Heart,
      color: "purple"
    }
  ];

  // Enhanced stats with better visuals
  const stats = [
    { 
      title: "Study Streak", 
      value: "12", 
      unit: "days", 
      change: "+2", 
      icon: Trophy, 
      color: "amber",
      trend: "up"
    },
    { 
      title: "Time Today", 
      value: "4.2", 
      unit: "hrs", 
      change: "+0.5", 
      icon: Clock, 
      color: "blue",
      trend: "up"
    },
    { 
      title: "Concepts Mastered", 
      value: "156", 
      unit: "total", 
      change: "+8", 
      icon: Lightbulb, 
      color: "green",
      trend: "up"
    },
    { 
      title: "Practice Score", 
      value: "85", 
      unit: "%", 
      change: "+3", 
      icon: Target, 
      color: "purple",
      trend: "up"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return BookOpen;
      case 'practice': return Target;
      case 'revision': return RefreshCw;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10 min-h-screen">
      {/* Welcome Header with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile.name || userProfile.firstName}! 🚀
            </h1>
            <p className="text-blue-100 text-lg">Ready to conquer your NEET preparation today?</p>
          </div>
          <div className="flex items-center gap-4">
            <MoodLogButton 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
              size="default"
              className="bg-white/20 hover:bg-white/30 border-white/30"
            />
            <div className="text-right">
              <div className="text-2xl font-bold">{examData.daysLeft}</div>
              <div className="text-sm text-blue-100">days to NEET</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <Badge variant="outline" className={`text-xs ${stat.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                    <span className="text-sm text-gray-500">{stat.unit}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enhanced Exam Goal Card - Takes 2 columns */}
        <motion.div
          className="lg:col-span-2"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-purple-100/60 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/30 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Exam Goal: {examData.name}</div>
                    <div className="text-sm text-gray-600 font-normal flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {examData.date}
                    </div>
                  </div>
                </CardTitle>
                <div className="text-right">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-lg px-3 py-1">
                    {examData.daysLeft} days left
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">Exam Readiness: {examData.readinessScore}%</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 relative z-10">
              {/* Overall Progress */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Overall Progress</span>
                  <span className="font-bold text-blue-600">{examData.progress}%</span>
                </div>
                <div className="relative">
                  <Progress value={examData.progress} className="h-3 bg-gray-200" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" 
                       style={{ width: `${examData.progress}%` }} />
                </div>
              </div>

              {/* Subject Progress with enhanced visuals */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Subject Progress</h4>
                {examData.subjects.map((subject, index) => (
                  <div key={index} className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-${subject.color}-100 dark:bg-${subject.color}-900/30 rounded-lg`}>
                          <subject.icon className={`h-4 w-4 text-${subject.color}-600`} />
                        </div>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      <span className="font-bold text-sm">{subject.progress}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${subject.color}-400 to-${subject.color}-600 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Link to="/dashboard/student/flashcards/1/interactive">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Recall Practice
                  </Button>
                </Link>
                <Link to="/dashboard/student/practice-exam/2/start">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Trophy className="h-4 w-4 mr-2" />
                    Take Exam
                  </Button>
                </Link>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <Link to="/dashboard/student/academic">
                  <Button variant="ghost" className="w-full text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                    <Zap className="h-4 w-4 mr-2" />
                    Switch Exam & New Plan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Today's Plan Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full bg-gradient-to-br from-green-50/80 via-white to-emerald-100/60 dark:from-green-950/30 dark:via-gray-900 dark:to-emerald-900/20 border border-green-200/50 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                Today's Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysPlan.map((task, index) => {
                const TaskIcon = getTypeIcon(task.type);
                return (
                  <div key={index} className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-${task.color}-100 dark:bg-${task.color}-900/30 rounded-lg`}>
                          <task.icon className={`h-4 w-4 text-${task.color}-600`} />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{task.subject}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{task.task}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">{task.time}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span className="font-medium">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${task.color}-400 to-${task.color}-600 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <Link to="/dashboard/student/todays-plan">
                <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  View Full Plan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Quick Access & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Enhanced Feel Good Corner */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full bg-gradient-to-br from-pink-50/80 via-white to-rose-100/60 dark:from-pink-950/30 dark:via-gray-900 dark:to-rose-900/20 border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Feel Good Corner</h3>
              <p className="text-sm text-gray-600 mb-4">Take a break and boost your mood</p>
              <Link to="/dashboard/student/feel-good-corner">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white">
                  <Music className="h-4 w-4 mr-2" />
                  Relax Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Practice Exams */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full bg-gradient-to-br from-amber-50/80 via-white to-orange-100/60 dark:from-amber-950/30 dark:via-gray-900 dark:to-orange-900/20 border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Practice Exams</h3>
              <p className="text-sm text-gray-600 mb-4">Test your knowledge</p>
              <Link to="/dashboard/student/practice-exam">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Exam
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Study Groups */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Card className="h-full bg-gradient-to-br from-indigo-50/80 via-white to-blue-100/60 dark:from-indigo-950/30 dark:via-gray-900 dark:to-blue-900/20 border border-indigo-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Study Groups</h3>
              <p className="text-sm text-gray-600 mb-4">Collaborate with peers</p>
              <Link to="/dashboard/student/study-groups">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Group
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Analytics */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <Card className="h-full bg-gradient-to-br from-violet-50/80 via-white to-purple-100/60 dark:from-violet-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">Track your progress</p>
              <Link to="/dashboard/student/analytics">
                <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Stats
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
