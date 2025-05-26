import React from 'react';
import { motion } from 'framer-motion';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import WelcomeSection from './WelcomeSection';
import QuickStatsGrid from './QuickStatsGrid';
import StudyProgressSlider from './StudyProgressSlider';
import PendingTasksSlider from './PendingTasksSlider';
import UpcomingEventsSlider from './UpcomingEventsSlider';
import ExamReadinessSlider from './ExamReadinessSlider';
import ExamChampionSlider from './ExamChampionSlider';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import RecentActivityFeed from './RecentActivityFeed';
import SmartRecommendations from './SmartRecommendations';
import VibrantDashboardPreview from './VibrantDashboardPreview';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <WelcomeSection userProfile={userProfile} />
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div variants={itemVariants}>
        <QuickStatsGrid kpis={kpis} />
      </motion.div>

      {/* Dashboard Preview and Today's Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Dashboard Preview</h2>
          <VibrantDashboardPreview />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TodaysPlanSection userProfile={userProfile} />
        </motion.div>
      </div>

      {/* Sliders Section - Keep all existing sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <StudyProgressSlider />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <PendingTasksSlider />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <UpcomingEventsSlider />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ExamReadinessSlider />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <ExamChampionSlider />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <RecentActivityFeed />
        </motion.div>
      </div>

      {/* Smart Recommendations */}
      <motion.div variants={itemVariants}>
        <SmartRecommendations userProfile={userProfile} />
      </motion.div>
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
