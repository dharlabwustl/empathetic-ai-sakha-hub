
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardContainer from '@/components/dashboard/student/DashboardContainer';
import { BookOpen, Calendar, Lightbulb, GraduationCap } from 'lucide-react';
import { ReactNode } from 'react';

export interface DashboardLayoutProps {
  userProfile: UserProfileType;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  showWelcomeTour: boolean;
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

const DashboardLayout = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  markNudgeAsRead,
  showWelcomeTour,
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
}: DashboardLayoutProps) => {
  // Default features array for student dashboard with all required properties
  const features = [
    {
      id: 'personalized-study',
      title: 'Personalized Study Plan',
      description: 'AI-generated study plan based on your learning habits',
      icon: <Calendar />,
      path: '/dashboard/student/study-plan',
      isPremium: false
    },
    {
      id: 'concept-cards',
      title: 'Interactive Concept Cards',
      description: 'Visual learning with concept mapping',
      icon: <BookOpen />,
      path: '/dashboard/student/concepts',
      isPremium: false
    },
    {
      id: 'practice-tests',
      title: 'Practice Tests',
      description: 'Exam-like questions to test your knowledge',
      icon: <GraduationCap />,
      path: '/dashboard/student/practice',
      isPremium: false
    },
    {
      id: 'revision-tools',
      title: 'Smart Revision Tools',
      description: 'Spaced repetition for better memory retention',
      icon: <Lightbulb />,
      path: '/dashboard/student/revision',
      isPremium: false
    }
  ];
  
  // Get current time
  const currentTime = new Date();
  
  return (
    <DashboardContainer
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
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={onCloseStudyPlan}
      lastActivity={lastActivity}
      suggestedNextAction={suggestedNextAction}
      currentMood={currentMood}
    />
  );
};

export default DashboardLayout;
