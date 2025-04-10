
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";

export const useStudentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const { userProfile } = useUserProfile("Student");
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking("Student");
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  // Get features data
  const features = getFeatures();

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Check for user data and show onboarding/welcome as needed
    const userData = localStorage.getItem("userData");
    const searchParams = new URLSearchParams(location.search);
    const newUser = searchParams.get('newUser');
    
    // If coming directly from signup
    if (newUser === 'true') {
      setShowOnboarding(true);
      // Clean the URL to remove the query param
      navigate(location.pathname, { replace: true });
    } 
    // Check if this is a returning user who hasn't completed onboarding yet
    else if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (!parsedUserData.completedOnboarding) {
        setShowOnboarding(true);
      } else if (!parsedUserData.sawWelcomeTour) {
        setShowWelcomeTour(true);
        toast({
          title: "Welcome to your dashboard!",
          description: "Let's take a tour of your learning space.",
        });
      } else {
        // Regular returning user
        toast({
          title: "Welcome back!",
          description: "Your personalized dashboard is ready.",
        });
      }
    } 
    // First-time user with no data
    else {
      setShowOnboarding(true);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [toast, location, navigate]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/dashboard/student/${newTab}`);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    // Save that tour was seen but skipped
    if (userProfile) {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    // Save that tour was completed
    if (userProfile) {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    
    toast({
      title: "Tour completed!",
      description: "You're all set to start your learning journey.",
    });
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setShowWelcomeTour(true);
    
    // Store that the user has completed onboarding
    if (userProfile) {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData.completedOnboarding = true;
      userData.isNewUser = false;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    
    toast({
      title: "Onboarding completed!",
      description: "Now let's explore your personalized dashboard.",
    });
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
