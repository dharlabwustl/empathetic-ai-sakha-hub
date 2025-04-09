
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, MessageSquare, Calendar, LineChart, PencilRuler,
  User, Lightbulb, Activity, Dices, Code, BookOpen, Brain, 
  Heart, Target, Video, Bell, Users, Home, Folder,
  Settings, LogOut, Search, ChevronRight, BookMarked
} from "lucide-react";
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
import { LiveTutorSection } from "@/components/dashboard/student/LiveTutorSection";
import { CollaborativeForumSection } from "@/components/dashboard/student/CollaborativeForumSection";
import { VideoLibrarySection } from "@/components/dashboard/student/VideoLibrarySection";
import { SmartNotificationSection } from "@/components/dashboard/student/SmartNotificationSection";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MicroConcept from "@/components/dashboard/student/MicroConcept";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  
  // Format current time
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Example micro concepts for demonstration
  const microConcepts = [
    {
      id: "mc-1",
      title: "Kinetic Energy and Conservation",
      subject: "Physics",
      chapter: "Energy and Work",
      difficulty: "Medium",
      estimatedTime: 20,
      content: "Kinetic energy is the energy possessed by an object due to its motion. The formula for kinetic energy is KE = ½mv², where m is mass and v is velocity. The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.",
      resourceType: "Video",
      resourceUrl: "#"
    },
    {
      id: "mc-2",
      title: "Chemical Equilibrium Constants",
      subject: "Chemistry",
      chapter: "Chemical Equilibrium",
      difficulty: "Hard",
      estimatedTime: 25,
      content: "Chemical equilibrium is the state where the forward and reverse reactions occur at equal rates, resulting in constant concentrations of reactants and products. The equilibrium constant Kₑ describes the relationship between concentrations of reactants and products at equilibrium. For a reaction aA + bB ⇌ cC + dD, Kₑ = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ.",
      resourceType: "Text",
      resourceUrl: "#"
    },
    {
      id: "mc-3",
      title: "Limits and Continuity",
      subject: "Mathematics",
      chapter: "Calculus",
      difficulty: "Medium",
      estimatedTime: 30,
      content: "A limit describes the behavior of a function as the input approaches a particular value. A function f is continuous at a point a if lim(x→a) f(x) = f(a). This means the function value equals the limit at that point, with no holes, jumps, or asymptotes.",
      resourceType: "PDF",
      resourceUrl: "#"
    }
  ];

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

  const MicroConceptView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold gradient-text">Micro Concept Cards</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {microConcepts.map(concept => (
          <MicroConcept 
            key={concept.id}
            id={concept.id}
            title={concept.title}
            subject={concept.subject}
            chapter={concept.chapter}
            difficulty={concept.difficulty as "Easy" | "Medium" | "Hard"}
            estimatedTime={concept.estimatedTime}
            content={concept.content}
            resourceType={concept.resourceType as "Video" | "Text" | "PDF"}
            resourceUrl={concept.resourceUrl}
            onComplete={(id) => console.log("Completed:", id)}
            onNeedHelp={(id) => console.log("Needs help with:", id)}
          />
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800/30">
        <div className="flex items-start">
          <div className="p-2 bg-violet-100 dark:bg-violet-800/40 rounded-lg mr-4">
            <Lightbulb className="text-violet-600 dark:text-violet-400" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-violet-800 dark:text-violet-300">Learning Pathway</h3>
            <p className="text-sm text-violet-700/80 dark:text-violet-300/80">
              Master these concepts in order to build a strong foundation for Advanced Calculus topics coming up next week.
            </p>
            <Button variant="link" className="p-0 h-auto text-violet-600 dark:text-violet-400 mt-1">
              View full learning path
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const FlashcardsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold gradient-text">Flashcards & Revision</h2>
        <Button variant="outline" size="sm">Create New</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="relative overflow-hidden card-hover">
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">Physics</Badge>
          </div>
          <CardContent className="pt-6 pb-4">
            <div className="h-32 flex items-center justify-center">
              <h3 className="text-xl font-medium text-center">What is kinetic energy?</h3>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <Button variant="ghost" size="sm">See Answer</Button>
            <div className="text-xs text-gray-500">Last reviewed: 2 days ago</div>
          </CardFooter>
        </Card>
        
        <Card className="relative overflow-hidden card-hover">
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">Chemistry</Badge>
          </div>
          <CardContent className="pt-6 pb-4">
            <div className="h-32 flex items-center justify-center">
              <h3 className="text-xl font-medium text-center">Define chemical equilibrium</h3>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <Button variant="ghost" size="sm">See Answer</Button>
            <div className="text-xs text-gray-500">Last reviewed: Yesterday</div>
          </CardFooter>
        </Card>
        
        <Card className="relative overflow-hidden card-hover">
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">Mathematics</Badge>
          </div>
          <CardContent className="pt-6 pb-4">
            <div className="h-32 flex items-center justify-center">
              <h3 className="text-xl font-medium text-center">When is a function continuous?</h3>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <Button variant="ghost" size="sm">See Answer</Button>
            <div className="text-xs text-gray-500">New card</div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline">View All Flashcards</Button>
      </div>
    </div>
  );

  const PracticeExamsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold gradient-text">Practice Tests</h2>
        <Button variant="outline" size="sm">All Tests</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Physics</Badge>
              <Badge variant="outline">25 questions</Badge>
            </div>
            <CardTitle>Mechanics & Energy Mock Test</CardTitle>
            <CardDescription>Based on your recent micro concepts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>Estimated time: 45 mins</div>
              <div>Difficulty: Medium</div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
            <Button className="w-full">Start Test</Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Mathematics</Badge>
              <Badge variant="outline">20 questions</Badge>
            </div>
            <CardTitle>Calculus Fundamentals</CardTitle>
            <CardDescription>Cover limits, continuity and derivatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>Estimated time: 40 mins</div>
              <div>Difficulty: Hard</div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
            <Button className="w-full">Start Test</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );

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
    today: (
      <div className="space-y-8">
        <TodayStudyPlan />
        <MicroConceptView />
        <FlashcardsView />
        <PracticeExamsView />
      </div>
    ),
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

  // New side navigation menu
  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic" },
    { icon: <MessageSquare size={20} />, title: "Tutor", tab: "tutor" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6 pb-20 md:pb-6">
        {/* Top header section */}
        <div className="mb-8 mt-10 md:mt-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                  <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=John" />
                  <AvatarFallback className="bg-gradient-to-r from-sky-500 to-violet-500 text-white">
                    {userProfile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-display font-bold text-foreground gradient-text">
                    Welcome back, {userProfile.name.split(' ')[0]}
                  </h1>
                  <p className="text-muted-foreground">
                    {formattedDate} · {formattedTime}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search topics, concepts..." 
                  className="pl-9 bg-white dark:bg-gray-800"
                />
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-2 px-3 rounded-lg border border-gray-100 dark:border-gray-800 text-sm flex items-center gap-2">
                <Clock size={16} className="text-sky-500" />
                <span>Next mock test: <span className="font-medium">3 days</span></span>
              </div>
            </div>
          </div>
          
          {/* Enhanced exam goal section */}
          <div className="mt-6 bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-4 rounded-lg border border-sky-100 dark:border-sky-800/30">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-sky-700 dark:text-sky-300 font-medium uppercase">Current Goal</div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{userProfile.goals?.[0]?.title || "IIT-JEE"}</h3>
                  <Badge variant="outline" className="ml-2 bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700/50">
                    {userProfile.goals?.[0]?.progress || 65}% Complete
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Edit Goal
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-sky-500 to-violet-500">
                  <PencilRuler className="mr-1 h-4 w-4" />
                  Create Study Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile navigation for quick access */}
        <div className="md:hidden mb-6 overflow-x-auto tab-scrollbar pb-2">
          <div className="flex gap-3">
            {navItems.slice(0, 6).map((item) => (
              <Button
                key={item.tab}
                variant={activeTab === item.tab ? "default" : "outline"}
                className={`flex-shrink-0 ${activeTab === item.tab ? "bg-gradient-to-r from-sky-500 to-violet-500" : ""}`}
                size="sm"
                onClick={() => handleTabChange(item.tab)}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Button>
            ))}
          </div>
        </div>
        
        {/* Main dashboard content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left navigation sidebar (desktop) */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-sm">Navigation</h3>
              </div>
              
              <div className="p-2">
                {navItems.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleTabChange(item.tab)}
                    className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      activeTab === item.tab
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {activeTab === item.tab && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
                
                <Separator className="my-3" />
                
                <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
                
                <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-9 xl:col-span-10">
            <DashboardTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              tabContents={tabContents}
            />
          </div>
        </div>
      </main>
      
      <ChatAssistant userType="student" />
    </div>
  );
};

export default StudentDashboard;
