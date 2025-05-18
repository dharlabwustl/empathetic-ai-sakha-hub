
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import { handleNewUser } from "./student/utils/UserSessionManager";
import WelcomeSlider from "@/components/dashboard/student/welcome/WelcomeSlider";
import WelcomeTour from "@/components/dashboard/student/welcome/WelcomeTour";
import StudyPlanCreationDialog from "@/components/dashboard/student/dialogs/StudyPlanCreationDialog";

const StudentDashboard = () => {
  const { userProfile, isLoading } = useUserProfile(UserRole.Student);
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcomeSlider, setShowWelcomeSlider] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlanDialog, setShowStudyPlanDialog] = useState(false);
  
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
    
    // For Google signup users who've completed the welcome flow
    const needsStudyPlanCreation = localStorage.getItem('needs_study_plan_creation') === 'true';
    const welcomeFlowCompleted = localStorage.getItem('welcomeFlowCompleted') === 'true';
    const googleSignup = localStorage.getItem('google_signup') === 'true';
    const sawWelcomeTour = localStorage.getItem('sawWelcomeTour') === 'true';
    
    // Show different components based on user state
    setShowWelcomeSlider(shouldShowOnboarding && !sawWelcomeTour);
    setShowWelcomeTour(shouldShowWelcomeTour || (shouldShowOnboarding && sawWelcomeTour));
    
    // If user completed welcome tour and needs study plan creation
    // (especially for Google signup users who skipped the detailed onboarding)
    if (needsStudyPlanCreation && sawWelcomeTour && !shouldShowOnboarding) {
      // Give a little delay to ensure tour is done
      setTimeout(() => {
        setShowStudyPlanDialog(true);
      }, 1000);
    }
  }, [location, navigate]);
  
  // Function to handle when welcome slider/tour is completed
  const handleWelcomeComplete = () => {
    localStorage.setItem('sawWelcomeSlider', 'true');
    setShowWelcomeSlider(false);
    setShowWelcomeTour(true);
  };
  
  // Function to handle when tour is completed
  const handleTourComplete = () => {
    localStorage.setItem('sawWelcomeTour', 'true');
    setShowWelcomeTour(false);
    
    // Check if we need to show the study plan dialog after the tour
    const needsStudyPlanCreation = localStorage.getItem('needs_study_plan_creation') === 'true';
    if (needsStudyPlanCreation) {
      setShowStudyPlanDialog(true);
    }
  };
  
  // Close study plan dialog
  const handleCloseStudyPlan = () => {
    setShowStudyPlanDialog(false);
    localStorage.setItem('needs_study_plan_creation', 'false');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If welcome slider is active, show it
  if (showWelcomeSlider) {
    return <WelcomeSlider onComplete={handleWelcomeComplete} />;
  }

  return (
    <>
      <DashboardOverview userProfile={userProfile} />
      
      {/* Welcome Tour */}
      {showWelcomeTour && (
        <WelcomeTour onComplete={handleTourComplete} />
      )}
      
      {/* Study Plan Creation Dialog */}
      <StudyPlanCreationDialog 
        isOpen={showStudyPlanDialog}
        onClose={handleCloseStudyPlan}
      />
    </>
  );
};

export default StudentDashboard;
