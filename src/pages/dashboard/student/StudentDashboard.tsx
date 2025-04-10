
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "./DashboardLoading";
import { handleNewUser } from "./utils/UserSessionManager";
import DashboardLayout from "./DashboardLayout";
import StudyPlanDialog from "./StudyPlanDialog";

const StudentDashboard = () => {
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
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    // Initial loading simulation for dashboard
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Handle onboarding and welcome flow
    const userData = localStorage.getItem("userData");
    const searchParams = new URLSearchParams(location.search);
    const isNewUser = searchParams.get('newUser') === 'true';
    
    if (isNewUser) {
      // When coming directly from signup, show onboarding first
      setShowOnboarding(true);
      
      // Clean the URL to remove the query params
      navigate(location.pathname, { replace: true });
      
      // Later we'll show welcome tour after onboarding completes
    } 
    else if (userData) {
      // Check if it's a returning user with stored data
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.isNewUser || !parsedUserData.completedOnboarding) {
        // First time returning after signup, still need onboarding
        setShowOnboarding(true);
      } else {
        // Regular returning user - show dashboard directly
        toast({
          title: "Welcome back to Sakha AI!",
          description: "Your personalized dashboard is ready.",
        });
      }
    } 
    else {
      // Completely new user with no data
      setShowOnboarding(true);
    }

    return () => clearTimeout(timer);
  }, [toast, location, navigate]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/dashboard/student/${newTab}`);
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    
    // Save that tour was seen
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
      title: "Welcome to your dashboard!",
      description: "You're all set up and ready to start.",
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
      description: "Let's explore your personalized dashboard.",
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
  
  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show onboarding flow for first-time users
  if (showOnboarding) {
    // Make sure we have a goal to work with
    const defaultGoal = "IIT-JEE";
    const goalTitle = userProfile?.goals?.[0]?.title || defaultGoal;
    
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={goalTitle}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    />
  );
};

export default StudentDashboard;
