
import React from 'react';
import TutorCard from '@/components/dashboard/student/TutorCard';
import StudyPlannerCard from '@/components/dashboard/student/StudyPlannerCard';
import AcademicAdvisorCard from '@/components/dashboard/student/AcademicAdvisorCard';
import MotivationCard from '@/components/dashboard/student/MotivationCard';
import ProgressCard from '@/components/dashboard/student/ProgressCard';
import ProjectsCard from '@/components/dashboard/student/ProjectsCard';
import { LiveTutorSection } from '@/components/dashboard/student/LiveTutorSection';
import { CollaborativeForumSection } from '@/components/dashboard/student/CollaborativeForumSection';
import { VideoLibrarySection } from '@/components/dashboard/student/VideoLibrarySection';
import { SmartNotificationSection } from '@/components/dashboard/student/SmartNotificationSection';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import DashboardOverview from '@/components/dashboard/student/DashboardOverview';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { ReactNode } from 'react';
import { MicroConceptView, FlashcardsView, PracticeExamsView } from './TabContentViews';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  }[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  hideTabsNav?: boolean;
}

const DashboardContent = ({
  activeTab,
  onTabChange,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  hideTabsNav = false
}: DashboardContentProps) => {
  
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

  return (
    <div className="lg:col-span-9 xl:col-span-10">
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        {!hideTabsNav && (
          <TabsList className="tab-scrollbar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="flex items-center gap-2"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        
        <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
          {tabContents[activeTab] || <div>Coming soon...</div>}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;
