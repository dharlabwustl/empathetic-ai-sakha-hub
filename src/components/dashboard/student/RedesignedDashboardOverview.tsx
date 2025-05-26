
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Brain, 
  FileText, 
  Target,
  TrendingUp,
  Trophy,
  Zap,
  Star,
  BarChart3,
  Users,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardOverviewProps {
  userProfile: any;
  kpis: any[];
}

const RedesignedDashboardOverview: React.FC<DashboardOverviewProps> = ({ userProfile, kpis }) => {
  const navigate = useNavigate();

  // Enhanced mock data for vibrant 3D dashboard
  const dashboardData = {
    todaysPlan: {
      progress: 68,
      tasksCompleted: 7,
      totalTasks: 12,
      studyTime: 180,
      targetTime: 240
    },
    studyProgress: {
      weeklyGoal: 85,
      currentProgress: 72,
      streak: 12,
      totalHours: 45.5
    },
    examReadiness: {
      overall: 78,
      physics: 82,
      chemistry: 70,
      biology: 85,
      mathematics: 74
    },
    examChampion: {
      rank: 156,
      totalStudents: 50000,
      badges: 8,
      achievements: ['Quick Learner', 'Consistent Student', 'Problem Solver']
    },
    upcomingEvents: [
      { title: 'Physics Mock Test', time: 'Tomorrow 10:00 AM', type: 'exam' as const },
      { title: 'Chemistry Revision', time: 'Today 3:00 PM', type: 'revision' as const },
      { title: 'Biology Lab Session', time: 'Friday 2:00 PM', type: 'task' as const }
    ],
    pendingTasks: [
      { id: 1, title: 'Thermodynamics Chapter', subject: 'Physics', type: 'concept' as const, priority: 'High' },
      { id: 2, title: 'Organic Reactions', subject: 'Chemistry', type: 'flashcard' as const, priority: 'Medium' },
      { id: 3, title: 'Mock Test - 3', subject: 'General', type: 'practice' as const, priority: 'High' }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Stats Cards - 3D Vibrant */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={cardVariants}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Today's Progress</p>
                  <p className="text-3xl font-bold">{dashboardData.todaysPlan.progress}%</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={dashboardData.todaysPlan.progress} className="h-2 bg-blue-400" />
                <p className="text-xs text-blue-100 mt-2">
                  {dashboardData.todaysPlan.tasksCompleted}/{dashboardData.todaysPlan.totalTasks} tasks completed
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Study Streak</p>
                  <p className="text-3xl font-bold">{dashboardData.studyProgress.streak} days</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <p className="text-xs text-green-100">Keep it up! 🔥</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Exam Readiness</p>
                  <p className="text-3xl font-bold">{dashboardData.examReadiness.overall}%</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={dashboardData.examReadiness.overall} className="h-2 bg-purple-400" />
                <p className="text-xs text-purple-100 mt-2">You're almost ready!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Champion Rank</p>
                  <p className="text-3xl font-bold">#{dashboardData.examChampion.rank}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-200" />
                  <p className="text-xs text-orange-100">Top 1% student</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Sliders */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Study Progress Slider */}
        <motion.div variants={cardVariants}>
          <Card className="h-full shadow-xl border-2 border-blue-100 hover:border-blue-200 transition-colors">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Study Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {dashboardData.studyProgress.currentProgress}%
                  </div>
                  <p className="text-gray-600">Weekly Goal Progress</p>
                  <Progress value={dashboardData.studyProgress.currentProgress} className="mt-3 h-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">{dashboardData.studyProgress.totalHours}h</div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">{dashboardData.studyProgress.streak}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => navigate('/dashboard/student/analytics')}
                >
                  View Detailed Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Tasks Slider */}
        <motion.div variants={cardVariants}>
          <Card className="h-full shadow-xl border-2 border-orange-100 hover:border-orange-200 transition-colors">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {dashboardData.pendingTasks.map((task, index) => (
                  <div key={task.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-full">
                          {task.type === 'concept' && <BookOpen className="h-4 w-4 text-orange-600" />}
                          {task.type === 'flashcard' && <Brain className="h-4 w-4 text-orange-600" />}
                          {task.type === 'practice' && <FileText className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.subject}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          task.priority === 'High' ? 'border-red-200 text-red-700 bg-red-50' : 
                          'border-yellow-200 text-yellow-700 bg-yellow-50'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                <Button 
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  onClick={() => navigate('/dashboard/student/today')}
                >
                  View Today's Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Sliders Row */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Events Slider */}
        <motion.div variants={cardVariants}>
          <Card className="h-full shadow-xl border-2 border-green-100 hover:border-green-200 transition-colors">
            <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {dashboardData.upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800">{event.title}</h4>
                    <p className="text-sm text-green-600">{event.time}</p>
                    <Badge variant="outline" className="mt-2 bg-green-100 text-green-700 border-green-300">
                      {event.type}
                    </Badge>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => navigate('/dashboard/student/calendar')}
                >
                  View Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exam Readiness Slider */}
        <motion.div variants={cardVariants}>
          <Card className="h-full shadow-xl border-2 border-purple-100 hover:border-purple-200 transition-colors">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-600" />
                Exam Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {dashboardData.examReadiness.overall}%
                  </div>
                  <p className="text-gray-600">Overall Readiness</p>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(dashboardData.examReadiness).filter(([key]) => key !== 'overall').map(([subject, score]) => (
                    <div key={subject} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{subject}</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                      <Progress value={score as number} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => navigate('/dashboard/student/exam-readiness')}
                >
                  Detailed Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exam Champion Slider */}
        <motion.div variants={cardVariants}>
          <Card className="h-full shadow-xl border-2 border-yellow-100 hover:border-yellow-200 transition-colors">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Exam Champion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    Rank #{dashboardData.examChampion.rank}
                  </div>
                  <p className="text-sm text-gray-600">
                    Out of {dashboardData.examChampion.totalStudents.toLocaleString()} students
                  </p>
                  <div className="flex justify-center mt-3">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      Top 1% Student
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Badges Earned</span>
                    <span className="font-medium">{dashboardData.examChampion.badges}</span>
                  </div>
                  
                  <div className="space-y-1">
                    {dashboardData.examChampion.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  onClick={() => navigate('/dashboard/student/leaderboard')}
                >
                  View Leaderboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
