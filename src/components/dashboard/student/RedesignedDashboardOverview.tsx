import React, { useState } from 'react';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { UserProfileType } from '@/types/user';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { AlertCircle, BookOpen, Calendar, Check, Clock, FileText, TrendingUp } from 'lucide-react';

// Import all the section components
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import { MoodType } from '@/types/user/base';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

export default function RedesignedDashboardOverview({ userProfile, kpis }: RedesignedDashboardOverviewProps) {
  const { loading, dashboardData, refreshData } = useStudentDashboardData();
  const [currentMood, setCurrentMood] = useState<MoodType>();

  // Animation variants
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
    // In a real app, this would be persisted to backend
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
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Quick Action Navigation Bar */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        
      </motion.div>

      {/* Header with Exam Goal */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Study Dashboard</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground mr-2">Exam Goal:</span>
              <Badge variant="outline" className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                {dashboardData.examGoal}
              </Badge>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            className="mt-2 sm:mt-0"
            onClick={refreshData}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Refresh Stats
          </Button>
        </div>
      </motion.div>

      {/* Study Stats Section (KPIs) */}
      <motion.div variants={itemVariants}>
        <StudyStatsSection subjects={dashboardData.subjects} conceptCards={dashboardData.conceptCards} />
      </motion.div>

      {/* Mood-Based Suggestions */}
      <motion.div variants={itemVariants}>
        <MoodBasedSuggestions currentMood={currentMood} onMoodSelect={handleMoodSelect} />
      </motion.div>

      {/* Smart Suggestions */}
      <motion.div variants={itemVariants}>
        <SmartSuggestionsCenter 
          performance={{
            accuracy: 85,
            quizScores: 90,
            conceptProgress: 75,
            streak: 7
          }}
        />
      </motion.div>

      {/* Subject Breakdown */}
      <motion.div variants={itemVariants}>
        <SubjectBreakdownSection subjects={dashboardData.subjects} />
      </motion.div>

      {/* Study Plan and Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-violet-600" />
                Personalized Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TodaysPlanSection studyPlan={dashboardData.studyPlan} currentMood={currentMood} />
        </motion.div>
      </div>

      {/* Progress Tracker */}
      <motion.div variants={itemVariants}>
        <ProgressTrackerSection progressTracker={dashboardData.progressTracker} />
      </motion.div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <RevisionLoopSection revisionStats={dashboardData.revisionStats} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <UpcomingMilestonesSection milestones={dashboardData.upcomingMilestones} />
        </motion.div>
      </div>
    </motion.div>
  );
}
