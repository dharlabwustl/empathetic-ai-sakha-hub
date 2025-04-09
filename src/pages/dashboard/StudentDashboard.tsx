
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "./student/DashboardLoading";
import DashboardHeader from "./student/DashboardHeader";
import SidebarNavigation from "./student/SidebarNavigation";
import DashboardContent from "./student/DashboardContent";
import { getFeatures, formatTime, formatDate } from "./student/StudentDashboardUtils";

const StudentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { tab } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const { userProfile } = useUserProfile("Student");
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking("Student");
  const [showWelcomeTour, setShowWelcomeTour] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

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

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [toast]);

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
  };
  
  // Format current time and date
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  if (showOnboarding && userProfile.goals?.[0]?.title) {
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={userProfile.goals[0].title}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6 pb-20 md:pb-6">
        {/* Top header section */}
        <DashboardHeader 
          userProfile={userProfile}
          formattedTime={formattedTime}
          formattedDate={formattedDate}
        />
        
        {/* Main dashboard content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left navigation sidebar (desktop) */}
          <SidebarNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
          
          {/* Main content area */}
          <DashboardContent
            activeTab={activeTab}
            onTabChange={handleTabChange}
            userProfile={userProfile}
            kpis={kpis}
            nudges={nudges}
            markNudgeAsRead={markNudgeAsRead}
            features={features}
            showWelcomeTour={showWelcomeTour}
            handleSkipTour={handleSkipTour}
            handleCompleteTour={handleCompleteTour}
          />
        </div>
      </main>
      
      <ChatAssistant userType="student" />
    </div>
  );
};

export default StudentDashboard;
