
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { UserProfileType, MoodType } from '@/types/user/base';
import { useKpiTracking } from '@/hooks/useKpiTracking';
import { useToast } from '@/hooks/use-toast';
import SidebarLayout from '@/components/dashboard/SidebarLayout';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType>('neutral');

  // Mock user profile
  const userProfile: UserProfileType = {
    id: '1',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    examGoal: 'NEET',
    targetDate: '2025-05-15',
    profileImage: '/placeholder.svg?height=100&width=100',
    preferences: {
      studyHoursPerDay: 6,
      preferredStudyTime: 'morning',
      learningPace: 'moderate'
    },
    goals: [
      { title: 'NEET', targetDate: '2025-05-15', progress: 45 }
    ],
    loginCount: 1
  };

  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(userProfile.id);

  const lastActivity = {
    type: 'study',
    description: 'Completed Physics Chapter 1'
  };

  const suggestedNextAction = 'Review Chemistry formulas';

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };

  const handleToggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  const handleToggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  return (
    <SidebarLayout>
      <DashboardLayout
        userProfile={userProfile}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={showWelcomeTour}
        onTabChange={handleTabChange}
        onViewStudyPlan={handleViewStudyPlan}
        onToggleSidebar={handleToggleSidebar}
        onToggleTabsNav={handleToggleTabsNav}
        onSkipTour={handleSkipTour}
        onCompleteTour={handleCompleteTour}
        showStudyPlan={showStudyPlan}
        onCloseStudyPlan={handleCloseStudyPlan}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
      />
    </SidebarLayout>
  );
};

export default StudentDashboard;
