
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';
import { UserRole } from '@/types/user';
import { KpiData, NudgeData } from '@/types/dashboard';

export const useStudentDashboard = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile(UserRole.Student);
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const currentTime = new Date();
  const [lastActivity, setLastActivity] = useState<{ type: string; description: string } | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  
  const kpis: KpiData[] = [
    { 
      id: 'k1', 
      title: 'Study Time', 
      value: '12h', 
      changePercent: 5,
      label: 'Hours',
      trend: 'up',
      unit: 'h',
      change: '+2h',
      icon: 'clock'
    },
    { 
      id: 'k2', 
      title: 'Questions Solved', 
      value: '245', 
      changePercent: 12,
      label: 'Questions',
      trend: 'up',
      unit: '',
      change: '+28',
      icon: 'check-circle'
    },
    { 
      id: 'k3', 
      title: 'Concepts Learned', 
      value: '32', 
      changePercent: 8,
      label: 'Concepts',
      trend: 'up',
      unit: '',
      change: '+3',
      icon: 'lightbulb'
    }
  ];
  
  const nudges: NudgeData[] = [
    { 
      id: 'n1', 
      title: 'Complete your profile', 
      read: false,
      type: 'info',
      message: 'Fill out your profile to get personalized recommendations',
      timestamp: new Date().toISOString()
    },
    { 
      id: 'n2', 
      title: 'Take practice test', 
      read: true,
      type: 'info',
      message: 'We recommend taking a practice test to assess your current knowledge',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ];
  
  const features = [
    { id: 'f1', title: 'Academic Advisor', icon: 'graduation-cap' },
    { id: 'f2', title: 'Practice Tests', icon: 'file-text' },
  ];

  useEffect(() => {
    if (userProfile && !userProfile.completedOnboarding) {
      setShowOnboarding(true);
    }
    
    setLastActivity({
      type: 'quiz',
      description: 'Completed Physics practice quiz 2 hours ago'
    });
    setSuggestedNextAction('Take a Chemistry practice quiz next');
  }, [userProfile]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
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
    lastActivity,
    suggestedNextAction,
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
