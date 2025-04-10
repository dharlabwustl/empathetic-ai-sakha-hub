
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

    // Check if user is coming from signup or needs onboarding
    const needsOnboarding = localStorage.getItem("needsOnboarding") === "true";
    const firstTimeUser = localStorage.getItem("firstTimeUser") === "true";
    
    if (needsOnboarding && userProfile) {
      setShowOnboarding(true);
      localStorage.removeItem("needsOnboarding"); // Clear so it doesn't show again
    } else if (firstTimeUser && userProfile) {
      // If user was marked as first time but didn't go through onboarding
      setShowWelcomeTour(true);
      localStorage.setItem("firstTimeUser", "false"); // Update this to prevent loop
    }

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [toast, userProfile]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/dashboard/student/${newTab}`);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    localStorage.setItem("welcomeTourShown", "true");
    localStorage.setItem("firstTimeUser", "false");
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    localStorage.setItem("welcomeTourShown", "true");
    localStorage.setItem("firstTimeUser", "false");
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    localStorage.setItem("firstTimeUser", "false");
    // Show welcome tour after onboarding is completed
    setShowWelcomeTour(true);
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
