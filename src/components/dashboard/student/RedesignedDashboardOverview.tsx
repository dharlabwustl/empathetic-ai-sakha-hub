import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { UserProfileBase as UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, CalendarDays, GraduationCap, BookOpen,
  Brain, FileText, Bell, TrendingUp, Book
} from 'lucide-react';

import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import { MoodType } from '@/types/user/base';
import ExamReadinessMeter from './metrics/ExamReadinessMeter';
import DailyMoodTracker from './mood-tracking/DailyMoodTracker';
import KpiCard from '@/components/dashboard/KpiCard';
import QuickAccess from './QuickAccess';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview = ({ userProfile, kpis }: RedesignedDashboardOverviewProps) => {
  const { loading, dashboardData, refreshData } = useStudentDashboardData();
  const [currentMood, setCurrentMood] = useState<MoodType>();
  const navigate = useNavigate();

  const navigationTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/dashboard/student/overview" },
    { id: "today", label: "Today's Plan", icon: CalendarDays, path: "/dashboard/student/today" },
    { id: "academic", label: "Academic Advisor", icon: GraduationCap, path: "/dashboard/student/academic" },
    { id: "concepts", label: "Concept Cards", icon: BookOpen, path: "/dashboard/student/concepts" },
    { id: "flashcards", label: "Flashcards", icon: Brain, path: "/dashboard/student/flashcards" },
    { id: "practice", label: "Practice Exams", icon: FileText, path: "/dashboard/student/practice-exam" },
    { id: "notifications", label: "Notifications", icon: Bell, path: "/dashboard/student/notifications" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };

  // Mock readiness data - in a real app, this would come from props or an API
  const readinessData = {
    conceptCompletion: 75,
    flashcardAccuracy: 82,
    examScores: {
      physics: 78,
      chemistry: 85,
      mathematics: 80
    },
    overallReadiness: 78,
    timestamp: new Date().toISOString()
  };

  if (loading || !dashboardData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section with Welcome Message */}
      <motion.div
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {userProfile.name}!
          </h1>
          <p className="text-violet-100">
            Let's continue your learning journey today
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <Book className="w-full h-full" />
        </div>
      </motion.div>

      {/* KPIs Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            variants={itemVariants}
            custom={index}
          >
            <KpiCard kpi={kpi} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Progress Section */}
        <motion.div className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full bg-gradient-to-br from-white to-violet-50 dark:from-gray-900 dark:to-violet-900/20">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <StudyStatsSection 
                subjects={dashboardData.subjects} 
                conceptCards={dashboardData.conceptCards}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <QuickAccess />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Study Dashboard</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground mr-2">Exam Goal:</span>
              <span className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-0.5 rounded-full text-sm">
                {dashboardData.examGoal}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Exam Readiness Meter - Added as requested */}
      <motion.div variants={itemVariants}>
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Exam Readiness Meter</h3>
              <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/progress')}>
                View Details
              </Button>
            </div>
            <ExamReadinessMeter readinessData={readinessData} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <DailyMoodTracker currentMood={currentMood as any} onMoodChange={handleMoodSelect} />
        <SmartSuggestionsCenter 
          performance={{
            accuracy: 85,
            quizScores: 90,
            conceptProgress: 75,
            streak: 7
          }}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Brain className="h-5 w-5 text-violet-600 mr-2" />
                <h3 className="text-lg font-medium">AI Personalized Study Plan</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your profile and learning goals, we've created a personalized study plan to help you succeed.
                </p>
                
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800/50">
                  <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Your Learning Profile</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Learning Style: <strong>Visual-Kinesthetic</strong></span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Best Study Time: <strong>Morning to Afternoon</strong></span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Focus Duration: <strong>30-45 minute sessions</strong></span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Recommended Break: <strong>10 minute breaks</strong></span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600" 
                  onClick={() => navigate('/dashboard/student/study-plan')}
                >
                  View Complete Study Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TodaysPlanSection studyPlan={dashboardData.studyPlan} currentMood={currentMood as any} />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <SubjectBreakdownSection subjects={dashboardData.subjects} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ProgressTrackerSection progressTracker={dashboardData.progressTracker} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <RevisionLoopSection revisionStats={dashboardData.revisionStats} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <UpcomingMilestonesSection milestones={dashboardData.upcomingMilestones} />
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
