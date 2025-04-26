
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { handleNewUser } from "@/pages/dashboard/student/utils/UserSessionManager";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { UserRole, MoodType } from "@/types/user/base";

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [lastActivity, setLastActivity] = useState<{ type: string, description: string } | null>(null);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  const { userProfile, loading: profileLoading, updateUserProfile } = useUserProfile(UserRole.Student);
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(UserRole.Student);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get tab from URL or default to overview
  const path = location.pathname;
  const pathSegments = path.split('/');
  const initialTab = pathSegments[pathSegments.length - 1] || 'overview';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  
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
  
  useEffect(() => {
    // Update active tab when URL path changes
    const pathSegments = location.pathname.split('/');
    const tabFromPath = pathSegments[pathSegments.length - 1];
    if (tabFromPath && tabFromPath !== activeTab) {
      setActiveTab(tabFromPath);
    }
  }, [location.pathname]);
  
  useEffect(() => {
    console.log("useStudentDashboard - Initializing dashboard");
    
    const initDashboard = async () => {
      try {
        setLoading(true);
        
        // Check if the user is returning or new based on URL parameters
        const params = new URLSearchParams(location.search);
        const isReturningUser = params.get('returning') === 'true';
        const isNewUser = params.get('new') === 'true';
        const completedOnboarding = params.get('completedOnboarding') === 'true';
        
        console.log("URL params:", { isReturningUser, isNewUser, completedOnboarding });
        
        if (isNewUser) {
          // For new users, show onboarding but not the returning prompt
          setShowOnboarding(true);
          
          // Ensure we have user data stored
          const userData = localStorage.getItem("userData");
          if (!userData) {
            // Create basic user data if missing
            localStorage.setItem("userData", JSON.stringify({
              isNewUser: true,
              completedOnboarding: false,
              sawWelcomeTour: false,
              firstLogin: new Date().toISOString(),
              lastLoginTime: new Date().toISOString()
            }));
          }
        } else if (isReturningUser) {
          // For returning users, skip onboarding and welcome tour
          setShowOnboarding(false);
          setShowWelcomeTour(false);
          
          // Track this session as a return visit
          const userData = localStorage.getItem("userData");
          if (userData) {
            const parsedData = JSON.parse(userData);
            parsedData.lastSessionTime = new Date().toISOString();
            parsedData.isReturningUser = true;
            localStorage.setItem("userData", JSON.stringify(parsedData));
          }
        } else {
          // Regular session handling
          const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
          
          console.log("useStudentDashboard - Session result:", { 
            shouldShowOnboarding, 
            shouldShowWelcomeTour 
          });
          
          setShowOnboarding(shouldShowOnboarding);
          setShowWelcomeTour(shouldShowWelcomeTour);
        }
        
        // Get user data from localStorage to set initial mood
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          
          // Set current mood
          if (parsedData.mood) {
            setCurrentMood(parsedData.mood as MoodType);
          }
          
          // Get last activity data for display in dashboard
          if (parsedData.lastActivity) {
            setLastActivity({
              type: parsedData.lastActivity.type,
              description: `You were last studying ${parsedData.lastActivity.name || "a topic"}`
            });
          } else {
            setLastActivity({
              type: "login",
              description: "You last logged in yesterday"
            });
          }
          
          // Set suggested next action
          if (parsedData.completedModules && parsedData.completedModules.length > 0) {
            const lastModule = parsedData.completedModules[parsedData.completedModules.length - 1];
            setSuggestedNextAction(`Continue with ${lastModule.nextModule || "Practice Exercises"}`);
          } else {
            setSuggestedNextAction("Start today's recommended study plan");
          }
        }
        
        // Update login count for analytics
        if (userProfile && !showOnboarding) {
          const currentLoginCount = userProfile.loginCount || 0;
          
          if (!sessionStorage.getItem('session_active')) {
            updateUserProfile({
              loginCount: currentLoginCount + 1
            } as Partial<typeof userProfile>);
            
            sessionStorage.setItem('session_active', 'true');
          }
        }
      } catch (error) {
        console.error("Dashboard initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize dashboard",
          variant: "destructive",
        });
      } finally {
        if (!profileLoading) {
          setLoading(false);
        }
      }
    };
    
    initDashboard();
  }, [location, navigate, profileLoading, userProfile, updateUserProfile]);
  
  useEffect(() => {
    if (!profileLoading) {
      setLoading(false);
    }
  }, [profileLoading]);
  
  // Enhanced tab change handler to maintain URL query parameters
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Preserve query parameters when changing tabs
    const currentParams = new URLSearchParams(location.search);
    const persistParams = ['returning', 'new', 'completedOnboarding']; // Parameters to maintain between tabs
    
    const params = new URLSearchParams();
    persistParams.forEach(param => {
      if (currentParams.has(param)) {
        params.set(param, currentParams.get(param)!);
      }
    });
    
    const queryString = params.toString();
    const path = queryString ? `/dashboard/student/${tab}?${queryString}` : `/dashboard/student/${tab}`;
    
    navigate(path);
  };
  
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };
  
  const toggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };
  
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
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
  
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.completedOnboarding = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    setShowWelcomeTour(true);
    
    toast({
      title: "Onboarding Complete!",
      description: "Your personalized learning plan is ready.",
    });
  };
  
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };
  
  // Track user activity (concepts, flashcards, exams)
  const trackUserActivity = (activity: any) => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.lastActivity = {
        ...activity,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("userData", JSON.stringify(parsedData));
      console.log("Activity tracked:", activity);
    }
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
    currentMood,
    suggestedNextAction,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
    trackUserActivity
  };
};
