
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { motion } from "framer-motion";
import { generateTabContents } from './TabContentManager';
import MotivationCard from './MotivationCard';

export interface DashboardContainerProps {
  userProfile: UserProfileType;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  }[];
  showWelcomeTour: boolean;
  currentTime: Date;
  onTabChange: (tab: string) => void;
  onViewStudyPlan: () => void;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  showStudyPlan: boolean;
  onCloseStudyPlan: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: 'sad' | 'neutral' | 'happy' | 'motivated' | 'curious' | 'stressed' | 'tired';
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  currentTime,
  onTabChange,
  onViewStudyPlan,
  onToggleSidebar,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  showStudyPlan,
  onCloseStudyPlan,
  lastActivity,
  suggestedNextAction,
  currentMood
}) => {
  // Create tab content
  const tabContents = generateTabContents({
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    features,
    showWelcomeTour,
    handleSkipTour: onSkipTour,
    handleCompleteTour: onCompleteTour,
    lastActivity,
    suggestedNextAction
  });

  return (
    <div className="flex flex-col">
      {/* Main content */}
      <div className="p-4 md:p-6">
        {/* Content for selected tab */}
        <div className="space-y-6">
          {/* Mood card if mood is set */}
          {currentMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MotivationCard currentMood={currentMood} />
            </motion.div>
          )}

          {/* Tab content */}
          {tabContents[activeTab] || (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">Tab content not found</h3>
              <p className="text-muted-foreground">The selected tab does not exist or is under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
