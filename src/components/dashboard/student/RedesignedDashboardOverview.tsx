
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserProfileType, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Brain, BookOpen, Trophy, Target, Clock, Zap, TrendingUp, Calendar, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import StudyStreakCard from './dashboard-sections/StudyStreakCard';
import TodayStudyPlan from './TodayStudyPlan';
import UpcomingTasks from './UpcomingTasks';
import QuickAccessButtons from './QuickAccessButtons';
import MoodLogButton from './mood-tracking/MoodLogButton';

// Mock data
const mockTasks = [
  {
    id: '1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    type: 'concept' as const,
    timeEstimate: 45,
    dueDate: 'Today',
    priority: 'high' as const
  },
  {
    id: '2', 
    title: 'Organic Chemistry Flashcards',
    subject: 'Chemistry',
    type: 'flashcard' as const,
    timeEstimate: 30,
    dueDate: 'Tomorrow',
    priority: 'medium' as const
  },
  {
    id: '3',
    title: 'Biology Practice Test',
    subject: 'Biology', 
    type: 'exam' as const,
    timeEstimate: 60,
    dueDate: 'In 2 days',
    priority: 'high' as const
  }
];

const mockTodayTasks = [
  {
    id: '1',
    title: 'Newton\'s Laws Review',
    time: '9:00 AM',
    type: 'concept' as const,
    completed: false
  },
  {
    id: '2',
    title: 'Chemistry Flashcards',
    time: '11:00 AM', 
    type: 'revision' as const,
    completed: false
  },
  {
    id: '3',
    title: 'Practice Test',
    time: '2:00 PM',
    type: 'exam' as const,
    completed: true
  }
];

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const isMobile = useIsMobile();
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    // Store mood in localStorage
    localStorage.setItem('currentMood', mood);
    
    // Apply mood theme to body
    const body = document.body;
    const moodClasses = [
      'mood-happy', 'mood-motivated', 'mood-focused', 'mood-neutral',
      'mood-tired', 'mood-anxious', 'mood-stressed', 'mood-sad'
    ];
    moodClasses.forEach(className => body.classList.remove(className));
    body.classList.add(`mood-${mood.toLowerCase()}`);
  };

  // Load saved mood on component mount
  React.useEffect(() => {
    const savedMood = localStorage.getItem('currentMood') as MoodType;
    if (savedMood) {
      setCurrentMood(savedMood);
      document.body.classList.add(`mood-${savedMood.toLowerCase()}`);
    }
  }, []);

  return (
    <div className="space-y-6 p-4 premium-dashboard">
      {/* Premium Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Welcome back, {userProfile.name || userProfile.firstName}!
              </h1>
              <p className="text-blue-100 mt-2">Ready to ace your exams today?</p>
            </div>
            <MoodLogButton 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Access Buttons */}
      <QuickAccessButtons />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Goal Card */}
          <ExamGoalCard currentMood={currentMood} onMoodChange={handleMoodChange} />
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Study Streak Card */}
            <StudyStreakCard />
            
            {/* Today's Progress */}
            <Card className="premium-card bg-gradient-to-br from-green-50/80 via-white to-emerald-100/60 dark:from-green-950/30 dark:via-gray-900 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/30 shadow-lg backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completed Tasks</span>
                    <span className="font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Great job! You're ahead of schedule.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Tasks */}
          <UpcomingTasks tasks={mockTasks} />
        </div>

        {/* Right Column - Today's Plan & Quick Stats */}
        <div className="space-y-6">
          {/* Today's Study Plan */}
          <TodayStudyPlan tasks={mockTodayTasks} />
          
          {/* Quick Stats */}
          <Card className="premium-card bg-gradient-to-br from-purple-50/80 via-white to-violet-100/60 dark:from-purple-950/30 dark:via-gray-900 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-800/30 shadow-lg backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Study Streak</span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                  12 days
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Concepts Mastered</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  45/60
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Practice Tests</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  8 completed
                </Badge>
              </div>
              <div className="pt-2 border-t">
                <Link to="/dashboard/student/analytics">
                  <Button variant="ghost" size="sm" className="w-full">
                    View Detailed Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
