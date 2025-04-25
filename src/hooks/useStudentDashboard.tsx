
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastActivity, setLastActivity] = useState<{type: string; description: string; url?: string} | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  
  const { tab } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user profile data
  const { loading, userProfile, setUserProfile } = useUserProfile();
  
  // Get KPI tracking data
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking();

  // Define example features (these would normally come from backend)
  const features = [
    {
      id: 'concept_cards',
      title: 'Concept Cards',
      description: 'Master key concepts with visual cards and spaced repetition',
      icon: '🧠',
      cta: 'View Cards',
      url: '/dashboard/student/concepts',
      isNew: false,
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Practice with interactive flashcards for better retention',
      icon: '📝',
      cta: 'Study Now',
      url: '/dashboard/student/flashcards',
      isNew: true,
    },
    {
      id: 'practice_exam',
      title: 'Practice Exams',
      description: 'Test your knowledge with timed practice exams',
      icon: '📚',
      cta: 'Take Exam',
      url: '/dashboard/student/practice-exam',
      isNew: false, 
    }
  ];

  // Set active tab based on URL param
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Check if user is new or returning
  useEffect(() => {
    if (loading || !userProfile) return;
    
    // Use helper to determine if we should show onboarding/welcome tour
    const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
    
    setShowOnboarding(shouldShowOnboarding);
    setShowWelcomeTour(shouldShowWelcomeTour);
    
  }, [loading, userProfile, location, navigate]);

  // Load last activity and suggested next action
  useEffect(() => {
    if (!userProfile) return;
    
    // Check if there's any saved activity in local storage
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        
        // Set last activity if available
        if (parsedData.lastActivity) {
          setLastActivity(parsedData.lastActivity);
        } else {
          // Set a default activity (this would normally come from backend)
          const defaultActivity = {
            type: 'concept',
            description: 'Newton\'s Laws of Motion',
            url: '/study/concept-card/physics-101'
          };
          setLastActivity(defaultActivity);
          
          // Save to localStorage
          parsedData.lastActivity = defaultActivity;
          localStorage.setItem('userData', JSON.stringify(parsedData));
        }
        
        // Set suggested next action if available
        if (parsedData.suggestedNextAction) {
          setSuggestedNextAction(parsedData.suggestedNextAction);
        } else {
          // Set a default suggestion (this would normally come from backend)
          setSuggestedNextAction('Review your pending concepts for Physics');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [userProfile]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/student/${tab}`);
  };

  // Handle welcome tour actions
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    
    // Save to localStorage so we don't show the tour again
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    }
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    
    // Save to localStorage so we don't show the tour again
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    }
    
    // Show the study plan after completing the tour
    setShowStudyPlan(true);
  };
  
  // Handle onboarding completion
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    
    // Mark as completed in user profile
    if (userProfile) {
      const updatedProfile = { 
        ...userProfile,
        completedOnboarding: true
      };
      setUserProfile(updatedProfile);
      
      // Save to localStorage
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.completedOnboarding = true;
        localStorage.setItem('userData', JSON.stringify(parsedData));
      }
    }
    
    // Show welcome tour after onboarding
    setShowWelcomeTour(true);
  };

  // Handle study plan visibility
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };

  // Sidebar and tabs navigation toggles
  const toggleSidebar = () => {
    setHideSidebar(prev => !prev);
  };
  
  const toggleTabsNav = () => {
    setHideTabsNav(prev => !prev);
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

export default useStudentDashboard;
