
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from './useUserProfile';
import { UserProfileType, UserRole } from '@/types/user/base';
import { v4 as uuidv4 } from 'uuid';

interface KpiData {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  since?: string;
}

interface Nudge {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  actionLabel?: string;
  actionUrl?: string;
  isRead: boolean;
  timestamp: Date;
}

export const useStudentDashboard = () => {
  // Get user profile data
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  
  // Local state
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  
  // KPIs
  const [kpis, setKpis] = useState<KpiData[]>([
    {
      id: uuidv4(),
      label: 'Study Hours',
      value: '12',
      change: '+2.5',
      trend: 'up',
      since: 'last week'
    },
    {
      id: uuidv4(),
      label: 'Practice Tests',
      value: '8',
      change: '+3',
      trend: 'up',
      since: 'last week'
    },
    {
      id: uuidv4(),
      label: 'Concept Mastery',
      value: '68%',
      change: '+5%',
      trend: 'up',
      since: 'last month'
    },
    {
      id: uuidv4(),
      label: 'Study Streak',
      value: '5',
      change: '-1',
      trend: 'down',
      since: 'days'
    }
  ]);
  
  // Nudges
  const [nudges, setNudges] = useState<Nudge[]>([
    {
      id: uuidv4(),
      title: 'Complete your profile',
      message: 'Add your exam date and preferred study times to get a personalized study plan.',
      type: 'info',
      actionLabel: 'Complete Profile',
      actionUrl: '/dashboard/student/profile',
      isRead: false,
      timestamp: new Date()
    },
    {
      id: uuidv4(),
      title: 'Take concept test',
      message: 'Test your understanding of key concepts to improve your study plan.',
      type: 'info',
      actionLabel: 'Take Test',
      actionUrl: '/dashboard/student/tests',
      isRead: false,
      timestamp: new Date()
    }
  ]);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if this is the first time the user is visiting the dashboard
  useEffect(() => {
    if (!loading && userProfile) {
      // Check localStorage for first-time user flag
      const hasSeenTour = localStorage.getItem('dashboard_tour_completed');
      const isFirstTimeAfterSignup = localStorage.getItem('new_user_signup') === 'true';
      
      // Only show the welcome tour if it's first time after signup
      if (isFirstTimeAfterSignup && !hasSeenTour) {
        setShowWelcomeTour(true);
        // Clear the new user signup flag
        localStorage.removeItem('new_user_signup');
      }
    }
  }, [loading, userProfile]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const markNudgeAsRead = (nudgeId: string) => {
    setNudges(prev => 
      prev.map(nudge => 
        nudge.id === nudgeId ? { ...nudge, isRead: true } : nudge
      )
    );
  };
  
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    localStorage.setItem('dashboard_tour_completed', 'true');
    
    toast({
      title: 'Tour skipped',
      description: 'You can always access the tour from the help menu.',
    });
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    localStorage.setItem('dashboard_tour_completed', 'true');
    
    toast({
      title: 'Tour completed',
      description: 'Welcome to your personalized dashboard!',
    });
  };
  
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };
  
  const toggleSidebar = () => {
    setHideSidebar(prev => !prev);
  };
  
  const toggleTabsNav = () => {
    setHideTabsNav(prev => !prev);
  };

  return {
    userProfile,
    loading,
    activeTab,
    showWelcomeTour,
    hideSidebar,
    hideTabsNav,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    showStudyPlan,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  };
};
