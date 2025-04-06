
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
  Code,
  BookOpen,
  Brain,
  Clock,
  Heart,
  Target
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
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { tab } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab || "overview");
  const { userProfile } = useUserProfile("Student");
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking("Student");
  const [showWelcomeTour, setShowWelcomeTour] = useState(true);
  const [tourStep, setTourStep] = useState(0);

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

  const handleNextTourStep = () => {
    if (tourStep < 4) {
      setTourStep(tourStep + 1);
    } else {
      setShowWelcomeTour(false);
    }
  };

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
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
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            {showWelcomeTour && (
              <div className="relative z-20 mb-8 bg-gradient-to-r from-sky-50 to-violet-50 p-6 rounded-xl border border-violet-100 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 gradient-text">
                  {tourStep === 0 && "Welcome to Your Smart Study Plan! 🎉"}
                  {tourStep === 1 && "Today's Focus 📚"}
                  {tourStep === 2 && "Track Your Progress 📈"}
                  {tourStep === 3 && "Practice with Flashcards & Quizzes 🧠"}
                  {tourStep === 4 && "Get Help Anytime 💬"}
                </h3>
                
                <p className="mb-6 text-gray-700">
                  {tourStep === 0 && "Let's take a quick tour of your personalized dashboard. We've created a smart plan based on your exam goals and preferences."}
                  {tourStep === 1 && "Your daily study tasks are organized here. Each day, we'll suggest topics based on your exam syllabus and learning pace."}
                  {tourStep === 2 && "Monitor your study streak, completion rates, and performance metrics. We'll help you stay on track."}
                  {tourStep === 3 && "Review key concepts with AI-generated flashcards and test your knowledge with adaptive quizzes."}
                  {tourStep === 4 && "Have questions? Need help with a topic? The Sakha AI assistant is always ready to help you."}
                </p>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleSkipTour}>Skip Tour</Button>
                  <Button onClick={handleNextTourStep} className="bg-gradient-to-r from-sky-500 to-violet-500">
                    {tourStep < 4 ? "Next" : "Start Studying"}
                  </Button>
                </div>
              </div>
            )}
          
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
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <Brain size={16} />
              <span>Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Materials</span>
            </TabsTrigger>
            <TabsTrigger value="wellness" className="flex items-center gap-2">
              <Heart size={16} />
              <span>Wellness</span>
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
