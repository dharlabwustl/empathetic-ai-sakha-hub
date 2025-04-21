
import { useState, useEffect } from "react";
import { useUserProfile } from "./useUserProfile";
import { UserRole } from "@/types/user/base";
import { useToast } from "./use-toast";

export const useDoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { userProfile, loading: profileLoading } = useUserProfile(UserRole.Doctor);
  const [activeTab, setActiveTab] = useState("overview");
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const { toast } = useToast();
  
  // Mock data
  const kpis = [];
  const nudges = [];

  useEffect(() => {
    if (!profileLoading) {
      setLoading(false);
    }
  }, [profileLoading]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    toast({
      title: "Welcome!",
      description: "You're all set to start your personalized experience.",
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

  const markNudgeAsRead = (id: string) => {
    // Mock implementation
    console.log("Marking nudge as read:", id);
  };

  return {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime: new Date().toLocaleTimeString(),
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
    setActiveTab
  };
};
