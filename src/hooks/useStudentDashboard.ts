
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { handleNewUser } from "@/pages/dashboard/student/utils/UserSessionManager";
import { useKpiTracking } from "@/hooks/useKpiTracking";

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const { userProfile, isLoading: profileLoading } = useUserProfile();
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { tab } = useParams<{ tab?: string }>();
  
  const [activeTab, setActiveTab] = useState(tab || "overview");
  
  // Calculate current time greeting
  const now = new Date();
  const hour = now.getHours();
  let currentTime = "";
  
  if (hour < 12) currentTime = "Good Morning";
  else if (hour < 17) currentTime = "Good Afternoon";
  else currentTime = "Good Evening";
  
  // Features list
  const features = {
    overview: true,
    subjects: true,
    quizzes: true,
    resources: true,
    community: true,
    progress: true,
    settings: true,
  };
  
  // Handle tab changes
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);
  
  // Initialize dashboard state
  useEffect(() => {
    console.log("useStudentDashboard - Initializing dashboard");
    
    const initDashboard = async () => {
      try {
        setLoading(true);
        
        // Check if this is a new user session
        console.log("useStudentDashboard - Checking user session");
        const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
        
        console.log("useStudentDashboard - Session result:", { 
          shouldShowOnboarding, 
          shouldShowWelcomeTour 
        });
        
        // Update state based on user session
        setShowOnboarding(shouldShowOnboarding);
        setShowWelcomeTour(shouldShowWelcomeTour);
      } catch (error) {
        console.error("Dashboard initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize dashboard",
          variant: "destructive",
        });
      } finally {
        // Wait for profile loading to complete
        if (!profileLoading) {
          setLoading(false);
        }
      }
    };
    
    initDashboard();
  }, [location, navigate, profileLoading]);
  
  // Update loading state when profile loading changes
  useEffect(() => {
    if (!profileLoading) {
      setLoading(false);
    }
  }, [profileLoading]);
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/student/${tab}`);
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };
  
  // Toggle tabs navigation
  const toggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };
  
  // Handle welcome tour
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    // Mark that user has seen welcome tour
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    // Mark that user has seen welcome tour
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    toast({
      title: "Welcome to Sakha AI!",
      description: "You're all set to start your personalized learning journey.",
    });
  };
  
  // Handle onboarding completion
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    
    // Update onboarding completion status in user data
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.completedOnboarding = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    // Show welcome tour after onboarding
    setShowWelcomeTour(true);
    
    toast({
      title: "Onboarding Complete!",
      description: "Your personalized learning plan is ready.",
    });
  };
  
  // Study plan handlers
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
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
