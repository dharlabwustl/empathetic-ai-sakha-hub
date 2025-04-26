
import React from 'react';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { UserProfileType } from '@/types/user';
import { DashboardData, Subject, ConceptCard } from '@/types/student/dashboard';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { AlertCircle, BookOpen, Calendar, Check, Clock, FileText, Star, TrendingUp } from 'lucide-react';

// Import all the section components
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const { loading, dashboardData, refreshData } = useStudentDashboardData();

  // For smooth animations
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

  // Loading state
  if (loading || !dashboardData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
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
      {/* Header with Exam Goal */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
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
      </motion.div>

      {/* Study Stats Section (KPIs) */}
      <motion.div variants={itemVariants}>
        <StudyStatsSection subjects={dashboardData.subjects} conceptCards={dashboardData.conceptCards} />
      </motion.div>

      {/* Subject Breakdown Section */}
      <motion.div variants={itemVariants}>
        <SubjectBreakdownSection subjects={dashboardData.subjects} />
      </motion.div>

      {/* Study Plan Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-violet-600" />
                Personalized Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Daily Study Target</span>
                  <span className="text-lg font-medium">{dashboardData.studyPlan.dailyStudyTarget} hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Concepts Per Day</span>
                  <span className="text-lg font-medium">{dashboardData.studyPlan.conceptsPerDay}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Flashcards Per Day</span>
                  <span className="text-lg font-medium">{dashboardData.studyPlan.flashcardsPerDay}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Tests Per Week</span>
                  <span className="text-lg font-medium">{dashboardData.studyPlan.testsPerWeek}</span>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <Button variant="outline" size="sm" className="mr-2">
                  <FileText className="h-4 w-4 mr-1" /> View Full Plan
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" /> Adjust Time Targets
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Study Plan */}
        <motion.div variants={itemVariants}>
          <TodaysPlanSection studyPlan={dashboardData.studyPlan} />
        </motion.div>
      </div>

      {/* Progress Tracker Section */}
      <motion.div variants={itemVariants}>
        <ProgressTrackerSection progressTracker={dashboardData.progressTracker} />
      </motion.div>

      {/* Bottom Sections: Revision Loop and Upcoming Milestones */}
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
};

export default RedesignedDashboardOverview;
