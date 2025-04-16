
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { motion } from "framer-motion";
import { MoodType } from "@/types/user";
import DashboardWrapper from '@/components/dashboard/student/DashboardWrapper';
import { generateTabContents } from './TabContentManager';
import MotivationCard from './MotivationCard';
import LogMoodButton from './LogMoodButton';
import StudyPlanModal from './StudyPlanModal';

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
  currentMood?: MoodType;
  onMoodSelect?: (mood: MoodType) => void;
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
  currentMood,
  onMoodSelect
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

  // Get user's streak
  const streak = userProfile?.stats?.studyStreak || 0;
  
  // Get user's primary goal
  const primaryGoal = userProfile?.goals?.[0]?.target || "";
  
  // Get progress
  const progress = userProfile?.goals?.[0]?.progress || 0;

  return (
    <div className="flex flex-col">
      {/* Dashboard Wrapper for layout */}
      <DashboardWrapper
        userProfile={userProfile}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        features={features}
        showWelcomeTour={showWelcomeTour}
        currentTime={currentTime}
        onTabChange={onTabChange}
        onViewStudyPlan={onViewStudyPlan}
        onToggleSidebar={onToggleSidebar}
        onToggleTabsNav={onToggleTabsNav}
        onSkipTour={onSkipTour}
        onCompleteTour={onCompleteTour}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        currentMood={currentMood}
        onMoodSelect={onMoodSelect}
      />

      {/* Mood-based card if mood is set */}
      {currentMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-6 pb-6"
        >
          <MotivationCard 
            currentMood={currentMood} 
            streak={streak}
            target={primaryGoal}
            progress={progress}
          />
        </motion.div>
      )}

      {/* Log Mood Dialog */}
      <LogMoodButton onMoodSelect={onMoodSelect} currentMood={currentMood} />

      {/* Study Plan Modal */}
      {showStudyPlan && (
        <StudyPlanModal 
          isOpen={showStudyPlan}
          onClose={onCloseStudyPlan} 
          user={userProfile}
        />
      )}
    </div>
  );
};

export default DashboardContainer;
