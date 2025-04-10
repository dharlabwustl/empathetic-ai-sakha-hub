
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
import DashboardContent from "./student/DashboardContent";
import { getFeatures, formatTime, formatDate } from "./student/StudentDashboardUtils";
import StudyPlanDialog from "./student/StudyPlanDialog";
import SidebarNavigation from "./student/SidebarNavigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  MessageSquare, 
  Calendar, 
  Activity, 
  LineChart, 
  Brain, 
  BookOpen, 
  Heart,
  Target,
  ListTodo,
  Video,
  Users,
  Bell
} from "lucide-react";

const StudentDashboard = () => {
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

    // Check if user is a first-time user
    const isFirstTime = localStorage.getItem("firstTimeUser");
    if (isFirstTime !== "false" && userProfile) {
      setShowOnboarding(true);
      localStorage.setItem("firstTimeUser", "false");
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
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
  };
  
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
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

  const tabs = [
    { id: "overview", label: "Overview", icon: <Lightbulb size={16} /> },
    { id: "today", label: "Today's Focus", icon: <ListTodo size={16} /> },
    { id: "tutor", label: "24/7 Tutor", icon: <MessageSquare size={16} /> },
    { id: "academic", label: "Academic Advisor", icon: <Calendar size={16} /> },
    { id: "motivation", label: "Motivation", icon: <Activity size={16} /> },
    { id: "progress", label: "Progress", icon: <LineChart size={16} /> },
    { id: "flashcards", label: "Flashcards", icon: <Brain size={16} /> },
    { id: "materials", label: "Materials", icon: <BookOpen size={16} /> },
    { id: "goals", label: "Goals", icon: <Target size={16} /> },
    { id: "wellness", label: "Wellness", icon: <Heart size={16} /> },
    { id: "live-tutors", label: "Live Tutors", icon: <Video size={16} /> },
    { id: "forum", label: "Forum", icon: <Users size={16} /> },
    { id: "videos", label: "Videos", icon: <Video size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6 pb-20 md:pb-6">
        {/* Top header section */}
        <DashboardHeader 
          userProfile={userProfile}
          formattedTime={formattedTime}
          formattedDate={formattedDate}
          onViewStudyPlan={handleViewStudyPlan}
        />
        
        {/* Horizontal Tab Navigation */}
        <div className="mb-6 overflow-x-auto px-1 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <TabsList className="inline-flex h-10 w-auto min-w-full gap-2 bg-transparent p-0">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                onClick={() => handleTabChange(tab.id)}
                className={`flex h-9 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg" 
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
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
      
      {/* Study Plan Dialog */}
      {showStudyPlan && (
        <StudyPlanDialog 
          userProfile={userProfile} 
          onClose={handleCloseStudyPlan} 
        />
      )}
    </div>
  );
};

export default StudentDashboard;
