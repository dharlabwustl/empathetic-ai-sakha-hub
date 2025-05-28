
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Target, 
  TrendingUp, 
  Clock, 
  Star,
  ChevronRight,
  Play,
  Calendar,
  BarChart3,
  Zap,
  Award,
  Timer,
  Users,
  MessageCircle,
  Bell,
  Settings,
  User,
  Heart,
  Activity,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import SurroundingInfluencesMeter from '../student/SurroundingInfluencesMeter';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const [selectedPriority, setSelectedPriority] = useState('high');

  // Mock data based on user profile
  const examGoal = userProfile?.goals?.[0]?.title || 'NEET';
  const examDate = userProfile?.goals?.[0]?.targetDate || '2024-05-01';
  const daysLeft = Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const priorityTasks = {
    high: [
      { id: 1, title: 'Complete Organic Chemistry Revision', subject: 'Chemistry', timeLeft: '2 days', progress: 75 },
      { id: 2, title: 'Solve Physics Mock Test', subject: 'Physics', timeLeft: '1 day', progress: 0 },
      { id: 3, title: 'Biology Chapter 12 Practice', subject: 'Biology', timeLeft: '3 days', progress: 40 }
    ],
    medium: [
      { id: 4, title: 'Mathematics Formula Revision', subject: 'Math', timeLeft: '5 days', progress: 60 },
      { id: 5, title: 'Previous Year Questions', subject: 'All', timeLeft: '1 week', progress: 30 }
    ],
    low: [
      { id: 6, title: 'General Reading', subject: 'General', timeLeft: 'No deadline', progress: 20 }
    ]
  };

  const quickActions = [
    { icon: BookOpen, label: 'Concepts', path: '/dashboard/student/concepts', color: 'bg-blue-500' },
    { icon: Brain, label: 'Flashcards', path: '/dashboard/student/flashcards', color: 'bg-purple-500' },
    { icon: FileText, label: 'Practice', path: '/dashboard/student/practice-exam', color: 'bg-green-500' },
    { icon: Calendar, label: 'Today\'s Plan', path: '/dashboard/student/today', color: 'bg-orange-500' }
  ];

  const studyStats = [
    { label: 'Study Hours', value: '127', change: '+12%', icon: Clock },
    { label: 'Concepts Mastered', value: '89', change: '+8%', icon: Brain },
    { label: 'Practice Tests', value: '24', change: '+15%', icon: FileText },
    { label: 'Study Streak', value: '15', change: '+2', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Fixed Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200/20 dark:border-slate-700/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {userProfile.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Welcome back, {userProfile.name}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {examGoal} • {daysLeft} days left
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/student/notifications')}>
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/student/profile')}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Section 1: User Overview & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Your {examGoal} Journey</h3>
                    <p className="text-blue-100">
                      {daysLeft} days until exam • Overall progress: 68%
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">68%</div>
                    <div className="text-sm text-blue-100">Ready</div>
                  </div>
                </div>
                <Progress value={68} className="mb-4 bg-white/20" />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Keep going! You're on track.</span>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => navigate('/dashboard/student/today')}
                  >
                    View Today's Plan <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => navigate(action.path)}
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 2: Priority Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Priority Zone</span>
                  </CardTitle>
                  <div className="flex space-x-1">
                    {['high', 'medium', 'low'].map((priority) => (
                      <Button
                        key={priority}
                        variant={selectedPriority === priority ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedPriority(priority)}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {priorityTasks[selectedPriority as keyof typeof priorityTasks].map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{task.subject}</Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{task.timeLeft}</span>
                        </div>
                        <Progress value={task.progress} className="mt-2 h-2" />
                      </div>
                      <Button size="sm" variant="ghost">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Study Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <stat.icon className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{stat.value}</div>
                      <div className="text-xs text-green-600">{stat.change}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 3: Smart Study Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/student/concepts')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Concepts</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">89 mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/student/flashcards')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Flashcards</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">156 cards</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/student/practice-exam')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Practice Tests</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">24 completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/student/academic')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Tutor</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Ask anything</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 4: Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Subject Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { subject: 'Physics', score: 78, change: '+5%', color: 'bg-blue-500' },
                  { subject: 'Chemistry', score: 85, change: '+8%', color: 'bg-green-500' },
                  { subject: 'Biology', score: 72, change: '+3%', color: 'bg-purple-500' },
                  { subject: 'Mathematics', score: 69, change: '+2%', color: 'bg-orange-500' }
                ].map((subject, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{subject.subject}</span>
                        <span className="text-sm text-green-600">{subject.change}</span>
                      </div>
                      <Progress value={subject.score} className="h-2" />
                    </div>
                    <span className="font-bold text-sm">{subject.score}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Chemistry Master', desc: 'Completed all organic chemistry concepts', icon: CheckCircle, color: 'text-green-500' },
                  { title: '15-Day Streak', desc: 'Consistent daily study progress', icon: Star, color: 'text-yellow-500' },
                  { title: 'Mock Test Champion', desc: 'Scored 95% in latest physics test', icon: Trophy, color: 'text-blue-500' }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                    <div>
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 5: Surrounding Influences Meter */}
        <div className="mb-6">
          <SurroundingInfluencesMeter />
        </div>

        {/* Section 6: Micro-Coach & Wellness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                <Heart className="h-5 w-5" />
                <span>Wellness Check</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Stress Level</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Low</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Energy Level</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Good</Badge>
                </div>
                <Button 
                  className="w-full mt-3" 
                  variant="outline"
                  onClick={() => navigate('/dashboard/student/feel-good-corner')}
                >
                  Visit Feel Good Corner
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Today's Focus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">Next Up</h4>
                  <p className="text-sm">Organic Chemistry Revision</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Timer className="h-4 w-4" />
                    <span className="text-sm">2 hours planned</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/dashboard/student/today')}
                >
                  Start Studying
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
