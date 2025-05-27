
import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/types/user';
import { KPI } from '@/types/dashboard';
import PerformanceSection from './dashboard-sections/PerformanceSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import SurroundingInfluencesSection from './dashboard-sections/SurroundingInfluencesSection';
import { MoodType } from '@/types/user/base';
import SmartDailySuggestions from './dashboard-sections/SmartDailySuggestions';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis: KPI[];
  currentMood?: MoodType;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile.name || userProfile.firstName}! 🌟
            </h1>
            <p className="text-blue-100 text-lg">Ready to achieve your goals today?</p>
          </div>
          {currentMood && (
            <div className="text-right">
              <div className="text-sm text-blue-100 mb-1">Current Mood</div>
              <div className="text-xl font-semibold capitalize">{currentMood.toLowerCase()}</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Smart Daily Suggestions - Moved below header */}
      <motion.div variants={itemVariants}>
        <SmartDailySuggestions />
      </motion.div>

      {/* Performance Section */}
      <motion.div variants={itemVariants}>
        <PerformanceSection kpis={kpis} />
      </motion.div>

      {/* Today's Plan Section */}
      <motion.div variants={itemVariants}>
        <TodaysPlanSection currentMood={currentMood} />
      </motion.div>

      {/* Upcoming Milestones Section */}
      <motion.div variants={itemVariants}>
        <UpcomingMilestonesSection />
      </motion.div>

      {/* Surrounding Influences Section */}
      <motion.div variants={itemVariants}>
        <SurroundingInfluencesSection />
      </motion.div>
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
