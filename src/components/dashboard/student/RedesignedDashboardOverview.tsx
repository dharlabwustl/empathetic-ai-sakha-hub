
import React, { useState } from 'react';
import { UserProfile } from '@/types/user/base';
import DashboardHeader from './dashboard-sections/DashboardHeader';
import QuickActionsSection from './dashboard-sections/QuickActionsSection';
import StudyProgressSection from './dashboard-sections/StudyProgressSection';
import PerformanceSection from './dashboard-sections/PerformanceSection';
import ExamCountdownSection from './dashboard-sections/ExamCountdownSection';
import NEETStrategyCard from './NEETStrategyCard';
import { motion } from 'framer-motion';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis: any;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [isStrategyCardHidden, setIsStrategyCardHidden] = useState(() => {
    return localStorage.getItem('neet_strategy_card_hidden') === 'true';
  });

  const toggleStrategyCardVisibility = () => {
    const newState = !isStrategyCardHidden;
    setIsStrategyCardHidden(newState);
    localStorage.setItem('neet_strategy_card_hidden', newState.toString());
  };

  return (
    <div className="space-y-6 p-6">
      <DashboardHeader userProfile={userProfile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QuickActionsSection />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StudyProgressSection kpis={kpis} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PerformanceSection />
          </motion.div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NEETStrategyCard 
              isHidden={isStrategyCardHidden}
              onToggleVisibility={toggleStrategyCardVisibility}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ExamCountdownSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
