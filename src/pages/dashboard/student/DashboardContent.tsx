
import React from 'react';
import DashboardTabs from '@/components/dashboard/student/DashboardTabs';
import { generateTabContents } from '@/components/dashboard/student/TabContentManager';
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  }[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  hideTabsNav?: boolean;
}

const DashboardContent = ({
  activeTab,
  onTabChange,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  hideTabsNav = false
}: DashboardContentProps) => {
  
  const tabContents = generateTabContents({
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    features,
    showWelcomeTour,
    handleSkipTour,
    handleCompleteTour
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  return (
    <motion.div 
      className="lg:col-span-9 xl:col-span-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <DashboardTabs 
        activeTab={activeTab}
        onTabChange={onTabChange}
        tabContents={tabContents}
        hideTabsNav={hideTabsNav}
      />
    </motion.div>
  );
};

export default DashboardContent;
