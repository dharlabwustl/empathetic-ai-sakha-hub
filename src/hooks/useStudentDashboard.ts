
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
      toast({
        title: "Welcome to your smart study plan!",
        description: "Your personalized dashboard is ready.",
      });
    }, 1000);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Check for user data and show onboarding/welcome as needed
    const userData = localStorage.getItem("userData");
    const searchParams = new URLSearchParams(location.search);
    const completedOnboarding = searchParams.get('completedOnboarding');
    
    // If first time login flow (coming from signup)
    if (completedOnboarding === 'true') {
      setShowWelcomeTour(true);
      // Clean the URL to remove the query param
      navigate(location.pathname, { replace: true });
    }
    // Check if this is a first-time user and not coming from signup
    else if (!userData) {
      // First time user, show onboarding
      setShowOnboarding(true);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [toast, userProfile, location, navigate]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/dashboard/student/${newTab}`);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setShowWelcomeTour(true);
    
    // Store that the user has completed onboarding
    if (userProfile) {
      const userData = {
        ...userProfile,
        completedOnboarding: true
      };
      localStorage.setItem("userData", JSON.stringify(userData));
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
