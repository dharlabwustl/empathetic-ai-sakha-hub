import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Clock, MessageSquare, Calendar, LineChart, PencilRuler,
  User, Lightbulb, Activity, Dices, Code, BookOpen, Brain, Heart, Target, Video, Bell, Users } from "lucide-react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import TutorCard from "@/components/dashboard/student/TutorCard";
import StudyPlannerCard from "@/components/dashboard/student/StudyPlannerCard";
import ProgressCard from "@/components/dashboard/student/ProgressCard";
import ProjectsCard from "@/components/dashboard/student/ProjectsCard";
import AcademicAdvisorCard from "@/components/dashboard/student/AcademicAdvisorCard";
import MotivationCard from "@/components/dashboard/student/MotivationCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import TodayStudyPlan from "@/components/dashboard/student/TodayStudyPlan";
import LiveTutorSection from "@/components/dashboard/student/LiveTutorSection";
import CollaborativeForumSection from "@/components/dashboard/student/CollaborativeForumSection";
import VideoLibrarySection from "@/components/dashboard/student/VideoLibrarySection";
import SmartNotificationSection from "@/components/dashboard/student/SmartNotificationSection";

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

    return () => clearTimeout(timer);
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

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 animate-pulse blur-md"></div>
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI" 
              className="w-20 h-20 mx-auto relative z-10" 
            />
          </div>
          <h2 className="text-xl font-medium mb-2">Generating your smart study plan...</h2>
          <p className="text-muted-foreground">Personalizing your learning experience</p>
          
          <div className="mt-8 max-w-xs mx-auto">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-sky-500 rounded-full animate-pulse mr-2"></div>
                <p className="text-sm">Analyzing exam syllabus...</p>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-violet-500 rounded-full animate-pulse mr-2"></div>
                <p className="text-sm">Creating personalized study calendar...</p>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <p className="text-sm">Generating adaptive flashcards...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showOnboarding && userProfile.goals?.[0]?.title) {
    return <OnboardingFlow 
      userProfile={userProfile} 
      goalTitle={userProfile.goals[0].title}
      onComplete={handleCompleteOnboarding}
    />;
  }

  const features = [
    {
      icon: <MessageSquare />,
      title: "24/7 Tutor",
      description: "Get instant help with any subject. Ask questions and receive detailed explanations.",
      path: "/dashboard/student/tutor",
      isPremium: false,
    },
    {
      icon: <Calendar />,
      title: "Academic Advisor",
      description: "Get personalized study plans based on your goals and schedule.",
      path: "/dashboard/student/academic",
      isPremium: false,
    },
    {
      icon: <Activity />,
      title: "Motivation Coach",
      description: "Track your mood and habits. Get daily motivation to stay on track.",
      path: "/dashboard/student/motivation",
      isPremium: true,
    },
    {
      icon: <Brain />,
      title: "Flashcards & Revision",
      description: "Built-in flashcard system to improve memorization and revision.",
      path: "/dashboard/student/flashcards",
      isPremium: false,
    },
    {
      icon: <BookOpen />,
      title: "Practice Exams",
      description: "Take subject-specific mock tests and track your progress.",
      path: "/dashboard/student/exams",
      isPremium: false,
    },
    {
      icon: <Target />,
      title: "Goal Tracking",
      description: "Set and track your academic goals with AI-powered insights.",
      path: "/dashboard/student/goals",
      isPremium: false,
    },
    {
      icon: <Heart />,
      title: "Mental Health Zone",
      description: "Track mood, manage stress, and prevent burnout.",
      path: "/dashboard/student/wellness",
      isPremium: true,
    },
    {
      icon: <Code />,
      title: "My Materials Vault",
      description: "Upload and organize your study materials with AI tagging.",
      path: "/dashboard/student/materials",
      isPremium: true,
    },
    {
      icon: <Video />,
      title: "Live Tutors",
      description: "Connect with expert tutors for personalized 1:1 sessions.",
      path: "/dashboard/student/live-tutors",
      isPremium: true,
    },
    {
      icon: <Users />,
      title: "Collaborative Forum",
      description: "Join or create study groups with peers preparing for similar exams.",
      path: "/dashboard/student/forum",
      isPremium: true,
    },
    {
      icon: <Video />,
      title: "Video Library",
      description: "Access curated educational videos for your exam preparation.",
      path: "/dashboard/student/videos",
      isPremium: false,
    },
    {
      icon: <Bell />,
      title: "Smart Notifications",
      description: "Get personalized reminders via app, SMS, email, or WhatsApp.",
      path: "/dashboard/student/notifications",
      isPremium: false,
    }
  ];

  const tabContents: Record<string, React.ReactNode> = {
    overview: (
      <>
        {showWelcomeTour && (
          <WelcomeTour 
            onSkipTour={handleSkipTour} 
            onCompleteTour={handleCompleteTour}
          />
        )}
        <DashboardOverview
          userProfile={userProfile}
          kpis={kpis}
          nudges={nudges}
          markNudgeAsRead={markNudgeAsRead}
          features={features}
        />
      </>
    ),
    today: <TodayStudyPlan />,
    tutor: <TutorCard />,
    planner: <StudyPlannerCard />,
    academic: <AcademicAdvisorCard />,
    motivation: <MotivationCard />,
    progress: <ProgressCard />,
    projects: <ProjectsCard />,
    "live-tutors": <LiveTutorSection />,
    forum: <CollaborativeForumSection />,
    videos: <VideoLibrarySection />,
    notifications: <SmartNotificationSection />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2 text-foreground gradient-text">
                Welcome back, {userProfile.name.split(' ')[0]}
              </h1>
              <p className="text-muted-foreground">Here's your personalized study plan for {userProfile.goals?.[0]?.title || "IIT-JEE"}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white/50 p-2 rounded-lg border border-gray-100 text-sm">
              <Clock size={16} className="text-sky-500" />
              <span>Next mock test: <span className="font-medium">3 days left</span></span>
            </div>
          </div>
        </div>
        
        <DashboardTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabContents={tabContents}
        />
      </main>
      
      <ChatAssistant userType="student" />
    </div>
  );
};

export default StudentDashboard;
