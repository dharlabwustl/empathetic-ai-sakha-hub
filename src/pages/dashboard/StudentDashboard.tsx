
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, LineChart, MessageSquare, PencilRuler } from "lucide-react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import TutorCard from "@/components/dashboard/student/TutorCard";
import StudyPlannerCard from "@/components/dashboard/student/StudyPlannerCard";
import ProgressCard from "@/components/dashboard/student/ProgressCard";
import ProjectsCard from "@/components/dashboard/student/ProjectsCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";

const StudentDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { userProfile } = useUserProfile("Student");
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking("Student");

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

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
        <div className="text-center">
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI" 
            className="w-16 h-16 mx-auto animate-pulse mb-4" 
          />
          <h2 className="text-xl font-medium mb-2">Loading your dashboard...</h2>
          <p className="text-gray-500">Personalizing your experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-gray-600">Here's an overview of your learning journey</p>
        </div>
        
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
        
        <Tabs defaultValue="planner" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Study Planner</span>
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>24/7 Tutor</span>
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
          
          <TabsContent value="planner">
            <StudyPlannerCard />
          </TabsContent>
          
          <TabsContent value="tutor">
            <TutorCard />
          </TabsContent>
          
          <TabsContent value="progress">
            <ProgressCard />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsCard />
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatAssistant userType="student" />
    </div>
  );
};

export default StudentDashboard;
