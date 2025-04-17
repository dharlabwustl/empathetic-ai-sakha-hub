
import React, { ReactNode } from 'react';
import { UserProfileType } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { MoodType } from '@/types/user/base';
import { generateTabContents } from '@/components/dashboard/student/TabContentManager';

export interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents?: Record<string, ReactNode>;
}

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features?: any[];
  showWelcomeTour?: boolean;
  handleSkipTour?: () => void;
  handleCompleteTour?: () => void;
  hideTabsNav?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: MoodType;
}

export default function DashboardContent({
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
  hideTabsNav,
  lastActivity,
  suggestedNextAction,
  currentMood
}: DashboardContentProps) {
  const tabContents = generateTabContents({
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    features,
    showWelcomeTour,
    handleSkipTour,
    handleCompleteTour,
    lastActivity,
    suggestedNextAction,
    currentMood
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
      {tabContents[activeTab] || <div>Tab content not found</div>}
    </div>
  );
}
