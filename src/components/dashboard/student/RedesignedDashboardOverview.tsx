import React from 'react';
import { motion } from 'framer-motion';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamReadinessScore from './dashboard-sections/ExamReadinessScore';
import StudyProgress from './StudyProgress';
import PerformanceChart from './dashboard-sections/PerformanceChart';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import RecentActivitySection from './dashboard-sections/RecentActivitySection';
import QuickActionsSection from './dashboard-sections/QuickActionsSection';
import SmartSuggestionsSection from './dashboard-sections/SmartSuggestionsSection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ userProfile, kpis }) => {
  const currentTime = new Date();

  return (
    <div className="space-y-6">
      {/* Smart Suggestions Section moved here */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SmartSuggestionsSection />
      </motion.div>

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Readiness Score with corrected props */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ExamReadinessScore 
              score={85}
              targetExam="JEE Main"
              daysRemaining={45}
              trend="up"
              recommendations={[
                "Focus on Physics problem solving",
                "Increase daily practice time",
                "Review weak topics in Mathematics"
              ]}
            />
          </motion.div>

          {/* Study Progress with corrected props */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StudyProgress 
              subjectProgress={[
                { id: '1', subject: 'Physics', progress: 75, total: 100 },
                { id: '2', subject: 'Chemistry', progress: 60, total: 100 },
                { id: '3', subject: 'Mathematics', progress: 85, total: 100 },
                { id: '4', subject: 'Biology', progress: 70, total: 100 }
              ]}
            />
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PerformanceChart />
          </motion.div>
        </div>

        {/* Right Column - Secondary widgets */}
        <div className="space-y-6">
          {/* Today's Plan Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TodaysPlanSection />
          </motion.div>

          {/* Upcoming Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <UpcomingMilestonesSection />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RecentActivitySection />
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <QuickActionsSection />
      </motion.div>
    </div>
  );
};

export default RedesignedDashboardOverview;
