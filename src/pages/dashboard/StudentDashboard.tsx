
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  LineChart, 
  MessageSquare, 
  PencilRuler,
  User,
  Lightbulb,
  Activity,
  Dices,
  Code
} from "lucide-react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import TutorCard from "@/components/dashboard/student/TutorCard";
import StudyPlannerCard from "@/components/dashboard/student/StudyPlannerCard";
import ProgressCard from "@/components/dashboard/student/ProgressCard";
import ProjectsCard from "@/components/dashboard/student/ProjectsCard";
import AcademicAdvisorCard from "@/components/dashboard/student/AcademicAdvisorCard";
import MotivationCard from "@/components/dashboard/student/MotivationCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import FeatureCard from "@/components/dashboard/FeatureCard";

const StudentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { tab } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const { userProfile } = useUserProfile("Student");
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking("Student");

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back, Student!",
        description: "Your dashboard is ready.",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/dashboard/student/${newTab}`);
  };

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5 dark:from-sakha-blue/10 dark:via-gray-900 dark:to-sakha-purple/10">
        <div className="text-center">
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI" 
            className="w-16 h-16 mx-auto animate-pulse mb-4" 
          />
          <h2 className="text-xl font-medium mb-2">Loading your dashboard...</h2>
          <p className="text-muted-foreground">Personalizing your experience</p>
        </div>
      </div>
    );
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
      icon: <User />,
      title: "Career Guide",
      description: "Build your resume, prepare for interviews, and plan your career path.",
      path: "/dashboard/student/career",
      isPremium: true,
    },
    {
      icon: <Lightbulb />,
      title: "Wellness Assistant",
      description: "Get tips to maintain work-life balance and detect early signs of burnout.",
      path: "/dashboard/student/wellness",
      isPremium: true,
    },
    {
      icon: <LineChart />,
      title: "Practice Exams",
      description: "Take subject-specific mock tests and track your progress.",
      path: "/dashboard/student/exams",
      isPremium: false,
    },
    {
      icon: <Dices />,
      title: "Memory Skills",
      description: "Improve memory with flashcards and spaced repetition techniques.",
      path: "/dashboard/student/memory",
      isPremium: false,
    },
    {
      icon: <Code />,
      title: "MVP Builder",
      description: "Build your own projects with step-by-step guidance from idea to execution.",
      path: "/dashboard/student/projects",
      isPremium: true,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map(kpi => (
                <KpiCard key={kpi.id} kpi={kpi} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
              </div>
              <div>
                <ProfileCard profile={userProfile} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  path={feature.path}
                  isPremium={feature.isPremium}
                  userSubscription={userProfile.subscription}
                />
              ))}
            </div>
          </>
        );
      case "tutor":
        return <TutorCard />;
      case "planner":
        return <StudyPlannerCard />;
      case "academic":
        return <AcademicAdvisorCard />;
      case "motivation":
        return <MotivationCard />;
      case "progress":
        return <ProgressCard />;
      case "projects":
        return <ProjectsCard />;
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5 dark:from-sakha-blue/10 dark:via-gray-900 dark:to-sakha-purple/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <h1 className="text-3xl font-display font-bold mb-2 text-foreground">
            Welcome back, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground">Here's an overview of your learning journey</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Lightbulb size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>24/7 Tutor</span>
            </TabsTrigger>
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Academic Advisor</span>
            </TabsTrigger>
            <TabsTrigger value="motivation" className="flex items-center gap-2">
              <Activity size={16} />
              <span>Motivation</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <LineChart size={16} />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <PencilRuler size={16} />
              <span>Projects</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
            {renderTabContent()}
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatAssistant userType="student" />
    </div>
  );
};

export default StudentDashboard;
