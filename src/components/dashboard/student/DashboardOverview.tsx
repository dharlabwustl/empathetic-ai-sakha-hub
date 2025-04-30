
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import KpiCard from '@/components/dashboard/KpiCard';
import FeatureHighlights from '@/components/dashboard/student/FeatureHighlights';
import RecommendedResources from '@/components/dashboard/student/RecommendedResources';
import UpcomingTasks from '@/components/dashboard/student/UpcomingTasks';
import StudyProgress from '@/components/dashboard/student/StudyProgress';
import SubjectPerformance from '@/components/dashboard/student/SubjectPerformance';
import MoodTracking from '@/components/dashboard/student/MoodTracking';
import { 
  Layout, Calendar, BookOpen, FileCheck, FileSearch, 
  ChevronRight, Lightbulb, Target, Clock
} from 'lucide-react';

interface DashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

export default function DashboardOverview({ 
  userProfile, 
  kpis 
}: DashboardOverviewProps) {
  const { loading, dashboardData, refreshData } = useStudentDashboardData();
  const navigate = useNavigate();

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
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <p className="text-muted-foreground">
              Your learning progress at a glance
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 sm:mt-0"
            onClick={refreshData}
          >
            Refresh Data
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <KpiCard 
              key={kpi.id} 
              title={kpi.title} 
              value={kpi.value}
              unit={kpi.unit}
              icon={kpi.icon} 
              change={kpi.change}
              changeType={kpi.changeType}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <StudyProgress progressData={dashboardData.progressData} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MoodTracking />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SubjectPerformance subjects={dashboardData.subjects} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <UpcomingTasks tasks={dashboardData.upcomingTasks} />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="p-5">
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Layout className="mr-2 h-5 w-5 text-primary" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => navigate('/dashboard/student/today')}>
              <Calendar className="h-6 w-6 mb-2" />
              <span>Today's Plan</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => navigate('/dashboard/student/concepts')}>
              <BookOpen className="h-6 w-6 mb-2" />
              <span>Concept Cards</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => navigate('/dashboard/student/flashcards')}>
              <FileCheck className="h-6 w-6 mb-2" />
              <span>Flashcards</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" onClick={() => navigate('/dashboard/student/practice-exam')}>
              <FileSearch className="h-6 w-6 mb-2" />
              <span>Practice Exams</span>
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <FeatureHighlights features={dashboardData.features} />
          </div>
          <div className="lg:col-span-4">
            <RecommendedResources resources={dashboardData.recommendedResources} />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50 border-violet-100 dark:border-violet-900/50">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center text-violet-600 dark:text-violet-300 mb-2">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  <h3 className="text-lg font-medium">AI-Generated Study Tip</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Based on your recent activity, focus on "Newton's Laws of Motion" before moving to advanced topics in Physics. This foundation will help you better understand upcoming concepts.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
                  <div className="flex items-center text-sm text-violet-600 dark:text-violet-300">
                    <Target className="h-4 w-4 mr-1" />
                    <span>Recommended Practice: Force & Motion Flashcards</span>
                  </div>
                  <div className="flex items-center text-sm text-violet-600 dark:text-violet-300">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Estimated time: 30 minutes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <Button variant="ghost" size="sm" className="text-violet-600 dark:text-violet-300">
                Start Practice
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
