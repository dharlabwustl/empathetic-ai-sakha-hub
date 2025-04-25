
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useUserProfile } from './useUserProfile';
import { useKpiTracking } from './useKpiTracking';
import { handleNewUser } from '@/pages/dashboard/student/utils/UserSessionManager';
import { MoodType } from '@/types/user/base';

export const useStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking();
  const { tab } = useParams<{ tab?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get time of day for greeting
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let timeOfDay = "day";
  
  if (hour < 12) {
    timeOfDay = "morning";
  } else if (hour < 17) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }
  
  // Mock data for last activity and suggested next action
  const lastActivity = {
    type: 'concept',
    description: 'Studying Newton\'s Laws of Motion concept card',
    url: '/study/concept-card/cc1'
  };
  
  const suggestedNextAction = "Continue with your Chemical Bonding concept card";
  
  // Define features available to the user
  const features = [
    "ai_tutor",
    "concept_cards",
    "flashcards",
    "practice_exams",
    "mood_tracking"
  ];
  
  // Set active tab based on URL param
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);
  
  // Handle showing onboarding or welcome tour for new users
  useEffect(() => {
    if (loading) return;
    
    const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
    
    setShowOnboarding(shouldShowOnboarding);
    setShowWelcomeTour(shouldShowWelcomeTour);
    
    // Try to get saved mood from local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood as MoodType);
      }
    }
  }, [loading, location, navigate]);
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/student/${tab}`);
  };
  
  // Tour handlers
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    const userData = localStorage.getItem("userData");
    
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ sawWelcomeTour: true }));
    }
  };
  
  const handleCompleteTour = () => {
    handleSkipTour();
  };
  
  // Onboarding completion handler
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setShowWelcomeTour(true);
    
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.completedOnboarding = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ completedOnboarding: true }));
    }
    
    // Update URL to clean state
    navigate("/dashboard/student", { replace: true });
  };
  
  // Study plan handlers
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };
  
  // Layout toggle handlers
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };
  
  const toggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };
  
  // Mood tracking handler
  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    
    // Save mood to local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    // In a real app, we would also save this to the backend
    setShowMoodTracker(false);
  };
  
  const openMoodTracker = () => {
    setShowMoodTracker(true);
  };
  
  const closeMoodTracker = () => {
    setShowMoodTracker(false);
  };
  
  return {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    timeOfDay,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    features,
    lastActivity,
    suggestedNextAction,
    currentMood,
    showMoodTracker,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
    handleMoodChange,
    openMoodTracker,
    closeMoodTracker
  };
};
