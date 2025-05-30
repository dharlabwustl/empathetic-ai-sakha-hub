
import React from 'react';
import { motion } from 'framer-motion';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import ExamReadinessScore from './dashboard-sections/ExamReadinessScore';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 dark:from-gray-950/50 dark:via-gray-900 dark:to-blue-950/30 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Priority Banner */}
      <motion.div variants={itemVariants} className="w-full">
        <TodaysTopPrioritySection />
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Primary Cards */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Hero Row - Exam Goal & Readiness */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <ExamGoalCard />
            </div>
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <ExamReadinessScore />
            </div>
          </motion.div>

          {/* Study Plans & Progress Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
              <TodaysPlanSection />
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
              <ProgressTrackerSection />
            </div>
          </motion.div>

          {/* Subject Performance */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.005]">
            <SubjectBreakdownSection />
          </motion.div>

          {/* Revision Section */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.005]">
            <RevisionLoopSection />
          </motion.div>
        </div>

        {/* Right Column - Secondary Cards */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Study Stats */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <StudyStatsSection />
          </motion.div>

          {/* Smart Suggestions */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <SmartSuggestionsCenter />
          </motion.div>

          {/* Mood-Based Suggestions */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-xl border border-green-200/30 dark:border-green-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <MoodBasedSuggestions />
          </motion.div>

          {/* Upcoming Milestones */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-sm rounded-xl border border-amber-200/30 dark:border-amber-700/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <UpcomingMilestonesSection />
          </motion.div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <motion.div
        className="fixed bottom-6 right-6 z-30"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* This space is reserved for floating action buttons if needed */}
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
