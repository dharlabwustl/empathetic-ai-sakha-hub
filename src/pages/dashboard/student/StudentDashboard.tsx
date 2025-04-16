
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import MobileSidebar from "@/components/dashboard/student/MobileSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the allowed mood types
type MoodType = "happy" | "tired" | "sad" | "neutral" | "motivated" | "curious" | "stressed";

const StudentDashboard = () => {
  const {
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
  } = useStudentDashboard();
  
  const { toast } = useToast();
  const { tab } = useParams<{ tab?: string }>();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mood, setMood] = useState<MoodType>("neutral"); // Changed from "okay" to "neutral" which is in the allowed types
  
  // Redirect to overview tab if no tab is specified
  if (!tab) {
    return <Navigate to="/dashboard/student/overview" replace />;
  }
  
  // Check if the tab is valid, if not redirect to overview
  if (tab !== "overview" && 
      tab !== "today" && 
      tab !== "academic" && 
      tab !== "concepts" && 
      tab !== "flashcards" && 
      tab !== "practice-exam" && 
      tab !== "influence-meter" && 
      tab !== "feel-good" && 
      tab !== "notifications") {
    return <Navigate to="/dashboard/student/overview" replace />;
  }
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
    toast({
      title: `Mood set to ${selectedMood}`,
      description: "Your dashboard will adjust to your mood.",
    });
  };

  // Get the array of available features for the sidebar
  const availableFeatures = [
    {
      icon: null,
      title: "Overview",
      description: "Your learning dashboard",
      path: "overview",
      isPremium: false,
    },
    {
      icon: null,
      title: "Today's Plan",
      description: "Your daily study schedule",
      path: "today",
      isPremium: false,
    },
    // ... more features
  ];

  return (
    <div className="relative min-h-screen">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-xl font-bold">Sakha AI</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
            <Menu />
          </Button>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={showMobileMenu}
        onClose={toggleMobileMenu}
        activeTab={activeTab}
        onTabChange={(tab) => {
          handleTabChange(tab);
          toggleMobileMenu();
        }}
      />
      
      {/* Main dashboard layout */}
      <DashboardLayout
        loading={loading}
        userProfile={userProfile}
        activeTab={activeTab}
        showWelcomeTour={showWelcomeTour}
        showOnboarding={showOnboarding}
        showStudyPlan={showStudyPlan}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        kpis={kpis}
        nudges={nudges}
        features={availableFeatures}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        markNudgeAsRead={markNudgeAsRead}
        onTabChange={handleTabChange}
        handleSkipTour={handleSkipTour}
        onCompleteTour={handleCompleteTour}
        handleCompleteOnboarding={handleCompleteOnboarding}
        handleCloseStudyPlan={handleCloseStudyPlan}
        toggleSidebar={toggleSidebar}
        toggleTabsNav={toggleTabsNav}
      />
    </div>
  );
};

export default StudentDashboard;
