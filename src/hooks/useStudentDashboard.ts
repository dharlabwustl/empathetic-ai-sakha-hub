
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';
import { UserRole } from '@/types/user';

export const useStudentDashboard = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile(UserRole.Student);
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const currentTime = new Date();
  
  const kpis = [
    { id: 'k1', title: 'Study Time', value: '12h', changePercent: 5 },
    { id: 'k2', title: 'Questions Solved', value: '245', changePercent: 12 },
    { id: 'k3', title: 'Concepts Learned', value: '32', changePercent: 8 },
  ];
  
  const nudges = [
    { id: 'n1', title: 'Complete your profile', read: false },
    { id: 'n2', title: 'Take practice test', read: true },
  ];
  
  const features = [
    { id: 'f1', title: 'Academic Advisor', icon: 'graduation-cap' },
    { id: 'f2', title: 'Practice Tests', icon: 'file-text' },
  ];

  useEffect(() => {
    // Check if user needs onboarding
    if (userProfile && !userProfile.completedOnboarding) {
      setShowOnboarding(true);
    }
  }, [userProfile]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    // Mark tour as completed in user profile
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    if (userProfile) {
      updateUserProfile({ completedOnboarding: true });
    }
  };

  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };

  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };

  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  const toggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };

  const markNudgeAsRead = (id: string) => {
    // In a real app, would update the nudge in the backend
  };

  return {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    features,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  };
};
