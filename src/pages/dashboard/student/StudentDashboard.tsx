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
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome to your smart study plan!",
        description: "Your personalized dashboard is ready.",
      });
    }, 1000);

    // Check for user data and show onboarding/welcome as needed
    const userData = localStorage.getItem("userData");
    const searchParams = new URLSearchParams(location.search);
    const completedOnboarding = searchParams.get('completedOnboarding');
    const isNewSignup = searchParams.get('newUser') === 'true';
    
    // If coming from signup, always show onboarding first
    if (isNewSignup) {
      setShowOnboarding(true);
      // Clean the URL to remove the query params
      navigate(location.pathname, { replace: true });
    }
    // If completed onboarding via regular flow, show welcome tour
    else if (completedOnboarding === 'true') {
      setShowWelcomeTour(true);
      // Clean the URL to remove the query param
      navigate(location.pathname, { replace: true });
    }
    // For returning users with userData, go straight to dashboard
    else if (userData) {
      // Existing user, don't show onboarding or welcome tour
      const parsedUserData = JSON.parse(userData);
      if (!parsedUserData.completedOnboarding) {
        // Edge case: user has data but never completed onboarding
        setShowOnboarding(true);
      }
    }
    // Complete new user with no data, start onboarding
    else {
      // First time user, show onboarding
      setShowOnboarding(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [toast, location, navigate]);

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
