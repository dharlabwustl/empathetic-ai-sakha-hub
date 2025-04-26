
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { UserRole } from "@/types/user";
import { useInitialization } from "./student-dashboard/useInitialization";
import { useTabNavigation } from "./student-dashboard/useTabNavigation";
import { useVisibilityControls } from "./student-dashboard/useVisibilityControls";
import { useOnboardingState } from "./student-dashboard/useOnboardingState";
import { useStudyPlanControls } from "./student-dashboard/useStudyPlanControls";

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [lastActivity, setLastActivity] = useState<{ type: string, description: string } | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  
  const { userProfile, loading: profileLoading, updateUserProfile } = useUserProfile(UserRole.Student);
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(UserRole.Student);
  const { tab } = useParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState(tab || "overview");
  
  const { handleTabChange } = useTabNavigation();
  const { hideSidebar, hideTabsNav, toggleSidebar, toggleTabsNav } = useVisibilityControls();
  const { showStudyPlan, handleViewStudyPlan, handleCloseStudyPlan } = useStudyPlanControls();
  const { handleSkipTour, handleCompleteTour, handleCompleteOnboarding } = useOnboardingState(
    setShowOnboarding,
    setShowWelcomeTour
  );

  // Initialize dashboard
  useInitialization(
    userProfile,
    updateUserProfile,
    setLoading,
    setShowOnboarding,
    setShowWelcomeTour,
    setLastActivity,
    setSuggestedNextAction
  );

  // Update active tab when URL param changes
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  // Update loading state when profile loading changes
  useEffect(() => {
    if (!profileLoading) {
      setLoading(false);
    }
  }, [profileLoading]);

  const now = new Date();
  const hour = now.getHours();
  let currentTime = "";
  
  if (hour < 12) currentTime = "Good Morning";
  else if (hour < 17) currentTime = "Good Afternoon";
  else currentTime = "Good Evening";
  
  const features = {
    overview: true,
    subjects: true,
    quizzes: true,
    resources: true,
    community: true,
    progress: true,
    settings: true,
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
