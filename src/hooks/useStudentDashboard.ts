
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { getFeatures } from "@/pages/dashboard/student/StudentDashboardUtils";

export function useStudentDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { tab } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const { userProfile } = useUserProfile("Student");
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking("Student");
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  // Get features data
  const features = getFeatures();

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab, activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Check if user is coming from signup or needs onboarding
    const needsOnboarding = localStorage.getItem("needsOnboarding") === "true";
    const firstTimeUser = localStorage.getItem("firstTimeUser") === "true";
    
    if (needsOnboarding) {
      console.log("User needs onboarding");
      setShowOnboarding(true);
    } else if (firstTimeUser) {
      console.log("First time user - showing welcome tour");
      // If user was marked as first time but didn't go through onboarding
      setShowWelcomeTour(true);
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);
  
  // Show welcome message when userProfile is loaded
  useEffect(() => {
    if (userProfile && !loading) {
      toast({
        title: "Welcome to your smart study plan!",
        description: "Your personalized dashboard is ready.",
      });
    }
  }, [userProfile, loading, toast]);

  const handleTabChange = (newTab: string) => {
    console.log("Changing tab to:", newTab);
    setActiveTab(newTab);
    navigate(`/dashboard/student/${newTab}`);
  };

  const handleSkipTour = () => {
    console.log("Skipping welcome tour");
    setShowWelcomeTour(false);
    localStorage.setItem("welcomeTourShown", "true");
    localStorage.setItem("firstTimeUser", "false");
  };

  const handleCompleteTour = () => {
    console.log("Completing welcome tour");
    setShowWelcomeTour(false);
    localStorage.setItem("welcomeTourShown", "true");
    localStorage.setItem("firstTimeUser", "false");
  };

  const handleCompleteOnboarding = () => {
    console.log("Completing onboarding...");
    
    // Clear onboarding flags
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    
    // Update local storage
    localStorage.setItem("firstTimeUser", "false");
    localStorage.removeItem("needsOnboarding");
    
    // Show welcome tour after onboarding is completed
    setShowWelcomeTour(true);
    
    // Navigate to overview tab
    setActiveTab("overview");
    navigate('/dashboard/student/overview', { replace: true });
  };
  
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };

  return {
    loading,
    activeTab,
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    onboardingCompleted,
    features,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan
  };
}
